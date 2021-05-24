import { h, defineComponent, inject, computed } from 'vue'
import { NBaseClose, NBaseIcon } from '../../_internal'
import { AddIcon } from '../../_internal/icons'
import { tabsInjectionKey } from './interface'
import { tabPaneProps } from './TabPane'

export default defineComponent({
  name: 'Tab',
  props: Object.assign(
    {
      addable: Boolean
    },
    tabPaneProps
  ),
  setup (props) {
    const {
      mergedClsPrefixRef,
      valueRef,
      typeRef,
      closableRef,
      tabStyleRef,
      handleAdd,
      handleTabClick,
      handleClose
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(tabsInjectionKey)!
    return {
      mergedClosable: computed(() => {
        if (props.addable) return false
        const { closable } = props
        if (closable === undefined) return closableRef.value
        return closable
      }),
      style: tabStyleRef,
      clsPrefix: mergedClsPrefixRef,
      value: valueRef,
      type: typeRef,
      handleClose,
      handleClick () {
        if (props.addable) {
          handleAdd()
          return
        }
        handleTabClick(props.name, props.disabled)
      }
    }
  },
  render () {
    const {
      addable,
      clsPrefix,
      name,
      disabled,
      label,
      value,
      mergedClosable,
      style
    } = this
    return (
      <div class={`${clsPrefix}-tabs-tab-wrapper`}>
        <div
          key={name}
          data-name={name}
          data-disabled={disabled ? true : undefined}
          class={[
            `${clsPrefix}-tabs-tab`,
            {
              [`${clsPrefix}-tabs-tab--active`]: value === name,
              [`${clsPrefix}-tabs-tab--disabled`]: disabled,
              [`${clsPrefix}-tabs-tab--closable`]: mergedClosable,
              [`${clsPrefix}-tabs-tab--addable`]: addable
            }
          ]}
          onClick={this.handleClick}
          style={addable ? undefined : style}
        >
          <span class={`${clsPrefix}-tabs-tab__label`}>
            {addable ? (
              <NBaseIcon clsPrefix={clsPrefix}>
                {{
                  default: () => <AddIcon />
                }}
              </NBaseIcon>
            ) : (
              label
            )}
          </span>
          {mergedClosable && this.type === 'card' ? (
            <NBaseClose
              clsPrefix={clsPrefix}
              class={`${clsPrefix}-tabs-tab__close`}
              onClick={(e) => this.handleClose(e, name)}
              disabled={disabled}
            />
          ) : null}
        </div>
        <div class={`${clsPrefix}-tabs-tab-pad`}></div>
      </div>
    )
  }
})
