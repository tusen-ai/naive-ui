import {
  type CSSProperties,
  defineComponent,
  h,
  inject,
  type PropType
} from 'vue'
import { NBaseClose, NScrollbar } from '../../_internal'
import type { ScrollbarProps } from '../../_internal'
import { throwError } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { drawerInjectionKey } from './interface'

export const drawerContentProps = {
  title: {
    type: String
  },
  headerClass: String,
  headerStyle: [Object, String] as PropType<string | CSSProperties>,
  footerClass: String,
  footerStyle: [Object, String] as PropType<string | CSSProperties>,
  bodyClass: String,
  bodyStyle: [Object, String] as PropType<string | CSSProperties>,
  bodyContentClass: String,
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
      bodyClass,
      bodyStyle,
      bodyContentClass,
      bodyContentStyle,
      headerClass,
      headerStyle,
      footerClass,
      footerStyle,
      scrollbarProps,
      closable,
      $slots
    } = this
    return (
      <div
        role="none"
        class={[
          `${mergedClsPrefix}-drawer-content`,
          nativeScrollbar &&
            `${mergedClsPrefix}-drawer-content--native-scrollbar`
        ]}
      >
        {$slots.header || title || closable ? (
          <div
            class={[`${mergedClsPrefix}-drawer-header`, headerClass]}
            style={headerStyle}
            role="none"
          >
            <div
              class={`${mergedClsPrefix}-drawer-header__main`}
              role="heading"
              aria-level="1"
            >
              {$slots.header !== undefined ? $slots.header() : title}
            </div>
            {closable && (
              <NBaseClose
                onClick={this.handleCloseClick}
                clsPrefix={mergedClsPrefix}
                class={`${mergedClsPrefix}-drawer-header__close`}
                absolute
              />
            )}
          </div>
        ) : null}
        {nativeScrollbar ? (
          <div
            class={[`${mergedClsPrefix}-drawer-body`, bodyClass]}
            style={bodyStyle}
            role="none"
          >
            <div
              class={[
                `${mergedClsPrefix}-drawer-body-content-wrapper`,
                bodyContentClass
              ]}
              style={bodyContentStyle}
              role="none"
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
            contentClass={`${mergedClsPrefix}-drawer-body-content-wrapper ${
              bodyContentClass ?? ''
            }`}
            contentStyle={bodyContentStyle}
          >
            {$slots}
          </NScrollbar>
        )}
        {$slots.footer ? (
          <div
            class={[`${mergedClsPrefix}-drawer-footer`, footerClass]}
            style={footerStyle}
            role="none"
          >
            {$slots.footer()}
          </div>
        ) : null}
      </div>
    )
  }
})
