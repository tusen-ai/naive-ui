import { c, cTB, cB, cM, cE, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const local = props.$local
    const {
      prefixColor,
      suffixColor,
      dividerColor,
      padding,
      boxShadow,
      borderRadius,
      optionColorHover
    } = local
    return [
      cTB('dropdown-menu', {
        padding,
        background: 'white',
        borderRadius,
        boxShadow
      }, [
        [
          'small',
          'medium',
          'large',
          'huge'
        ].map(size => cM(`${size}-size`, [
          cB('dropdown-option', [
            cB('dropdown-option-body', {
              display: 'flex',
              height: local[createKey('optionHeight', size)],
              lineHeight: local[createKey('optionHeight', size)],
              fontSize: local[createKey('fontSize', size)]
            }, [
              cE('prefix', {
                width: local[createKey('optionPrefixWidth', size)],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }, [
                cM('show-icon', {
                  width: local[createKey('optionIconPrefixWidth', size)]
                }),
                cB('icon', {
                  fill: prefixColor,
                  stroke: prefixColor,
                  fontSize: '16px'
                })
              ]),
              cE('label', {
                whiteSpace: 'nowrap',
                flex: 1
              }),
              cE('suffix', {
                boxSizing: 'border-box',
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                minWidth: local[createKey('optionSuffixWidth', size)],
                padding: '0 8px'
              }, [
                cM('show-submenu', {
                  width: local[createKey('optionIconSuffixWidth', size)]
                }),
                cB('icon', {
                  fill: suffixColor,
                  stroke: suffixColor,
                  fontSize: '16px'
                })
              ])
            ])
          ])
        ])),
        cB('dropdown-divider', {
          backgroundColor: dividerColor,
          height: '1px',
          margin: '4px 0'
        }),
        cB('dropdown-option', {
          position: 'relative'
        }, [
          cB('dropdown-option-body', {
            cursor: 'default'
          }, [
            cM('pending', {
              backgroundColor: optionColorHover
            })
          ]),
          cB('dropdown-offset-container', {
            pointerEvents: 'none',
            position: 'absolute',
            left: 0,
            right: 0,
            top: '-4px',
            bottom: '-4px'
          }),
          cB('dropdown-menu', {
            pointerEvents: 'all'
          }),
          cB('dropdown-menu-wrapper', {
            width: 'fit-content'
          })
        ])
      ])
    ]
  }
])
