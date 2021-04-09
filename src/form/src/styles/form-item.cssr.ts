import { cB, cE, cM } from '../../../_utils/cssr'
import fadeDownTranstion from '../../../_styles/transitions/fade-down.cssr'

// vars:
// --line-height
// --blank-height
// --feedback-padding
// --feedback-font-size
// --label-font-size-left
// --label-font-size-top
// --label-height
// --label-padding
// --asterisk-color
// --label-text-color
// --bezier
// --feedback-text-color
// --feedback-text-color-warning
// --feedback-text-color-error
// --label-text-align
// --label-padding
export default cB('form-item', {
  display: 'grid',
  lineHeight: 'var(--line-height)'
}, [
  cB('form-item-label', `
    grid-area: label;
    align-items: center;
    line-height: 1.25;
    text-align: var(--label-text-align);
    font-size: var(--label-font-size);
    height: var(--label-height);
    padding: var(--label-padding);
    color: var(--label-text-color);
    transition: color .3s var(--bezier);
    box-sizing: border-box;
  `, [
    cE('asterisk', `
      color: var(--asterisk-color);
      transition: color .3s var(--bezier);
    `)
  ]),
  cB('form-item-blank', {
    gridArea: 'blank',
    minHeight: 'var(--blank-height)'
  }),
  cM('left-labelled', `
    grid-template-areas:
      "label blank"
      "label feedback";
    grid-template-columns: auto 1fr;
  `, [
    cB('form-item-label', `
      height: var(--blank-height);
      line-height: var(--blank-height);
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
    grid-template-rows: var(--label-height) 1fr;
  `, [
    cM('no-label', `
      grid-template-areas:
        "blank"
        "feedback";
        grid-template-rows: 1fr;
    `),
    cB('form-item-label', {
      display: 'flex',
      alignItems: 'flex-end'
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
    min-height: var(--feedback-height);
    font-size: var(--feedback-font-size);
    padding: var(--feedback-padding);
    line-height: 1.25;
    transform-origin: top left;
  `, [
    cB('form-item-feedback', {
      transition: 'color .3s var(--bezier)',
      color: 'var(--feedback-text-color)'
    }, [
      cM('warning', {
        color: 'var(--feedback-text-color-warning)'
      }),
      cM('error', {
        color: 'var(--feedback-text-color-error)'
      }),
      fadeDownTranstion({
        fromOffset: '-3px',
        enterDuration: '.3s',
        leaveDuration: '.2s'
      })
    ])
  ])
])
