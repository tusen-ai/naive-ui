import {
  h,
  defineComponent,
  PropType,
  CSSProperties,
  InjectionKey,
  provide,
  computed
} from 'vue'
import type { Size } from './interface'
import NAvatar from './Avatar'
import { useConfig, useStyle } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/avatar-group.cssr'

export interface AvatarGroupInjection {
  size?: Size | undefined
}

interface AvatarOption {
  src: string
}

export const avatarGroupInjectionKey: InjectionKey<AvatarGroupInjection> =
  Symbol('avatar-group')

const avatarGroupProps = {
  max: Number,
  maxStyle: [Object, String] as PropType<CSSProperties | string>,
  options: {
    type: Array as PropType<AvatarOption[]>,
    default: () => []
  },
  vertical: Boolean,
  size: [String, Number] as PropType<Size | undefined>
} as const

export type AvatarGroupProps = ExtractPublicPropTypes<typeof avatarGroupProps>

export default defineComponent({
  name: 'AvatarGroup',
  props: avatarGroupProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    useStyle('AvatarGroup', style, mergedClsPrefixRef)
    provide(avatarGroupInjectionKey, props)
    const restOptionsRef = computed(() => {
      const { max } = props
      if (max === undefined) return undefined
      const { options } = props
      return options.slice(max, options.length)
    })
    const displayedOptionsRef = computed(() => {
      const { options, max } = props
      if (max === undefined) return options
      if (options.length > max) return options.slice(0, max - 1)
      if (options.length === max) return options.slice(0, max)
      return options
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      restOptions: restOptionsRef,
      displayedOptions: displayedOptionsRef
    }
  },
  render () {
    const { mergedClsPrefix, displayedOptions, restOptions, $slots } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-avatar-group`,
          this.vertical && `${mergedClsPrefix}-avatar-group--vertical`
        ]}
        role="group"
      >
        {displayedOptions.map((option) => {
          return $slots.avatar ? (
            $slots.avatar({ option })
          ) : (
            <NAvatar src={option.src} />
          )
        })}
        {restOptions !== undefined &&
          restOptions.length > 0 &&
          ($slots.rest ? (
            $slots.rest({ options: restOptions, rest: restOptions.length })
          ) : (
            <NAvatar style={this.maxStyle}>
              {{
                default: () => `+${restOptions.length}`
              }}
            </NAvatar>
          ))}
      </div>
    )
  }
})
