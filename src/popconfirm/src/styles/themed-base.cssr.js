import { c, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { $local: { iconColor, fontSize }, $global: { cubicBezierEaseInOut } } = props
    return [
      cB('popconfirm-content', {
        padding: '4px 0'
      }, [
        cE('body', {
          raw: `
            font-size: ${fontSize};
            white-space: nowrap;
            position: relative;
          `
        }, [
          cB('icon', {
            raw: `
              position: absolute;
              font-size: 22px;
              left: 0;
              top: -2px;
              transition: color .3s ${cubicBezierEaseInOut};
              color: ${iconColor};
            `
          })
        ]),
        cM('show-icon', [
          cE('body', {
            paddingLeft: '26px'
          })
        ]),
        cE('action', {
          raw: `
            margin-top: 14px;
            display: flex;
            justify-content: flex-end;
          `
        }, [
          cB('button', [
            c('&:not(:last-child)', {
              marginRight: '8px'
            })
          ])
        ])
      ])
    ]
  }
])
