import { changeColor } from 'seemly'
import { c, cB, cE, cM } from 'naive-ui'

export function mountSvgDefs (): void {
  if (document.getElementById('naive-ui/tusimple/svg-defs')) return
  const svgDefs = `<defs>
    <linearGradient id="progress-info">
      <stop offset="0%" stop-color="#80c6ff" />
      <stop offset="100%" stop-color="#335fff" />
    </linearGradient>
    <linearGradient id="progress-success">
      <stop offset="0%" stop-color="#AFF25E" />
      <stop offset="100%" stop-color="#4FB233" />
    </linearGradient>
    <linearGradient id="progress-warning">
      <stop offset="0%" stop-color="#F2E93D" />
      <stop offset="100%" stop-color="#FFAC26" />
    </linearGradient>
    <linearGradient id="progress-error">
      <stop offset="0%" stop-color="#FF66BA" />
      <stop offset="100%" stop-color="#D92149" />
    </linearGradient>
  </defs>`
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgEl.innerHTML = svgDefs
  svgEl.id = 'naive-ui/tusimple/svg-defs'
  document.body.appendChild(svgEl)
}

export const unconfigurableStyle = c([
  cB('tag', [
    cE(
      'close',
      {
        borderRadius: '50%'
      },
      [
        c('&:hover', {
          backgroundColor: changeColor('#D7DAE0', { alpha: 0.5 })
        }),
        c('&:hover', {
          backgroundColor: changeColor('#D7DAE0', { alpha: 0.25 })
        })
      ]
    )
  ]),
  cB('message', [
    cE('close', [
      c('&:hover', {
        backgroundColor: changeColor('#D7DAE0', { alpha: 0.5 })
      }),
      c('&:active', {
        backgroundColor: changeColor('#D7DAE0', { alpha: 0.25 })
      })
    ])
  ]),
  cB('progress', [
    cB('progress-graph-line-fill', {
      background: 'linear-gradient(270deg, #FFAC26 0%, #F2E93D 100%) !important'
    }),
    cM('circle', [
      cB('progress-graph-circle-fill', {
        stroke: 'url(#progress-warning) !important'
      })
    ]),
    cM('info', [
      cB('progress-graph-line-fill', {
        background:
          'linear-gradient(270deg, #FFAC26 0%, #F2E93D 100%) !important'
      }),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-warning) !important'
        })
      ])
    ]),
    cM('success', [
      cB('progress-graph-line-fill', {
        background:
          'linear-gradient(270deg, #4FB233 0%, #AFF25E 100%) !important'
      }),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-success) !important'
        })
      ])
    ]),
    cM('warning', [
      cB('progress-graph-line-fill', {
        background:
          'linear-gradient(270deg, #FF66BA 0%, #D92149 100%) !important'
      }),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-error) !important'
        })
      ])
    ]),
    cM('error', [
      cB('progress-graph-line-fill', {
        background:
          'linear-gradient(270deg, #FF66BA 0%, #D92149 100%) !important'
      }),
      cM('circle', [
        cB('progress-graph-circle-fill', {
          stroke: 'url(#progress-error) !important'
        })
      ])
    ])
  ]),
  cB('switch', [
    cM('active', [
      cE('rail', [
        c('&::before', {
          backgroundImage: 'linear-gradient(8deg, #4EB233 0%, #6DD400 100%)'
        })
      ])
    ]),
    cM('disabled', [
      cE(
        'rail',
        {
          backgroundColor: '#EBEDF0'
        },
        [
          c('&::before', {
            backgroundColor: '#EBEDF0',
            backgroundImage: 'unset'
          })
        ]
      ),
      cM('active', [
        cE('rail', [
          c('&::before', {
            backgroundImage: 'linear-gradient(8deg, #AFE6A1 0%, #C4E6A1 100%)'
          })
        ])
      ])
    ]),
    cE('rail', [
      c('&::before', {
        backgroundSize: '100%!important',
        backgroundImage: 'linear-gradient(133deg, #E2E5E9 0%, #999999 100%)'
      })
    ])
  ])
])
