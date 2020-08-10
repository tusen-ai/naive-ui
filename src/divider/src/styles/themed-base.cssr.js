import { c, cTB, cNotM, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { easeInOutCubicBezier, strongFontWeight } = props.$base
    const {
      dividerTextColor,
      dividerBorderColor
    } = props.$local
    return [
      cTB(
        'divider',
        {
          raw: `
            position: relative;
            display: flex;
            width: 100%;
            box-sizing: border-box;
            font-size: 16px;
            color: ${dividerTextColor}
            transition: background-color .3s ${easeInOutCubicBezier};
          `
        },
        [
          cNotM('vertical', {
            raw: `
              margin-top: 24px;
              margin-bottom: 24px;
            `
          },
          [
            cNotM('no-title', {
              raw: `
                display: flex;
                align-items: center;
              `
            })
          ]),
          cE('title', {
            raw: `
              transition: color .3s ${easeInOutCubicBezier};
              display: flex;
              align-items: center;
              margin-left: 12px;
              margin-right: 12px;
              white-space: nowrap;
              font-weight: ${strongFontWeight};
            `
          }),
          cM('title-position-left', [
            cE('line', [
              cM('left', {
                raw: `
                  width: 28px;
                `
              })
            ])
          ]),
          cM('title-position-right', [
            cE('line', [
              cM('right', {
                raw: `
                  width: 28px;
                `
              })
            ])
          ]),
          cM('dashed', [
            cE('line', {
              raw: `
                background-color: transparent;
                height: 0px;
                width: 100%;
                border-style: dashed;
                border-width: 1px 0 0;
              `
            })
          ]),
          cM('vertical', {
            raw: `
              display: inline-block;
              height: 1em;
              margin: 0 8px;
              vertical-align: middle;
              width: 1px;
            `
          }),
          cE('line', {
            raw: `
              border: none;
              transition: background-color .3s ${easeInOutCubicBezier}, border-color .3s ${easeInOutCubicBezier};
              height: 1px;
              width: 100%;
              margin: 0;
            `
          }),
          cNotM('dashed', [
            cE('line', {
              raw: `
                background-color: ${dividerBorderColor};
              `
            })
          ]),
          cM('dashed', [
            cE('line', {
              raw: `
                border-color:: ${dividerBorderColor};
              `
            })
          ]),
          cM('vertical', {
            raw: `
              background-color: ${dividerBorderColor};
            `
          })
        ]
      )
    ]
  }
])
