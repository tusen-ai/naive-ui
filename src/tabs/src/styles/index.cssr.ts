import { c, cM, cB, cE } from '../../../_utils/cssr'

// vars:
// --bezier
// --close-color
// --close-color-hover
// --close-color-pressed
// --label-bar-color
// --label-font-size-card
// --label-font-size-line
// --label-text-color
// --label-text-color-active
// --label-text-color-disabled
// --label-text-color-hover
// --pane-text-color
// --tab-border-color
// --tab-border-color-active
// --tab-border-radius
// --tab-color
// --tab-font-weight
// --tab-text-color
// --tab-text-color-active
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
      cB('tabs-label-wrapper', {
        width: '100%'
      }, [
        cB('tabs-label', {
          marginRight: 0
        })
      ])
    ])
  ]),
  cB('tabs-nav', `
    line-height: 1.75;
    display: flex;
    background-clip: padding-box;
    transition: border-color .3s var(--bezier);
    overflow: auto;
    scrollbar-width: none;
  `, [
    c('&::-webkit-scrollbar', `
      width: 0;
      height: 0;
    `)
  ]),
  cB('tabs-label-wrapper', `
    display: inline-block;
    font-weight: var(--tab-font-weight);
    white-space: nowrap;
    position: relative;
  `, [
    cB('tabs-label-bar', `
      position: absolute;
      bottom: 2px;
      height: 2px;
      border-radius: 1px;
      background-color: var(--label-bar-color);
      transition:
        left .2s var(--bezier),
        max-width .2s var(--bezier),
        background-color .3s var(--bezier);
    `, [
      cM('transition-disabled', {
        transition: 'none'
      })
    ]),
    cB('tabs-label', `
      cursor: pointer;
      white-space: nowrap;
      flex-wrap: nowrap;
      display: inline-flex;
      align-items: center;
      transition:
      background-color .3s var(--bezier),
      border-color .3s var(--bezier);
    `, [
      cM('disabled', {
        cursor: 'not-allowed'
      }),
      cE('close', `
        margin-left: 8px;
        font-size: 16px;
        transition: color .3s var(--bezier);
      `),
      cE('label', `
        font-size: var(--label-font-size-line);
        transition: color .3s var(--bezier);
        color: var(--label-text-color);
      `)
    ])
  ]),
  cB('tab-panel', `
    color: var(--pane-text-color);
    width: 100%;
    margin-top: 8px;
    transition:
      color .3s var(--bezier),
      background-color .3s var(--bezier);
  `),
  cM('line-type', [
    cB('tabs-label', `
      box-sizing: border-box;
      padding-bottom: 2px;
      vertical-align: bottom;
    `, [
      c('&:not(:last-child)', {
        marginRight: '36px'
      }),
      c('&:hover', [
        cE('label', {
          color: 'var(--label-text-color-hover)'
        })
      ]),
      cM('active', [
        cE('label', {
          color: 'var(--label-text-color-active)'
        })
      ]),
      cM('disabled', [
        cE('label', {
          color: 'var(--label-text-color-disabled)'
        })
      ])
    ])
  ]),
  cM('card-type', [
    cB('tabs-nav', `
      box-sizing: border-box;
      padding-top: 4px;
      padding-bottom: 4px;
      border-top: 1px solid var(--tab-border-color);
      border-bottom: 1px solid var(--tab-border-color);
    `, [
      cB('tabs-label-bar', `
        bottom: 0;
        border-radius: 0;
      `)
    ]),
    cB('tabs-label', `
      margin-right: 4px;
      box-sizing: border-box;
      height: 34px;
      line-height: 34px;
      padding: 0 12px;
      position: relative;
      vertical-align: bottom;
      border-radius: var(--tab-border-radius);
      border: 1px solid #0000;
    `, [
      cE('label', `
        font-size: var(--label-font-size-card);
        color: var(--tab-text-color);
      `),
      c('&:hover', {
        backgroundColor: 'var(--tab-color)'
      }),
      cM('active', {
        backgroundColor: 'var(--tab-color)',
        border: '1px solid var(--tab-border-color-active)'
      }, [
        cE('label', {
          color: 'var(--tab-text-color-active)'
        })
      ]),
      cM('disabled', [
        cE('label', {
          color: 'var(--label-text-color-disabled)'
        })
      ])
    ])
  ])
])
