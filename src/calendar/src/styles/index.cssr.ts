import { cB, cE, cM, c, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-border-color
// --n-border-color-modal
// --n-border-color-popover
// --n-border-radius
// --n-text-color
// --n-title-font-weight
// --n-title-font-size
// --n-title-text-color
// --n-day-text-color
// --n-font-size
// --n-line-height
// --n-date-color-current
// --n-cell-color
// --n-cell-color-hover
// --n-cell-color-hover-modal
// --n-cell-color-hover-popover
// --n-bar-color
export default c([
  cB('calendar', `
    line-height: var(--n-line-height);
    font-size: var(--n-font-size);
    color: var(--n-text-color);
    height: 720px;
    display: flex;
    flex-direction: column;
  `, [
    cB('calendar-prev-btn', `
      cursor: pointer;
    `),
    cB('calendar-next-btn', `
      cursor: pointer;
    `),
    cB('calendar-header', `
      display: flex;
      align-items: center;
      line-height: 1;
      font-size: var(--n-title-font-size);
      padding: 0 0 18px 0;
      justify-content: space-between;
    `, [
      cE('title', `
        color: var(--n-title-text-color);
        font-weight: var(--n-title-font-weight);
        transition: color .3s var(--n-bezier);
      `),
      cE('extra', `
        display: flex;
        align-items: center;
      `)
    ]),
    cB('calendar-dates', `
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      grid-auto-rows: 1fr;
      border-radius: var(--n-border-radius);
      flex: 1;
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: var(--n-border-color);
      transition: border-color .3s var(--n-bezier);
    `),
    cB('calendar-cell', `
      box-sizing: border-box;
      padding: 10px;
      border-right: 1px solid;
      border-bottom: 1px solid;
      border-color: var(--n-border-color);
      cursor: pointer;
      position: relative;
      transition:
        color .3s var(--n-bezier),
        border-color .3s var(--n-bezier),
        background-color .3s var(--n-bezier);
    `, [
      c('&:nth-child(7)', `
        border-top-right-radius: var(--n-border-radius);
      `),
      c('&:nth-last-child(7)', `
        border-bottom-left-radius: var(--n-border-radius);
      `),
      c('&:last-child', `
        border-bottom-right-radius: var(--n-border-radius);
      `),
      c('&:hover', `
        background-color: var(--n-cell-color-hover);
      `),
      cE('bar', `
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        height: 3px;
        background-color: #0000;
        transition: background-color .3s var(--n-bezier);
      `),
      cM('selected', [
        cE('bar', `
          background-color: var(--n-bar-color);
        `)
      ]),
      cB('calendar-date', `
        transition:
          color .3s var(--n-bezier),
          border-color .3s var(--n-bezier),
          background-color .3s var(--n-bezier);
        color: var(--n-text-color);
      `, [
        cE('date', `
          color: var(--n-text-color);
        `)
      ]),
      cM('disabled, other-month', `
        color: var(--n-day-text-color);
      `, [
        cB('calendar-date', [
          cE('date', `
            color: var(--n-day-text-color);
          `)
        ])
      ]),
      cM('disabled', `
        cursor: not-allowed;
      `),
      cM('current', [
        cB('calendar-date', [
          cE('date', `
            color: var(--n-date-text-color-current);
            background-color: var(--n-date-color-current);
          `)
        ])
      ]),
      cB('calendar-date', `
        position: relative;
        line-height: 1;
        display: flex;
        align-items: center;
        height: 1em;
        justify-content: space-between;
        padding-bottom: .75em;
      `, [
        cE('date', `
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -0.4em;
          width: 1.8em;
          height: 1.8em;
          transition:
            color .3s var(--n-bezier),
            background-color .3s var(--n-bezier);
        `),
        cE('day', `
          color: var(--n-day-text-color);
          transition: color .3s var(--n-bezier);
        `)
      ])
    ])
  ]),
  insideModal(cB('calendar', [
    cB('calendar-dates', `
      border-color: var(--n-border-color-modal);
    `),
    cB('calendar-cell', `
      border-color: var(--n-border-color-modal);
    `, [
      c('&:hover', `
        background-color: var(--n-cell-color-hover-modal);
      `)
    ])
  ])),
  insidePopover(cB('calendar', [
    cB('calendar-dates', `
      border-color: var(--n-border-color-popover);
    `),
    cB('calendar-cell', `
      border-color: var(--n-border-color-popover);
    `, [
      c('&:hover', `
        background-color: var(--n-cell-color-hover-popover);
      `)
    ])
  ]))
])
