import { c, cB, cE, cM } from '../../../_utils/cssr'
import fadeInTransition from '../../../_styles/transitions/fade-in.js'

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
      max-height: var(--item-height);
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
      max-height: var(--item-height);
    }
  `)
])

export default c([
  cB('transfer', `
    display: flex;
    width: var(--width);
    font-size: var(--font-size);
  `, [
    cM('filterable', [
      cB('transfer-list', [
        cB('transfer-list-body', {
          height: 'calc(var(--item-height) * 5.6 + 45px)'
        })
      ])
    ]),
    cB('transfer-icon', `
      color: var(--icon-color);
      transition: color .3s var(--bezier);
    `),
    cM('disabled', [
      cB('transfer-icon', {
        color: 'var(--icon-color-disabled)'
      })
    ]),
    cB('transfer-list', `
      background-clip: padding-box;
      width: calc(50% - 36px);
      position: relative;
      transition: background-color .3s var(--bezier);
      border-radius: var(--border-radius);
      background-color: var(--list-color);
    `, [
      cB('virtual-scroller', {
        height: '100%',
        scrollbarWidth: 'none',
        '-moz-scrollbar-width': 'none'
      }, [
        c('&::-webkit-scrollbar', {
          width: 0,
          height: 0
        })
      ]),
      cE('border', `
        border: 1px solid var(--border-color);
        transition: border-color .3s var(--bezier);
        pointer-events: none;
        border-radius: inherit;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      `),
      cB('transfer-list-header', `
        height: calc(var(--item-height) + 4px);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-clip: padding-box;
        border-radius: inherit;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        background-color: var(--header-color);
        transition:
          border-color .3s var(--bezier),
          background-color .3s var(--bezier);
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
          font-weight: var(--header-font-weight);
          transition: color .3s var(--bezier);
          color: var(--header-text-color);
        `, [
          cM('disabled', {
            color: 'var(--header-text-color-disabled)'
          })
        ]),
        cE('extra', `
          transition: color .3s var(--bezier);
          font-size: var(--extra-font-size);
          justify-self: flex-end;
          margin-right: 14px;
          white-space: nowrap;
          color: var(--header-extra-text-color);
        `)
      ]),
      cB('transfer-list-body', `
        height: calc(var(--item-height) * 5.6);
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: inherit;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      `, [
        cB('transfer-filter', `
          padding: 8px 8px;
          box-sizing: border-box;
          transition: border-color .3s var(--bezier);
          border-bottom: 1px solid var(--filter-divider-color);
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
          `, [
            fadeInTransition()
          ]),
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
              height: var(--item-height);
              max-height: var(--item-height);
                transition:
                  background-color .3s var(--bezier),
                  color .3s var(--bezier);
              position: relative;
              cursor: pointer;
              display: flex;
              align-items: center;
              color: var(--item-text-color);
            `, [
              c('&:hover', {
                backgroundColor: 'var(--item-color-pending)'
              }),
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
                background-color: transparent;
                color: var(--item-text-color-disabled);
              `),
              cM('source', {
                animationFillMode: 'forwards'
              }, [
                c('&.item-enter-active', `
                  transform: translateX(150%);
                  animation-duration: .25s, .25s;
                  animation-timing-function: var(--bezier), var(--bezier-ease-out);
                  animation-delay: 0s, .25s;
                  animation-name: transfer-height-expand, transfer-slide-in-from-right;
                `),
                c('&.item-leave-active', `
                  transform: translateX(-150%);
                  animation-duration: .25s, .25s;
                  animation-timing-function: var(--bezier), var(--bezier-ease-in);
                  animation-delay: .25s, 0s;
                  animation-name: transfer-height-collapse, transfer-slide-out-to-right;
                `)
              ]),
              cM('target', {
                animationFillMode: 'forwards'
              }, [
                c('&.item-enter-active', `
                  transform: translateX(-150%);
                  animation-duration: .25s, .25s;
                  animation-timing-function: var(--bezier), var(--bezier-ease-out);
                  animation-delay: 0s, .25s;
                  animation-name: transfer-height-expand, transfer-slide-in-from-left;
                `),
                c('&.item-leave-active', `
                  transform: translateX(150%);
                  animation-duration: .25s, .25s;
                  animation-timing-function: var(--bezier), var(--bezier-ease-in);
                  animation-delay: .25s, 0s;
                  animation-name: transfer-height-collapse, transfer-slide-out-to-left;
                `)
              ])
            ])
          ])
        ])
      ])
    ]),
    cB('transfer-gap', {
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
