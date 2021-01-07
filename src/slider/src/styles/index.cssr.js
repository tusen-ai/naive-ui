import { cB, c, cM, cE, insideModal } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

// vars:
// --bezier
// --dot-border
// --dot-border-active
// --dot-border-radius
// --dot-box-shadow
// --dot-color
// --dot-color-modal
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
export default c([
  cB('slider', `
    display: block;
    padding: calc((var(--handle-size) - var(--rail-height)) / 2) 0;
    position: relative;
    z-index: 0;
    width: 100%;
    cursor: pointer;
  `, [
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
    cB('slider-handle', `
      outline: none;
      height: var(--handle-size);
      width: var(--handle-size);
      border-radius: 50%;
      transition: box-shadow .2s var(--bezier), background-color .3s var(--bezier);
      position: absolute;
      top: 0;
      transform: translateX(-50%);
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
        transform: translateX(-50%) translateY(-50%);
        height: var(--dot-height);
        width:  var(--dot-width);
        border-radius: var(--dot-border-radius);
        overflow: hidden;
        box-sizing: border-box;
        border: var(--dot-border);
        background-color: var(--dot-color);
        box-shadow: var(--dot-box-shadow);
      `, [
        cM('active', {
          border: 'var(--dot-border-active)'
        })
      ])
    ])
  ]),
  cB('slider-handle-indicator', `
    font-size: var(--font-size);
    padding: 8px 12px;
    margin-bottom: 12px;
    border-radius: var(--indicator-border-radius);
    color: var(--indicator-text-color);
    background-color: var(--indicator-color);
    box-shadow: var(--indicator-box-shadow);
  `, [
    fadeInScaleUpTransition()
  ]),
  insideModal(
    cB('slider', [
      cB('slider-dot', {
        backgroundColor: 'var(--dot-color-modal)'
      })
    ])
  )
])
