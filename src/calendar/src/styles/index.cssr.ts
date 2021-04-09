import { cB, cE, cM, c } from '../../../_utils/cssr'

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
// --cell-color-hover
// --cell-color-active
export default cB('calendar', `
  line-height: var(--line-height);
  font-size: var(--font-size);
  color: var(--text-color);
  height: 720px;
  display: flex;
  flex-direction: column;
`, [
  cB('calendar-prev-btn', `
    margin-right: 6px;
    cursor: pointer;
  `),
  cB('calendar-next-btn', `
    margin-right: 12px;
    cursor: pointer;
  `),
  cB('calendar-header', `
    display: flex;
    align-items: center;
    line-height: 1;
    font-size: var(--title-font-size);
    color: var(--title-text-color);
    font-weight: var(--title-font-weight);
    padding: 8px 0 18px 0;
    transition: color .3s var(--bezier);
  `),
  cB('calendar-dates', `
    border-radius: var(--border-radius);
    flex: 1;
    border-top: 1px solid;
    border-left: 1px solid;
    border-color: var(--border-color);
    transition: border-color .3s var(--bezier);
  `),
  cB('calendar-cell', `
    box-sizing: border-box;
    padding: 12px;
    border-right: 1px solid;
    border-bottom: 1px solid;
    border-color: var(--border-color);
    cursor: pointer;
    background-clip: padding-box;
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
    cM('selected', `
      background-color: var(--cell-color-active);
    `),
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
    `, [
      cE('date', `
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -0.5em;
        width: 2em;
        height: 2em;
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
])
