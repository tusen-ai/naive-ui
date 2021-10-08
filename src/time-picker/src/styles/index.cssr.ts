import { c, cE, cM, cB, cNotM } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up.cssr'

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
// --item-border-radius
export default c([
  cB('time-picker', `
    z-index: auto;
    position: relative;
  `, [
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
    transition:
      box-shadow .3s var(--bezier),
      background-color .3s var(--bezier);
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
      height: calc(var(--item-height) * 6);
      display: flex;
      position: relative;
      transition: border-color .3s var(--bezier);
      border-bottom: 1px solid var(--panel-divider-color);
    `),
    cB('time-picker-col', `
      flex-grow: 1;
      min-width: var(--item-width);
      height: calc(var(--item-height) * 6);
      flex-direction: column;
      transition: box-shadow .3s var(--bezier);
    `, [
      cM('transition-disabled', [
        cE('item', 'transition: none;', [
          c('&::before', 'transition: none;')
        ])
      ]),
      cE('padding', {
        height: 'calc(var(--item-height) * 5)'
      }),
      c('&:first-child', 'min-width: calc(var(--item-width) + 4px);', [
        cE('item', [
          c('&::before', 'left: 4px;')
        ])
      ]),
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
        background: #0000;
        text-decoration-color: #0000;
        color: var(--item-text-color);
        z-index: 0;
        box-sizing: border-box;
        padding-top: 4px;
        position: relative;
      `, [
        c('&::before', `
          content: "";
          transition: background-color .3s var(--bezier);
          z-index: -1;
          position: absolute;
          left: 0;
          right: 4px;
          top: 4px;
          bottom: 0;
          border-radius: var(--item-border-radius);
        `),
        cNotM('disabled', [
          c('&:hover::before', {
            backgroundColor: 'var(--item-color-hover)'
          })
        ]),
        cM('active', `
          color: var(--item-text-color-active);
        `, [
          c('&::before', `
            background-color: var(--item-color-hover);
          `)
        ]),
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
