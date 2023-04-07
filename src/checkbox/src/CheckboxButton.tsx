import { h, defineComponent } from 'vue'
import { ExtractPublicPropTypes } from '../../_utils'
import { on } from 'evtd'
import { setup, checkboxProps } from './use-checkbox'

export const checkboxButtonProps = checkboxProps
export type CheckboxButtonProps = ExtractPublicPropTypes<typeof checkboxProps>

export default defineComponent({
  name: 'CheckboxButton',
  props: checkboxProps,
  setup,
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        ref="selfRef"
        class={[
          `${mergedClsPrefix}-checkbox-button`,
          this.renderedChecked && `${mergedClsPrefix}-checkbox-button--checked`,
          this.mergedDisabled && `${mergedClsPrefix}-checkbox-button--disabled`
        ]}
        tabindex={this.mergedDisabled || !this.focusable ? undefined : 0}
        role="checkbox"
        aria-checked={this.indeterminate ? 'mixed' : this.renderedChecked}
        aria-labelledby={this.labelId}
        onKeyup={this.handleKeyUp}
        onKeydown={this.handleKeyDown}
        onClick={this.handleClick}
        onMousedown={() => {
          on(
            'selectstart',
            window,
            (e: Event): void => {
              e.preventDefault()
            },
            {
              once: true
            }
          )
        }}
      >
        <div class={`${mergedClsPrefix}-checkbox-button__state-border`} />

        {this.label !== null || this.$slots.default ? (
          <span class={`${mergedClsPrefix}-checkbox__label`} id={this.labelId}>
            {this.$slots.default ? this.$slots.default() : this.label}
          </span>
        ) : null}
      </div>
    )
  }
})
