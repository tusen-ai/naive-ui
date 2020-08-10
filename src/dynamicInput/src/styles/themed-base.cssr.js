import { c, cTB, cB, cM, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    return [
      cTB('dynamic-input', {
        raw: `
          width: 100%;
        `
      },
      [
        cB('dynamic-input-item', {
          raw: `
            margin-bottom: 10px;
            display: flex;
            flex-wrap: nowrap;
          `
        },
        [
          cB('dynamic-input-preset-input', {
            raw: `
              flex: 1;
            `
          }),
          cB('dynamic-input-preset-pair', {
            raw: `
              flex: 1;
              display: flex;
            `
          }, [
            cB('dynamic-input-pair-input', [
              c('&:first-child', {
                raw: `
                  margin-right: 12px;
                `
              })
            ])
          ]),
          cE('action', {
            raw: `
              width: 80px;
              display: flex;
              justify-content: flex-end;
              align-items: flex-start;
              flex-shrink: 0;
              flex-grow: 0;
            `
          }, [
            cM('icon', {
              raw: `
                cursor: pointer;
              `
            })
          ]),
          c('&:last-child', {
            raw: `
              margin-bottom: 0;
            `
          })
        ]),
        cB('form-item', {
          raw: `
            padding-top: 0 !important;
            margin-right: 0 !important;
          `
        }, [
          cB('form-item-blank', {
            raw: `
              padding: 0 !important;
            `
          })
        ])
      ])
    ]
  }
])
