import { h, defineComponent } from 'vue'
import { type ExtractPublicPropTypes, resolveWrappedSlot } from '../../_utils'
import { setup, radioBaseProps } from './use-radio'

export const radioButtonProps = radioBaseProps
export type RadioButtonProps = ExtractPublicPropTypes<typeof radioBaseProps>

export default defineComponent({
  name: 'RadioButton',
  props: radioBaseProps,
  setup,
  render () {
    const { mergedClsPrefix } = this
    return (
      <label
        class={[
          `${mergedClsPrefix}-radio-button`,
          this.mergedDisabled && `${mergedClsPrefix}-radio-button--disabled`,
          this.renderSafeChecked && `${mergedClsPrefix}-radio-button--checked`,
          this.focus && [`${mergedClsPrefix}-radio-button--focus`]
        ]}
      >
        <input
          ref="inputRef"
          type="radio"
          class={`${mergedClsPrefix}-radio-input`}
          value={this.value}
          name={this.mergedName}
          checked={this.renderSafeChecked}
          disabled={this.mergedDisabled}
          onChange={this.handleRadioInputChange}
          onFocus={this.handleRadioInputFocus}
          onBlur={this.handleRadioInputBlur}
        />
        <div class={`${mergedClsPrefix}-radio-button__state-border`} />
        {resolveWrappedSlot(this.$slots.default, (children) => {
          if (!children && !this.label) return null
          return (
            <div ref="labelRef" class={`${mergedClsPrefix}-radio__label`}>
              {children || this.label}
            </div>
          )
        })}
      </label>
    )
  }
})
