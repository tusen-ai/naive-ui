import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import { fadeInWidthExpandTransition } from '../../../_styles/transitions/fade-in-width-expand.cssr'
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'
import { isBrowser } from '../../../_utils'

// vars:
// --n-bezier
// --n-bezier-ease-out
// --n-ripple-duration
// --n-opacity-disabled
// --n-text-color
// --n-text-color-hover
// --n-text-color-pressed
// --n-text-color-focus
// --n-text-color-disabled
// --n-color
// --n-color-hover
// --n-color-pressed
// --n-color-focus
// --n-color-disabled
// --n-border
// --n-border-hover
// --n-border-pressed
// --n-border-focus
// --n-border-disabled
// --n-ripple-color
// --n-border-radius
// --n-height
// --n-width
// --n-font-size
// --n-padding
// --n-icon-size
// --n-icon-margin
// --n-wave-opacity
// --n-font-weight
//
// private-vars:
// --n-border-color-xxx, used for custom color
export default c([
  cB('button', `
    margin: 0;
    font-weight: var(--n-font-weight);
    line-height: 1;
    font-family: inherit;
    padding: var(--n-padding);
    height: var(--n-height);
    font-size: var(--n-font-size);
    border-radius: var(--n-border-radius);
    color: var(--n-text-color);
    background-color: var(--n-color);
    width: var(--n-width);
    white-space: nowrap;
    outline: none;
    position: relative;
    z-index: auto;
    border: none;
    display: inline-flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    user-select: none;
    -webkit-user-select: none;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    transition:
      color .3s var(--n-bezier),
      background-color .3s var(--n-bezier),
      opacity .3s var(--n-bezier),
      border-color .3s var(--n-bezier);
  `, [
    cM('color', [
      cE('border', {
        borderColor: 'var(--n-border-color)'
      }),
      cM('disabled', [
        cE('border', {
          borderColor: 'var(--n-border-color-disabled)'
        })
      ]),
      cNotM('disabled', [
        c('&:focus', [
          cE('state-border', {
            borderColor: 'var(--n-border-color-focus)'
          })
        ]),
        c('&:hover', [
          cE('state-border', {
            borderColor: 'var(--n-border-color-hover)'
          })
        ]),
        c('&:active', [
          cE('state-border', {
            borderColor: 'var(--n-border-color-pressed)'
          })
        ]),
        cM('pressed', [
          cE('state-border', {
            borderColor: 'var(--n-border-color-pressed)'
          })
        ])
      ])
    ]),
    cM('disabled', {
      backgroundColor: 'var(--n-color-disabled)',
      color: 'var(--n-text-color-disabled)'
    }, [
      cE('border', {
        border: 'var(--n-border-disabled)'
      })
    ]),
    cNotM('disabled', [
      c('&:focus', {
        backgroundColor: 'var(--n-color-focus)',
        color: 'var(--n-text-color-focus)'
      }, [
        cE('state-border', {
          border: 'var(--n-border-focus)'
        })
      ]),
      c('&:hover', {
        backgroundColor: 'var(--n-color-hover)',
        color: 'var(--n-text-color-hover)'
      }, [
        cE('state-border', {
          border: 'var(--n-border-hover)'
        })
      ]),
      c('&:active', {
        backgroundColor: 'var(--n-color-pressed)',
        color: 'var(--n-text-color-pressed)'
      }, [
        cE('state-border', {
          border: 'var(--n-border-pressed)'
        })
      ]),
      cM('pressed', {
        backgroundColor: 'var(--n-color-pressed)',
        color: 'var(--n-text-color-pressed)'
      }, [
        cE('state-border', {
          border: 'var(--n-border-pressed)'
        })
      ])
    ]),
    cM('loading', 'cursor: wait;'),
    cB('base-wave', `
      pointer-events: none;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      animation-iteration-count: 1;
      animation-duration: var(--n-ripple-duration);
      animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
    `, [
      cM('active', {
        zIndex: 1,
        animationName: 'button-wave-spread, button-wave-opacity'
      })
    ]),
    (isBrowser && 'MozBoxSizing' in document.createElement('div').style)
      ? c('&::moz-focus-inner', {
        border: 0
      })
      : null,
    cE('border, state-border', `
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      transition: border-color .3s var(--n-bezier);
      pointer-events: none;
    `),
    cE('border', {
      border: 'var(--n-border)'
    }),
    cE('state-border', {
      border: 'var(--n-border)',
      borderColor: '#0000',
      zIndex: 1
    }),
    cE('icon', `
      margin: var(--n-icon-margin);
      margin-left: 0;
      height: var(--n-icon-size);
      width: var(--n-icon-size);
      max-width: var(--n-icon-size);
      font-size: var(--n-icon-size);
      position: relative;
      flex-shrink: 0;
    `, [
      cB('icon-slot', `
        height: var(--n-icon-size);
        width: var(--n-icon-size);
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
      `, [
        iconSwitchTransition({
          top: '50%',
          originalTransform: 'translateY(-50%)'
        })
      ]),
      fadeInWidthExpandTransition()
    ]),
    cE('content', `
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      min-width: 0;
    `, [
      c('~', [
        cE('icon', {
          margin: 'var(--n-icon-margin)',
          marginRight: 0
        })
      ])
    ]),
    cM('block', `
      display: flex;
      width: 100%;
    `),
    cM('dashed', [
      cE('border, state-border', {
        borderStyle: 'dashed !important'
      })
    ]),
    cM('disabled', {
      cursor: 'not-allowed',
      opacity: 'var(--n-opacity-disabled)'
    })
  ]),
  c('@keyframes button-wave-spread', {
    from: {
      boxShadow: '0 0 0.5px 0 var(--n-ripple-color)'
    },
    to: {
      // don't use exact 5px since chrome will display the animation with glitches
      boxShadow: '0 0 0.5px 4.5px var(--n-ripple-color)'
    }
  }),
  c('@keyframes button-wave-opacity', {
    from: {
      opacity: 'var(--n-wave-opacity)'
    },
    to: {
      opacity: 0
    }
  })
])
