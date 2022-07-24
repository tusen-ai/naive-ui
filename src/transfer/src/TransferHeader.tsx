import { h, defineComponent, inject, PropType } from 'vue'
import { NButton } from '../../button'
import { useLocale } from '../../_mixins'
import { transferInjectionKey } from './interface'

export default defineComponent({
  name: 'TransferHeader',
  props: {
    source: {
      type: Boolean,
      default: false
    },
    onCheckedAll: {
      type: Function as PropType<() => void>
    },
    onClearAll: {
      type: Function as PropType<() => void>
    },
    title: String
  },
  setup (props) {
    const {
      srcOptsRef,
      tgtOptsRef,
      headerBtnStatusRef,
      mergedThemeRef,
      disabledRef,
      mergedClsPrefixRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(transferInjectionKey)!
    const { localeRef } = useLocale('Transfer')
    return () => {
      const { source, onClearAll, onCheckedAll } = props
      const { value: headerBtnStatus } = headerBtnStatusRef
      const { value: mergedTheme } = mergedThemeRef
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      const { value: locale } = localeRef
      return (
        <div class={`${mergedClsPrefix}-transfer-list-header`}>
          {source && (
            <div class={`${mergedClsPrefix}-transfer-list-header__button`}>
              <NButton
                theme={mergedTheme.peers.Button}
                themeOverrides={mergedTheme.peerOverrides.Button}
                size="tiny"
                tertiary
                onClick={headerBtnStatus.allChecked ? onClearAll : onCheckedAll}
                disabled={headerBtnStatus.disabled || disabledRef.value}
              >
                {{
                  default: () =>
                    headerBtnStatus.allChecked ? '取消全选' : '全选'
                }}
              </NButton>
            </div>
          )}
          {!source && headerBtnStatus.checked && (
            <div class={`${mergedClsPrefix}-transfer-list-header__button`}>
              <NButton
                theme={mergedTheme.peers.Button}
                themeOverrides={mergedTheme.peerOverrides.Button}
                size="tiny"
                tertiary
                onClick={onClearAll}
                disabled={headerBtnStatus.disabled || disabledRef.value}
              >
                {{
                  default: () => '清空'
                }}
              </NButton>
            </div>
          )}
          {/* <div class={`${mergedClsPrefix}-transfer-list-header__header`}>
            {props.title}
          </div> */}
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
