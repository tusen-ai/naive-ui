import { c, cM, cB, cE, cNotM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-close-size
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-icon-size
// --n-close-icon-color
// --n-close-icon-color-hover
// --n-close-icon-color-pressed
// --n-bar-color
// --n-tab-font-size
// --n-tab-text-color
// --n-tab-text-color-active
// --n-tab-text-color-disabled
// --n-tab-text-color-hover
// --n-pane-text-color
// --n-tab-border-color
// --n-tab-border-radius
// --n-tab-color
// --n-tab-font-weight
// --n-tab-font-weight-active
// --n-tab-gap
// --n-tab-gap-vertical
// --n-tab-padding
// --n-pane-padding-left
// --n-pane-padding-right
// --n-pane-padding-top
// --n-pane-padding-bottom
// --n-color-segment
// --n-font-weight-strong
// --n-tab-color-segment
export default cB('tabs', `
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition:
    background-color .3s var(--n-bezier),
    border-color .3s var(--n-bezier);
`, [
  cM('segment-type', [
    cB('tabs-rail', [
      c('&.transition-disabled', 'color: red;', [
        cB('tabs-tab', `
          transition: none;
        `)
      ])
    ])
  ]),
  cM('top', [
    cB('tab-pane', `
      padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
    `)
  ]),
  cM('left', [
    cB('tab-pane', `
      padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
    `)
  ]),
  cM('left, right', `
    flex-direction: row;
  `, [
    cB('tabs-bar', `
      width: 2px;
      right: 0;
      transition:
        top .2s var(--n-bezier),
        max-height .2s var(--n-bezier),
        background-color .3s var(--n-bezier);
    `),
    cB('tabs-tab', `
      padding: var(--n-tab-padding-vertical); 
    `)
  ]),
  cM('right', `
    flex-direction: row-reverse;
  `, [
    cB('tab-pane', `
      padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
    `),
    cB('tabs-bar', `
      left: 0;
    `)
  ]),
  cM('bottom', `
    flex-direction: column-reverse;
    justify-content: flex-end;
  `, [
    cB('tab-pane', `
      padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
    `),
    cB('tabs-bar', `
      top: 0;
    `)
  ]),
  cB('tabs-rail', `
    padding: 3px;
    border-radius: var(--n-tab-border-radius);
    width: 100%;
    background-color: var(--n-color-segment);
    transition: background-color .3s var(--n-bezier);
    display: flex;
    align-items: center;
  `, [
    cB('tabs-capsule', `
        border-radius: var(--n-tab-border-radius);
        width: 50px;
        position: absolute;
        pointer-events: none;
        background-color: var(--n-tab-color-segment);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
        transition: 0.3s;
      `),
    cB('tabs-tab-wrapper', `
      flex-basis: 0;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    `, [
      cB('tabs-tab', `
        overflow: hidden;
        border-radius: var(--n-tab-border-radius);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `, [
        cM('active', `
          font-weight: var(--n-font-weight-strong);
          color: var(--n-tab-text-color-active);
        `),
        c('&:hover', `
          color: var(--n-tab-text-color-hover);
        `)
      ])
    ])
  ]),
  cM('flex', [
    cB('tabs-nav', {
      width: '100%'
    }, [
      cB('tabs-wrapper', {
        width: '100%'
      }, [
        cB('tabs-tab', {
          marginRight: 0
        })
      ])
    ])
  ]),
  cB('tabs-nav', `
    box-sizing: border-box;
    line-height: 1.5;
    display: flex;
    transition: border-color .3s var(--n-bezier);
  `, [
    cE('prefix, suffix', `
      display: flex;
      align-items: center;
    `),
    cE('prefix', 'padding-right: 16px;'),
    cE('suffix', 'padding-left: 16px;')
  ]),
  cM('top, bottom', [
    cB('tabs-nav-scroll-wrapper', [
      c('&::before', `
        top: 0;
        bottom: 0;
        left: 0;
        width: 20px;
      `),
      c('&::after', `
        top: 0;
        bottom: 0;
        right: 0;
        width: 20px;
      `),
      cM('shadow-start', [
        c('&::before', `
          box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
        `)
      ]),
      cM('shadow-end', [
        c('&::after', `
          box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
        `)
      ])
    ])
  ]),
  cM('left, right', [
    cB('tabs-nav-scroll-content', `
      flex-direction: column;
    `),
    cB('tabs-nav-scroll-wrapper', [
      c('&::before', `
        top: 0;
        left: 0;
        right: 0;
        height: 20px;
      `),
      c('&::after', `
        bottom: 0;
        left: 0;
        right: 0;
        height: 20px;
      `),
      cM('shadow-start', [
        c('&::before', `
          box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
        `)
      ]),
      cM('shadow-end', [
        c('&::after', `
          box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
        `)
      ])
    ])
  ]),
  cB('tabs-nav-scroll-wrapper', `
    flex: 1;
    position: relative;
    overflow: hidden;
  `, [
    cB('tabs-nav-y-scroll', `
      height: 100%;
      width: 100%;
      overflow-y: auto; 
      scrollbar-width: none;
    `, [
      c('&::-webkit-scrollbar', `
        width: 0;
        height: 0;
      `)
    ]),
    c('&::before, &::after', `
      transition: box-shadow .3s var(--n-bezier);
      pointer-events: none;
      content: "";
      position: absolute;
      z-index: 1;
    `)
  ]),
  cB('tabs-nav-scroll-content', `
    display: flex;
    position: relative;
    min-width: 100%;
    min-height: 100%;
    width: fit-content;
    box-sizing: border-box;
  `),
  cB('tabs-wrapper', `
    display: inline-flex;
    flex-wrap: nowrap;
    position: relative;
  `),
  cB('tabs-tab-wrapper', `
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    flex-grow: 0;
  `),
  cB('tabs-tab', `
    cursor: pointer;
    white-space: nowrap;
    flex-wrap: nowrap;
    display: inline-flex;
    align-items: center;
    color: var(--n-tab-text-color);
    font-size: var(--n-tab-font-size);
    background-clip: padding-box;
    padding: var(--n-tab-padding);
    transition:
      box-shadow .3s var(--n-bezier),
      color .3s var(--n-bezier),
      background-color .3s var(--n-bezier),
      border-color .3s var(--n-bezier);
  `, [
    cM('disabled', {
      cursor: 'not-allowed'
    }),
    cE('close', `
      margin-left: 6px;
      transition:
        background-color .3s var(--n-bezier),
        color .3s var(--n-bezier);
    `),
    cE('label', `
      display: flex;
      align-items: center;
      z-index: 1;
    `)
  ]),
  cB('tabs-bar', `
    position: absolute;
    bottom: 0;
    height: 2px;
    border-radius: 1px;
    background-color: var(--n-bar-color);
    transition:
      left .2s var(--n-bezier),
      max-width .2s var(--n-bezier),
      opacity .3s var(--n-bezier),
      background-color .3s var(--n-bezier);
  `, [
    c('&.transition-disabled', `
      transition: none;
    `),
    cM('disabled', `
      background-color: var(--n-tab-text-color-disabled)
    `)
  ]),
  cB('tabs-pane-wrapper', `
    position: relative;
    overflow: hidden;
    transition: max-height .2s var(--n-bezier);
  `),
  cB('tab-pane', `
    color: var(--n-pane-text-color);
    width: 100%;
    transition:
      color .3s var(--n-bezier),
      background-color .3s var(--n-bezier),
      opacity .2s var(--n-bezier);
    left: 0;
    right: 0;
    top: 0;
  `, [
    c('&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active', `
      transition:
      color .3s var(--n-bezier),
      background-color .3s var(--n-bezier),
      transform .2s var(--n-bezier),
      opacity .2s var(--n-bezier);
    `),
    c('&.next-transition-leave-active, &.prev-transition-leave-active', `
      position: absolute;
    `),
    c('&.next-transition-enter-from, &.prev-transition-leave-to', `
      transform: translateX(32px);
      opacity: 0;
    `),
    c('&.next-transition-leave-to, &.prev-transition-enter-from', `
      transform: translateX(-32px);
      opacity: 0;
    `),
    c('&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to', `
      transform: translateX(0);
      opacity: 1;
    `)
  ]),
  cB('tabs-tab-pad', `
    box-sizing: border-box;
    width: var(--n-tab-gap);
    flex-grow: 0;
    flex-shrink: 0;
  `),
  cM('line-type, bar-type', [
    cB('tabs-tab', `
      font-weight: var(--n-tab-font-weight);
      box-sizing: border-box;
      vertical-align: bottom;
    `, [
      c('&:hover', {
        color: 'var(--n-tab-text-color-hover)'
      }),
      cM('active', `
        color: var(--n-tab-text-color-active);
        font-weight: var(--n-tab-font-weight-active);
      `),
      cM('disabled', {
        color: 'var(--n-tab-text-color-disabled)'
      })
    ])
  ]),
  cB('tabs-nav', [
    cM('line-type', [
      cM('top', [
        cE('prefix, suffix', `
          border-bottom: 1px solid var(--n-tab-border-color);
        `),
        cB('tabs-nav-scroll-content', `
          border-bottom: 1px solid var(--n-tab-border-color);
        `),
        cB('tabs-bar', `
          bottom: -1px;
        `)
      ]),
      cM('left', [
        cE('prefix, suffix', `
          border-right: 1px solid var(--n-tab-border-color);
        `),
        cB('tabs-nav-scroll-content', `
          border-right: 1px solid var(--n-tab-border-color);
        `),
        cB('tabs-bar', `
          right: -1px;
        `)
      ]),
      cM('right', [
        cE('prefix, suffix', `
          border-left: 1px solid var(--n-tab-border-color);
        `),
        cB('tabs-nav-scroll-content', `
          border-left: 1px solid var(--n-tab-border-color);
        `),
        cB('tabs-bar', `
          left: -1px;
        `)
      ]),
      cM('bottom', [
        cE('prefix, suffix', `
          border-top: 1px solid var(--n-tab-border-color);
        `),
        cB('tabs-nav-scroll-content', `
          border-top: 1px solid var(--n-tab-border-color);
        `),
        cB('tabs-bar', `
          top: -1px;
        `)
      ]),
      cE('prefix, suffix', `
        transition: border-color .3s var(--n-bezier);
      `),
      cB('tabs-nav-scroll-content', `
        transition: border-color .3s var(--n-bezier);
      `),
      cB('tabs-bar', `
        border-radius: 0;
      `)
    ]),
    cM('card-type', [
      cE('prefix, suffix', `
        transition: border-color .3s var(--n-bezier);
        border-bottom: 1px solid var(--n-tab-border-color);
      `),
      cB('tabs-pad', `
        flex-grow: 1;
        transition: border-color .3s var(--n-bezier);
      `),
      cB('tabs-tab-pad', `
        transition: border-color .3s var(--n-bezier);
      `),
      cB('tabs-tab', `
        font-weight: var(--n-tab-font-weight);
        border: 1px solid var(--n-tab-border-color);
        background-color: var(--n-tab-color);
        box-sizing: border-box;
        position: relative;
        vertical-align: bottom;
        display: flex;
        justify-content: space-between;
        font-size: var(--n-tab-font-size);
        color: var(--n-tab-text-color);
      `, [
        cM('addable', `
          padding-left: 8px;
          padding-right: 8px;
          font-size: 16px;
        `, [
          cE('height-placeholder', `
            width: 0;
            font-size: var(--n-tab-font-size);
          `),
          cNotM('disabled', [
            c('&:hover', `
              color: var(--n-tab-text-color-hover);
            `)
          ])
        ]),
        cM('closable', 'padding-right: 8px;'),
        cM('active', `
          background-color: #0000;
          font-weight: var(--n-tab-font-weight-active);
          color: var(--n-tab-text-color-active);
        `),
        cM('disabled', 'color: var(--n-tab-text-color-disabled);')
      ]),
      cB('tabs-scroll-padding', 'border-bottom: 1px solid var(--n-tab-border-color);')
    ]),
    cM('left, right', [
      cB('tabs-wrapper', `
        flex-direction: column;
      `, [
        cB('tabs-tab-wrapper', `
          flex-direction: column;
        `, [
          cB('tabs-tab-pad', `
            height: var(--n-tab-gap-vertical);
            width: 100%;
          `)
        ])
      ])
    ]),
    cM('top', [
      cM('card-type', [
        cB('tabs-tab', `
          border-top-left-radius: var(--n-tab-border-radius);
          border-top-right-radius: var(--n-tab-border-radius);
        `, [
          cM('active', `
            border-bottom: 1px solid #0000;
          `)
        ]),
        cB('tabs-tab-pad', `
          border-bottom: 1px solid var(--n-tab-border-color);
        `),
        cB('tabs-pad', `
          border-bottom: 1px solid var(--n-tab-border-color);
        `)
      ])
    ]),
    cM('left', [
      cM('card-type', [
        cB('tabs-tab', `
          border-top-left-radius: var(--n-tab-border-radius);
          border-bottom-left-radius: var(--n-tab-border-radius);
        `, [
          cM('active', `
            border-right: 1px solid #0000;
          `)
        ]),
        cB('tabs-tab-pad', `
          border-right: 1px solid var(--n-tab-border-color);
        `),
        cB('tabs-pad', `
          border-right: 1px solid var(--n-tab-border-color);
        `)
      ])
    ]),
    cM('right', [
      cM('card-type', [
        cB('tabs-tab', `
          border-top-right-radius: var(--n-tab-border-radius);
          border-bottom-right-radius: var(--n-tab-border-radius);
        `, [
          cM('active', `
            border-left: 1px solid #0000;
          `)
        ]),
        cB('tabs-tab-pad', `
          border-left: 1px solid var(--n-tab-border-color);
        `),
        cB('tabs-pad', `
          border-left: 1px solid var(--n-tab-border-color);
        `)
      ])
    ]),
    cM('bottom', [
      cM('card-type', [
        cB('tabs-tab', `
          border-bottom-left-radius: var(--n-tab-border-radius);
          border-bottom-right-radius: var(--n-tab-border-radius);
        `, [
          cM('active', `
            border-top: 1px solid #0000;
          `)
        ]),
        cB('tabs-tab-pad', `
          border-top: 1px solid var(--n-tab-border-color);
        `),
        cB('tabs-pad', `
          border-top: 1px solid var(--n-tab-border-color);
        `)
      ])
    ])
  ])
])
