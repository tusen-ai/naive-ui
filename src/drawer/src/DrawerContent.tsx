import { CSSProperties, defineComponent, h, inject, PropType, toRef } from 'vue'
import { NBaseClose, NScrollbar } from '../../_internal'
import type { ScrollbarProps } from '../../_internal'
import { throwError } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { drawerInjectionKey } from './interface'
import { useMergedState } from 'vooks'

const drawerContentProps = {
  title: {
    type: String
  },
  headerStyle: [Object, String] as PropType<string | CSSProperties>,
  footerStyle: [Object, String] as PropType<string | CSSProperties>,
  bodyStyle: [Object, String] as PropType<string | CSSProperties>,
  bodyContentStyle: [Object, String] as PropType<string | CSSProperties>,
  nativeScrollbar: {
    type: Boolean,
    default: undefined
  },
  scrollbarProps: Object as PropType<ScrollbarProps>,
  closable: Boolean
}

export type DrawerContentProps = ExtractPublicPropTypes<
  typeof drawerContentProps
>

export default defineComponent({
  name: 'DrawerContent',
  props: drawerContentProps,
  setup (props) {
    const NDrawer = inject(drawerInjectionKey, null)
    if (!NDrawer) {
      throwError(
        'drawer-content',
        '`n-drawer-content` must be placed inside `n-drawer`.'
      )
    }
    const { doUpdateShow, nativeScrollRef } = NDrawer
    function handleCloseClick (): void {
      doUpdateShow(false)
    }
    const mergedNativeScrollbarRef = useMergedState(toRef(props, 'nativeScrollbar'), nativeScrollRef)
    return {
      handleCloseClick,
      mergedTheme: NDrawer.mergedThemeRef,
      mergedClsPrefix: NDrawer.mergedClsPrefixRef,
      mergedNativeScrollbar: mergedNativeScrollbarRef
    }
  },
  render () {
    const {
      title,
      mergedClsPrefix,
      mergedNativeScrollbar,
      mergedTheme,
      bodyStyle,
      bodyContentStyle,
      headerStyle,
      footerStyle,
      scrollbarProps,
      closable,
      $slots
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-drawer-content`,
          mergedNativeScrollbar &&
            `${mergedClsPrefix}-drawer-content--native-scrollbar`
        ]}
      >
        {$slots.header || title || closable ? (
          <div class={`${mergedClsPrefix}-drawer-header`} style={headerStyle}>
            <div class={`${mergedClsPrefix}-drawer-header__main`}>
              {$slots.header !== undefined ? $slots.header() : title}
            </div>
            {closable && (
              <NBaseClose
                onClick={this.handleCloseClick}
                clsPrefix={mergedClsPrefix}
                class={`${mergedClsPrefix}-drawer-header__close`}
              />
            )}
          </div>
        ) : null}
        {mergedNativeScrollbar ? (
          <div class={`${mergedClsPrefix}-drawer-body`} style={bodyStyle}>
            <div
              class={`${mergedClsPrefix}-drawer-body-content-wrapper`}
              style={bodyContentStyle}
            >
              {$slots}
            </div>
          </div>
        ) : (
          <NScrollbar
            themeOverrides={mergedTheme.peerOverrides.Scrollbar}
            theme={mergedTheme.peers.Scrollbar}
            {...scrollbarProps}
            class={`${mergedClsPrefix}-drawer-body`}
            contentClass={`${mergedClsPrefix}-drawer-body-content-wrapper`}
            contentStyle={bodyContentStyle}
          >
            {$slots}
          </NScrollbar>
        )}
        {$slots.footer ? (
          <div class={`${mergedClsPrefix}-drawer-footer`} style={footerStyle}>
            {$slots.footer()}
          </div>
        ) : null}
      </div>
    )
  }
})
