import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { Size } from '../../avatar/src/interface'
import type { AvatarGroupTheme } from '../styles'
import type {
  AvatarGroupAvatarSlotProps,
  AvatarGroupRestSlotProps
} from './interface'
import {
  computed,
  type CSSProperties,
  defineComponent,
  h,
  type PropType,
  provide,
  type SlotsType,
  type VNode
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import { useRtl } from '../../_mixins/use-rtl'
import NAvatar from '../../avatar/src/Avatar'
import { avatarGroupInjectionKey } from '../../avatar/src/context'
import { avatarGroupLight } from '../styles'
import style from './styles/avatar-group.cssr'

export interface AvatarGroupInjection {
  size?: Size | undefined
}

export interface AvatarGroupOption {
  src: string
}

export const avatarGroupProps = {
  ...(useTheme.props as ThemeProps<AvatarGroupTheme>),
  max: Number,
  maxStyle: [Object, String] as PropType<CSSProperties | string>,
  options: {
    type: Array as PropType<AvatarGroupOption[]>,
    default: () => []
  },
  vertical: Boolean,
  expandOnHover: Boolean,
  size: [String, Number] as PropType<Size | undefined>
} as const

export type AvatarGroupProps = ExtractPublicPropTypes<typeof avatarGroupProps>

export interface AvatarGroupSlots {
  avatar?: (props: AvatarGroupAvatarSlotProps) => VNode[]
  rest?: (props: AvatarGroupRestSlotProps) => VNode[]
  default?: () => VNode[]
}

export default defineComponent({
  name: 'AvatarGroup',
  props: avatarGroupProps,
  slots: Object as SlotsType<AvatarGroupSlots>,
  setup(props) {
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props)
    const mergedThemeRef = useTheme(
      'AvatarGroup',
      '-avatar-group',
      style,
      avatarGroupLight,
      props,
      mergedClsPrefixRef
    )
    provide(avatarGroupInjectionKey, props)
    const rtlEnabledRef = useRtl(
      'AvatarGroup',
      mergedRtlRef,
      mergedClsPrefixRef
    )
    const restOptionsRef = computed(() => {
      const { max } = props
      if (max === undefined)
        return undefined
      const { options } = props
      if (options.length > max)
        return options.slice(max - 1, options.length)
      return []
    })
    const displayedOptionsRef = computed(() => {
      const { options, max } = props
      if (max === undefined)
        return options
      if (options.length > max)
        return options.slice(0, max - 1)
      if (options.length === max)
        return options.slice(0, max)
      return options
    })
    return {
      mergedTheme: mergedThemeRef,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      restOptions: restOptionsRef,
      displayedOptions: displayedOptionsRef,
      cssVars: computed(() => {
        return {
          '--n-gap': mergedThemeRef.value.self.gap
        }
      })
    }
  },
  render() {
    const {
      mergedClsPrefix,
      displayedOptions,
      restOptions,
      mergedTheme,
      $slots
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-avatar-group`,
          this.rtlEnabled && `${mergedClsPrefix}-avatar-group--rtl`,
          this.vertical && `${mergedClsPrefix}-avatar-group--vertical`,
          this.expandOnHover
          && `${mergedClsPrefix}-avatar-group--expand-on-hover`
        ]}
        style={this.cssVars}
        role="group"
      >
        {displayedOptions.map((option) => {
          return $slots.avatar ? (
            $slots.avatar({ option })
          ) : (
            <NAvatar
              src={option.src}
              theme={mergedTheme.peers.Avatar}
              themeOverrides={mergedTheme.peerOverrides.Avatar}
            />
          )
        })}
        {restOptions !== undefined
        && restOptions.length > 0
        && ($slots.rest ? (
          $slots.rest({ options: restOptions, rest: restOptions.length })
        ) : (
          <NAvatar
            style={this.maxStyle}
            theme={mergedTheme.peers.Avatar}
            themeOverrides={mergedTheme.peerOverrides.Avatar}
          >
            {{
              default: () => `+${restOptions.length}`
            }}
          </NAvatar>
        ))}
      </div>
    )
  }
})
