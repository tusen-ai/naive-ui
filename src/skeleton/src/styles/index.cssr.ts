import { c, cB } from '../../../_utils/cssr'

// vars:
// --n-color-start
// --n-color-end
// --n-bezier
export default c([
  cB('skeleton', `
    height: 1em;
    width: 100%;
    transition:
      --n-color-start .3s var(--n-bezier),
      --n-color-end .3s var(--n-bezier),
      background-color .3s var(--n-bezier);
    animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
    background-color: var(--n-color-start);
  `),
  c('@keyframes skeleton-loading', `
    0% {
      background: var(--n-color-start);
    }
    40% {
      background: var(--n-color-end);
    }
    80% {
      background: var(--n-color-start);
    }
    100% {
      background: var(--n-color-start);
    }
  `)
])
