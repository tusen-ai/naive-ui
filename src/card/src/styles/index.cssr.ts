import { asModal, c, cB, cE, cM, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-border-radius
// --n-color
// --n-color-modal
// --n-color-popover
// --n-text-color
// --n-line-height
// --n-padding-top
// --n-padding-bottom
// --n-padding-left
// --n-font-size
// --n-action-color
// --n-title-font-weight
// --n-title-font-size
// --n-title-text-color
// --n-close-size
// --n-close-icon-size
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-icon-color
// --n-close-icon-color-hover
// --n-close-icon-color-pressed
// --n-border-color
// --n-box-shadow
// --n-color-embedded
// --n-color-embedded-modal
// --n-color-embedded-popover
export default c([
  cB('card', `
    font-size: var(--n-font-size);
    line-height: var(--n-line-height);
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    border-radius: var(--n-border-radius);
    background-color: var(--n-color);
    color: var(--n-text-color);
    word-break: break-word;
    transition: 
      color .3s var(--n-bezier),
      background-color .3s var(--n-bezier),
      box-shadow .3s var(--n-bezier),
      border-color .3s var(--n-bezier);
  `, [
    asModal({
      background: 'var(--n-color-modal)'
    }),
    cM('hoverable', [
      c('&:hover', 'box-shadow: var(--n-box-shadow);')
    ]),
    cM('content-segmented', [
      c('>', [
        cE('content', {
          paddingTop: 'var(--n-padding-bottom)'
        })
      ])
    ]),
    cM('content-soft-segmented', [
      c('>', [
        cE('content', `
          margin: 0 var(--n-padding-left);
          padding: var(--n-padding-bottom) 0;
        `)
      ])
    ]),
    cM('footer-segmented', [
      c('>', [
        cE('footer', {
          paddingTop: 'var(--n-padding-bottom)'
        })
      ])
    ]),
    cM('footer-soft-segmented', [
      c('>', [
        cE('footer', `
          padding: var(--n-padding-bottom) 0;
          margin: 0 var(--n-padding-left);
        `)
      ])
    ]),
    c('>', [
      cB('card-header', `
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-size: var(--n-title-font-size);
        padding:
          var(--n-padding-top)
          var(--n-padding-left)
          var(--n-padding-bottom)
          var(--n-padding-left);
      `, [
        cE('main', `
          font-weight: var(--n-title-font-weight);
          transition: color .3s var(--n-bezier);
          flex: 1;
          min-width: 0;
          color: var(--n-title-text-color);
        `),
        cE('extra', `
          display: flex;
          align-items: center;
          font-size: var(--n-font-size);
          font-weight: 400;
          transition: color .3s var(--n-bezier);
          color: var(--n-text-color);
        `),
        cE('close', `
          margin: 0 0 0 8px;
          transition:
            background-color .3s var(--n-bezier),
            color .3s var(--n-bezier);
        `)
      ]),
      cE('action', `
        box-sizing: border-box;
        transition:
          background-color .3s var(--n-bezier),
          border-color .3s var(--n-bezier);
        background-clip: padding-box;
        background-color: var(--n-action-color);
      `),
      cE('content', 'flex: 1; min-width: 0;'),
      cE('content, footer', `
        box-sizing: border-box;
        padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
        font-size: var(--n-font-size);
      `, [
        c('&:first-child', {
          paddingTop: 'var(--n-padding-bottom)'
        })
      ]),
      cE('action', `
        background-color: var(--n-action-color);
        padding: var(--n-padding-bottom) var(--n-padding-left);
        border-bottom-left-radius: var(--n-border-radius);
        border-bottom-right-radius: var(--n-border-radius);
      `)
    ]),
    cB('card-cover', `
      overflow: hidden;
      width: 100%;
      border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
    `, [
      c('img', `
        display: block;
        width: 100%;
      `)
    ]),
    cM('bordered', `
      border: 1px solid var(--n-border-color);
    `, [
      c('&:target', 'border-color: var(--n-color-target);')
    ]),
    cM('action-segmented', [
      c('>', [
        cE('action', [
          c('&:not(:first-child)', {
            borderTop: '1px solid var(--n-border-color)'
          })
        ])
      ])
    ]),
    cM('content-segmented, content-soft-segmented', [
      c('>', [
        cE('content', {
          transition: 'border-color 0.3s var(--n-bezier)'
        }, [
          c('&:not(:first-child)', {
            borderTop: '1px solid var(--n-border-color)'
          })
        ])
      ])
    ]),
    cM('footer-segmented, footer-soft-segmented', [
      c('>', [
        cE('footer', {
          transition: 'border-color 0.3s var(--n-bezier)'
        }, [
          c('&:not(:first-child)', {
            borderTop: '1px solid var(--n-border-color)'
          })
        ])
      ])
    ]),
    cM('embedded', `
      background-color: var(--n-color-embedded);
    `)
  ]),
  insideModal(cB('card', `
    background: var(--n-color-modal);
  `, [
    cM('embedded', `
      background-color: var(--n-color-embedded-modal);
    `)
  ])),
  insidePopover(cB('card', `
    background: var(--n-color-popover);
  `, [
    cM('embedded', `
      background-color: var(--n-color-embedded-popover);
    `)
  ]))
])
