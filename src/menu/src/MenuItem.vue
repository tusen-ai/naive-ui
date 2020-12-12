<template>
  <div
    class="n-menu-item"
    :class="{
      'n-menu-item--selected': selected,
      'n-menu-item--disabled': mergedDisabled
    }"
  >
    <n-tooltip
      trigger="hover"
      :placement="popoverPlacement"
      :disabled="!popoverEnabled"
    >
      <template #trigger>
        <n-menu-item-content
          :padding-left="delayedPaddingLeft"
          :max-icon-size="maxIconSize"
          :active-icon-size="activeIconSize"
          :title="title"
          :disabled="mergedDisabled"
          :extra="extra"
          :icon="icon"
          @click="handleClick"
        />
      </template>
      {{ title }}
    </n-tooltip>
  </div>
</template>

<script>
import { computed } from 'vue'
import NMenuItemContent from './MenuItemContent.vue'
import { NTooltip } from '../../tooltip'
import menuChildMixin from './menu-child-mixin'
import { useMemo } from 'vooks'
import { useInjectionRef } from '../../_utils/composable'

export default {
  name: 'MenuItem',
  components: {
    NMenuItemContent,
    NTooltip
  },
  mixins: [menuChildMixin],
  props: {
    tmNode: {
      type: Object,
      required: true
    },
    extra: {
      type: [String, Function],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Function,
      default: undefined
    },
    onClick: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const rootMenuValueRef = useInjectionRef('NMenu', 'mergedValue')
    const submenuDisabledRef = useInjectionRef(
      'NSubmenu',
      'mergedDisabled',
      false
    )
    const mergedDisabledRef = computed(() => {
      return submenuDisabledRef.value || props.disabled
    })
    return {
      selected: useMemo(() => {
        if (rootMenuValueRef.value === props.internalKey) return true
        return false
      }),
      mergedDisabled: mergedDisabledRef
    }
  },
  computed: {
    popoverEnabled () {
      return (
        !this.horizontal &&
        this.root &&
        this.menuCollapsed &&
        !this.mergedDisabled
      )
    }
  },
  methods: {
    doClick (e) {
      const { onClick } = this
      if (onClick) onClick(e)
    },
    handleClick (e) {
      if (!this.mergedDisabled) {
        this.NMenu.doSelect(this.internalKey, this.tmNode.rawNode)
        this.doClick(e)
      }
    }
  }
}
</script>
