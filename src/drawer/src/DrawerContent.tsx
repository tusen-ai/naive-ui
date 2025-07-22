import type { ScrollbarProps } from '../../_internal'
import type { ExtractPublicPropTypes } from '../../_utils'
import {
  defineComponent,
  h,
  inject,
  type PropType,
  type SlotsType,
  type StyleValue,
  type VNode
} from 'vue'
import { NBaseClose, NScrollbar } from '../../_internal'
import { throwError } from '../../_utils'
import { drawerInjectionKey } from './interface'

export const drawerContentProps = {
  title: String,
  headerClass: String,
  headerStyle: Object as PropType<StyleValue>,
  footerClass: String,
  footerStyle: Object as PropType<StyleValue>,
  bodyClass: String,
  bodyStyle: Object as PropType<StyleValue>,
  bodyContentClass: String,
  bodyContentStyle: Object as PropType<StyleValue>,
  nativeScrollbar: { type: Boolean, default: true },
  scrollbarProps: Object as PropType<ScrollbarProps>,
  closable: Boolean
}

export type DrawerContentProps = ExtractPublicPropTypes<
  typeof drawerContentProps
>

export interface DrawerContentSlots {
  default?: () => VNode[]
  header?: () => VNode[]
  footer?: () => VNode[]
}

export default defineComponent({
  name: 'DrawerContent',
  props: drawerContentProps,
  slots: Object as SlotsType<DrawerContentSlots>,
  setup() {
    const NDrawer = inject(drawerInjectionKey, null)
    if (!NDrawer) {
      throwError(
        'drawer-content',
        '`n-drawer-content` must be placed inside `n-drawer`.'
      )
    }
    const { doUpdateShow } = NDrawer
    function handleCloseClick(): void {
      doUpdateShow(false)
    }
    return {
      handleCloseClick,
      mergedTheme: NDrawer.mergedThemeRef,
      mergedClsPrefix: NDrawer.mergedClsPrefixRef
    }
  },
  render() {
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
          nativeScrollbar
          && `${mergedClsPrefix}-drawer-content--native-scrollbar`
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
            contentClass={[
              `${mergedClsPrefix}-drawer-body-content-wrapper`,
              bodyContentClass
            ]}
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
