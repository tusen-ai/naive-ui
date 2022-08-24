import { c, cB, cE } from '../../../../_utils/cssr'

export default c([
  cB('multiple-input', `
    width: 100%;
    min-height: var(--n-height);
  `, [
    cE('tags', `
      display: flex;
      flex-wrap: wrap;
      cursor: pointer;
      outline: none;
      box-sizing: border-box;
      position: relative;
      display: flex;
      padding: var(--n-tags-wrapper-padding);
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      vertical-align: bottom;
      border-radius: inherit;
      z-index: 1;
      transition: color .3s var(--n-bezier), box-shadow .3s var(--n-bezier), background-color .3s var(--n-bezier);
    `),
    cE('tag-wrapper', `
      padding: var(--n-tag-padding);
    `),
    cE('inner', `
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    `)
  ])
])
