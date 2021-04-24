import {
  h,
  renderSlot,
  defineComponent,
  computed,
  CSSProperties,
  Fragment
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { ThemeProps } from '../../_mixins'
import { thingLight } from '../styles'
import type { ThingTheme } from '../styles'
import style from './styles/index.cssr'

const thingProps = {
  ...(useTheme.props as ThemeProps<ThingTheme>),
  title: String,
  titleExtra: String,
  description: String,
  content: String,
  contentIndented: {
    type: Boolean,
    default: false
  }
}

export type ThingProps = ExtractPublicPropTypes<typeof thingProps>

export default defineComponent({
  name: 'Thing',
  props: thingProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Thing',
      'Thing',
      style,
      thingLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        self: { titleTextColor, textColor, titleFontWeight, fontSize },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--bezier': cubicBezierEaseInOut,
        '--font-size': fontSize,
        '--text-color': textColor,
        '--title-font-weight': titleFontWeight,
        '--title-text-color': titleTextColor
      }
    })
    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      return (
        <div
          class={`${mergedClsPrefix}-thing`}
          style={cssVarsRef.value as CSSProperties}
        >
          {slots.avatar && props.contentIndented ? (
            <div class={`${mergedClsPrefix}-thing-avatar`}>
              {renderSlot(slots, 'avatar')}
            </div>
          ) : null}
          <div class={`${mergedClsPrefix}-thing-main`}>
            {!props.contentIndented &&
            (slots.header ||
              props.title ||
              slots['header-extra'] ||
              props.titleExtra ||
              slots.avatar) ? (
                <div class={`${mergedClsPrefix}-thing-avatar-header-wrapper`}>
                  {slots.avatar ? (
                    <div class={`${mergedClsPrefix}-thing-avatar`}>
                      {renderSlot(slots, 'avatar')}
                    </div>
                  ) : null}
                  {slots.header ||
                props.title ||
                slots['header-extra'] ||
                props.titleExtra ? (
                      <div class={`${mergedClsPrefix}-thing-header-wrapper`}>
                        <div class={`${mergedClsPrefix}-thing-header`}>
                          {slots.header || props.title ? (
                            <div class={`${mergedClsPrefix}-thing-header__title`}>
                              {renderSlot(slots, 'header', undefined, () => [
                                props.title
                              ])}
                            </div>
                          ) : null}
                          {slots['header-extra'] || props.titleExtra ? (
                            <div class={`${mergedClsPrefix}-thing-header__extra`}>
                              {renderSlot(slots, 'header-extra', undefined, () => [
                                props.titleExtra
                              ])}
                            </div>
                          ) : null}
                        </div>
                        {slots.description || props.description ? (
                          <div class={`${mergedClsPrefix}-thing-main__description`}>
                            {renderSlot(slots, 'description', undefined, () => [
                              props.description
                            ])}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                </div>
              ) : (
                <>
                  {slots.header ||
                props.title ||
                slots['header-extra'] ||
                props.titleExtra ? (
                      <div class={`${mergedClsPrefix}-thing-header`}>
                        {slots.header || props.title ? (
                          <div class={`${mergedClsPrefix}-thing-header__title`}>
                            {renderSlot(slots, 'header', undefined, () => [
                              props.title
                            ])}
                          </div>
                        ) : null}
                        {slots['header-extra'] || props.titleExtra ? (
                          <div class={`${mergedClsPrefix}-thing-header__extra`}>
                            {renderSlot(slots, 'header-extra', undefined, () => [
                              props.titleExtra
                            ])}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  {slots.description || props.description ? (
                    <div class={`${mergedClsPrefix}-thing-main__description`}>
                      {renderSlot(slots, 'description', undefined, () => [
                        props.description
                      ])}
                    </div>
                  ) : null}
                </>
              )}
            {slots.default || props.content ? (
              <div class={`${mergedClsPrefix}-thing-main__content`}>
                {renderSlot(slots, 'default', undefined, () => [props.content])}
              </div>
            ) : null}
            {slots.footer ? (
              <div class={`${mergedClsPrefix}-thing-main__footer`}>
                {renderSlot(slots, 'footer')}
              </div>
            ) : null}
            {slots.action ? (
              <div class={`${mergedClsPrefix}-thing-main__action`}>
                {renderSlot(slots, 'action')}
              </div>
            ) : null}
          </div>
        </div>
      )
    }
  }
})
