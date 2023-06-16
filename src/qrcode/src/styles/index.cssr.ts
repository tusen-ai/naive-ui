import { c, cB, cM } from '../../../_utils/cssr'

// vars:
// --n-border-color
// --n-border-radius

export default c([
  cB('qrcode', [
    cM('bordered', [
      c('>',
        [
          cB('qrcode-wrapper', `
              width: fit-content;
              border: 1px solid var(--n-border-color);
              border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
          `)
        ]
      )
    ])
  ]
  )
])
