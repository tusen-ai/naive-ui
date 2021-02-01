import { h, computed, defineComponent, inject, PropType } from 'vue'
import { NCheckbox } from '../../checkbox'
import { TransferInjection } from './interface'

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
    const NTransfer = inject<TransferInjection>(
      'NTransfer'
    ) as TransferInjection
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
      return (
        <div class="n-transfer-list-header">
          <div class="n-transfer-list-header__checkbox">
            <NCheckbox
              theme={NTransfer.mergedTheme.peers.Checkbox}
              themeOverrides={NTransfer.mergedTheme.peerOverrides.Checkbox}
              checked={checkboxProps.checked}
              indeterminate={checkboxProps.indeterminate}
              disabled={checkboxProps.disabled || NTransfer.disabled}
              onUpdateChecked={props.onChange}
            />
          </div>
          <div class="n-transfer-list-header__header">{props.title}</div>
          <div class="n-transfer-list-header__extra">
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
