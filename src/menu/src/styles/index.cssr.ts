import { CNode, CNodeChildren, CProperties } from 'css-render'
import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import fadeInHeightExpandTransition from '../../../_styles/transitions/fade-in-height-expand.cssr'

// vars:
// --color
// --group-text-color
// --bezier
// --font-size
// --border-color-horizontal
// --border-radius
// --item-color-active
// --item-color-active-collapsed
// --arrow-color
// --arrow-color-hover
// --arrow-color-active
// --arrow-color-child-active
// --item-text-color
// --item-text-color-hover
// --item-text-color-active
// --item-text-color-child-active
// --item-icon-color
// --item-icon-color-hover
// --item-icon-color-active
// --item-icon-color-collapsed
// --item-icon-color-child-active
export default cB('menu', `
  background-color: var(--color);
  color: var(--item-text-color);
  overflow: hidden;
  transition: background-color .3s var(--bezier);
  box-sizing: border-box;
  font-size: var(--font-size);
  padding-bottom: 6px;
`, [
  cM('horizontal', {
    display: 'inline-flex',
    paddingBottom: 0
  }, [
    cB('submenu', {
      margin: 0
    }),
    cB('menu-item', {
      margin: 0
    }, [
      c('&::before', {
        backgroundColor: '#0000 !important'
      }),
      cM('selected', [
        cB('menu-item-content', {
          borderBottom: '2px solid var(--border-color-horizontal)'
        })
      ])
    ]),
    cB('menu-item-content', {
      padding: '0 20px',
      borderBottom: '2px solid #0000'
    }, [
      cM('child-active', {
        borderBottom: '2px solid var(--border-color-horizontal)'
      }),
      cNotM('disabled', [
        hoverStyle(
          {
            borderBottom: '2px solid var(--border-color-horizontal)'
          },
          null
        )
      ])
    ])
  ]
  ),
  cM('collapsed', [
    cB('menu-item', [
      cM('selected', [
        c('&::before', {
          backgroundColor: 'var(--item-color-active-collapsed) !important'
        })
      ])
    ]),
    cB('menu-item-content', [
      cB('menu-item-content-header', {
        opacity: 0
      }),
      cE('arrow', {
        opacity: 0
      }),
      cE('icon', {
        color: 'var(--item-icon-color-collapsed)'
      })
    ])
  ]),
  cB('menu-item', {
    transition: 'background-color .3s var(--bezier)',
    height: '42px',
    marginTop: '6px',
    position: 'relative'
  }, [
    c('&::before', `
      z-index: auto;
      content: "";
      background-color: #0000;
      position: absolute;
      left: 8px;
      right: 8px;
      top: 0;
      bottom: 0;
      pointer-events: none;
      border-radius: var(--border-radius);
      transition: background-color .3s var(--bezier);
    `),
    cNotM('disabled', [
      c('&:active::before', {
        backgroundColor: 'var(--item-color-active)'
      })
    ]),
    cM('selected', [
      c('&::before', {
        backgroundColor: 'var(--item-color-active)'
      }),
      cB('menu-item-content', [
        cE('arrow', {
          color: 'var(--arrow-color-active)'
        }),
        cE('icon', {
          color: 'var(--item-icon-color-active)'
        }),
        cB('menu-item-content-header', {
          color: 'var(--item-text-color-active)'
        }, [
          cE('extra', {
            color: 'var(--item-text-color-active)'
          })
        ])
      ])
    ])
  ]),
  cB('menu-item-content', `
    box-sizing: border-box;
    line-height: 1.75;
    height: 100%;
    display: grid;
    grid-template-areas: "icon content arrow";
    grid-template-columns: auto 1fr auto;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: auto;
    padding-right: 18px;
    transition:
      background-color .3s var(--bezier),
      padding-left .3s var(--bezier),
      border-color .3s var(--bezier);
  `, [
    cM('disabled', {
      opacity: '.45',
      cursor: 'not-allowed'
    }),
    cM('collapsed', [
      cE('arrow', {
        transform: 'rotate(0)'
      })
    ]),
    cM('child-active', [
      cB('menu-item-content-header', {
        color: 'var(--item-text-color-child-active)'
      }, [
        cE('extra', {
          color: 'var(--item-text-color-child-active)'
        })
      ]),
      cE('arrow', {
        color: 'var(--arrow-color-child-active)'
      }),
      cE('icon', {
        color: 'var(--item-icon-color-child-active)'
      })
    ]),
    cNotM('disabled', [
      hoverStyle(null, [
        cE('arrow', {
          color: 'var(--arrow-color-hover)'
        }),
        cE('icon', {
          color: 'var(--item-icon-color-hover)'
        }),
        cB('menu-item-content-header', {
          color: 'var(--item-text-color-hover)'
        }, [
          cE('extra', {
            color: 'var(--item-text-color-hover)'
          })
        ])
      ])
    ]),
    cE('icon', `
      grid-area: icon;
      color: var(--item-icon-color);
      transition:
        color .3s var(--bezier),
        font-size .3s var(--bezier),
        margin-right .3s var(--bezier);
      box-sizing: content-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    `),
    cE('arrow', `
      grid-area: arrow;
      font-size: 16px;
      color: var(--arrow-color);
      transform: rotate(180deg);
      opacity: 1;
      transition:
        color .3s var(--bezier),
        transform 0.2s var(--bezier),
        opacity 0.2s var(--bezier);
    `),
    cB('menu-item-content-header', `
      grid-area: content;
      transition:
        color .3s var(--bezier),
        opacity .3s var(--bezier);
      opacity: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--item-text-color);
    `, [
      c('a', `
        text-decoration: none;
        color: inherit;
      `, [
        c('&::before', `
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        `)
      ]),
      cE('extra', `
        font-size: .93em;
        color: var(--group-text-color);
        transition: color .3s var(--bezier);
      `)
    ])
  ]),
  cB('submenu', {
    cursor: 'pointer',
    position: 'relative',
    marginTop: '6px'
  }, [
    cB('menu-item-content', {
      height: '42px'
    }),
    cB('submenu-children', {
      overflow: 'hidden',
      padding: 0
    }, [
      fadeInHeightExpandTransition({
        duration: '.2s'
      })
    ])
  ]),
  cB('menu-item-group', [
    cB('menu-item-group-title', `
      margin-top: 6px;
      color: var(--group-text-color);
      cursor: default;
      font-size: .93em;
      height: 36px;
      display: flex;
      align-items: center;
      transition:
        padding-left .3s var(--bezier),
        color .3s var(--bezier);
    `)
  ])
])

function hoverStyle (props: CProperties, children: CNodeChildren): CNode[] {
  return [cM('hover', props, children), c('&:hover', props, children)]
}
