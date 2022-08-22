import { c, cE, cM, cB, cNotM } from '../../../_utils/cssr'
import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --n-icon-color-override
// --n-icon-color-disabled-override
// --n-bezier
// --n-border-radius
// --n-item-color-hover
// --n-item-font-size
// --n-item-height
// --n-item-opacity-disabled
// --n-item-text-color
// --n-item-text-color-active
// --n-item-width
// --n-panel-action-padding
// --n-panel-box-shadow
// --n-panel-color
// --n-panel-divider-color
// --n-item-border-radius
export default c([
  cB('time-picker', `
    z-index: auto;
    position: relative;
  `, [
    cB('time-picker-icon', `
      color: var(--n-icon-color-override);
      transition: color .3s var(--n-bezier);
    `),
    cM('disabled', [
      cB('time-picker-icon', `
        color: var(--n-icon-color-disabled-override);
      `)
    ])
  ]),
  cB('time-picker-panel', `
    transition:
      box-shadow .3s var(--n-bezier),
      background-color .3s var(--n-bezier);
    outline: none;
    font-size: var(--n-item-font-size);
    border-radius: var(--n-border-radius);
    margin: 4px 0;
    min-width: 104px;
    overflow: hidden;
    background-color: var(--n-panel-color);
    box-shadow: var(--n-panel-box-shadow);
  `, [
    fadeInScaleUpTransition(),
    cB('time-picker-actions', `
      padding: var(--n-panel-action-padding);
      align-items: center;
      display: flex;
      justify-content: space-evenly;
    `),
    cB('time-picker-cols', `
      height: calc(var(--n-item-height) * 6);
      display: flex;
      position: relative;
      transition: border-color .3s var(--n-bezier);
      border-bottom: 1px solid var(--n-panel-divider-color);
    `),
    cB('time-picker-col', `
      flex-grow: 1;
      min-width: var(--n-item-width);
      height: calc(var(--n-item-height) * 6);
      flex-direction: column;
      transition: box-shadow .3s var(--n-bezier);
    `, [
      cM('transition-disabled', [
        cE('item', 'transition: none;', [
          c('&::before', 'transition: none;')
        ])
      ]),
      cE('padding', `
        height: calc(var(--n-item-height) * 5);
      `),
      c('&:first-child', 'min-width: calc(var(--n-item-width) + 4px);', [
        cE('item', [
          c('&::before', 'left: 4px;')
        ])
      ]),
      cE('item', `
        cursor: pointer;
        height: var(--n-item-height);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 
          color .3s var(--n-bezier),
          background-color .3s var(--n-bezier),
          opacity .3s var(--n-bezier),
          text-decoration-color .3s var(--n-bezier);
        background: #0000;
        text-decoration-color: #0000;
        color: var(--n-item-text-color);
        z-index: 0;
        box-sizing: border-box;
        padding-top: 4px;
        position: relative;
      `, [
        c('&::before', `
          content: "";
          transition: background-color .3s var(--n-bezier);
          z-index: -1;
          position: absolute;
          left: 0;
          right: 4px;
          top: 4px;
          bottom: 0;
          border-radius: var(--n-item-border-radius);
        `),
        cNotM('disabled', [
          c('&:hover::before', `
            background-color: var(--n-item-color-hover);
          `)
        ]),
        cM('active', `
          color: var(--n-item-text-color-active);
        `, [
          c('&::before', `
            background-color: var(--n-item-color-hover);
          `)
        ]),
        cM('disabled', `
          opacity: var(--n-item-opacity-disabled);
          cursor: not-allowed;
        `)
      ]),
      cM('invalid', [
        cE('item', [
          cM('active', `
            text-decoration: line-through;
            text-decoration-color: var(--n-item-text-color-active);
          `)
        ])
      ])
    ])
  ])
])
