import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

// --n-close-size
// --n-close-icon-size
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-icon-color
// --n-close-icon-color-hover
// --n-close-icon-color-pressed
export default cB('transfer', `
  width: 100%;
  font-size: var(--n-font-size);
  height: 300px;
  display: flex;
  flex-wrap: nowrap;
  word-break: break-word;
`, [
  cM('disabled', [
    cB('transfer-list', [
      cB('transfer-list-header', [
        cE('title', `
          color: var(--n-header-text-color-disabled);
        `),
        cE('extra', `
          color: var(--n-header-extra-text-color-disabled);
        `)
      ])
    ])
  ]),
  cB('transfer-list', `
    flex: 1;
    min-width: 0;
    height: inherit;
    display: flex;
    flex-direction: column;
    background-clip: padding-box;
    position: relative;
    transition: background-color .3s var(--n-bezier);
    background-color: var(--n-list-color);
  `, [
    cM('source', `
      border-top-left-radius: var(--n-border-radius);
      border-bottom-left-radius: var(--n-border-radius);
    `, [
      cE('border', 'border-right: 1px solid var(--n-divider-color);')
    ]),
    cM('target', `
      border-top-right-radius: var(--n-border-radius);
      border-bottom-right-radius: var(--n-border-radius);
    `, [
      cE('border', 'border-left: none;')
    ]),
    cE('border', `
      padding: 0 12px;
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
      min-height: var(--n-header-height);
      box-sizing: border-box;
      display: flex;
      padding: 12px 12px 10px 12px;
      align-items: center;
      background-clip: padding-box;
      border-radius: inherit;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      line-height: 1.5;
      transition:
        border-color .3s var(--n-bezier),
        background-color .3s var(--n-bezier);
    `, [
      c('> *:not(:first-child)', `
        margin-left: 8px;
      `),
      cE('title', `
        flex: 1;
        min-width: 0;
        line-height: 1.5;
        font-size: var(--n-header-font-size);
        font-weight: var(--n-header-font-weight);
        transition: color .3s var(--n-bezier);
        color: var(--n-header-text-color);
      `),
      cE('button', `
        position: relative;
      `),
      cE('extra', `
        transition: color .3s var(--n-bezier);
        font-size: var(--n-extra-font-size);
        margin-right: 0;
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
        padding: 4px 12px 8px 12px;
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
        `),
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
          cB('transfer-list-item', `
            padding: 0 12px;
            min-height: var(--n-item-height);
            display: flex;
            align-items: center;
            color: var(--n-item-text-color);
            position: relative;
            transition: color .3s var(--n-bezier);
          `, [
            cE('background', `
              position: absolute;
              left: 4px;
              right: 4px;
              top: 0;
              bottom: 0;
              border-radius: var(--n-border-radius);
              transition: background-color .3s var(--n-bezier);
            `),
            cE('checkbox', `
              position: relative;
              margin-right: 8px;
            `),
            cE('close', `
              opacity: 0;
              pointer-events: none;
              position: relative;
              transition:
                opacity .3s var(--n-bezier),
                background-color .3s var(--n-bezier),
                color .3s var(--n-bezier);
            `),
            cE('label', `
              position: relative;
              min-width: 0;
              flex-grow: 1;
            `),
            cM('source', 'cursor: pointer;'),
            cM('disabled', `
              cursor: not-allowed;
              color: var(--n-item-text-color-disabled);
            `),
            cNotM('disabled', [
              c('&:hover', [
                cE('background', 'background-color: var(--n-item-color-pending);'),
                cE('close', `
                  opacity: 1;
                  pointer-events: all;
                `)
              ])
            ])
          ])
        ])
      ])
    ])
  ])
])
