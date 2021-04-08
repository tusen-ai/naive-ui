import { c, cB } from '../../../_utils/cssr'

// vars:
// --color
// --color-end
// --bezier
export default c([
  cB('skeleton', `
    height: 1em;
    width: 100%;
    transition: background-color .3s var(--bezier);
    transition:
      --color-start .3s var(--bezier),
      --color-end .3s var(--bezier),
      background-color .3s var(--bezier);
    animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
    background-color: var(--color-start);
  `),
  c('@keyframes skeleton-loading', `
    0% {
      background: var(--color-start);
    }
    40% {
      background: var(--color-end);
    }
    80% {
      background: var(--color-start);
    }
    100% {
      background: var(--color-start);
    }
  `)
])
