import {
  h,
  defineComponent,
  PropType,
  CSSProperties,
  InjectionKey,
  provide
} from 'vue'
import type { Size } from './interface'
import NAvatar from './Avatar'
import { NPopover } from '../../popover'
import { NTooltip } from '../../tooltip'
import { NDropdown } from '../../dropdown'
import { useConfig, useStyle } from '../../_mixins'
import { flatten } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/avatar-group.cssr'

export interface AvatarGroupInjection {
  size?: Size | undefined
  round?: Boolean | undefined
  circle?: Boolean | undefined
  bordered?: Boolean
}

interface AvatarOption {
  src: string
  name: string
}

export const avatarGroupInjectionKey: InjectionKey<AvatarGroupInjection> =
  Symbol('avatar-group')

const avatarGroupProps = {
  bordered: {
    type: Boolean,
    default: true
  },
  circle: Boolean,
  maxAvatarCount: Number,
  maxAvatarStyle: [Object, String] as PropType<CSSProperties | string>,
  options: {
    type: Array as PropType<AvatarOption[]>,
    default: () => []
  },
  round: Boolean,
  vertical: Boolean,
  size: {
    type: [String, Number] as PropType<Size | undefined>,
    default: undefined
  }
} as const

export type AvatarGroupProps = ExtractPublicPropTypes<typeof avatarGroupProps>

export default defineComponent({
  name: 'AvatarGroup',
  props: avatarGroupProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    useStyle('AvatarGroup', style, mergedClsPrefixRef)
    provide(avatarGroupInjectionKey, props)
    return {
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { mergedClsPrefix, maxAvatarCount, maxAvatarStyle, options } = this
    const children = flatten(this.$slots.default?.() ?? [])
    let childrenShown
    if (children.length) {
      childrenShown = children.slice(0, maxAvatarCount)
      if (maxAvatarCount && children.length > maxAvatarCount) {
        const childrenHidden = children.slice(maxAvatarCount, children.length)
        childrenShown.push(
          <NPopover>
            {{
              trigger: () => (
                <NAvatar style={maxAvatarStyle}>
                  {{ default: () => `+${children.length - maxAvatarCount}` }}
                </NAvatar>
              ),
              default: () => (
                <div class={`${mergedClsPrefix}-avatar-group`}>
                  {childrenHidden}
                </div>
              )
            }}
          </NPopover>
        )
      }
    } else {
      childrenShown = options?.slice(0, maxAvatarCount).map((v) => (
        <NTooltip>
          {{
            trigger: () => <NAvatar src={v.src} />,
            default: () => v.name
          }}
        </NTooltip>
      ))
      if (maxAvatarCount && options?.length > maxAvatarCount) {
        childrenShown.push(
          <NDropdown
            options={options
              .slice(maxAvatarCount, options.length)
              .map((v, i) => ({
                label: v.name,
                icon: () => h(NAvatar, { src: v.src, size: 22 }),
                key: `${v.name}${i}`
              }))}
          >
            {{
              default: () => (
                <NAvatar style={maxAvatarStyle}>
                  {{
                    default: () => `+${options.length - maxAvatarCount}`
                  }}
                </NAvatar>
              )
            }}
          </NDropdown>
        )
      }
    }
    return (
      <div
        class={[
          `${mergedClsPrefix}-avatar-group`,
          this.vertical && `${mergedClsPrefix}-avatar-group--vertical`
        ]}
        role="group"
      >
        {childrenShown}
      </div>
    )
  }
})
