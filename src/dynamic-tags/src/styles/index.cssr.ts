import { cB } from '../../../_utils/cssr'

// vars:
// --input-width
export default cB('dynamic-tags', [
  cB('input', {
    minWidth: 'var(--n-input-width)'
  }),
  cB('dynamic-tag-move', `
    user-select: none;
  `, [
    cB('tag', `
      cursor: move;
      transition: unset;
    `)
  ])
])
