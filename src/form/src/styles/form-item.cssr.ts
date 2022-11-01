import { cB, cE, cM, c } from '../../../_utils/cssr'
import { fadeDownTransition } from '../../../_styles/transitions/fade-down.cssr'

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
export default cB('form-item', `
  display: grid;
  line-height: var(--n-line-height);
`, [
  cB('form-item-label', `
    grid-area: label;
    align-items: center;
    line-height: 1.25;
    text-align: var(--n-label-text-align);
    font-size: var(--n-label-font-size);
    min-height: var(--n-label-height);
    padding: var(--n-label-padding);
    color: var(--n-label-text-color);
    transition: color .3s var(--n-bezier);
    box-sizing: border-box;
  `, [
    cE('asterisk', `
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      color: var(--n-asterisk-color);
      transition: color .3s var(--n-bezier);
    `),
    cE('asterisk-placeholder', `
      grid-area: mark;
      user-select: none;
      -webkit-user-select: none;
      visibility: hidden;      
    `)
  ]),
  cB('form-item-blank', `
    grid-area: blank;
    min-height: var(--n-blank-height);
  `),
  cM('auto-label-width', [
    cB('form-item-label', 'white-space: nowrap;')
  ]),
  cM('left-labelled', `
    grid-template-areas:
      "label blank"
      "label feedback";
    grid-template-columns: auto minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    align-items: start;
  `, [
    cB('form-item-label', `
      display: grid;
      grid-template-columns: 1fr auto;
      min-height: var(--n-blank-height);
      height: auto;
      box-sizing: border-box;
      flex-shrink: 0;
      flex-grow: 0;
    `, [
      cM('reverse-columns-space', `
        grid-template-columns: auto 1fr;
      `),
      cM('left-mark', `
        grid-template-areas:
          "mark text"
          ".    text";
      `),
      cM('right-mark', `
        grid-template-areas: 
          "text mark"
          "text .";
      `),
      cM('right-hanging-mark', `
        grid-template-areas: 
          "text mark"
          "text .";
      `),
      cE('text', `
        grid-area: text;      
      `),
      cE('asterisk', `
        grid-area: mark;      
        align-self: end;
      `)
    ])
  ]),
  cM('top-labelled', `
    grid-template-areas:
      "label"
      "blank"
      "feedback";
    grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
    grid-template-columns: minmax(0, 100%);
  `, [
    cM('no-label', `
      grid-template-areas:
        "blank"
        "feedback";
        grid-template-rows: 1fr;
    `),
    cB('form-item-label', `
      display: flex;
      align-items: flex-start;
      justify-content: var(--n-label-text-align);
    `)
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
    line-height: 1.25;
    transform-origin: top left;
  `, [
    c('&:not(:empty)', `
      padding: var(--n-feedback-padding);
    `),
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
      fadeDownTransition({
        fromOffset: '-3px',
        enterDuration: '.3s',
        leaveDuration: '.2s'
      })
    ])
  ])
])
