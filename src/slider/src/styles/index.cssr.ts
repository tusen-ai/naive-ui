import { cB, c, cM, cE, insideModal, insidePopover } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --bezier
// --dot-border
// --dot-border-active
// --dot-border-radius
// --dot-box-shadow
// --dot-color
// --dot-color-modal
// --dot-color-popover
// --dot-height
// --dot-width
// --fill-color
// --fill-color-hover
// --font-size
// --handle-box-shadow
// --handle-box-shadow-active
// --handle-box-shadow-focus
// --handle-box-shadow-hover
// --handle-color
// --handle-size
// --indicator-border-radius
// --indicator-box-shadow
// --indicator-color
// --indicator-text-color
// --rail-color
// --rail-color-hover
// --rail-height
// --rail-width-vertical
export default c([
  cB('slider', `
    display: block;
    padding: calc((var(--handle-size) - var(--rail-height)) / 2) 0;
    position: relative;
    z-index: 0;
    width: 100%;
    cursor: pointer;
    user-select: none;
  `, [
    cM('reverse', [
      cB('slider-handles', [
        cB('slider-handle', `
          transform: translate(50%, -50%);
        `)
      ]),
      cB('slider-dots', [
        cB('slider-dot', `
          transform: translateX(50%, -50%);
        `)
      ]),
      cM('vertical', [
        cB('slider-handles', [
          cB('slider-handle', `
            transform: translate(-50%, -50%);
          `)
        ]),
        cB('slider-marks', [
          cB('slider-mark', `
            transform: translateY(calc(-50% + var(--dot-height) / 2));
          `)
        ]),
        cB('slider-dots', [
          cB('slider-dot', `
            transform: translateX(-50%) translateY(0);
          `)
        ])
      ])
    ]),
    cM('vertical', `
      padding: 0 calc((var(--handle-size) - var(--rail-height)) / 2);
      width: var(--rail-width-vertical);
      height: 100%;
    `, [
      cB('slider-handles', `
        top: calc(var(--handle-size) / 2);
        right: 0;
        bottom: calc(var(--handle-size) / 2);
        left: 0;
      `, [
        cB('slider-handle', `
          top: unset;
          left: 50%;
          transform: translate(-50%, 50%);
        `)
      ]),
      cB('slider-rail', `
        height: 100%;
      `, [
        cE('fill', `
          top: unset;
          right: 0;
          bottom: unset;
          left: 0;
        `)
      ]),
      cM('with-mark', `
        width: var(--rail-width-vertical);
        margin: 0 32px 0 8px;
      `),
      cB('slider-marks', `
        top: calc(var(--handle-size) / 2);
        right: unset;
        bottom: calc(var(--handle-size) / 2);
        left: 22px;
      `, [
        cB('slider-mark', `
          transform: translateY(50%);
          white-space: nowrap;
        `)
      ]),
      cB('slider-dots', `
        top: calc(var(--handle-size) / 2);
        right: unset;
        bottom: calc(var(--handle-size) / 2);
        left: 50%;
      `, [
        cB('slider-dot', `
          transform: translateX(-50%) translateY(50%);
        `)
      ])
    ]),
    cM('disabled', `
      cursor: not-allowed;
      opacity: var(--opacity-disabled);
    `, [
      cB('slider-handle', `
        cursor: not-allowed;
      `)
    ]),
    cM('with-mark', `
      width: 100%;
      margin: 8px 0 32px 0;
    `),
    c('&:hover', [
      cB('slider-rail', {
        backgroundColor: 'var(--rail-color-hover)'
      }, [
        cE('fill', {
          backgroundColor: 'var(--fill-color-hover)'
        })
      ]),
      cB('slider-handle', {
        boxShadow: 'var(--handle-box-shadow-hover)'
      })
    ]),
    cM('active', [
      cB('slider-rail', {
        backgroundColor: 'var(--rail-color-hover)'
      }, [
        cE('fill', {
          backgroundColor: 'var(--fill-color-hover)'
        })
      ]),
      cB('slider-handle', {
        boxShadow: 'var(--handle-box-shadow-hover)'
      })
    ]),
    cB('slider-marks', `
      position: absolute;
      top: 18px;
      left: calc(var(--handle-size) / 2);
      right: calc(var(--handle-size) / 2);
    `, [
      cB('slider-mark', {
        position: 'absolute',
        transform: 'translateX(-50%)'
      })
    ]),
    cB('slider-rail', `
      width: 100%;
      position: relative;
      height: var(--rail-height);
      background-color: var(--rail-color);
      transition: background-color .3s var(--bezier);
      border-radius: calc(var(--rail-height) / 2);
    `, [
      cE('fill', `
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: calc(var(--rail-height) / 2);
        transition: background-color .3s var(--bezier);
        background-color: var(--fill-color);
      `)
    ]),
    cB('slider-handles', `
      position: absolute;
      top: 0;
      right: calc(var(--handle-size) / 2);
      bottom: 0;
      left: calc(var(--handle-size) / 2);
    `, [
      cB('slider-handle', `
        outline: none;
        height: var(--handle-size);
        width: var(--handle-size);
        border-radius: 50%;
        transition: box-shadow .2s var(--bezier), background-color .3s var(--bezier);
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        cursor: pointer;
        background-color: var(--handle-color);
        box-shadow: var(--handle-box-shadow);
      `, [
        c('&:hover', {
          boxShadow: 'var(--handle-box-shadow-hover)'
        }),
        c('&:hover:focus', {
          boxShadow: 'var(--handle-box-shadow-active)'
        }),
        c('&:focus', {
          boxShadow: 'var(--handle-box-shadow-focus)'
        })
      ])
    ]),
    cB('slider-dots', `
      position: absolute;
      top: 50%;
      left: calc(var(--handle-size) / 2);
      right: calc(var(--handle-size) / 2);
    `, [
      cM('transition-disabled', [
        cB('slider-dot', {
          transition: 'none'
        })
      ]),
      cB('slider-dot', `
        transition:
          border-color .3s var(--bezier),
          box-shadow .3s var(--bezier),
          background-color .3s var(--bezier);
        position: absolute;
        transform: translate(-50%, -50%);
        height: var(--dot-height);
        width:  var(--dot-width);
        border-radius: var(--dot-border-radius);
        overflow: hidden;
        box-sizing: border-box;
        border: var(--dot-border);
        background-color: var(--dot-color);
      `, [
        cM('active', {
          border: 'var(--dot-border-active)'
        })
      ])
    ])
  ]),
  cB('slider-handle-indicator', `
    font-size: var(--font-size);
    padding: 6px 10px;
    border-radius: var(--indicator-border-radius);
    color: var(--indicator-text-color);
    background-color: var(--indicator-color);
    box-shadow: var(--indicator-box-shadow);
  `, [
    fadeInScaleUpTransition()
  ]),
  cB('slider-handle-indicator', `
    font-size: var(--font-size);
    padding: 6px 10px;
    border-radius: var(--indicator-border-radius);
    color: var(--indicator-text-color);
    background-color: var(--indicator-color);
    box-shadow: var(--indicator-box-shadow);
  `, [
    cM('top', `
      margin-bottom: 12px;
    `),
    cM('right', `
      margin-left: 12px;
    `),
    cM('bottom', `
      margin-top: 12px;
    `),
    cM('left', `
      margin-right: 12px;
    `),
    fadeInScaleUpTransition()
  ]),
  insideModal(
    cB('slider', [
      cB('slider-dot', {
        backgroundColor: 'var(--dot-color-modal)'
      })
    ])
  ),
  insidePopover(
    cB('slider', [
      cB('slider-dot', {
        backgroundColor: 'var(--dot-color-popover)'
      })
    ])
  )
])
