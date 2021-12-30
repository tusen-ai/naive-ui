import { cB, cE, cM } from '../../../_utils/cssr'
import fadeDownTranstion from '../../../_styles/transitions/fade-down.cssr'

// vars:
// --n-line-height
// --n-blank-height
// --n-feedback-padding
// --n-feedback-font-size
// --n-label-font-size-left
// --n-label-font-size-top
// --n-label-height
// --n-label-padding
// --n-asterisk-color
// --n-label-text-color
// --n-bezier
// --n-feedback-text-color
// --n-feedback-text-color-warning
// --n-feedback-text-color-error
// --n-label-text-align
// --n-label-padding
export default cB('form-item', {
  display: 'grid',
  lineHeight: 'var(--n-line-height)'
}, [
  cB('form-item-label', `
    grid-area: label;
    align-items: center;
    line-height: 1.25;
    text-align: var(--n-label-text-align);
    font-size: var(--n-label-font-size);
    height: var(--n-label-height);
    padding: var(--n-label-padding);
    color: var(--n-label-text-color);
    transition: color .3s var(--n-bezier);
    box-sizing: border-box;
  `, [
    cE('asterisk', `
      color: var(--n-asterisk-color);
      transition: color .3s var(--n-bezier);
    `)
  ]),
  cB('form-item-blank', {
    gridArea: 'blank',
    minHeight: 'var(--n-blank-height)'
  }),
  cM('left-labelled', `
    grid-template-areas:
      "label blank"
      "label feedback";
    grid-template-columns: auto minmax(0, 1fr);
  `, [
    cB('form-item-label', `
      height: var(--n-blank-height);
      line-height: var(--n-blank-height);
      box-sizing: border-box;
      white-space: nowrap;
      flex-shrink: 0;
      flex-grow: 0;
    `)
  ]),
  cM('top-labelled', `
    grid-template-areas:
      "label"
      "blank"
      "feedback";
    grid-template-rows: var(--n-label-height) 1fr;
    grid-template-columns: minmax(0, 100%);
  `, [
    cM('no-label', `
      grid-template-areas:
        "blank"
        "feedback";
        grid-template-rows: 1fr;
    `),
    cB('form-item-label', {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'var(--n-label-text-align)'
    })
  ]),
  cB('form-item-blank', `
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
  `),
  cB('form-item-feedback-wrapper', `
    grid-area: feedback;
    box-sizing: border-box;
    min-height: var(--n-feedback-height);
    font-size: var(--n-feedback-font-size);
    padding: var(--n-feedback-padding);
    line-height: 1.25;
    transform-origin: top left;
  `, [
    cB('form-item-feedback', {
      transition: 'color .3s var(--n-bezier)',
      color: 'var(--n-feedback-text-color)'
    }, [
      cM('warning', {
        color: 'var(--n-feedback-text-color-warning)'
      }),
      cM('error', {
        color: 'var(--n-feedback-text-color-error)'
      }),
      fadeDownTranstion({
        fromOffset: '-3px',
        enterDuration: '.3s',
        leaveDuration: '.2s'
      })
    ])
  ])
])
