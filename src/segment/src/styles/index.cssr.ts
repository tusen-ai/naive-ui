import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

export default cB(`segment`, `
    box-sizing: border-box;
    margin: 0;
    padding: var(--n-padding);
    color: var(--n-text-color);
    font-size: var(--n-font-size);
    line-height: var(--n-line-height);
    list-style: none;
    display: inline-block;
    background-color: var(--n-color);
    border-radius: var(--n-border-radius);
    transition: all 0.3s var(--n-bezier);
`, [
  cM('block', `
    display: flex
  `, [
    c('>', [
      cB('segment-group', [
        cB('segment-item', `
          flex: 1;
          min-width: 0;
        `)
      ])
    ])
  ]),

  cM('vertical', [
    cB('segment-group', `
        flex-direction: column;`)
  ]),

  cB(`segment-group`, `
        position: relative;
        display: flex;
        align-items: stretch;
        justify-items: flex-start;
        flex-direction: row;
        width: 100%;`, [
    cB('segment-capsule', `
      border-radius: var(--n-border-radius);
      position: absolute;
      pointer-events: none;
      background-color: var(--n-segment-capsule-color);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
      transition: transform 0.3s var(--n-bezier);
    `),
    cB('segment-wrapper', `
      flex-basis: 0;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    `)
  ]),
  cB(`segment-item`, `
        position: relative;
        text-align: center;
        transition: color 0.3s var(--n-bezier);
        border-radius: var(--n-border-radius);
        padding: var(--n-segment-item-padding);
    `, [
    cNotM('disabled', `
      cursor: pointer;
    `, [
      cNotM('checked', [
        c('&:hover, &:focus', `
          background-color: var(--n-segment-item-hover);
          opacity: 1;
        `)
      ])
    ]),
    cM('disabled', `
        cursor: not-allowed;
        color: var(--n-text-color-disabled);
    `, [
      cE('label', `
        color: 'var(--n-text-color-disabled)'
      `),
    ]),
    cB('segment-item-input', `
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
    `),
    cB('segment-item-label', `
        min-height: var(--n-height);
        line-height: var(--n-height);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `)
  ])
])
