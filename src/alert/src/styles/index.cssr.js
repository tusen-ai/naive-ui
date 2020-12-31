import { c, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTranstion from '../../../_styles/transitions/fade-in-height-expand'

// vars:
// --bezier
// --color
// --close-color
// --close-color-hover
// --close-color-pressed
// --icon-color
// --border
// --title-text-color
// --content-text-color
// --line-height
// --border-radius
// --font-size
// --title-font-weight
export default cB('alert', {
  lineHeight: 'var(--line-height)',
  borderRadius: 'var(--border-radius)',
  position: 'relative',
  transition: 'background-color .3s var(--bezier)',
  backgroundColor: 'var(--color)',
  textAlign: 'start'
}, [
  cE('close', {
    color: 'var(--close-color)'
  }, [
    c('&:hover', {
      color: 'var(--close-color-hover)'
    }),
    c('&:active', {
      color: 'var(--close-color-pressed)'
    })
  ]),
  cE('icon', {
    color: 'var(--icon-color)'
  }),
  cB('alert-body', {
    border: 'var(--border)'
  }, [
    cE('title', {
      color: 'var(--title-text-color)'
    }),
    cE('content', {
      color: 'var(--content-text-color)'
    })
  ]),
  fadeInHeightExpandTranstion({
    originalTransition: 'transform .3s var(--bezier)',
    enterToProps: {
      transform: 'scale(1)'
    },
    leaveToProps: {
      transform: 'scale(0.9)'
    }
  }),
  cE('icon', `
    position: absolute;
    left: 12px;
    top: 14px;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
  `, [
    cB('icon', {
      fontSize: '26px'
    })
  ]),
  cE('close', `
    position: absolute;
    right: 16px;
    font-size: 14px;
    top: 14px;
    width: 1em;
    height: 1em;
    line-height: 0;
    transition: color .3s var(--bezier);
  `, [
    cB('icon', {
      cursor: 'pointer'
    })
  ]),
  cB('alert-body', {
    borderRadius: 'var(--border-radius)',
    padding: '15px 15px 15px 47px',
    transition: 'border-color .3s var(--bezier)'
  }, [
    cE('title', {
      transition: 'color .3s var(--bezier)',
      fontSize: '16px',
      lineHeight: '19px',
      fontWeight: 'var(--title-font-weight)'
    }, [
      c('& +', [
        cE('content', {
          marginTop: '9px'
        })
      ])
    ]),
    cE('content', {
      transition: 'color .3s var(--bezier)',
      fontSize: 'var(--font-size)'
    })
  ]),
  cE('icon', {
    transition: 'color .3s var(--bezier)'
  }),
  cM('no-icon', [
    cB('alert-body', {
      paddingLeft: '19px'
    })
  ])
])
