import { h, computed, defineComponent, inject, PropType } from 'vue'
import { NCheckbox } from '../../checkbox'
import { transferInjectionKey } from './interface'

export default defineComponent({
  name: 'TransferHeader',
  props: {
    source: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function as PropType<(value: boolean) => void>,
      required: true
    },
    title: String
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NTransfer = inject(transferInjectionKey)!
    const checkboxPropsRef = computed(() => {
      const { source } = props
      if (source) {
        return NTransfer.srcCheckedStatus
      } else {
        return NTransfer.tgtCheckedStatus
      }
    })
    return () => {
      const { source } = props
      const { value: checkboxProps } = checkboxPropsRef
      const { mergedTheme, cPrefix } = NTransfer
      return (
        <div class={`${cPrefix}-transfer-list-header`}>
          <div class={`${cPrefix}-transfer-list-header__checkbox`}>
            <NCheckbox
              theme={mergedTheme.peers.Checkbox}
              themeOverrides={mergedTheme.peerOverrides.Checkbox}
              checked={checkboxProps.checked}
              indeterminate={checkboxProps.indeterminate}
              disabled={checkboxProps.disabled || NTransfer.disabled}
              onUpdateChecked={props.onChange}
            />
          </div>
          <div class={`${cPrefix}-transfer-list-header__header`}>
            {props.title}
          </div>
          <div class={`${cPrefix}-transfer-list-header__extra`}>
            {source
              ? NTransfer.srcCheckedValues.length
              : NTransfer.tgtCheckedValues.length}
            /{source ? NTransfer.srcOpts.length : NTransfer.tgtOpts.length}
          </div>
        </div>
      )
    }
  }
})
