import { c, cB, cE, cM } from '../../../_utils/cssr'

const lineHeight = 1.25

// vars:
// --bezier
// --circle-border
// --content-font-size
// --content-text-color
// --line-color
// --meta-text-color
// --title-font-size
// --title-font-weight
// --title-margin
// --title-text-color
// --icon-size
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
    cB('timeline-item', `
      flex-shrink: 0;
      padding-right: 40px;
    `, [
      cB('timeline-item-content', `
        margin-top: calc(var(--icon-size) + 12px);
      `, [
        cE('meta', `
          margin-top: 6px;
          margin-bottom: unset;
        `)
      ]),
      cB('timeline-item-timeline', `
        width: 100%;
        height: calc(var(--icon-size) + 12px);
      `, [
        cE('line', `
          left: var(--icon-size);
          top: calc(var(--icon-size) / 2 - 1px);
          right: 0px;
          width: unset;
          height: 2px;
        `)
      ])
    ])
  ]),
  cM('right-placement', [
    cB('timeline-item', [
      cB('timeline-item-content', `
        text-align: right;
        margin-right: calc(var(--icon-size) + 12px);
      `),
      cB('timeline-item-timeline', `
        width: var(--icon-size);
        right: 0;
      `)
    ])
  ]),
  cM('left-placement', [
    cB('timeline-item', [
      cB('timeline-item-content', `
        margin-left: calc(var(--icon-size) + 12px);
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
        margin: var(--title-margin);
        font-size: var(--title-font-size);
        transition: color .3s var(--bezier);
        font-weight: var(--title-font-weight);
        margin-bottom: 6px;
        color: var(--title-text-color);
      `),
      cE('content', `
        transition: color .3s var(--bezier);
        font-size: var(--content-font-size);
        color: var(--content-text-color);
      `),
      cE('meta', `
        transition: color .3s var(--bezier);
        font-size: 12px;
        margin-top: 6px;
        margin-bottom: 20px;
        color: var(--meta-text-color);
      `)
    ]),
    cB('timeline-item-timeline', `
      width: calc(var(--icon-size) + 12px);
      position: absolute;
      top: calc(var(--title-font-size) * ${lineHeight} / 2 - var(--icon-size) / 2);
      height: 100%;
    `, [
      cE('circle', `
        border: var(--circle-border);
        transition:
          background-color .3s var(--bezier),
          border-color .3s var(--bezier);
        width: var(--icon-size);
        height: var(--icon-size);
        border-radius: var(--icon-size);
        box-sizing: border-box;
      `),
      cE('icon', `
        color: var(--icon-color);
        font-size: var(--icon-size);
        height: var(--icon-size);
        width: var(--icon-size);
        display: flex;
        align-items: center;
        justify-content: center;
      `),
      cE('line', `
        transition: background-color .3s var(--bezier);
        position: absolute;
        top: var(--icon-size);
        left: calc(var(--icon-size) / 2 - 1px);
        bottom: 0px;
        width: 2px;
        background-color: var(--line-color);
      `)
    ])
  ])
])
