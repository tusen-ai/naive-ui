import { c, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTransition from '../../../_styles/transitions/fade-in-height-expand'
import iconSwitchTransition from '../../../_styles/transitions/icon-switch'

// vars:
// --arrow-color
// --bezier
// --font-size
// --node-border-radius
// --node-color-active
// --node-color-hover
// --node-color-pressed
// --node-text-color
// --node-text-color-disabled
export default cB(
  'tree',
  {
    fontSize: 'var(--font-size)'
  },
  [
    c(
      'ul, li',
      `
    margin: 0;
    padding: 0;
    list-style: none;
  `
    ),
    c('>', [
      cB('tree-node', [
        c('&:first-child', {
          paddingTop: 0
        })
      ])
    ]),
    cB(
      'tree-children-wrapper',
      {
        marginLeft: '16px'
      },
      [fadeInHeightExpandTransition({ duration: '0.15s' })]
    ),
    cB('tree-node', {
      padding: '6px 0 0 0'
    }),
    cB(
      'tree-node-switcher',
      `
    cursor: pointer;
    display: inline-flex;
    height: 24px;
    width: 24px;
    align-items: center;
    justify-content: center;
    transition: transform .15s var(--bezier);
    vertical-align: bottom;
  `,
      [
        cE(
          'icon',
          `
      position: relative;
      height: 14px;
      width: 14px;
      display: flex;
      color: var(--arrow-color);
      transition: color .3s var(--bezier);
      font-size: 14px;
    `,
          [
            cB('icon', [iconSwitchTransition()]),
            cB(
              'base-loading',
              `
        color: var(--loading-color);
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      `,
              [iconSwitchTransition()]
            )
          ]
        ),
        cM('hide', {
          visibility: 'hidden'
        }),
        cM('expanded', {
          transform: 'rotate(90deg)'
        })
      ]
    ),
    cB(
      'tree-node-checkbox',
      `
    display: inline-flex;
    height: 24px;
    width: 16px;
    vertical-align: bottom;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
  `
    ),
    cB(
      'tree-node-content',
      `
    position: relative;
    display: inline-flex;
    height: 24px;
    box-sizing: border-box;
    border-bottom: 3px solid transparent;
    border-top: 3px solid transparent;
    line-height: 24px;
    align-items: center;
    vertical-align: bottom;
    padding: 0 6px;
    cursor: pointer;
    border-radius: var(--node-border-radius);
    text-decoration-color: transparent;
    text-decoration-line: underline;
    color: var(--node-text-color);
    transition:
      color .3s var(--bezier),
      text-decoration-color .3s var(--bezier),
      background-color .3s var(--bezier),
      border-color .3s var(--bezier);
  `,
      [
        c('&:last-child', {
          marginBottom: 0
        }),
        cE(
          'padding-box',
          `
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: transparent;
    `
        ),
        cE(
          'text',
          `
      line-height: 1.25;
      border-bottom: 1px solid transparent;
      transition: border-color .3s var(--bezier);
    `
        ),
        cM(
          'block',
          {
            width: 'calc(100% - 24px)'
          },
          [
            cM('checkable', {
              width: 'calc(100% - 48px)'
            })
          ]
        ),
        c('&:hover', {
          backgroundColor: 'var(--node-color-hover)'
        }),
        c('&:active', {
          backgroundColor: 'var(--node-color-pressed)'
        }),
        cM('hightlight', [
          cE('text', {
            borderBottomColor: 'var(--node-text-color-disabled)'
          })
        ]),
        cM('pending', [
          c('&:hover', {
            backgroundColor: 'transparent'
          }),
          cM('pending-bottom', {
            borderBottom: '3px solid var(--node-color-hover)'
          }),
          cM('pending-top', {
            borderTop: '3px solid var(--node-color-hover)'
          }),
          cM('pending-body', {
            backgroundColor: 'var(--node-color-hover)'
          })
        ]),
        cM('selected', {
          backgroundColor: 'var(--node-color-active)'
        })
      ]
    )
  ]
)
