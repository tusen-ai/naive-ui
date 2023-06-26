import { h, computed, defineComponent, inject, type PropType } from 'vue'
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
    const {
      srcOptsRef,
      tgtOptsRef,
      srcCheckedStatusRef,
      tgtCheckedStatusRef,
      srcCheckedValuesRef,
      tgtCheckedValuesRef,
      mergedThemeRef,
      disabledRef,
      mergedClsPrefixRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(transferInjectionKey)!
    const checkboxPropsRef = computed(() => {
      const { source } = props
      if (source) {
        return srcCheckedStatusRef.value
      } else {
        return tgtCheckedStatusRef.value
      }
    })
    return () => {
      const { source } = props
      const { value: checkboxProps } = checkboxPropsRef
      const { value: mergedTheme } = mergedThemeRef
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      return (
        <div class={`${mergedClsPrefix}-legacy-transfer-list-header`}>
          <div
            class={`${mergedClsPrefix}-legacy-transfer-list-header__checkbox`}
          >
            <NCheckbox
              theme={mergedTheme.peers.Checkbox}
              themeOverrides={mergedTheme.peerOverrides.Checkbox}
              checked={checkboxProps.checked}
              indeterminate={checkboxProps.indeterminate}
              disabled={checkboxProps.disabled || disabledRef.value}
              onUpdateChecked={props.onChange}
            />
          </div>
          <div class={`${mergedClsPrefix}-legacy-transfer-list-header__header`}>
            {props.title}
          </div>
          <div class={`${mergedClsPrefix}-legacy-transfer-list-header__extra`}>
            {source
              ? srcCheckedValuesRef.value.length
              : tgtCheckedValuesRef.value.length}
            /{source ? srcOptsRef.value.length : tgtOptsRef.value.length}
          </div>
        </div>
      )
    }
  }
})
