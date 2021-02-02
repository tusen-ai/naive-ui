import {
  cRB,
  c,
  cB,
  cE,
  cM,
  cNotM,
  insideFormItem
} from '../../../../_utils/cssr'

// vars:
// --bezier
// --border
// --border-active
// --border-focus
// --border-hover
// --border-radius
// --box-shadow-active
// --box-shadow-focus
// --box-shadow-hover
// --caret-color
// --color
// --color-active
// --color-disabled
// --font-size
// --height
// --padding-single
// --placeholder-color
// --placeholder-color-disabled
// --text-color
// --text-color-disabled
// --arrow-color
// --loading-color
// ...clear vars
// ...form item vars
export default c([
  cB('base-selection', `
    position: relative;
    z-index: auto;
    box-shadow: none;
    width: 100%;
    max-width: 100%;
    display: inline-block;
    vertical-align: bottom;
    border-radius: var(--border-radius);
    min-height: var(--height);
    line-height: var(--height);
    font-size: var(--font-size);
  `, [
    cB('base-loading', `
      color: var(--loading-color);
    `),
    cB('base-selection-label', `
      height: var(--height);
      line-height: var(--height);
    `),
    cB('base-selection-tags', {
      minHeight: 'var(--height)'
    }, [
      cB('base-selection-input-tag', `
        height: calc(var(--height) - 6px);
        line-height: calc(var(--height) - 6px);
      `)
    ]),
    cE('border, state-border', `
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      border: var(--border);
      border-radius: inherit;
      transition:
        box-shadow .3s var(--bezier),
        border-color .3s var(--bezier);
    `),
    cE('state-border', `
      z-index: 1;
      border-color: transparent;
    `),
    cE('mark', `
      cursor: pointer;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
    `),
    cE('arrow', `
      color: var(--arrow-color);
      transition: color .3s var(--bezier);
    `),
    cM('selected', [
      cB('base-selection-placeholder', {
        display: 'none'
      })
    ]),
    cB('base-selection-placeholder', `
      white-space: nowrap;
      overflow: hidden;
      height: var(--height);
      line-height: var(--height);
      pointer-events: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: var(--padding-single);
      transition: color .3s var(--bezier);
      color: var(--placeholder-color);
    `),
    cB('base-selection-tags', `
      cursor: pointer;
      outline: none;
      box-sizing: border-box;
      position: relative;
      z-index: auto;
      display: flex;
      padding: 3px 26px 0 14px;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      vertical-align: bottom;
      background-color: var(--color);
      border-radius: inherit;
      transition:
        color .3s var(--bezier),
        box-shadow .3s var(--bezier),
        background-color .3s var(--bezier);
    `, [
      cB('tag', `
        margin-right: 7px;
        margin-bottom: 3px;
        font-size: 14px;
        max-width: 100%;
      `, [
        cE('content', `
          text-overflow: ellipsis;
          overflow: hidden;
        `)
      ])
    ]),
    cB('base-selection-label', `
      display: inline-block;
      width: 100%;
      vertical-align: bottom;
      cursor: pointer;
      outline: none;
      z-index: auto;
      box-sizing: border-box;
      position: relative;
      transition:
      color .3s var(--bezier),
      box-shadow .3s var(--bezier),
      background-color .3s var(--bezier);
      border-radius: inherit;
      background-color: var(--color);
    `, [
      cE('input', `
        line-height: inherit;
        outline: none;
        cursor: pointer;
        box-sizing: border-box;
        text-overflow: ellipsis;
        overflow: hidden;
        border:none;
        width: 100%;
        white-space: nowrap;
        padding: var(--padding-single);
        background-color: transparent;
        color: var(--text-color);
        transition: color .3s var(--bezier);
      `)
    ]),
    cNotM('disabled', [
      cM('focus', [
        cE('state-border', `
          box-shadow: var(--box-shadow-focus);
          border: var(--border-focus);
        `)
      ]),
      cM('active', [
        cE('state-border', `
          box-shadow: var(--box-shadow-active);
          border: var(--border-active);
        `),
        cB('base-selection-label', {
          backgroundColor: 'var(--color-active)'
        }),
        cB('base-selection-tags', {
          backgroundColor: 'var(--color-active)'
        }),
        cB('base-selection-input-tag', {
          display: 'inline-block'
        })
      ]),
      cNotM('active', [
        cRB('base-selection-label', [
          c('&:hover ~', [
            cE('state-border', `
              box-shadow: var(--box-shadow-hover);
              border: var(--border-hover);
            `)
          ]),
          c('&:focus ~', [
            cE('state-border', `
              box-shadow: var(--box-shadow-focus);
              border: var(--border-focus);
            `)
          ])
        ]),
        cRB('base-selection-tags', [
          c('&:hover ~', [
            cE('state-border', `
              box-shadow: var(--box-shadow-hover);
              border: var(--border-hover);
            `)
          ]),
          c('&:focus ~', [
            cE('state-border', `
              box-shadow: var(--box-shadow-focus);
              border: var(--border-focus);
            `)
          ])
        ])
      ])
    ]),
    cM('disabled', {
      cursor: 'not-allowed'
    }, [
      cE('arrow', `
        color: var(--arrow-color-disabled);
      `),
      cB('base-selection-label', `
        cursor: not-allowed;
        background-color: var(--color-disabled);
      `, [
        cE('input', `
          cursor: not-allowed;
          color: var(--text-color-disabled);
        `)
      ]),
      cB('base-selection-tags', `
        cursor: not-allowed;
        background-color: var(--color-disabled);
      `),
      cB('base-selection-placeholder', `
        cursor: not-allowed;
        color: var(--placeholder-color-disabled);
      `)
    ]),
    cB('base-selection-input-tag', `
      outline: none;
      display: none;
      position: relative;
      margin-bottom: 3px;
      max-width: 100%;
      vertical-align: bottom;
    `, [
      cE('input', `
        padding: 0;
        background-color: transparent;
        outline: none;
        border: none;
        max-width: 100%;
        overflow: hidden;
        width: 1em;
        line-height: inherit;
        cursor: pointer;
        color: var(--text-color);
        caret-color: var(--caret-color);
      `),
      cE('mirror', `
        position: absolute;
        left: 0;
        top: 0;
        white-space: pre;
        visibility: hidden;
        user-select: none;
        opacity: 0;
      `)
    ])
  ]),
  ['warning', 'error'].map(status => insideFormItem(status,
    cB('base-selection', [
      cE('state-border', {
        border: `var(--border-${status})`
      }),
      cNotM('disabled', [
        cM('active', [
          cE('state-border', `
            box-shadow: var(--box-shadow-active-${status});
            border: var(--border-active-${status});
          `),
          cB('base-selection-label', {
            backgroundColor: `var(--color-active-${status})`
          }),
          cB('base-selection-tags', {
            backgroundColor: `var(--box-shadow-active-${status})`
          })
        ]),
        cNotM('active', [
          cRB('base-selection-label', [
            c('&:hover ~', [
              cE('state-border', `
                box-shadow: var(--box-shadow-hover-${status});
                border: var(--border-hover-${status});
              `)
            ]),
            c('&:focus ~', [
              cE('state-border', `
                box-shadow: var(--box-shadow-focus-${status});
                border: var(--border-focus-${status});
              `)
            ])
          ]),
          cRB('base-selection-tags', [
            c('&:hover ~', [
              cE('state-border', `
                box-shadow: var(--box-shadow-hover-${status});
                border: var(--border-hover-${status});
              `)
            ]),
            c('&:focus ~', [
              cE('state-border', `
                box-shadow: var(--box-shadow-focus-${status});
                border: var(--border-hover-${status});
              `)
            ])
          ]),
          cM('focus', [
            cE('state-border', `
              box-shadow: var(--box-shadow-focus-${status});
              border: var(--border-focus-${status});
            `)
          ])
        ])
      ])
    ])
  ))
])
