import { c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-border-radius
// --n-border
// --n-close-color
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-margin
// --n-close-size
// --n-color
// --n-color-checkable
// --n-color-checked
// --n-color-checked-hover
// --n-color-checked-pressed
// --n-color-hover-checkable
// --n-color-pressed-checkable
// --n-font-size
// --n-height
// --n-opacity-disabled
// --n-padding
// --n-text-color
// --n-text-color-checkable
// --n-text-color-checked
// --n-text-color-hover-checkable
// --n-text-color-pressed-checkable
export default cB('tag', `
  white-space: nowrap;
  position: relative;
  box-sizing: border-box;
  cursor: default;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: var(--n-padding);
  border-radius: var(--n-border-radius);
  color: var(--n-text-color);
  background-color: var(--n-color);
  transition: 
    border-color .3s var(--n-bezier),
    background-color .3s var(--n-bezier),
    color .3s var(--n-bezier),
    box-shadow .3s var(--n-bezier),
    opacity .3s var(--n-bezier);
  line-height: 1.2;
  height: var(--n-height);
  font-size: var(--n-font-size);
`, [
  cE('border', `
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: inherit;
    border: var(--n-border);
    transition: border-color .3s var(--n-bezier);
  `),
  cE('avatar', `
    display: flex;
    margin-right: 6px;
  `),
  cE('close', `
    font-size: var(--n-close-size);
    margin: var(--n-close-margin);
    transition: color .3s var(--n-bezier);
    cursor: pointer;
  `),
  cM('round', `
    padding: 0 calc(var(--n-height) / 2);
    border-radius: calc(var(--n-height) / 2);
  `, [
    cE('avatar', `
      margin-left: calc((var(--n-height) - 8px) / -2);
    `)
  ]),
  cM('disabled', `
    cursor: not-allowed !important;
    opacity: var(--n-opacity-disabled);
  `),
  cM('checkable', `
    cursor: pointer;
    box-shadow: none;
    color: var(--n-text-color-checkable);
    background-color: var(--n-color-checkable);
  `, [
    cNotM('disabled', [
      c('&:hover', {
        backgroundColor: 'var(--n-color-hover-checkable)'
      }, [
        cNotM('checked', {
          color: 'var(--n-text-color-hover-checkable)'
        })
      ]),
      c('&:active', {
        backgroundColor: 'var(--n-color-pressed-checkable)'
      }, [
        cNotM('checked', {
          color: 'var(--n-text-color-pressed-checkable)'
        })
      ])
    ]),
    cM('checked', {
      color: 'var(--n-text-color-checked)',
      backgroundColor: 'var(--n-color-checked)'
    }, [
      cNotM('disabled', [
        c('&:hover', {
          backgroundColor: 'var(--n-color-checked-hover)'
        }),
        c('&:active', {
          backgroundColor: 'var(--n-color-checked-pressed)'
        })
      ])
    ])
  ])
])
