import { CSSProperties, defineComponent, h, inject, PropType } from 'vue'
import { NBaseClose } from '../../_internal'
import { NScrollbar } from '../../scrollbar'
import type { ScrollbarProps } from '../../scrollbar'
import { throwError } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { drawerInjectionKey } from './interface'

const drawerContentProps = {
  title: {
    type: String
  },
  headerStyle: [Object, String] as PropType<string | CSSProperties>,
  footerStyle: [Object, String] as PropType<string | CSSProperties>,
  bodyStyle: [Object, String] as PropType<string | CSSProperties>,
  bodyContentStyle: [Object, String] as PropType<string | CSSProperties>,
  nativeScrollbar: { type: Boolean, default: true },
  scrollbarProps: Object as PropType<ScrollbarProps>,
  closable: Boolean
}

export type DrawerContentProps = ExtractPublicPropTypes<
  typeof drawerContentProps
>

export default defineComponent({
  name: 'DrawerContent',
  props: drawerContentProps,
  setup () {
    const NDrawer = inject(drawerInjectionKey, null)
    if (!NDrawer) {
      throwError(
        'drawer-content',
        '`n-drawer-content` must be placed inside `n-drawer`.'
      )
    }
    const { doUpdateShow } = NDrawer
    function handleCloseClick (): void {
      doUpdateShow(false)
    }
    return {
      handleCloseClick,
      mergedTheme: NDrawer.mergedThemeRef,
      mergedClsPrefix: NDrawer.mergedClsPrefixRef
    }
  },
  render () {
    const {
      title,
      mergedClsPrefix,
      nativeScrollbar,
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
          nativeScrollbar &&
            `${mergedClsPrefix}-drawer-content--native-scrollbar`
        ]}
        style={headerStyle}
      >
        {$slots.header || title || closable ? (
          <div class={`${mergedClsPrefix}-drawer-header`}>
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
        {nativeScrollbar ? (
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
