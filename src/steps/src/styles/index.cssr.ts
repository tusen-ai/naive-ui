import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'

// vars:
// --n-bezier
// --n-description-text-color
// --n-header-text-color
// --n-indicator-border-color
// --n-indicator-color
// --n-indicator-icon-size
// --n-indicator-index-font-size
// --n-indicator-size
// --n-indicator-text-color
// --n-splitor-color
// --n-step-header-font-size
// --n-step-header-font-weight
export default cB('steps', `
  width: 100%;
  display: flex;
`, [
  cB('step', `
    position: relative;
    display: flex;
    flex: 1;
  `, [
    cM('disabled', 'cursor: not-allowed'),
    cM('clickable', `
      cursor: pointer;
    `),
    c('&:last-child', [
      cB('step-splitor', 'display: none;')
    ])
  ]),
  cB('step-splitor', `
    background-color: var(--n-splitor-color);
    margin-top: calc(var(--n-step-header-font-size) / 2);
    height: 1px;
    flex: 1;
    align-self: flex-start;
    margin-left: 12px;
    margin-right: 12px;
    transition:
      color .3s var(--n-bezier),
      background-color .3s var(--n-bezier);
  `),
  cB('step-content', 'flex: 1;', [
    cB('step-content-header', `
      color: var(--n-header-text-color);
      margin-top: calc(var(--n-indicator-size) / 2 - var(--n-step-header-font-size) / 2);
      line-height: var(--n-step-header-font-size);
      font-size: var(--n-step-header-font-size);
      position: relative;
      display: flex;
      font-weight: var(--n-step-header-font-weight);
      margin-left: 9px;
      transition:
        color .3s var(--n-bezier),
        background-color .3s var(--n-bezier);
    `, [
      cE('title', `
        white-space: nowrap;
        flex: 0;
      `)
    ]),
    cE('description', `
      color: var(--n-description-text-color);
      margin-top: 12px;
      margin-left: 9px;
      transition:
        color .3s var(--n-bezier),
        background-color .3s var(--n-bezier);
    `)
  ]),
  cB('step-indicator', `
    background-color: var(--n-indicator-color);
    box-shadow: 0 0 0 1px var(--n-indicator-border-color);
    height: var(--n-indicator-size);
    width: var(--n-indicator-size);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color .3s var(--n-bezier),
      box-shadow .3s var(--n-bezier);
  `, [
    cB('step-indicator-slot', `
      position: relative;
      width: var(--n-indicator-icon-size);
      height: var(--n-indicator-icon-size);
      font-size: var(--n-indicator-icon-size);
      line-height: var(--n-indicator-icon-size);
    `, [
      cE('index', `
        display: inline-block;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
        white-space: nowrap;
        font-size: var(--n-indicator-index-font-size);
        width: var(--n-indicator-icon-size);
        height: var(--n-indicator-icon-size);
        line-height: var(--n-indicator-icon-size);
        color: var(--n-indicator-text-color);
        transition: color .3s var(--n-bezier);
      `, [
        iconSwitchTransition()
      ]),
      cB('icon', `
        color: var(--n-indicator-text-color);
        transition: color .3s var(--n-bezier);
      `, [
        iconSwitchTransition()
      ]),
      cB('base-icon', `
        color: var(--n-indicator-text-color);
        transition: color .3s var(--n-bezier);
      `, [
        iconSwitchTransition()
      ])
    ])
  ]),
  cM('vertical', 'flex-direction: column;', [
    cNotM('show-description', [
      c('>', [
        cB('step', 'padding-bottom: 8px;')
      ])
    ]),
    c('>', [
      cB('step', 'margin-bottom: 16px;', [
        c('&:last-child', 'margin-bottom: 0;'),
        c('>', [
          cB('step-indicator', [
            c('>', [
              cB('step-splitor', `
                position: absolute;
                bottom: -8px;
                width: 1px;
                margin: 0 !important;
                left: calc(var(--n-indicator-size) / 2);
                height: calc(100% - var(--n-indicator-size));
              `)
            ])
          ]),
          cB('step-content', [
            cE('description', 'margin-top: 8px;')
          ])
        ])
      ])
    ])
  ])
])
