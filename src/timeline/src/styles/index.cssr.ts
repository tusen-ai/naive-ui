import { c, cB, cE, cM } from '../../../_utils/cssr'

const lineHeight = 1.25

// vars:
// --n-bezier
// --n-circle-border
// --n-content-font-size
// --n-content-text-color
// --n-line-color
// --n-meta-text-color
// --n-title-font-size
// --n-title-font-weight
// --n-title-margin
// --n-title-text-color
// --n-icon-size
export default cB('timeline', `
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  line-height: ${lineHeight};
`, [
  cM('horizontal', `
    flex-direction: row;
  `, [
    c('>', [
      cB('timeline-item', `
        flex-shrink: 0;
        padding-right: 40px;
      `, [
        cM('dashed-line-type', [
          c('>', [
            cB('timeline-item-timeline', [
              cE('line', `
                background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
                background-size: 10px 1px;
              `)
            ])
          ])
        ]),
        c('>', [
          cB('timeline-item-content', `
          margin-top: calc(var(--n-icon-size) + 12px);
          `, [
            c('>', [
              cE('meta', `
                margin-top: 6px;
                margin-bottom: unset;
              `)
            ])
          ]),
          cB('timeline-item-timeline', `
            width: 100%;
            height: calc(var(--n-icon-size) + 12px);
          `, [
            cE('line', `
              left: var(--n-icon-size);
              top: calc(var(--n-icon-size) / 2 - 1px);
              right: 0px;
              width: unset;
              height: 2px;
            `)
          ])
        ])
      ])
    ])
  ]),
  cM('right-placement', [
    cB('timeline-item', [
      cB('timeline-item-content', `
        text-align: right;
        margin-right: calc(var(--n-icon-size) + 12px);
      `),
      cB('timeline-item-timeline', `
        width: var(--n-icon-size);
        right: 0;
      `)
    ])
  ]),
  cM('left-placement', [
    cB('timeline-item', [
      cB('timeline-item-content', `
        margin-left: calc(var(--n-icon-size) + 12px);
      `),
      cB('timeline-item-timeline', `
        left: 0;
      `)
    ])
  ]),
  cB('timeline-item', `
    position: relative;
  `, [
    c('&:last-child', [
      cB('timeline-item-timeline', [
        cE('line', `
          display: none;
        `)
      ]),
      cB('timeline-item-content', [
        cE('meta', `
          margin-bottom: 0;
        `)
      ])
    ]),
    cB('timeline-item-content', [
      cE('title', `
        margin: var(--n-title-margin);
        font-size: var(--n-title-font-size);
        transition: color .3s var(--n-bezier);
        font-weight: var(--n-title-font-weight);
        color: var(--n-title-text-color);
      `),
      cE('content', `
        transition: color .3s var(--n-bezier);
        font-size: var(--n-content-font-size);
        color: var(--n-content-text-color);
      `),
      cE('meta', `
        transition: color .3s var(--n-bezier);
        font-size: 12px;
        margin-top: 6px;
        margin-bottom: 20px;
        color: var(--n-meta-text-color);
      `)
    ]),
    cM('dashed-line-type', [
      cB('timeline-item-timeline', [
        cE('line', `
          --n-color-start: var(--n-line-color);
          transition: --n-color-start .3s var(--n-bezier);
          background-color: transparent;
          background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
          background-size: 1px 10px;
        `)
      ])
    ]),
    cB('timeline-item-timeline', `
      width: calc(var(--n-icon-size) + 12px);
      position: absolute;
      top: calc(var(--n-title-font-size) * ${lineHeight} / 2 - var(--n-icon-size) / 2);
      height: 100%;
    `, [
      cE('circle', `
        border: var(--n-circle-border);
        transition:
          background-color .3s var(--n-bezier),
          border-color .3s var(--n-bezier);
        width: var(--n-icon-size);
        height: var(--n-icon-size);
        border-radius: var(--n-icon-size);
        box-sizing: border-box;
      `),
      cE('icon', `
        color: var(--n-icon-color);
        font-size: var(--n-icon-size);
        height: var(--n-icon-size);
        width: var(--n-icon-size);
        display: flex;
        align-items: center;
        justify-content: center;
      `),
      cE('line', `
        transition: background-color .3s var(--n-bezier);
        position: absolute;
        top: var(--n-icon-size);
        left: calc(var(--n-icon-size) / 2 - 1px);
        bottom: 0px;
        width: 2px;
        background-color: var(--n-line-color);
      `)
    ])
  ])
])
