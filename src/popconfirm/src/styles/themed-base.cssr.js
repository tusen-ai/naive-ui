import { c, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { iconColor } = props.$local
    return [
      cB('popconfirm-content', {
        raw: `
          padding: 4px 0;
        `
      }, [
        cE('body', {
          raw: `
            font-size: 13px;
            white-space: nowrap;
            padding-left: 22px;
            position: relative;
          `
        }, [
          cB('icon', {
            raw: `
              position: absolute;
              font-size: 18px;
              left: 0;
              top: 0;
              fill: ${iconColor};
              stroke: ${iconColor};
            `
          })
        ]),
        cM('no-icon', [
          cE('body', {
            raw: `
              padding-left: 0;
            `
          })
        ]),
        cE('action', {
          raw: `
            margin-top: 14px;
            display: flex;
            justify-content: flex-end;
          `
        }, [
          cB('button', {
            raw: `
              margin-right: 8px;
            `
          }, [
            c('&:last-child', {
              raw: `
                margin-right: 0;
              `
            })
          ])
        ])
      ])
    ]
  }
])
