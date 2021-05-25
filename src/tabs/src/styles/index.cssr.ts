import { c, cM, cB, cE, cNotM } from '../../../_utils/cssr'

// vars:
// --bezier
// --close-color
// --close-color-hover
// --close-color-pressed
// --bar-color
// --tab-font-size
// --tab-text-color
// --tab-text-color-active
// --tab-text-color-disabled
// --tab-text-color-hover
// --pane-text-color
// --tab-border-color
// --tab-border-radius
// --tab-color
// --tab-font-weight
// --tab-font-weight-active
// --tab-gap
// --tab-padding
// --pane-padding
export default cB('tabs', `
  width: 100%;
  transition:
    background-color .3s var(--bezier),
    border-color .3s var(--bezier);
`, [
  cM('flex', [
    cB('tabs-nav', {
      width: '100%'
    }, [
      cB('tabs-wrapper', {
        width: '100%'
      }, [
        cB('tabs-tab', {
          marginRight: 0
        })
      ])
    ])
  ]),
  cB('tabs-nav', `
    box-sizing: border-box;
    line-height: 1.5;
    display: flex;
    transition: border-color .3s var(--bezier);
  `, [
    cE('prefix, suffix', `
      display: flex;
      align-items: center;
    `),
    cE('prefix', 'padding-right: 16px;'),
    cE('suffix', 'padding-left: 16px;')
  ]),
  cB('tabs-nav-scroll-wrapper', `
    flex: 1;
    position: relative;
    overflow: hidden;
  `, [
    cM('shadow-before', [
      c('&::before', `
        box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
      `)
    ]),
    cM('shadow-after', [
      c('&::after', `
        box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
      `)
    ]),
    c('&::before', `
      transition: box-shadow .3s var(--bezier);
      pointer-events: none;
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 20px;
    `),
    c('&::after', `
      transition: box-shadow .3s var(--bezier);
      pointer-events: none;
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 20px;
    `)
  ]),
  cB('tabs-nav-scroll-content', `
    display: flex;
    position: relative;
  `),
  cB('tabs-wrapper', `
    display: inline-flex;
    flex-wrap: nowrap;
    position: relative;
  `),
  cB('tabs-tab-wrapper', `
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    flex-grow: 0;
  `),
  cB('tabs-tab', `
    cursor: pointer;
    white-space: nowrap;
    flex-wrap: nowrap;
    display: inline-flex;
    align-items: center;
    color: var(--tab-text-color);
    font-size: var(--tab-font-size);
    background-clip: padding-box;
    padding: var(--tab-padding);
    transition:
      color .3s var(--bezier),
      background-color .3s var(--bezier),
      border-color .3s var(--bezier);
  `, [
    cM('disabled', {
      cursor: 'not-allowed'
    }),
    cE('close', `
      margin-left: 8px;
      font-size: 14px;
      transition: color .3s var(--bezier);
    `),
    cE('label', `
      display: flex;
      align-items: center;
    `)
  ]),
  cB('tabs-bar', `
    position: absolute;
    bottom: 0;
    height: 2px;
    border-radius: 1px;
    background-color: var(--bar-color);
    transition:
      left .2s var(--bezier),
      max-width .2s var(--bezier),
      background-color .3s var(--bezier);
  `, [
    cM('transition-disabled', `
      transition: none;
    `),
    cM('disabled', `
      background-color: var(--tab-text-color-disabled)
    `)
  ]),
  cB('tab-pane', `
    color: var(--pane-text-color);
    width: 100%;
    padding: var(--pane-padding);
    transition:
      color .3s var(--bezier),
      background-color .3s var(--bezier);
  `),
  cB('tabs-tab-pad', `
    width: var(--tab-gap);
    flex-grow: 0;
    flex-shrink: 0;
  `),
  cM('line-type, bar-type', [
    cB('tabs-tab', `
      font-weight: var(--tab-font-weight-active);
      box-sizing: border-box;
      vertical-align: bottom;
    `, [
      c('&:hover', {
        color: 'var(--tab-text-color-hover)'
      }),
      cM('active', {
        color: 'var(--tab-text-color-active)'
      }),
      cM('disabled', {
        color: 'var(--tab-text-color-disabled)'
      })
    ])
  ]),
  cM('line-type', [
    cB('tabs-nav', [
      cE('prefix, suffix', `
        transition: border-color .3s var(--bezier);
        border-bottom: 1px solid var(--tab-border-color);
      `)
    ]),
    cB('tabs-nav-scroll-content', `
      transition: border-color .3s var(--bezier);
      border-bottom: 1px solid var(--tab-border-color);
    `),
    cB('tabs-bar', `
      border-radius: 0;
      bottom: -1px;
    `)
  ]),
  cM('card-type', [
    cB('tabs-nav', [
      cE('prefix, suffix', `
        transition: border-color .3s var(--bezier);
        border-bottom: 1px solid var(--tab-border-color);
      `)
    ]),
    cB('tabs-pad', `
      flex-grow: 1;
      transition: border-color .3s var(--bezier);
      border-bottom: 1px solid var(--tab-border-color);
    `),
    cB('tabs-tab-pad', `
      transition: border-color .3s var(--bezier);
      border-bottom: 1px solid var(--tab-border-color);
    `),
    cB('tabs-tab', `
      font-weight: var(--tab-font-weight);
      border: 1px solid var(--tab-border-color);
      border-top-left-radius: var(--tab-border-radius);
      border-top-right-radius: var(--tab-border-radius);
      background-color: var(--tab-color);
      box-sizing: border-box;
      position: relative;
      vertical-align: bottom;
      display: flex;
      justify-content: space-between;
      font-size: var(--tab-font-size);
      color: var(--tab-text-color);
    `, [
      cM('addable', `
        padding-left: 8px;
        padding-right: 8px;
        font-size: 16px;
      `, [
        cNotM('disabled', [
          c('&:hover', `
            color: var(--tab-text-color-active);
          `)
        ])
      ]),
      cM('closable', 'padding-right: 6px;'),
      cM('active', `
        border-bottom: 1px solid #0000;
        background-color: #0000;
        font-weight: var(--tab-font-weight-active);
        color: var(--tab-text-color-active);
      `),
      cM('disabled', 'color: var(--tab-text-color-disabled);')
    ]),
    cB('tabs-scroll-padding', 'border-bottom: 1px solid var(--tab-border-color);')
  ])
])
