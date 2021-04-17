import { h, defineComponent } from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'
import useRadio from './use-radio'

export type RadioButtonProps = ExtractPublicPropTypes<typeof useRadio.props>

export default defineComponent({
  name: 'RadioButton',
  props: useRadio.props,
  setup (props) {
    return useRadio(props)
  },
  render () {
    const { cPrefix } = this
    return (
      <div
        class={[
          `${cPrefix}-radio-button`,
          {
            [`${cPrefix}-radio-button--disabled`]: this.mergedDisabled,
            [`${cPrefix}-radio-button--checked`]: this.renderSafeChecked,
            [`${cPrefix}-radio-button--focus`]: this.focus
          }
        ]}
        onKeyup={this.handleKeyUp}
        onClick={this.handleClick}
        onMousedown={this.handleMouseDown}
      >
        <input
          ref="inputRef"
          type="radio"
          class={`${cPrefix}-radio-button__radio-input`}
          value={this.value}
          name={this.mergedName}
          checked={this.renderSafeChecked}
          disabled={this.mergedDisabled}
          onChange={this.handleRadioInputChange}
          onFocus={this.handleRadioInputFocus}
          onBlur={this.handleRadioInputBlur}
        />
        <div class={`${cPrefix}-radio-button__state-border`} />
        <span ref="labelRef">{this.$slots}</span>
      </div>
    )
  }
})
