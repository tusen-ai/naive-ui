import { cB, c, cM, cE, insideModal, insidePopover } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --n-bezier
// --n-dot-border
// --n-dot-border-active
// --n-dot-border-radius
// --n-dot-box-shadow
// --n-dot-color
// --n-dot-color-modal
// --n-dot-color-popover
// --n-dot-height
// --n-dot-width
// --n-fill-color
// --n-fill-color-hover
// --n-font-size
// --n-handle-box-shadow
// --n-handle-box-shadow-active
// --n-handle-box-shadow-focus
// --n-handle-box-shadow-hover
// --n-handle-color
// --n-handle-size
// --n-indicator-border-radius
// --n-indicator-box-shadow
// --n-indicator-color
// --n-indicator-text-color
// --n-rail-color
// --n-rail-color-hover
// --n-rail-height
// --n-rail-width-vertical
// --n-mark-font-size
export default c([
  cB('slider', `
    display: block;
    padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;
    position: relative;
    z-index: 0;
    width: 100%;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  `, [
    cM('reverse', [
      cB('slider-handles', [
        cB('slider-handle-wrapper', `
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
          cB('slider-handle-wrapper', `
            transform: translate(-50%, -50%);
          `)
        ]),
        cB('slider-marks', [
          cB('slider-mark', `
            transform: translateY(calc(-50% + var(--n-dot-height) / 2));
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
      padding: 0 calc((var(--n-handle-size) - var(--n-rail-height)) / 2);
      width: var(--n-rail-width-vertical);
      height: 100%;
    `, [
      cB('slider-handles', `
        top: calc(var(--n-handle-size) / 2);
        right: 0;
        bottom: calc(var(--n-handle-size) / 2);
        left: 0;
      `, [
        cB('slider-handle-wrapper', `
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
        width: var(--n-rail-width-vertical);
        margin: 0 32px 0 8px;
      `),
      cB('slider-marks', `
        top: calc(var(--n-handle-size) / 2);
        right: unset;
        bottom: calc(var(--n-handle-size) / 2);
        left: 22px;
        font-size: var(--n-mark-font-size);
      `, [
        cB('slider-mark', `
          transform: translateY(50%);
          white-space: nowrap;
        `)
      ]),
      cB('slider-dots', `
        top: calc(var(--n-handle-size) / 2);
        right: unset;
        bottom: calc(var(--n-handle-size) / 2);
        left: 50%;
      `, [
        cB('slider-dot', `
          transform: translateX(-50%) translateY(50%);
        `)
      ])
    ]),
    cM('disabled', `
      cursor: not-allowed;
      opacity: var(--n-opacity-disabled);
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
        backgroundColor: 'var(--n-rail-color-hover)'
      }, [
        cE('fill', {
          backgroundColor: 'var(--n-fill-color-hover)'
        })
      ]),
      cB('slider-handle', {
        boxShadow: 'var(--n-handle-box-shadow-hover)'
      })
    ]),
    cM('active', [
      cB('slider-rail', {
        backgroundColor: 'var(--n-rail-color-hover)'
      }, [
        cE('fill', {
          backgroundColor: 'var(--n-fill-color-hover)'
        })
      ]),
      cB('slider-handle', {
        boxShadow: 'var(--n-handle-box-shadow-hover)'
      })
    ]),
    cB('slider-marks', `
      position: absolute;
      top: 18px;
      left: calc(var(--n-handle-size) / 2);
      right: calc(var(--n-handle-size) / 2);
    `, [
      cB('slider-mark', `
        position: absolute;
        transform: translateX(-50%);
        white-space: nowrap;
      `)
    ]),
    cB('slider-rail', `
      width: 100%;
      position: relative;
      height: var(--n-rail-height);
      background-color: var(--n-rail-color);
      transition: background-color .3s var(--n-bezier);
      border-radius: calc(var(--n-rail-height) / 2);
    `, [
      cE('fill', `
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: calc(var(--n-rail-height) / 2);
        transition: background-color .3s var(--n-bezier);
        background-color: var(--n-fill-color);
      `)
    ]),
    cB('slider-handles', `
      position: absolute;
      top: 0;
      right: calc(var(--n-handle-size) / 2);
      bottom: 0;
      left: calc(var(--n-handle-size) / 2);
    `, [
      cB('slider-handle-wrapper', `
        outline: none;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        display: flex;
      `, [
        cB('slider-handle', `
          height: var(--n-handle-size);
          width: var(--n-handle-size);
          border-radius: 50%;
          overflow: hidden;
          transition: box-shadow .2s var(--n-bezier), background-color .3s var(--n-bezier);
          background-color: var(--n-handle-color);
          box-shadow: var(--n-handle-box-shadow);
        `, [
          c('&:hover', `
            box-shadow: var(--n-handle-box-shadow-hover);
          `)
        ]),
        c('&:focus', [
          cB('slider-handle', `
            box-shadow: var(--n-handle-box-shadow-focus);
          `, [
            c('&:hover', `
              box-shadow: var(--n-handle-box-shadow-active);
            `)
          ])
        ])
      ])
    ]),
    cB('slider-dots', `
      position: absolute;
      top: 50%;
      left: calc(var(--n-handle-size) / 2);
      right: calc(var(--n-handle-size) / 2);
    `, [
      cM('transition-disabled', [
        cB('slider-dot', 'transition: none;')
      ]),
      cB('slider-dot', `
        transition:
          border-color .3s var(--n-bezier),
          box-shadow .3s var(--n-bezier),
          background-color .3s var(--n-bezier);
        position: absolute;
        transform: translate(-50%, -50%);
        height: var(--n-dot-height);
        width:  var(--n-dot-width);
        border-radius: var(--n-dot-border-radius);
        overflow: hidden;
        box-sizing: border-box;
        border: var(--n-dot-border);
        background-color: var(--n-dot-color);
      `, [
        cM('active', 'border: var(--n-dot-border-active);')
      ])
    ])
  ]),
  cB('slider-handle-indicator', `
    font-size: var(--n-font-size);
    padding: 6px 10px;
    border-radius: var(--n-indicator-border-radius);
    color: var(--n-indicator-text-color);
    background-color: var(--n-indicator-color);
    box-shadow: var(--n-indicator-box-shadow);
  `, [
    fadeInScaleUpTransition()
  ]),
  cB('slider-handle-indicator', `
    font-size: var(--n-font-size);
    padding: 6px 10px;
    border-radius: var(--n-indicator-border-radius);
    color: var(--n-indicator-text-color);
    background-color: var(--n-indicator-color);
    box-shadow: var(--n-indicator-box-shadow);
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
      cB('slider-dot', 'background-color: var(--n-dot-color-modal);')
    ])
  ),
  insidePopover(
    cB('slider', [
      cB('slider-dot', 'background-color: var(--n-dot-color-popover);')
    ])
  )
])
