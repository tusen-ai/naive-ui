import type { Connect, Plugin } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { renderLlmsFile, renderLlmsFiles } from './llms'

const contentTypes: Record<string, string> = {
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
}

/** Middleware that answers `.txt` and `.md` requests `load` has content for. */
function serveTextFiles(
  load: (urlPath: string) => Promise<string | Uint8Array | undefined>
): Connect.NextHandleFunction {
  return async (req, res, next) => {
    const urlPath = decodeURIComponent(
      new URL(req.url ?? '/', 'http://x').pathname
    )
    const contentType = contentTypes[path.extname(urlPath)]
    if (!contentType)
      return next()
    try {
      const content = await load(urlPath)
      if (content === undefined)
        return next()
      res.setHeader('Content-Type', contentType)
      res.end(content)
    }
    catch (error) {
      next(error)
    }
  }
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
      server.middlewares.use(
        serveTextFiles(urlPath => renderLlmsFile(root, urlPath))
      )
    },
    // The static server of `vite preview` sends these files without a charset
    configurePreviewServer(server) {
      const outDir = path.resolve(root, server.config.build.outDir)
      server.middlewares.use(
        serveTextFiles(async (urlPath) => {
          const file = path.join(outDir, path.normalize(urlPath))
          if (!file.startsWith(outDir + path.sep))
            return undefined
          return fs.readFile(file).catch(() => undefined)
        })
      )
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
