import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import { fadeInTransition } from '../../../_styles/transitions/fade-in.cssr'

const animation = c([
  c('@keyframes legacy-transfer-slide-in-from-left', `
    0% {
      transform: translateX(-150%);
    }
    100% {
      transform: translateX(0);
    }
  `),
  c('@keyframes legacy-transfer-slide-out-to-right', `
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(150%);
    }
  `),
  c('@keyframes legacy-transfer-slide-in-from-right', `
    0% {
      transform: translateX(150%);
    }
    100% {
      transform: translateX(0);
    }
  `),
  c('@keyframes legacy-transfer-slide-out-to-left', `
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-150%);
    }
  `),
  c('@keyframes legacy-transfer-height-collapse', `
    0% {
      max-height: var(--n-item-height);
    }
    100% {
      max-height: 0;
    }
  `),
  c('@keyframes legacy-transfer-height-expand', `
    0% {
      max-height: 0;
    }
    100% {
      max-height: var(--n-item-height);
    }
  `)
])

export default c([
  cB('legacy-transfer', `
    display: flex;
    width: var(--n-width);
    font-size: var(--n-font-size);
    height: 240px;
    display: flex;
    flex-wrap: nowrap;
  `, [
    cB('legacy-transfer-icon', `
      color: var(--n-icon-color);
      transition: color .3s var(--n-bezier);
    `),
    cM('disabled', [
      cB('legacy-transfer-icon', {
        color: 'var(--n-icon-color-disabled)'
      })
    ]),
    cB('legacy-transfer-list', `
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
      cB('legacy-transfer-list-header', `
        height: calc(var(--n-item-height) + 4px);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-clip: padding-box;
        border-radius: inherit;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        background-color: var(--n-header-color);
        transition:
          border-color .3s var(--n-bezier),
          background-color .3s var(--n-bezier);
      `, [
        cE('checkbox', `
          display: flex;
          align-items: center;
          position: relative;
          padding: 0 9px 0 14px;
        `),
        cE('header', `
          flex: 1;
          line-height: 1;
          font-weight: var(--n-header-font-weight);
          transition: color .3s var(--n-bezier);
          color: var(--n-header-text-color);
        `, [
          cM('disabled', {
            color: 'var(--n-header-text-color-disabled)'
          })
        ]),
        cE('extra', `
          transition: color .3s var(--n-bezier);
          font-size: var(--n-extra-font-size);
          justify-self: flex-end;
          margin-right: 14px;
          white-space: nowrap;
          color: var(--n-header-extra-text-color);
        `)
      ]),
      cB('legacy-transfer-list-body', `
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
        cB('legacy-transfer-filter', `
          padding: 0 8px 8px 8px;
          box-sizing: border-box;
          background-color: var(--n-header-color);
          transition:
            border-color .3s var(--n-bezier),
            background-color .3s var(--n-bezier);
          border-bottom: 1px solid var(--n-filter-divider-color);
        `),
        cB('legacy-transfer-list-flex-container', `
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
          `, [
            fadeInTransition()
          ]),
          cB('legacy-transfer-list-content', `
            padding: 0;
            margin: 0;
            position: relative;
          `, [
            cM('transition-disabled', [
              cB('legacy-transfer-list-item', {
                animation: 'none !important'
              })
            ]),
            cB('legacy-transfer-list-item', `
              height: var(--n-item-height);
              max-height: var(--n-item-height);
                transition:
                  background-color .3s var(--n-bezier),
                  color .3s var(--n-bezier);
              position: relative;
              cursor: pointer;
              display: flex;
              align-items: center;
              color: var(--n-item-text-color);
            `, [
              cNotM('disabled', [
                c('&:hover', {
                  backgroundColor: 'var(--n-item-color-pending)'
                })
              ]),
              cE('extra', `
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                padding-right: 4px;
              `),
              cE('checkbox', `
                display: flex;
                align-items: center;
                position: relative;
                padding: 0 9px 0 14px;
              `),
              cM('disabled', `
                cursor: not-allowed
                background-color: #0000;
                color: var(--n-item-text-color-disabled);
              `),
              cM('source', {
                animationFillMode: 'forwards'
              }, [
                c('&.item-enter-active', `
                  transform: translateX(150%);
                  animation-duration: .25s, .25s;
                  animation-timing-function: var(--n-bezier), var(--n-bezier-ease-out);
                  animation-delay: 0s, .25s;
                  animation-name: legacy-transfer-height-expand, legacy-transfer-slide-in-from-right;
                `),
                c('&.item-leave-active', `
                  transform: translateX(-150%);
                  animation-duration: .25s, .25s;
                  animation-timing-function: var(--n-bezier), var(--n-bezier-ease-in);
                  animation-delay: .25s, 0s;
                  animation-name: legacy-transfer-height-collapse, legacy-transfer-slide-out-to-right;
                `)
              ]),
              cM('target', {
                animationFillMode: 'forwards'
              }, [
                c('&.item-enter-active', `
                  transform: translateX(-150%);
                  animation-duration: .25s, .25s;
                  animation-timing-function: var(--n-bezier), var(--n-bezier-ease-out);
                  animation-delay: 0s, .25s;
                  animation-name: legacy-transfer-height-expand, legacy-transfer-slide-in-from-left;
                `),
                c('&.item-leave-active', `
                  transform: translateX(150%);
                  animation-duration: .25s, .25s;
                  animation-timing-function: var(--n-bezier), var(--n-bezier-ease-in);
                  animation-delay: .25s, 0s;
                  animation-name: legacy-transfer-height-collapse, legacy-transfer-slide-out-to-left;
                `)
              ])
            ])
          ])
        ])
      ])
    ]),
    cB('legacy-transfer-gap', {
      width: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }),
    cB('button', [
      c('&:first-child', {
        marginBottom: '12px'
      })
    ])
  ]),
  animation
])
