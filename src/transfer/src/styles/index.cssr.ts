import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

const animation = c([
  c('@keyframes transfer-slide-in-from-left', `
    0% {
      transform: translateX(-150%);
    }
    100% {
      transform: translateX(0);
    }
  `),
  c('@keyframes transfer-slide-out-to-right', `
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(150%);
    }
  `),
  c('@keyframes transfer-slide-in-from-right', `
    0% {
      transform: translateX(150%);
    }
    100% {
      transform: translateX(0);
    }
  `),
  c('@keyframes transfer-slide-out-to-left', `
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-150%);
    }
  `),
  c('@keyframes transfer-height-collapse', `
    0% {
      max-height: var(--n-item-height);
    }
    100% {
      max-height: 0;
    }
  `),
  c('@keyframes transfer-height-expand', `
    0% {
      max-height: 0;
    }
    100% {
      max-height: var(--n-item-height);
    }
  `)
])

export default c([
  cB('transfer', `
    display: flex;
    width: var(--n-width);
    font-size: var(--n-font-size);
    height: 240px;
    display: flex;
    flex-wrap: nowrap;
  `, [
    cB('transfer-icon', `
      color: var(--n-icon-color);
      transition: color .3s var(--n-bezier);
    `),
    cM('disabled', [
      cB('transfer-icon', {
        color: 'var(--n-icon-color-disabled)'
      })
    ]),
    cB('transfer-list', `
      height: inherit;
      display: flex;
      flex-direction: column;
      background-clip: padding-box;
      width: calc(50% - 36px);
      position: relative;
      transition: background-color .3s var(--n-bezier);
      border-radius: var(--n-border-radius);
      background-color: var(--n-list-color);
    `, [
      c('&:first-child', `
        border-top-right-radius: 0!important;
        border-bottom-right-radius: 0!important;
      `),
      c('&:last-child', `
        margin-left: -1px!important;
        border-top-left-radius: 0!important;
        border-bottom-left-radius: 0!important;
      `, [
        cB('transfer-list-header', null, [
          cE('header', `
            flex: 1;
            line-height: 1;
            font-weight: var(--n-header-font-weight);
            transition: color .3s var(--n-bezier);
            color: var(--n-header-text-color);
            padding-left: 14px;
        `, [
            cM('disabled', {
              color: 'var(--n-header-text-color-disabled)'
            })
          ])
        ]),
        cB('transfer-list-item', null, [
          cE('label', `
            padding-left: 14px;
          `)
        ])
      ]),
      cE('border', `
        border: 1px solid var(--n-border-color);
        transition: border-color .3s var(--n-bezier);
        pointer-events: none;
        border-radius: inherit;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      `),
      cB('transfer-list-header', `
        height: calc(var(--n-item-height) + 4px);
        box-sizing: border-box;
        display: grid;
        grid-template-areas: "button . extra";
        grid-template-columns: auto 1fr auto;
        align-items: center;
        background-clip: padding-box;
        border-radius: inherit;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        transition:
          border-color .3s var(--n-bezier),
          background-color .3s var(--n-bezier);
      `, [
        cE('button', `
          grid-area: button;
          position: relative;
          padding: 0 9px 0 14px;
        `),
        cE('extra', `
          grid-area: extra;
          transition: color .3s var(--n-bezier);
          font-size: var(--n-extra-font-size);
          margin-right: 14px;
          white-space: nowrap;
          color: var(--n-header-extra-text-color);
        `)
      ]),
      cB('transfer-list-body', `
        flex-basis: 0;
        flex-grow: 1;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: inherit;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      `, [
        cB('transfer-filter', `
          padding: 2px 8px 8px 8px;
          box-sizing: border-box;
          transition:
            border-color .3s var(--n-bezier),
            background-color .3s var(--n-bezier);
        `),
        cB('transfer-list-flex-container', `
          flex: 1;
          position: relative;
        `, [
          cB('scrollbar', `
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            height: unset;
          `, [
            cB('scrollbar-content', {
              width: '100%'
            })
          ]),
          cB('empty', `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
          `),
          cB('transfer-list-content', `
            padding: 0;
            margin: 0;
            position: relative;
          `, [
            cM('transition-disabled', [
              cB('transfer-list-item', {
                animation: 'none !important'
              })
            ]),
            cB('transfer-list-item', `
              min-height: var(--n-item-height);
              display: grid;
              grid-template-areas: "checkbox label suffix";
              grid-template-columns: auto 1fr auto;
              align-items: center;
              color: var(--n-item-text-color);
            `, [
              cNotM('disabled', [
                c('&:hover', {
                  backgroundColor: 'var(--n-item-color-pending)'
                })
              ]),
              cE('checkbox', `
                grid-area: checkbox;
                padding: 0 9px 0 14px;
              `),
              cE('close', `
                grid-area: suffix;
                padding: 4px 14px 0 9px;
              `),
              cM('disabled', `
                cursor: not-allowed
                background-color: #0000;
                color: var(--n-item-text-color-disabled);
              `),
              cM('source', `
                cursor: pointer;
              `),
              cM('target', `
                cursor: default;
              `)
            ])
          ])
        ])
      ])
    ])
  ]),
  animation
])
