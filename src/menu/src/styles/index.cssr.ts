import type { CNode, CNodeChildren, CProperties } from 'css-render'
import { fadeInHeightExpandTransition } from '../../../_styles/transitions/fade-in-height-expand.cssr'
import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

const hoverStyleChildren = [
  c('&::before', 'background-color: var(--n-item-color-hover);'),
  cE('arrow', `
    color: var(--n-arrow-color-hover);
  `),
  cE('icon', `
    color: var(--n-item-icon-color-hover);
  `),
  cB('menu-item-content-header', `
    color: var(--n-item-text-color-hover);
  `, [
    c('a', `
      color: var(--n-item-text-color-hover);
    `),
    cE('extra', `
      color: var(--n-item-text-color-hover);
    `)
  ])
]

const horizontalHoverStyleChildren = [
  cE('icon', `
    color: var(--n-item-icon-color-hover-horizontal);
  `),
  cB('menu-item-content-header', `
    color: var(--n-item-text-color-hover-horizontal);
  `, [
    c('a', `
      color: var(--n-item-text-color-hover-horizontal);
    `),
    cE('extra', `
      color: var(--n-item-text-color-hover-horizontal);
    `)
  ])
]

// vars:
// --n-color
// --n-group-text-color
// --n-bezier
// --n-font-size
// --n-border-color-horizontal
// --n-border-radius
// --n-item-color-hover
// --n-item-color-active
// --n-item-color-active-hover
// --n-item-color-active-collapsed
// --n-arrow-color
// --n-arrow-color-hover
// --n-arrow-color-active
// --n-arrow-color-active-hover
// --n-arrow-color-child-active
// --n-arrow-color-child-active-hover
// --n-item-text-color
// --n-item-text-color-hover
// --n-item-text-color-active
// --n-item-text-color-active-hover
// --n-item-text-color-child-active
// --n-item-text-color-child-active-hover
// --n-item-text-color-horizontal
// --n-item-text-color-hover-horizontal
// --n-item-text-color-active-horizontal
// --n-item-text-color-active-hover-horizontal
// --n-item-text-color-child-active-horizontal
// --n-item-text-color-child-active-hover-horizontal
// --n-item-icon-color
// --n-item-icon-color-hover
// --n-item-icon-color-active
// --n-item-icon-color-active-hover
// --n-item-icon-color-child-active
// --n-item-icon-color-child-active-hover
// --n-item-icon-color-collapsed
// --n-item-icon-color-horizontal
// --n-item-icon-color-hover-horizontal
// --n-item-icon-color-active-horizontal
// --n-item-icon-color-active-hover-horizontal
// --n-item-icon-color-child-active-horizontal
// --n-item-icon-color-child-active-hover-horizontal
// --n-item-height
export default c([
  cB('menu', `
    background-color: var(--n-color);
    color: var(--n-item-text-color);
    overflow: hidden;
    transition: background-color .3s var(--n-bezier);
    box-sizing: border-box;
    font-size: var(--n-font-size);
    padding-bottom: 6px;
  `, [
    cM('horizontal', `
      display: inline-flex;
      padding-bottom: 0;
    `, [
      cB('submenu', 'margin: 0;'),
      cB('menu-item', 'margin: 0;'),
      cB('menu-item-content', `
        padding: 0 20px;
        border-bottom: 2px solid #0000;
      `, [
        c('&::before', 'display: none;'),
        cM('selected', 'border-bottom: 2px solid var(--n-border-color-horizontal)')
      ]),
      cB('menu-item-content', [
        cM('selected', [
          cE('icon', 'color: var(--n-item-icon-color-active-horizontal);'),
          cB('menu-item-content-header', `
            color: var(--n-item-text-color-active-horizontal);
          `, [
            c('a', 'color: var(--n-item-text-color-active-horizontal);'),
            cE('extra', 'color: var(--n-item-text-color-active-horizontal);')
          ])
        ]),
        cM('child-active', `
          border-bottom: 2px solid var(--n-border-color-horizontal);
        `, [
          cB('menu-item-content-header', `
            color: var(--n-item-text-color-child-active-horizontal);
          `, [
            c('a', `
              color: var(--n-item-text-color-child-active-horizontal);
            `),
            cE('extra', `
              color: var(--n-item-text-color-child-active-horizontal);
            `)
          ]),
          cE('icon', `
            color: var(--n-item-icon-color-child-active-horizontal);
          `)
        ]),
        cNotM('disabled', [
          cNotM('selected, child-active', [
            c('&:focus-within', horizontalHoverStyleChildren)
          ]),
          cM('selected', [
            hoverStyle(null, [
              cE('icon', 'color: var(--n-item-icon-color-active-hover-horizontal);'),
              cB('menu-item-content-header', `
                color: var(--n-item-text-color-active-hover-horizontal);
              `, [
                c('a', 'color: var(--n-item-text-color-active-hover-horizontal);'),
                cE('extra', 'color: var(--n-item-text-color-active-hover-horizontal);')
              ])
            ])
          ]),
          cM('child-active', [
            hoverStyle(null, [
              cE('icon', 'color: var(--n-item-icon-color-child-active-hover-horizontal);'),
              cB('menu-item-content-header', `
                color: var(--n-item-text-color-child-active-hover-horizontal);
              `, [
                c('a', 'color: var(--n-item-text-color-child-active-hover-horizontal);'),
                cE('extra', 'color: var(--n-item-text-color-child-active-hover-horizontal);')
              ])
            ])
          ]),
          hoverStyle('border-bottom: 2px solid var(--n-border-color-horizontal);', horizontalHoverStyleChildren)
        ]),
        cB('menu-item-content-header', [
          c('a', 'color: var(--n-item-text-color-horizontal);')
        ])
      ])
    ]),
    cM('collapsed', [
      cB('menu-item-content', [
        cM('selected', [
          c('&::before', `
            background-color: var(--n-item-color-active-collapsed) !important;
          `)
        ]),
        cB('menu-item-content-header', 'opacity: 0;'),
        cE('arrow', 'opacity: 0;'),
        cE('icon', 'color: var(--n-item-icon-color-collapsed);')
      ])
    ]),
    cB('menu-item', `
      height: var(--n-item-height);
      margin-top: 6px;
      position: relative;
    `),
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
      padding-right: 18px;
      transition:
        background-color .3s var(--n-bezier),
        padding-left .3s var(--n-bezier),
        border-color .3s var(--n-bezier);
    `, [
      c('> *', 'z-index: 1;'),
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
        border-radius: var(--n-border-radius);
        transition: background-color .3s var(--n-bezier);
      `),
      cM('disabled', `
        opacity: .45;
        cursor: not-allowed;
      `),
      cM('collapsed', [
        cE('arrow', 'transform: rotate(0);')
      ]),
      cM('selected', [
        c('&::before', 'background-color: var(--n-item-color-active);'),
        cE('arrow', 'color: var(--n-arrow-color-active);'),
        cE('icon', 'color: var(--n-item-icon-color-active);'),
        cB('menu-item-content-header', `
          color: var(--n-item-text-color-active);
        `, [
          c('a', 'color: var(--n-item-text-color-active);'),
          cE('extra', 'color: var(--n-item-text-color-active);')
        ])
      ]),
      cM('child-active', [
        cB('menu-item-content-header', `
          color: var(--n-item-text-color-child-active);
        `, [
          c('a', `
            color: var(--n-item-text-color-child-active);
          `),
          cE('extra', `
            color: var(--n-item-text-color-child-active);
          `)
        ]),
        cE('arrow', `
          color: var(--n-arrow-color-child-active);
        `),
        cE('icon', `
          color: var(--n-item-icon-color-child-active);
        `)
      ]),
      cNotM('disabled', [
        cNotM('selected, child-active', [
          c('&:focus-within', hoverStyleChildren)
        ]),
        cM('selected', [
          hoverStyle(null, [
            cE('arrow', 'color: var(--n-arrow-color-active-hover);'),
            cE('icon', 'color: var(--n-item-icon-color-active-hover);'),
            cB('menu-item-content-header', `
              color: var(--n-item-text-color-active-hover);
            `, [
              c('a', 'color: var(--n-item-text-color-active-hover);'),
              cE('extra', 'color: var(--n-item-text-color-active-hover);')
            ])
          ])
        ]),
        cM('child-active', [
          hoverStyle(null, [
            cE('arrow', 'color: var(--n-arrow-color-child-active-hover);'),
            cE('icon', 'color: var(--n-item-icon-color-child-active-hover);'),
            cB('menu-item-content-header', `
              color: var(--n-item-text-color-child-active-hover);
            `, [
              c('a', 'color: var(--n-item-text-color-child-active-hover);'),
              cE('extra', 'color: var(--n-item-text-color-child-active-hover);')
            ])
          ])
        ]),
        cM('selected', [
          hoverStyle(null, [
            c('&::before', 'background-color: var(--n-item-color-active-hover);')
          ])
        ]),
        hoverStyle(null, hoverStyleChildren)
      ]),
      cE('icon', `
        grid-area: icon;
        color: var(--n-item-icon-color);
        transition:
          color .3s var(--n-bezier),
          font-size .3s var(--n-bezier),
          margin-right .3s var(--n-bezier);
        box-sizing: content-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      `),
      cE('arrow', `
        grid-area: arrow;
        font-size: 16px;
        color: var(--n-arrow-color);
        transform: rotate(180deg);
        opacity: 1;
        transition:
          color .3s var(--n-bezier),
          transform 0.2s var(--n-bezier),
          opacity 0.2s var(--n-bezier);
      `),
      cB('menu-item-content-header', `
        grid-area: content;
        transition:
          color .3s var(--n-bezier),
          opacity .3s var(--n-bezier);
        opacity: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--n-item-text-color);
      `, [
        c('a', `
          outline: none;
          text-decoration: none;
          transition: color .3s var(--n-bezier);
          color: var(--n-item-text-color);
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
          color: var(--n-group-text-color);
          transition: color .3s var(--n-bezier);
        `)
      ])
    ]),
    cB('submenu', `
      cursor: pointer;
      position: relative;
      margin-top: 6px;
    `, [
      cB('menu-item-content', `
        height: var(--n-item-height);
      `),
      cB('submenu-children', `
        overflow: hidden;
        padding: 0;
      `, [
        fadeInHeightExpandTransition({
          duration: '.2s'
        })
      ])
    ]),
    cB('menu-item-group', [
      cB('menu-item-group-title', `
        margin-top: 6px;
        color: var(--n-group-text-color);
        cursor: default;
        font-size: .93em;
        height: 36px;
        display: flex;
        align-items: center;
        transition:
          padding-left .3s var(--n-bezier),
          color .3s var(--n-bezier);
      `)
    ])
  ]),
  cB('menu-tooltip', [
    c('a', `
      color: inherit;
      text-decoration: none;
    `)
  ]),
  cB('menu-divider', `
    transition: background-color .3s var(--n-bezier);
    background-color: var(--n-divider-color);
    height: 1px;
    margin: 6px 18px;
  `)
])

function hoverStyle (props: CProperties, children: CNodeChildren): CNode[] {
  return [cM('hover', props, children), c('&:hover', props, children)]
}
