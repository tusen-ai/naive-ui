import { h, defineComponent, inject, PropType } from 'vue'
import { NCheckbox } from '../../checkbox'
import { useLocale } from '../../_mixins'
import { transferInjectionKey } from './interface'

export default defineComponent({
  name: 'TransferHeader',
  props: {
    source: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function as PropType<(value: boolean) => void>
    },
    title: String
  },
  setup (props) {
    const {
      srcOptsRef,
      tgtOptsRef,
      srcCheckedStatusRef,
      mergedThemeRef,
      disabledRef,
      mergedClsPrefixRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(transferInjectionKey)!
    const { localeRef } = useLocale('Transfer')
    return () => {
      const { source } = props
      const { value: srcCheckedStatus } = srcCheckedStatusRef
      const { value: mergedTheme } = mergedThemeRef
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      const { value: locale } = localeRef
      return (
        <div class={`${mergedClsPrefix}-transfer-list-header`}>
          {source && (
            <div class={`${mergedClsPrefix}-transfer-list-header__checkbox`}>
              <NCheckbox
                theme={mergedTheme.peers.Checkbox}
                themeOverrides={mergedTheme.peerOverrides.Checkbox}
                checked={srcCheckedStatus.checked}
                indeterminate={srcCheckedStatus.indeterminate}
                disabled={srcCheckedStatus.disabled || disabledRef.value}
                onUpdateChecked={props.onChange}
              />
            </div>
          )}
          <div class={`${mergedClsPrefix}-transfer-list-header__header`}>
            {props.title}
          </div>
          <div class={`${mergedClsPrefix}-transfer-list-header__extra`}>
            {source
              ? locale.total(srcOptsRef.value.length)
              : locale.selectedTotal(tgtOptsRef.value.length)}
          </div>
        </div>
      )
    }
  }
})
