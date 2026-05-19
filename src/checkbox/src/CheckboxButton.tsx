import type { ExtractPublicPropTypes } from '../../_utils'
import { defineComponent, h } from 'vue'
import { resolveWrappedSlot } from '../../_utils'
import { checkboxBaseProps, setup } from './use-checkbox'

export const checkboxButtonProps = checkboxBaseProps
export type CheckboxButtonProps = ExtractPublicPropTypes<
  typeof checkboxBaseProps
>

export default defineComponent({
  name: 'CheckboxButton',
  props: checkboxBaseProps,
  setup(props) {
    return { ...setup(props) }
  },
  render() {
    const { mergedClsPrefix, renderedChecked, mergedDisabled, label, $slots }
      = this
    return (
      <label
        class={[
          `${mergedClsPrefix}-checkbox-button`,
          renderedChecked && `${mergedClsPrefix}-checkbox-button--checked`,
          mergedDisabled && `${mergedClsPrefix}-checkbox-button--disabled`
        ]}
        onClick={this.handleClick}
        onKeyup={this.handleKeyUp}
        onKeydown={this.handleKeyDown}
      >
        <input
          type="checkbox"
          class={`${mergedClsPrefix}-checkbox-button__input`}
          checked={renderedChecked}
          disabled={mergedDisabled}
          tabindex={-1}
        />
        {resolveWrappedSlot($slots.default, (children) => {
          if (!children && !label)
            return null
          return (
            <span class={`${mergedClsPrefix}-checkbox-button__label`}>
              {children || label}
            </span>
          )
        })}
      </label>
    )
  }
})
