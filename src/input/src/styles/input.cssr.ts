import { cB, c, cE, cM, cNotM, insideFormItem } from '../../../_utils/cssr'

// vars:
// --bezier
// --color
// --font-size
// --border-radius
// --height
// --padding-left
// --padding-right
// --text-color
// --text-color-disabled
// --caret-color
// --text-decoration-color
// --border
// --border-disabled
// --border-hover
// --border-focus
// --placeholder-color
// --placeholder-color-disabled
// --line-height-textarea
// --color-disabled
// --color-focus
// --box-shadow-focus
// --clear-color
// --clear-size
// --clear-color-hover
// --clear-color-pressed
// --suffix-text-color
// --icon-color
// --icon-color-disabled
// --icon-alpha
// --icon-alpha-disabled
// ...form item vars
export default c([
  cB('input', `
    max-width: 100%;
    cursor: text;
    line-height: 1.5;
    z-index: auto;
    outline: none;
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    border-radius: var(--border-radius);
    background-color: var(--color);
    transition: background-color .3s var(--bezier);
    font-size: var(--font-size);
    --padding-vertical: calc((var(--height) - 1.5 * var(--font-size)) / 2);
  `, [
    // common
    cE('input, textarea', `
      overflow: hidden;
      flex-grow: 1;
      position: relative;
    `),
    cE('input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder', `
      box-sizing: border-box;
      font-size: inherit;
      line-height: 1.5;
      font-family: inherit;
      border: none;
      outline: none;
      background-color: transparent;
      text-align: inherit;
      transition:
        caret-color .3s var(--bezier),
        color .3s var(--bezier),
        text-decoration-color .3s var(--bezier);
    `),
    cE('input-el, textarea-el', `
      -webkit-appearance: none;
      width: 100%;
      min-width: 0;
      text-decoration-color: var(--text-decoration-color);
      color: var(--text-color);
      caret-color: var(--caret-color);
    `, [
      c('&::placeholder', {
        color: 'transparent'
      })
    ]),
    cM('round', [
      cNotM('textarea', {
        borderRadius: 'calc(var(--height) / 2)'
      })
    ]),
    cE('placeholder', `
      pointer-events: none;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      overflow: hidden;
      color: var(--placeholder-color);
    `, [
      c('span', {
        width: '100%',
        display: 'inline-block'
      })
    ]),
    cNotM('autosize', {
      width: '100%'
    }),
    cM('autosize', [
      cE('textarea-el, input-el', `
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      `)
    ]),
    // input
    cB('input-wrapper', `
      overflow: hidden;
      display: inline-flex;
      flex-grow: 1;
      position: relative;
      padding-left: var(--padding-left);
      padding-right: var(--padding-right);
    `),
    cE('input-mirror', `
      padding: 0;
      height: var(--height);
      overflow: hidden;
      visibility: hidden;
      position: static;
      white-space: nowrap;
    `),
    cE('input-el', {
      padding: 0,
      height: 'var(--height)'
    }, [
      c('+', [
        cE('placeholder', `
          display: flex;
          align-items: center;  
        `)
      ])
    ]),
    cNotM('textarea', [
      cE('placeholder', {
        whiteSpace: 'nowrap'
      })
    ]),
    // textarea
    cM('textarea', {
      width: '100%'
    }, [
      cM('resizable', `
        resize: vertical;
        overflow: auto;
        min-height: var(--height);
      `),
      cE('textarea-el, textarea-mirror, placeholder', `
        height: 100%;
        padding-left: 0;
        padding-right: 0;
        padding-top: var(--padding-vertical);
        padding-bottom: var(--padding-vertical);
        display: inline-block;
        vertical-align: bottom;
        box-sizing: border-box;
        line-height: var(--line-height-textarea);
        margin: 0;
        resize: none;
      `),
      cE('textarea-mirror', `
        overflow: hidden;
        visibility: hidden;
        position: static;
        white-space: pre-wrap;
        overflow-wrap: break-word;
      `)
    ]),
    // pair
    cM('pair', [
      cE('input-el, placeholder', {
        textAlign: 'center'
      }),
      cE('separator', `
        display: flex;
        align-items: center;
        transition: color .3s var(--bezier);
        color: var(--text-color);
      `, [
        cB('icon', `
          color: var(--icon-color);
          opacity: var(--icon-alpha);
        `),
        cB('base-icon', `
          color: var(--icon-color);
          opacity: var(--icon-alpha);
        `)
      ])
    ]),
    cM('disabled', {
      cursor: 'not-allowed',
      backgroundColor: 'var(--color-disabled)'
    }, [
      cE('border', {
        border: 'var(--border-disabled)'
      }),
      cE('input-el, textarea-el', {
        cursor: 'not-allowed',
        color: 'var(--text-color-disabled)',
        textDecorationColor: 'var(--text-color-disabled)'
      }),
      cE('placeholder', {
        color: 'var(--placeholder-color-disabled)'
      }),
      cE('separator', {
        color: 'var(--text-color-disabled)'
      }, [
        cB('icon', `
          color: var(--icon-color-disabled);
          opacity: var(--icon-alpha-disabled);
        `),
        cB('base-icon', `
          color: var(--icon-color-disabled);
          opacity: var(--icon-alpha-disabled);
        `)
      ]),
      cE('suffix, prefix', {
        color: 'var(--text-color-disabled)'
      }, [
        cB('icon', `
          color: var(--icon-color-disabled);
          opacity: var(--icon-alpha-disabled);
        `),
        cB('internal-icon', `
          color: var(--icon-color-disabled);
          opacity: var(--icon-alpha-disabled);
        `)
      ])
    ]),
    cNotM('disabled', [
      cM('focus', {
        backgroundColor: 'var(--color-focus)'
      }, [
        cE('state-border', {
          border: 'var(--border-focus)',
          boxShadow: 'var(--box-shadow-focus)'
        })
      ]),
      c('&:hover', [
        cE('state-border', {
          border: 'var(--border-focus)'
        })
      ])
    ]),
    cE('border, state-border', `
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      border-radius: inherit;
      border: var(--border);
      transition:
        box-shadow .3s var(--bezier),
        border-color .3s var(--bezier);
    `),
    cE('state-border', `
      border-color: transparent;
      z-index: 1;
    `),
    cE('prefix', {
      marginRight: '4px'
    }),
    cE('suffix', {
      marginLeft: '4px'
    }),
    cE('suffix, prefix', `
      transition: color .3s var(--bezier);
      flex-wrap: nowrap;
      flex-shrink: 0;
      line-height: 1.5;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--suffix-text-color);
    `, [
      cB('base-clear', {
        fontSize: 'var(--icon-size)'
      }, [
        cE('placeholder', [
          cB('base-icon', `
            transition: color .3s var(--bezier), opacity .3s var(--bezier);
            color: var(--icon-color);
            opacity: var(--icon-alpha);
            font-size: var(--icon-size);
          `)
        ])
      ]),
      cB('icon', `
        transition: color .3s var(--bezier), opacity .3s var(--bezier);
        color: var(--icon-color);
        opacity: var(--icon-alpha);
        font-size: var(--icon-size);
      `),
      cB('base-icon', {
        fontSize: 'var(--icon-size)'
      })
    ])
  ]),
  ['warning', 'error'].map(status => insideFormItem(status,
    cB('input', [
      cNotM('disabled', [
        c('input-el, textarea-el', {
          caretColor: `var(--caret-color-${status})`
        }),
        cE('state-border', {
          border: `var(--border-${status})`
        }),
        c('&:hover', [
          cE('state-border', `
            border: var(--border-hover-${status});
          `)
        ]),
        c('&:focus', {
          backgroundColor: `var(--color-focus-${status})`
        }, [
          cE('state-border', `
            box-shadow: var(--box-shadow-focus-${status});
            border: var(--border-focus-${status});
          `)
        ]),
        cM('focus', {
          backgroundColor: `var(--color-focus-${status})`
        }, [
          cE('state-border', `
            box-shadow: var(--box-shadow-focus-${status});
            border: var(--border-focus-${status});
          `)
        ])
      ])
    ])
  ))
])
