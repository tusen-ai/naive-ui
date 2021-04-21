import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import fadeInWidthExpandTransition from '../../../_styles/transitions/fade-in-width-expand.cssr'
import iconSwitchTransition from '../../../_styles/transitions/icon-switch.cssr'

// vars:
// --bezier
// --ripple-duration
// --opacity-disabled
// --text-color
// --text-color-hover
// --text-color-pressed
// --text-color-focus
// --text-color-disabled
// --color
// --color-hover
// --color-pressed
// --color-focus
// --color-disabled
// --border
// --border-hover
// --border-pressed
// --border-focus
// --border-disabled
// --ripple-color
// --border-radius
// --height
// --width
// --font-size
// --padding
// --icon-size
// --icon-margin
// --wave-opacity
// --font-weight
//
// private-vars:
// --border-color-xxx, used for custom color
export default c([
  cB('button', `
    font-weight: var(--font-weight);
    line-height: 1;
    font-family: inherit;
    padding: var(--padding);
    height: var(--height);
    font-size: var(--font-size);
    border-radius: var(--border-radius);
    color: var(--text-color);
    background-color: var(--color);
    width: var(--width);
    white-space: nowrap;
    outline: none;
    position: relative;
    z-index: auto;
    border: none;
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    user-select: none;
    text-align: center;
    cursor: pointer;
    transition:
      color .3s var(--bezier),
      background-color .3s var(--bezier),
      opacity .3s var(--bezier),
      border-color .3s var(--bezier);
  `, [
    cM('color', [
      cE('border', {
        borderColor: 'var(--border-color)'
      }),
      cM('disabled', [
        cE('border', {
          borderColor: 'var(--border-color-disabled)'
        })
      ]),
      cNotM('disabled', [
        c('&:focus', [
          cE('state-border', {
            borderColor: 'var(--border-color-focus)'
          })
        ]),
        c('&:hover', [
          cE('state-border', {
            borderColor: 'var(--border-color-hover)'
          })
        ]),
        c('&:active', [
          cE('state-border', {
            borderColor: 'var(--border-color-pressed)'
          })
        ]),
        cM('pressed', [
          cE('state-border', {
            borderColor: 'var(--border-color-pressed)'
          })
        ])
      ])
    ]),
    cM('disabled', {
      backgroundColor: 'var(--color-disabled)',
      color: 'var(--text-color-disabled)'
    }, [
      cE('border', {
        border: 'var(--border-disabled)'
      })
    ]),
    cNotM('disabled', [
      c('&:focus', {
        backgroundColor: 'var(--color-focus)',
        color: 'var(--text-color-focus)'
      }, [
        cE('state-border', {
          border: 'var(--border-focus)'
        })
      ]),
      c('&:hover', {
        backgroundColor: 'var(--color-hover)',
        color: 'var(--text-color-hover)'
      }, [
        cE('state-border', {
          border: 'var(--border-hover)'
        })
      ]),
      c('&:active', {
        backgroundColor: 'var(--color-pressed)',
        color: 'var(--text-color-pressed)'
      }, [
        cE('state-border', {
          border: 'var(--border-pressed)'
        })
      ]),
      cM('pressed', {
        backgroundColor: 'var(--color-pressed)',
        color: 'var(--text-color-pressed)'
      }, [
        cE('state-border', {
          border: 'var(--border-pressed)'
        })
      ])
    ]),
    cB('base-wave', `
      pointer-events: none;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      animation-iteration-count: 1;
      animation-duration: var(--ripple-duration);
      animation-timing-function: var(--bezier-ease-out), var(--bezier-ease-out);
    `, [
      cM('active', {
        zIndex: 1,
        animationName: 'button-wave-spread, button-wave-opacity'
      })
    ]),
    c('&::moz-focus-inner', {
      border: 0
    }),
    cE('border, state-border', `
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      transition: border-color .3s var(--bezier);
      pointer-events: none;
    `),
    cE('border', {
      border: 'var(--border)'
    }),
    cE('state-border', {
      border: 'var(--border)',
      borderColor: '#0000',
      zIndex: 1
    }),
    cE('icon', `
      margin: var(--icon-margin);
      margin-left: 0;
      height: var(--icon-size);
      width: var(--icon-size);
      max-width: var(--icon-size);
      font-size: var(--icon-size);
      position: relative;
      flex-shrink: 0;
    `, [
      cB('icon-slot', `
        height: var(--icon-size);
        width: var(--icon-size);
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
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
    `, [
      c('~', [
        cE('icon', {
          margin: 'var(--icon-margin)',
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
      opacity: 'var(--opacity-disabled)'
    })
  ]),
  c('@keyframes button-wave-spread', {
    from: {
      boxShadow: '0 0 0.5px 0 var(--ripple-color)'
    },
    to: {
      // don't use exact 5px since chrome will display the animation with glitches
      boxShadow: '0 0 0.5px 4.5px var(--ripple-color)'
    }
  }),
  c('@keyframes button-wave-opacity', {
    from: {
      opacity: 'var(--wave-opacity)'
    },
    to: {
      opacity: 0
    }
  })
])
