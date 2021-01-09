import { cB, c, cE, cM, cNotM } from '../../../_utils/cssr'

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
// --icon-size
export default c([
  cB('input', `
    line-height: 1.5;
    z-index: auto;
    outline: none;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    display: inline-flex;
    border-radius: var(--border-radius);
    background-color: var(--color);
    transition: background-color .3s var(--bezier);
    --padding-vertical: calc((var(--height) - 1.5 * var(--font-size)) / 2);
  `, [
    // common
    cE('input', `
      flex-grow: 1;
      position: relative;
    `),
    cE('input-el, textarea, textarea-mirror, separator, placeholder', `
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
    cE('input-el, textarea', `
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
    // input
    cB('input-wrapper', `
      display: inline-flex;
      flex-grow: 1;
      position: relative;
      padding-left: var(--padding-left);
      padding-right: var(--padding-right);
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
    cM('textarea', [
      cE('textarea, textarea-mirror, placeholder', `
        padding-left: var(--padding-left);
        padding-right: var(--padding-right);
        padding-top: var(--padding-vertical);
        padding-bottom: var(--padding-vertical);
        display: inline-block;
        vertical-align: bottom;
        box-sizing: border-box;
        line-height: var(--line-height-textarea);
        margin: 0;
        resize: vertical;
      `),
      cE('textarea', [
        cM('autosize', `
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          resize: none;
        `)
      ]),
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
      `)
    ]),
    cM('disabled', {
      cursor: 'not-allowed',
      backgroundColor: 'var(--color-disabled)'
    }, [
      cE('border', {
        border: 'var(--border-disabled)'
      }),
      cE('input-el, textarea', {
        cursor: 'not-allowed',
        color: 'var(--text-color-disabled)',
        textDecorationColor: 'var(--text-color-disabled)'
      }),
      cE('placeholder', {
        color: 'var(--placeholder-color-disabled)'
      }),
      cE('separator', {
        color: 'var(--text-color-disabled)'
      })
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
      flex-wrap: nowrap;
      flex-shrink: 0;
      line-height: 1.5;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: var(--icon-size);
    `, [
      cB('base-clear', {
        fontSize: 'var(--icon-size)'
      }),
      cB('icon', {
        fontSize: 'var(--icon-size)'
      }),
      cB('base-icon', {
        fontSize: 'var(--icon-size)'
      })
    ])
  ])
])
