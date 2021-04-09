import { cB, cM, cE } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --bezier
// --font-size
// --option-color-hover
// --divider-color
// --color
// --padding
// --border-radius
// --box-shadow
// --option-height
// --option-prefix-width
// --option-icon-prefix-width
// --option-suffix-width
// --option-icon-suffix-width
// --option-text-color
// --option-text-color-active
// --prefix-color
// --suffix-color
// --option-icon-size
export default cB('dropdown-menu', {
  transformOrigin: 'inherit',
  padding: 'var(--padding)',
  backgroundColor: 'var(--color)',
  borderRadius: 'var(--border-radius)',
  boxShadow: 'var(--box-shadow)',
  transition: `
    background-color .3s var(--bezier),
    box-shadow .3s var(--bezier)
  `
}, [
  fadeInScaleUpTransition(),
  cB('dropdown-option', {
    position: 'relative'
  }, [
    cB('dropdown-option-body', {
      display: 'flex',
      cursor: 'default',
      height: 'var(--option-height)',
      lineHeight: 'var(--option-height)',
      fontSize: 'var(--font-size)',
      color: 'var(--option-text-color)',
      transition: 'color .3s var(--bezier)'
    }, [
      cM('pending', {
        backgroundColor: 'var(--option-color-hover)'
      }),
      cM('active',
        {
          color: 'var(--option-text-color-active)'
        }, [
          cE('prefix, suffix', {
            color: 'var(--option-text-color-active)'
          })
        ]
      ),
      cM('group', {
        fontSize: 'calc(var(--font-size) - 1px)',
        color: 'var(--group-header-text-color)'
      }, [
        cE('prefix', {
          width: 'calc(var(--option-prefix-width) / 2)'
        }, [
          cM('show-icon', {
            width: 'calc(var(--option-icon-prefix-width) / 2)'
          })
        ]
        )
      ]
      ),
      cE('prefix', {
        width: 'var(--option-prefix-width)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--prefix-color)',
        transition: 'color .3s var(--bezier)'
      }, [
        cM('show-icon', {
          width: 'var(--option-icon-prefix-width)'
        }),
        cB('icon', {
          fontSize: 'var(--option-icon-size)'
        })
      ]),
      cE('label', {
        whiteSpace: 'nowrap',
        flex: 1
      }),
      cE('suffix', {
        boxSizing: 'border-box',
        flexGrow: 0,
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        minWidth: 'var(--option-suffix-width)',
        padding: '0 8px',
        transition: 'color .3s var(--bezier)',
        color: 'var(--suffix-color)'
      }, [
        cM('has-submenu', {
          width: 'var(--option-icon-suffix-width)'
        }),
        cB('icon', {
          fontSize: 'var(--option-icon-size)'
        })
      ]),
      cB('dropdown-menu', {
        pointerEvents: 'all'
      })
    ]),
    cB('dropdown-offset-container', {
      pointerEvents: 'none',
      position: 'absolute',
      left: 0,
      right: 0,
      top: '-4px',
      bottom: '-4px'
    })
  ]),
  cB('dropdown-divider', {
    transition: 'background-color .3s var(--bezier)',
    backgroundColor: 'var(--divider-color)',
    height: '1px',
    margin: '4px 0'
  }),
  cB('dropdown-menu-wrapper', {
    transformOrigin: 'inherit',
    width: 'fit-content'
  })
])
