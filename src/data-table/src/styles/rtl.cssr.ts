import { cB, cE, cM, c } from '../../../_utils/cssr'

export default c([
  cB('data-table', [
    cM('rtl', `
      direction: rtl;
    `, [
      cB('data-table-th', [
        cB('data-table-sorter', `
          margin-left: 20px;
        `),
        cB('data-table-filter', `
          right: unset;
          left: 0;
        `)
      ]),
      cE('pagination', `
        direction: ltr;
        justify-content: flex-start;
      `)
    ])
  ]),
  cB('data-table-filter-menu', [
    cM('rtl', [
      cB('scrollbar', `
        direction: rtl;
      `)
    ])
  ])
])
