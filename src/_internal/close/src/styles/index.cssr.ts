import { cB, cM, c, cNotM } from '../../../../_utils/cssr'

// vars:
// --n-close-border-radius
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-icon-color
// --n-close-icon-color-hover
// --n-close-icon-color-pressed
// --n-close-icon-color-disabled
export default cB('base-close', `
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  color: var(--n-close-icon-color);
  border-radius: var(--n-close-border-radius);
  height: var(--n-close-size);
  width: var(--n-close-size);
  font-size: var(--n-close-icon-size);
  outline: none;
  border: none;
  position: relative;
  padding: 0;
`, [
  cM('absolute', `
    height: var(--n-close-icon-size);
    width: var(--n-close-icon-size);
  `),
  c('&::before', `
    content: "";
    position: absolute;
    width: var(--n-close-size);
    height: var(--n-close-size);
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    transition: inherit;
    border-radius: inherit;
  `),
  cNotM('disabled', [
    c('&:hover', `
      color: var(--n-close-icon-color-hover);
    `),
    c('&:hover::before', `
      background-color: var(--n-close-color-hover);
    `),
    c('&:focus::before', `
      background-color: var(--n-close-color-hover);
    `),
    c('&:active', `
      color: var(--n-close-icon-color-pressed);
    `),
    c('&:active::before', `
      background-color: var(--n-close-color-pressed);
    `)
  ]),
  cM('disabled', `
    cursor: not-allowed;
    color: var(--n-close-icon-color-disabled);
    background-color: transparent;
  `),
  cM('round', [
    c('&::before', `
      border-radius: 50%;
    `)
  ])
])
