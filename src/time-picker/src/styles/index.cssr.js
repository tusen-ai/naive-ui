import { c, cE, cM, cB, cNotM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

// vars:
// --icon-color
// --icon-color-disabled
// --bezier
// --border-radius
// --item-color-hover
// --item-font-size
// --item-height
// --item-opacity-disabled
// --item-text-color
// --item-text-color-active
// --item-width
// --panel-action-padding
// --panel-box-shadow
// --panel-color
// --panel-divider-color
export default c([
  cB('time-picker', [
    cB('time-picker-icon', `
      color: var(--icon-color);
      transition: color .3s var(--bezier);
    `),
    cM('disabled', [
      cB('time-picker-icon', {
        color: 'var(--icon-color-disabled)'
      })
    ])
  ]),
  cB('time-picker-panel', `
    outline: none;
    font-size: var(--item-font-size);
    border-radius: var(--border-radius);
    margin: 4px 0;
    min-width: 104px;
    overflow: hidden;
    background-color: var(--panel-color);
    box-shadow: var(--panel-box-shadow);
  `, [
    fadeInScaleUpTransition(),
    cB('time-picker-actions', `
      padding: var(--panel-action-padding);
      align-items: center;
      display: flex;
      justify-content: space-evenly;
    `),
    cB('time-picker-cols', `
      height: calc(var(--item-height) * 7);
      display: flex;
      position: relative;
      border-bottom: 1px solid var(--panel-divider-color);
    `),
    cB('time-picker-col', `
      flex-grow: 1;
      min-width: var(--item-width);
      height: calc(var(--item-height) * 7);
      flex-direction: column;
      transition: box-shadow .3s var(--bezier);
    `, [
      cM('transition-disabled', [
        cE('item', {
          transition: 'none'
        })
      ]),
      cE('padding', {
        height: 'calc(var(--item-height) * 6)'
      }),
      cE('item', `
        cursor: pointer;
        height: var(--item-height);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 
          color .3s var(--bezier),
          background-color .3s var(--bezier),
          opacity .3s var(--bezier),
          text-decoration-color .3s var(--bezier);
        background: transparent;
        text-decoration-color: transparent;
        color: var(--item-text-color);
      `, [
        cNotM('disabled', [
          c('&:hover', {
            backgroundColor: 'var(--item-color-hover)'
          })
        ]),
        cM('active', `
          background-color: var(--item-color-hover);
          color: var(--item-text-color-active);
        `),
        cM('disabled', `
          opacity: var(--item-opacity-disabled);
          cursor: not-allowed;
        `)
      ]),
      cM('invalid', [
        cE('item', [
          cM('active', `
            text-decoration: line-through;
            text-decoration-color: var(--item-text-color-active);
          `)
        ])
      ])
    ])
  ])
])
