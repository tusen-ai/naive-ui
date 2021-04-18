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
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-radio-button`,
          {
            [`${mergedClsPrefix}-radio-button--disabled`]: this.mergedDisabled,
            [`${mergedClsPrefix}-radio-button--checked`]: this
              .renderSafeChecked,
            [`${mergedClsPrefix}-radio-button--focus`]: this.focus
          }
        ]}
        onKeyup={this.handleKeyUp}
        onClick={this.handleClick}
        onMousedown={this.handleMouseDown}
      >
        <input
          ref="inputRef"
          type="radio"
          class={`${mergedClsPrefix}-radio-button__radio-input`}
          value={this.value}
          name={this.mergedName}
          checked={this.renderSafeChecked}
          disabled={this.mergedDisabled}
          onChange={this.handleRadioInputChange}
          onFocus={this.handleRadioInputFocus}
          onBlur={this.handleRadioInputBlur}
        />
        <div class={`${mergedClsPrefix}-radio-button__state-border`} />
        <span ref="labelRef">{this.$slots}</span>
      </div>
    )
  }
})
