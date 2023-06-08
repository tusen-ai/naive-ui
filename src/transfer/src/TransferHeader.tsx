import { h, defineComponent, inject, type PropType } from 'vue'
import { NButton } from '../../button'
import { useLocale } from '../../_mixins'
import { transferInjectionKey } from './interface'

export default defineComponent({
  name: 'TransferHeader',
  props: {
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      required: true
    },
    selectAllText: String,
    clearText: String,
    source: Boolean,
    onCheckedAll: Function as PropType<() => void>,
    onClearAll: Function as PropType<() => void>,
    title: String
  },
  setup (props) {
    const {
      targetOptionsRef,
      canNotSelectAnythingRef,
      canBeClearedRef,
      allCheckedRef,
      mergedThemeRef,
      disabledRef,
      mergedClsPrefixRef,
      srcOptionsLengthRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(transferInjectionKey)!
    const { localeRef } = useLocale('Transfer')
    return () => {
      const { source, onClearAll, onCheckedAll, selectAllText, clearText } =
        props
      const { value: mergedTheme } = mergedThemeRef
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      const { value: locale } = localeRef
      const buttonSize = props.size === 'large' ? 'small' : 'tiny'
      const { title } = props
      return (
        <div class={`${mergedClsPrefix}-transfer-list-header`}>
          {title && (
            <div class={`${mergedClsPrefix}-transfer-list-header__title`}>
              {title}
            </div>
          )}
          {source && (
            <NButton
              class={`${mergedClsPrefix}-transfer-list-header__button`}
              theme={mergedTheme.peers.Button}
              themeOverrides={mergedTheme.peerOverrides.Button}
              size={buttonSize}
              tertiary
              onClick={allCheckedRef.value ? onClearAll : onCheckedAll}
              disabled={canNotSelectAnythingRef.value || disabledRef.value}
            >
              {{
                default: () =>
                  allCheckedRef.value
                    ? clearText || locale.unselectAll
                    : selectAllText || locale.selectAll
              }}
            </NButton>
          )}
          {!source && canBeClearedRef.value && (
            <NButton
              class={`${mergedClsPrefix}-transfer-list-header__button`}
              theme={mergedTheme.peers.Button}
              themeOverrides={mergedTheme.peerOverrides.Button}
              size={buttonSize}
              tertiary
              onClick={onClearAll}
              disabled={disabledRef.value}
            >
              {{
                default: () => locale.clearAll
              }}
            </NButton>
          )}
          <div class={`${mergedClsPrefix}-transfer-list-header__extra`}>
            {source
              ? locale.total(srcOptionsLengthRef.value)
              : locale.selected(targetOptionsRef.value.length)}
          </div>
        </div>
      )
    }
  }
})
