import { h, defineComponent, inject, computed, mergeProps, Fragment } from 'vue'
import { AddIcon } from '../../_internal/icons'
import { NBaseClose, NBaseIcon } from '../../_internal'
import { render, omit } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { type OnBeforeLeaveImpl, tabsInjectionKey } from './interface'
import { tabPaneProps } from './TabPane'

export const tabProps = {
  internalLeftPadded: Boolean,
  internalAddable: Boolean,
  internalCreatedByPane: Boolean,
  ...omit(tabPaneProps, ['displayDirective'])
} as const

export type TabProps = ExtractPublicPropTypes<typeof tabProps>

export default defineComponent({
  __TAB__: true,
  inheritAttrs: false,
  name: 'Tab',
  props: tabProps,
  setup (props) {
    const {
      mergedClsPrefixRef,
      valueRef,
      typeRef,
      closableRef,
      tabStyleRef,
      tabChangeIdRef,
      onBeforeLeaveRef,
      triggerRef,
      handleAdd,
      activateTab,
      handleClose
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(tabsInjectionKey)!
    return {
      trigger: triggerRef,
      mergedClosable: computed(() => {
        if (props.internalAddable) return false
        const { closable } = props
        if (closable === undefined) return closableRef.value
        return closable
      }),
      style: tabStyleRef,
      clsPrefix: mergedClsPrefixRef,
      value: valueRef,
      type: typeRef,
      handleClose (e: MouseEvent) {
        e.stopPropagation()
        if (props.disabled) return
        handleClose(props.name)
      },
      activateTab () {
        if (props.disabled) return
        if (props.internalAddable) {
          handleAdd()
          return
        }
        const { name: nameProp } = props
        const id = ++tabChangeIdRef.id
        if (nameProp !== valueRef.value) {
          const { value: onBeforeLeave } = onBeforeLeaveRef
          if (!onBeforeLeave) {
            activateTab(nameProp)
          } else {
            void Promise.resolve(
              (onBeforeLeave as OnBeforeLeaveImpl)(props.name, valueRef.value)
            ).then((allowLeave) => {
              if (allowLeave && tabChangeIdRef.id === id) {
                activateTab(nameProp)
              }
            })
          }
        }
      }
    }
  },
  render () {
    const {
      internalAddable,
      clsPrefix,
      name,
      disabled,
      label,
      tab,
      value,
      mergedClosable,
      style,
      trigger,
      $slots: { default: defaultSlot }
    } = this
    const mergedTab = label ?? tab
    return (
      <div class={`${clsPrefix}-tabs-tab-wrapper`}>
        {this.internalLeftPadded ? (
          <div class={`${clsPrefix}-tabs-tab-pad`} />
        ) : null}
        <div
          key={name}
          data-name={name}
          data-disabled={disabled ? true : undefined}
          {...mergeProps(
            {
              class: [
                `${clsPrefix}-tabs-tab`,
                value === name && `${clsPrefix}-tabs-tab--active`,
                disabled && `${clsPrefix}-tabs-tab--disabled`,
                mergedClosable && `${clsPrefix}-tabs-tab--closable`,
                internalAddable && `${clsPrefix}-tabs-tab--addable`
              ],
              onClick: trigger === 'click' ? this.activateTab : undefined,
              onMouseenter: trigger === 'hover' ? this.activateTab : undefined,
              style: internalAddable ? undefined : style
            },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this.internalCreatedByPane
              ? ((this.tabProps || {}) as any)
              : this.$attrs
          )}
        >
          <span class={`${clsPrefix}-tabs-tab__label`}>
            {internalAddable ? (
              <>
                <div class={`${clsPrefix}-tabs-tab__height-placeholder`}>
                  &nbsp;
                </div>
                <NBaseIcon clsPrefix={clsPrefix}>
                  {{
                    default: () => <AddIcon />
                  }}
                </NBaseIcon>
              </>
            ) : defaultSlot ? (
              defaultSlot()
            ) : typeof mergedTab === 'object' ? (
              mergedTab // VNode
            ) : (
              render(mergedTab ?? name)
            )}
          </span>
          {mergedClosable && this.type === 'card' ? (
            <NBaseClose
              clsPrefix={clsPrefix}
              class={`${clsPrefix}-tabs-tab__close`}
              onClick={this.handleClose}
              disabled={disabled}
            />
          ) : null}
        </div>
      </div>
    )
  }
})
