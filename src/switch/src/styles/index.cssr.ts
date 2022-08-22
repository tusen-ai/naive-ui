import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr'
import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-button-border-radius
// --n-button-box-shadow
// --n-button-color
// --n-button-width
// --n-button-width-pressed
// --n-height
// --n-offset
// --n-rail-border-radius
// --n-rail-color
// --n-rail-color-active
// --n-rail-height
// --n-rail-width
// --n-width
// --n-box-shadow-focus
// --n-loading-color
// --n-text-color
// --n-icon-color
export default cB('switch', `
  height: var(--n-height);
  min-width: var(--n-width);
  vertical-align: middle;
  user-select: none;
  -webkit-user-select: none;
  display: inline-flex;
  outline: none;
  justify-content: center;
  align-items: center;
`, [
  cE('children-placeholder', `
    height: var(--n-rail-height);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
  `),
  cE('rail-placeholder', `
    display: flex;
    flex-wrap: none;
  `),
  cE('button-placeholder', `
    width: calc(1.75 * var(--n-rail-height));
    height: var(--n-rail-height);
  `),
  cB('base-loading', `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: calc(var(--n-button-width) - 4px);
    color: var(--n-loading-color);
    transition: color .3s var(--n-bezier);
  `, [
    iconSwitchTransition({
      left: '50%',
      top: '50%',
      originalTransform: 'translateX(-50%) translateY(-50%)'
    })
  ]),
  cE('checked, unchecked', `
    transition: color .3s var(--n-bezier);
    color: var(--n-text-color);
    box-sizing: border-box;
    position: absolute;
    white-space: nowrap;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    line-height: 1;
  `),
  cE('checked', `
    right: 0;
    padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
  `),
  cE('unchecked', `
    left: 0;
    justify-content: flex-end;
    padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
  `),
  c('&:focus', [
    cE('rail', `
      box-shadow: var(--n-box-shadow-focus);
    `)
  ]),
  cM('round', [
    cE('rail', 'border-radius: calc(var(--n-rail-height) / 2);', [
      cE('button', 'border-radius: calc(var(--n-button-height) / 2);')
    ])
  ]),
  cNotM('disabled', [
    cNotM('icon', [
      cM('rubber-band', [
        cM('pressed', [
          cE('rail', [
            cE('button', 'max-width: var(--n-button-width-pressed);')
          ])
        ]),
        cE('rail', [
          c('&:active', [
            cE('button', 'max-width: var(--n-button-width-pressed);')
          ])
        ]),
        cM('active', [
          cM('pressed', [
            cE('rail', [
              cE('button', 'left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));')
            ])
          ]),
          cE('rail', [
            c('&:active', [
              cE('button', 'left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));')
            ])
          ])
        ])
      ])
    ])
  ]),
  cM('active', [
    cE('rail', [
      cE('button', 'left: calc(100% - var(--n-button-width) - var(--n-offset))')
    ])
  ]),
  cE('rail', `
    overflow: hidden;
    height: var(--n-rail-height);
    min-width: var(--n-rail-width);
    border-radius: var(--n-rail-border-radius);
    cursor: pointer;
    position: relative;
    transition:
      opacity .3s var(--n-bezier),
      background .3s var(--n-bezier),
      box-shadow .3s var(--n-bezier);
    background-color: var(--n-rail-color);
  `, [
    cE('button-icon', `
      color: var(--n-icon-color);
      transition: color .3s var(--n-bezier);
      font-size: calc(var(--n-button-height) - 4px);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
    `, [
      iconSwitchTransition()
    ]),
    cE('button', `
      align-items: center;    
      top: var(--n-offset);
      left: var(--n-offset);
      height: var(--n-button-height);
      width: var(--n-button-width-pressed);
      max-width: var(--n-button-width);
      border-radius: var(--n-button-border-radius);
      background-color: var(--n-button-color);
      box-shadow: var(--n-button-box-shadow);
      box-sizing: border-box;
      cursor: inherit;
      content: "";
      position: absolute;
      transition:
        background-color .3s var(--n-bezier),
        left .3s var(--n-bezier),
        opacity .3s var(--n-bezier),
        max-width .3s var(--n-bezier),
        box-shadow .3s var(--n-bezier);
    `)
  ]),
  cM('active', [
    cE('rail', 'background-color: var(--n-rail-color-active);')
  ]),
  cM('loading', [
    cE('rail', `
      cursor: wait;
    `)
  ]),
  cM('disabled', [
    cE('rail', `
      cursor: not-allowed;
      opacity: .5;
    `)
  ])
])
