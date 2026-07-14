import type { Plugin, ResolvedConfig } from 'vite'
import { emitLlmsFiles, genLlmsFullTxt, genLlmsTxt } from './llms/generate'
import { matchLlmsAction, serveMd } from './llms/serve'
import { formatLogMessage } from './llms/utils'

export function llmsTxtPlugin(): Plugin {
  let projectRoot: string
  let resolvedConfig: ResolvedConfig

  return {
    name: 'naive-ui-llms-txt',
    configResolved(config) {
      projectRoot = config.root
      resolvedConfig = config
    },
    configureServer(server) {
      const logger = server.config.logger

      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] || ''
        const action = matchLlmsAction(url)

        if (!action) {
          next()
          return
        }

        try {
          if (action.type === 'llms-txt') {
            const content = await genLlmsTxt(
              projectRoot,
              action.locale,
              undefined,
              (message, error) => logger.warn(formatLogMessage(message, error))
            )
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end(content)
            return
          }

          if (action.type === 'llms-full-txt') {
            const content = await genLlmsFullTxt(
              projectRoot,
              action.locale,
              undefined,
              (message, error) => logger.warn(formatLogMessage(message, error))
            )
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end(content)
            return
          }

          if (action.type === 'md') {
            await serveMd(
              res,
              projectRoot,
              action.locale,
              action.category,
              action.slug,
              url
            )
          }
        }
        catch (e) {
          logger.error(
            formatLogMessage(`[naive-ui-llms-txt] Error serving ${url}`, e)
          )
          next(e)
        }
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] || ''
        const action = matchLlmsAction(url)

        // For preview, if it's a canonical LLMS path,
        // we just ensure the correct headers are set.
        if (action) {
          res.setHeader(
            'Content-Type',
            action.type === 'md'
              ? 'text/markdown; charset=utf-8'
              : 'text/plain; charset=utf-8'
          )
        }

        next()
      })
    },
    async generateBundle() {
      if (resolvedConfig.command !== 'build')
        return

      await emitLlmsFiles(
        projectRoot,
        (fileName, source) => {
          this.emitFile({
            type: 'asset',
            fileName,
            source
          })
        },
        {
          info: message => this.info(message),
          warn: (message, error) => this.warn(formatLogMessage(message, error))
        }
      )
    }
  }
}
