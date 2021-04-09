import { cB, cE, cM, c, insideModal } from '../../../_utils/cssr'

// vars:
// --bezier
// --border-color
// --border-radius
// --text-color
// --title-font-weight
// --title-font-size
// --title-text-color
// --day-text-color
// --font-size
// --line-height
// --date-color-current
// --cell-color
// --cell-color-hover
// --cell-color-hover-modal
// --bar-color
export default c([
  cB('calendar', `
    line-height: var(--line-height);
    font-size: var(--font-size);
    color: var(--text-color);
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
      font-size: var(--title-font-size);
      padding: 0 0 18px 0;
      justify-content: space-between;
    `, [
      cE('title', `
        color: var(--title-text-color);
        font-weight: var(--title-font-weight);
        transition: color .3s var(--bezier);
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
      border-radius: var(--border-radius);
      flex: 1;
      border-top: 1px solid;
      border-left: 1px solid;
      border-color: var(--border-color);
      transition: border-color .3s var(--bezier);
    `),
    cB('calendar-cell', `
      box-sizing: border-box;
      padding: 10px;
      border-right: 1px solid;
      border-bottom: 1px solid;
      border-color: var(--border-color);
      cursor: pointer;
      position: relative;
      transition:
        color .3s var(--bezier),
        border-color .3s var(--bezier),
        background-color .3s var(--bezier);
    `, [
      c('&:nth-child(7)', `
        border-top-right-radius: var(--border-radius);
      `),
      c('&:nth-last-child(7)', `
        border-bottom-left-radius: var(--border-radius);
      `),
      c('&:last-child', `
        border-bottom-right-radius: var(--border-radius);
      `),
      c('&:hover', `
        background-color: var(--cell-color-hover);
      `),
      cE('bar', `
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        height: 3px;
        background-color: transparent;
        transition: background-color .3s var(--bezier);
      `),
      cM('selected', [
        cE('bar', `
          background-color: var(--bar-color);
        `)
      ]),
      cB('calendar-date', `
        transition:
          color .3s var(--bezier),
          border-color .3s var(--bezier),
          background-color .3s var(--bezier);
        color: var(--text-color);
      `, [
        cE('date', `
          color: var(--text-color);
        `)
      ]),
      cM('disabled', [
        cB('calendar-date', [
          cE('date', `
            color: var(--day-text-color);
          `)
        ])
      ]),
      cM('current', [
        cB('calendar-date', [
          cE('date', `
            color: var(--date-text-color-current);
            background-color: var(--date-color-current);
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
            color .3s var(--bezier),
            background-color .3s var(--bezier);
        `),
        cE('day', `
          color: var(--day-text-color);
          transition: color .3s var(--bezier);
        `)
      ])
    ])
  ]),
  insideModal(cB('calendar', [
    cB('calendar-dates', `
      border-color: var(--border-color-modal);
    `),
    cB('calendar-cell', `
      border-color: var(--border-color-modal);
    `, [
      c('&:hover', `
        background-color: var(--cell-color-hover-modal);
      `)
    ])
  ]))
])
