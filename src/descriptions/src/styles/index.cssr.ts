import { c, cB, cE, cM, cNotM, insideModal } from '../../../_utils/cssr'

// vars:
// --th-padding
// --td-padding
// --font-size
// --bezier
// --th-font-weight
// --line-height
// --th-text-color
// --td-text-color
// --th-color
// --td-color
// --td-color-modal
// --border-radius
// --border-color
export default c([
  cB(
    'descriptions',
    {
      fontSize: 'var(--font-size)'
    },
    [
      cB('descriptions-table-wrapper', [
        cB('descriptions-table', [
          cB('descriptions-table-row', [
            cB('descriptions-table-header', {
              padding: 'var(--th-padding)'
            }),
            cB('descriptions-table-content', {
              padding: 'var(--td-padding)'
            })
          ])
        ])
      ]),
      cNotM('bordered', [
        cB('descriptions-table-wrapper', [
          cB('descriptions-table', [
            cB('descriptions-table-row', [
              c('&:last-child', [
                cB('descriptions-table-content', {
                  paddingBottom: 0
                })
              ])
            ])
          ])
        ])
      ]),
      cM('left-label-placement', [
        cB('descriptions-table-content', [
          c('> *', {
            verticalAlign: 'top'
          })
        ])
      ]),
      cM('left-label-align', [
        c('th', {
          textAlign: 'left'
        })
      ]),
      cM('center-label-align', [
        c('th', {
          textAlign: 'center'
        })
      ]),
      cM('right-label-align', [
        c('th', {
          textAlign: 'right'
        })
      ]),
      cM('bordered', [
        cB(
          'descriptions-table-wrapper',
          `
        border-radius: var(--border-radius);
        overflow: hidden;
        background: var(--td-color);
        border: 1px solid var(--border-color);
      `,
          [
            cB('descriptions-table', [
              cB('descriptions-table-row', [
                c('&:not(:last-child)', [
                  cB('descriptions-table-content', {
                    borderBottom: '1px solid var(--border-color)'
                  }),
                  cB('descriptions-table-header', {
                    borderBottom: '1px solid var(--border-color)'
                  })
                ]),
                cB(
                  'descriptions-table-header',
                  {
                    fontWeight: 400,
                    backgroundClip: 'padding-box',
                    backgroundColor: 'var(--th-color)'
                  },
                  [
                    c('&:not(:last-child)', {
                      borderRight: '1px solid var(--border-color)'
                    })
                  ]
                ),
                cB('descriptions-table-content', [
                  c('&:not(:last-child)', {
                    borderRight: '1px solid var(--border-color)'
                  })
                ])
              ])
            ])
          ]
        )
      ]),
      cB(
        'descriptions-header',
        `
      font-weight: var(--th-font-weight);
      font-size: 18px;
      transition: color .3s var(--bezier);
      line-height: var(--line-height);
      margin-bottom: 8px;
      color: var(--th-text-color);
    `
      ),
      cB(
        'descriptions-table-wrapper',
        `
      transition:
        background-color .3s var(--bezier),
        border-color .3s var(--bezier);
    `,
        [
          cB(
            'descriptions-table',
            `
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        box-sizing: border-box;
      `,
            [
              cB(
                'descriptions-table-row',
                `
          box-sizing: border-box;
          transition: border-color .3s var(--bezier);
        `,
                [
                  cB(
                    'descriptions-table-header',
                    `
            font-weight: var(--th-font-weight);
            line-height: var(--line-height);
            display: table-cell;
            box-sizing: border-box;
            color: var(--th-text-color);
            transition:
              color .3s var(--bezier),
              background-color .3s var(--bezier),
              border-color .3s var(--bezier);
          `
                  ),
                  cB(
                    'descriptions-table-content',
                    `
            vertical-align: top;
            line-height: var(--line-height);
            display: table-cell;
            box-sizing: border-box;
            color: var(--td-text-color);
            transition:
              color .3s var(--bezier),
              background-color .3s var(--bezier),
              border-color .3s var(--bezier);
          `,
                    [
                      cE(
                        'content',
                        `
              transition: color .3s var(--bezier);
              display: inline-block;
              color: var(--td-text-color);
            `
                      )
                    ]
                  ),
                  cE(
                    'label',
                    `
            font-weight: var(--th-font-weight);
            transition: color .3s var(--bezier);
            display: inline-block;
            margin-right: 14px;
            color: var(--th-text-color);
          `
                  )
                ]
              )
            ]
          )
        ]
      )
    ]
  ),
  insideModal(
    cB('descriptions', [
      cM('bordered', [
        cB('descriptions-table-wrapper', {
          background: 'var(--td-color-modal)'
        })
      ])
    ])
  )
])
