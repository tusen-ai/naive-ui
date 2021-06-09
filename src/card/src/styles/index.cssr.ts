import { asModal, c, cB, cE, cM, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --bezier
// --border-radius
// --color
// --color-modal
// --color-popover
// --text-color
// --line-height
// --padding-top
// --padding-bottom
// --padding-left
// --font-size
// --action-color
// --title-font-weight
// --title-font-size
// --title-text-color
// --close-color
// --close-color-hover
// --close-color-pressed
// --border-color
// --close-size
// --box-shadow
export default c([
  cB('card', `
    font-size: var(--font-size);
    line-height: var(--line-height);
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    border-radius: var(--border-radius);
    background-color: var(--color);
    color: var(--text-color);
    transition: 
      color .3s var(--bezier),
      background-color .3s var(--bezier),
      box-shadow .3s var(--bezier),
      border-color .3s var(--bezier);
  `, [
    cM('hoverable', [
      c('&:hover', 'box-shadow: var(--box-shadow);')
    ]),
    cM('content-segmented', [
      c('>', [
        cE('content', {
          paddingTop: 'var(--padding-bottom)'
        })
      ])
    ]),
    cM('content-soft-segmented', [
      c('>', [
        cE('content', `
          margin: 0 var(--padding-left);
          padding: var(--padding-bottom) 0;
        `)
      ])
    ]),
    cM('footer-segmented', [
      c('>', [
        cE('footer', {
          paddingTop: 'var(--padding-bottom)'
        })
      ])
    ]),
    cM('footer-soft-segmented', [
      c('>', [
        cE('footer', `
          padding: var(--padding-bottom) 0;
          margin: 0 var(--padding-left);
        `)
      ])
    ]),
    c('>', [
      cB('card-header', `
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding:
          var(--padding-top)
          var(--padding-left)
          var(--padding-bottom)
          var(--padding-left);
      `, [
        cE('main', `
          font-size: var(--title-font-size);
          font-weight: var(--title-font-weight);
          transition: color .3s var(--bezier);
          flex: 1;
          color: var(--title-text-color);
        `),
        cE('extra', `
          display: flex;
          align-items: center;
          font-size: var(--font-size);
          font-weight: 400;
          transition: color .3s var(--bezier);
          color: var(--text-color);
        `),
        cE('close', `
          font-size: var(--close-size);
          transition: color .3s var(--bezier);
        `)
      ]),
      cE('action', `
        box-sizing: border-box;
        transition:
          background-color .3s var(--bezier),
          border-color .3s var(--bezier);
        background-clip: padding-box;
        background-color: var(--action-color);
      `),
      cE('content', 'flex: 1;'),
      cE('content, footer', `
        box-sizing: border-box;
        padding: 0 var(--padding-left) var(--padding-bottom) var(--padding-left);
        font-size: var(--font-size);
      `, [
        c('&:first-child', {
          paddingTop: 'var(--padding-bottom)'
        })
      ]),
      cE('action', `
        background-color: var(--action-color);
        padding: var(--padding-bottom) var(--padding-left);
      `)
    ]),
    cB('card-cover', `
      overflow: hidden;
      width: 100%;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
    `, [
      c('img', `
        display: block;
        width: 100%;
      `)
    ]),
    cM('bordered', `
      border: 1px solid var(--border-color);
    `, [
      c('&:target', 'border-color: var(--color-target);')
    ]),
    cM('action-segmented', [
      c('>', [
        cE('action', [
          c('&:not(:first-child)', {
            borderTop: '1px solid var(--border-color)'
          })
        ])
      ])
    ]),
    cM('content-segmented, content-soft-segmented', [
      c('>', [
        cE('content', {
          transition: 'border-color 0.3s var(--bezier)'
        }, [
          c('&:not(:first-child)', {
            borderTop: '1px solid var(--border-color)'
          })
        ])
      ])
    ]),
    cM('footer-segmented, footer-soft-segmented', [
      c('>', [
        cE('footer', {
          transition: 'border-color 0.3s var(--bezier)'
        }, [
          c('&:not(:first-child)', {
            borderTop: '1px solid var(--border-color)'
          })
        ])
      ])
    ])
  ]),
  insideModal(cB('card', {
    background: 'var(--color-modal)'
  })),
  insidePopover(cB('card', {
    background: 'var(--color-popover)'
  })),
  cB('card', [
    asModal({
      background: 'var(--color-modal)'
    })
  ])
])
