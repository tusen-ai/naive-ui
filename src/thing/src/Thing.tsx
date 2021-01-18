import {
  h,
  renderSlot,
  defineComponent,
  computed,
  CSSProperties,
  Fragment
} from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { thingLight } from '../styles'
import type { ThingTheme } from '../styles'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Thing',
  props: {
    ...(useTheme.props as ThemeProps<ThingTheme>),
    title: {
      type: String,
      default: undefined
    },
    titleExtra: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    content: {
      type: String,
      default: undefined
    },
    contentIndented: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { slots }) {
    const themeRef = useTheme('Thing', 'Thing', style, thingLight, props)
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
      return (
        <div class="n-thing" style={cssVarsRef.value as CSSProperties}>
          {slots.avatar && props.contentIndented ? (
            <div class="n-thing-avatar">{renderSlot(slots, 'avatar')}</div>
          ) : null}
          <div class="n-thing-main">
            {!props.contentIndented &&
            (slots.header ||
              props.title ||
              slots['header-extra'] ||
              props.titleExtra ||
              slots.avatar) ? (
                <div class="n-thing-avatar-header-wrapper">
                  {slots.avatar ? (
                    <div class="n-thing-avatar">
                      {renderSlot(slots, 'avatar')}
                    </div>
                  ) : null}
                  {slots.header ||
                props.title ||
                slots['header-extra'] ||
                props.titleExtra ? (
                      <div class="n-thing-header-wrapper">
                        <div class="n-thing-header">
                          {slots.header || props.title ? (
                            <div class="n-thing-header__title">
                              {renderSlot(slots, 'header', undefined, () => [
                                props.title
                              ])}
                            </div>
                          ) : null}
                          {slots['header-extra'] || props.titleExtra ? (
                            <div class="n-thing-header__extra">
                              {renderSlot(slots, 'header-extra', undefined, () => [
                                props.titleExtra
                              ])}
                            </div>
                          ) : null}
                        </div>
                        {slots.description || props.description ? (
                          <div class="n-thing-main__description">
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
                      <div class="n-thing-header">
                        {slots.header || props.title ? (
                          <div class="n-thing-header__title">
                            {renderSlot(slots, 'header', undefined, () => [
                              props.title
                            ])}
                          </div>
                        ) : null}
                        {slots['header-extra'] || props.titleExtra ? (
                          <div class="n-thing-header__extra">
                            {renderSlot(slots, 'header-extra', undefined, () => [
                              props.titleExtra
                            ])}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  {slots.description || props.description ? (
                    <div class="n-thing-main__description">
                      {renderSlot(slots, 'description', undefined, () => [
                        props.description
                      ])}
                    </div>
                  ) : null}
                </>
              )}
            {slots.default || props.content ? (
              <div class="n-thing-main__content">
                {renderSlot(slots, 'default', undefined, () => [props.content])}
              </div>
            ) : null}
            {slots.footer ? (
              <div class="n-thing-main__footer">
                {renderSlot(slots, 'footer')}
              </div>
            ) : null}
            {slots.action ? (
              <div class="n-thing-main__action">
                {renderSlot(slots, 'action')}
              </div>
            ) : null}
          </div>
        </div>
      )
    }
  }
})
