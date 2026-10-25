import type { Plugin } from 'vite'
import process from 'node:process'
import { renderLlmsFile, renderLlmsFiles } from './llms'

const contentTypes: Record<string, string> = {
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
}

/**
 * Serves the docs to LLMs: llms.txt, llms-full.txt and a Markdown version of
 * every page at its path plus `.md`. Built on request by the dev server and
 * emitted as static files by the site build.
 */
export function llmsPlugin(): Plugin {
  let root = process.cwd()
  return {
    name: 'naive-llms',
    configResolved(config) {
      root = config.root
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const urlPath = decodeURIComponent((req.url ?? '').split('?')[0])
        const ext = /\.(txt|md)$/.exec(urlPath)?.[0]
        if (!ext)
          return next()
        try {
          const content = await renderLlmsFile(root, urlPath)
          if (content === undefined)
            return next()
          res.setHeader('Content-Type', contentTypes[ext])
          res.end(content)
        }
        catch (error) {
          next(error)
        }
      })
    },
    async generateBundle() {
      for (const [urlPath, source] of await renderLlmsFiles(root)) {
        this.emitFile({ type: 'asset', fileName: urlPath.slice(1), source })
      }
    }
  }
}
