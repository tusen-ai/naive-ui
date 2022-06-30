import { cB, cM, cE, c } from '../../../_utils/cssr'

export default cB('notification', [
  cM('rtl', `
    direction: rtl;
  `, [
    cB('notification-main', {
      marginLeft: 'unset',
      marginRight: '8px'
    }, [
      cE('header', {
        margin: 'var(--n-icon-margin)',
        marginRight: 0
      })
    ]),
    cE('avatar', {
      left: 'unset',
      right: 'var(--n-padding-left)'
    }),
    cM('show-avatar', [
      cB('notification-main', {
        marginRight: '40px',
        marginLeft: 'unset'
      }
      )
    ]),
    cM('closable', [
      cB('notification-main', [
        c('> *:first-child', {
          paddingLeft: '20px',
          paddingRight: 'unset'
        })
      ]),
      cE('close', {
        right: 'unset',
        left: 0
      })
    ])
  ])
])
