import type { Plugin } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'
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
    // The static server of `vite preview` sends these files without a charset,
    // so a browser may misread the Chinese. Serve them as the dev server does.
    configurePreviewServer(server) {
      const outDir = path.resolve(root, server.config.build.outDir)
      server.middlewares.use(async (req, res, next) => {
        const urlPath = decodeURIComponent((req.url ?? '').split('?')[0])
        const ext = /\.(txt|md)$/.exec(urlPath)?.[0]
        if (!ext)
          return next()
        const file = path.join(outDir, path.normalize(urlPath))
        if (!file.startsWith(outDir + path.sep))
          return next()
        try {
          const content = await fs.readFile(file)
          res.setHeader('Content-Type', contentTypes[ext])
          res.end(content)
        }
        catch {
          next()
        }
      })
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
        // naiveui.com sends static files without a charset; a byte order mark
        // is the one sign of UTF-8 a browser reads from the file itself
        this.emitFile({
          type: 'asset',
          fileName: urlPath.slice(1),
          source: `\uFEFF${source}`
        })
      }
    }
  }
}
