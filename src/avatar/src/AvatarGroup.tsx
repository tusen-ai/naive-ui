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
import { NSpace } from '../../space'
import { useConfig, useStyle } from '../../_mixins'
import { flatten } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/avatar-group.cssr'

export interface AvatarGroupInjection {
  size?: Size | undefined
  round?: Boolean | undefined
  circle?: Boolean | undefined
}

export const avatarGroupInjectionKey: InjectionKey<AvatarGroupInjection> =
  Symbol('avatar-group')

const avatarGroupProps = {
  vertical: Boolean,
  maxAvatarCount: Number,
  maxAvatarStyle: [Object, String] as PropType<CSSProperties | string>,
  size: {
    type: String as PropType<Size | undefined>,
    default: undefined
  },
  round: Boolean,
  circle: Boolean
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
    const { mergedClsPrefix } = this
    const defaultSlots = this.$slots.default?.() ?? []
    const children = flatten(defaultSlots)
    const { maxAvatarCount, maxAvatarStyle } = this.$props
    const childrenShown = children.slice(0, maxAvatarCount)
    if (maxAvatarCount && children.length > maxAvatarCount) {
      const childrenHidden = children.slice(maxAvatarCount, children.length)
      childrenShown.push(
        <NPopover>
          {{
            trigger: () => (
              <NAvatar style={maxAvatarStyle}>{`+${
                children.length - maxAvatarCount
              }`}</NAvatar>
            ),
            default: () => <NSpace>{childrenHidden}</NSpace>
          }}
        </NPopover>
      )
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
