import { cB, cM, cE } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up.cssr'

// vars:
// --bezier
// --font-size
// --padding
// --border-radius
// --box-shadow
// --option-height
// --option-prefix-width
// --option-icon-prefix-width
// --option-suffix-width
// --option-icon-suffix-width
// --color
// --option-color-hover
// --option-color-active
// --divider-color
// --option-text-color
// --option-text-color-hover
// --option-text-color-active
// --option-text-color-child-active
// --prefix-color
// --suffix-color
// --option-icon-size
export default cB('dropdown-menu', `
  transform-origin: inherit;
  padding: var(--padding);
  background-color: var(--color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: 
    background-color .3s var(--bezier),
    box-shadow .3s var(--bezier);
`, [
  fadeInScaleUpTransition(),
  cB('dropdown-option', {
    position: 'relative'
  }, [
    cB('dropdown-option-body', `
      display: flex;
      cursor: default;
      height: var(--option-height);
      line-height: var(--option-height);
      font-size: var(--font-size);
      color: var(--option-text-color);
      transition:
        background-color .3s var(--bezier),
        color .3s var(--bezier);
    `, [
      cM('pending', {
        color: 'var(--option-text-color-hover)',
        backgroundColor: 'var(--option-color-hover)'
      }, [
        cE('prefix, suffix', {
          color: 'var(--option-text-color-hover)'
        })
      ]),
      cM('active', {
        color: 'var(--option-text-color-active)',
        backgroundColor: 'var(--option-color-active)'
      }, [
        cE('prefix, suffix', {
          color: 'var(--option-text-color-active)'
        })
      ]),
      cM('child-active', {
        color: 'var(--option-text-color-child-active)'
      }, [
        cE('prefix, suffix', {
          color: 'var(--option-text-color-child-active)'
        })
      ]),
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
        ])
      ]),
      cE('prefix', `
        width: var(--option-prefix-width);
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--prefix-color);
        transition: color .3s var(--bezier);
      `, [
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
      cE('suffix', `
        box-sizing: border-box;
        flex-grow: 0;
        flex-shrink: 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        min-width: var(--option-suffix-width);
        padding: 0 8px;
        transition: color .3s var(--bezier);
        color: var(--suffix-color);
      `, [
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
    cB('dropdown-offset-container', `
      pointer-events: none;
      position: absolute;
      left: 0;
      right: 0;
      top: -4px;
      bottom: -4px;
    `)
  ]),
  cB('dropdown-divider', `
    transition: background-color .3s var(--bezier);
    background-color: var(--divider-color);
    height: 1px;
    margin: 4px 0;
  `),
  cB('dropdown-menu-wrapper', `
    transform-origin: inherit;
    width: fit-content;
  `)
])
