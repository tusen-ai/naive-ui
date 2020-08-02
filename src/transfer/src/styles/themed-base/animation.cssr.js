import { c } from '../../../../_utils/cssr'

export default c([
  c('@keyframes transfer-slide-in-from-left', {
    raw: `
      0% {
        transform: translateX(-150%);
      }
      100% {
        transform: translateX(0);
      }
    `
  }),
  c('@keyframes transfer-slide-out-to-right', {
    raw: `
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(150%);
      }
    `
  }),
  c('@keyframes transfer-slide-in-from-right', {
    raw: `
      0% {
        transform: translateX(150%);
      }
      100% {
        transform: translateX(0);
      }
    `
  }),
  c('@keyframes transfer-slide-out-to-left', {
    raw: `
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-150%);
      }
    `
  })
])
