import { c, cTB, cE, cM, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut
      },
      $local
    } = props
    const {
      textColor,
      iconColor,
      extraTextColor
    } = $local
    return [
      cTB('empty', {
        raw: `
          display: flex;
          flex-direction: column;
          align-items: center;
        `
      },
      [
        ['small', 'medium', 'large', 'huge'].map(size => {
          const {
            [createKey('fontSize', size)]: fontSize,
            [createKey('iconSize', size)]: iconSize
          } = $local
          return cM(
            `${size}-size`,
            {
              fontSize
            },
            [
              cE('icon', {
                raw: `
                  width: ${iconSize};
                  height: ${iconSize};
                  font-size: ${iconSize};
                  line-height: ${iconSize};
                `
              })
            ]
          )
        }),
        cE('icon', {
          raw: `
            color: ${iconColor};
            transition:
              color .3s ${cubicBezierEaseInOut};
          `
        }),
        cE('description', {
          raw: `
            margin-top: 4px;
            transition: color .3s ${cubicBezierEaseInOut};
            color: ${textColor};
          `
        }),
        cE('extra', {
          raw: `
            text-align: center;
            transition: color .3s ${cubicBezierEaseInOut};
            margin-top: 16px;
            color: ${extraTextColor};
          `
        })
      ])
    ]
  }
])
