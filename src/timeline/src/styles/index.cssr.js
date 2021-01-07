import { c, cB, cE, cM } from '../../../_utils/cssr'

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
export default cB('timeline', `
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  line-height: 1.25;
`, [
  cM('right-placement', [
    cB('timeline-item', [
      cB('timeline-item-content', `
        text-align: right;
        margin-right: 26px;
      `),
      cB('timeline-item-timeline', `
        width: 14px;
        right: 0;
      `)
    ])
  ]),
  cM('left-placement', [
    cB('timeline-item', [
      cB('timeline-item-content', `
        margin-left: 26px;
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
      width: 26px;
      position: absolute;
      top: 2px;
      bottom: 0;
      height: 100%;
    `, [
      cE('circle', `
        border: var(--circle-border);
        transition:
          background-color .3s var(--bezier),
          border-color .3s var(--bezier);
        width: 14px;
        height: 14px;
        border-radius: 7px;
        box-sizing: border-box;
      `),
      cE('line', `
        transition: background-color .3s var(--bezier);
        position: absolute;
        top: 14px;
        left: 6px;
        bottom: 0px;
        width: 2px;
        background-color: var(--line-color);
      `)
    ])
  ])
])
