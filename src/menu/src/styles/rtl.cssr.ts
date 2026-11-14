import { cB, cE, cM } from '../../../_utils/cssr'

// Indent (padding) and icon spacing are set inline by the components and
// switch to the right side when rtl is enabled, see `MenuOptionContent`.
export default cB('menu', [
  cM('rtl', `
    direction: rtl;
  `, [
    cM('vertical', [
      cB('menu-item-content', `
        padding-right: 0;
        padding-left: 18px;
        transition:
          background-color .3s var(--n-bezier),
          padding-right .3s var(--n-bezier),
          border-color .3s var(--n-bezier);
      `, [
        cE('icon', `
          transition:
            color .3s var(--n-bezier),
            font-size .3s var(--n-bezier),
            margin-left .3s var(--n-bezier);
        `)
      ]),
      cB('menu-item-group', [
        cB('menu-item-group-title', `
          transition:
            padding-right .3s var(--n-bezier),
            color .3s var(--n-bezier);
        `)
      ])
    ])
  ])
])
