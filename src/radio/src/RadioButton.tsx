import { h, defineComponent } from 'vue'
import useRadio from './use-radio'

export default defineComponent({
  name: 'RadioButton',
  props: useRadio.props,
  setup (props) {
    return useRadio(props)
  },
  render () {
    return (
      <div
        class={[
          'n-radio-button',
          {
            'n-radio-button--disabled': this.mergedDisabled,
            'n-radio-button--checked': this.renderSafeChecked,
            'n-radio-button--focus': this.focus
          }
        ]}
        onKeyup={this.handleKeyUp}
        onClick={this.handleClick}
        onMousedown={this.handleMouseDown}
      >
        <input
          ref="inputRef"
          type="radio"
          class="n-radio-button__radio-input"
          value={this.value}
          name={this.mergedName}
          checked={this.renderSafeChecked}
          disabled={this.mergedDisabled}
          onChange={this.handleRadioInputChange}
          onFocus={this.handleRadioInputFocus}
          onBlur={this.handleRadioInputBlur}
        />
        <div class="n-radio-button__state-border" />
        <span ref="labelRef">{this.$slots}</span>
      </div>
    )
  }
})
