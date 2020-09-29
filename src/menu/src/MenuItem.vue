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
      <template v-slot:trigger>
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
import { toRef, computed } from 'vue'
import NMenuItemContent from './MenuItemContent.vue'
import NTooltip from '../../tooltip'
import menuChildMixin from './menu-child-mixin'
import { useMemo, useInjectionRef } from '../../_utils/composition'

export default {
  name: 'MenuItem',
  components: {
    NMenuItemContent,
    NTooltip
  },
  mixins: [
    menuChildMixin
  ],
  props: {
    extra: {
      type: [ String, Function ],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Function,
      default: null
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  setup (props) {
    const rootMenuValueRef = useInjectionRef('NMenu', 'modelValue')
    const submenuDisabledRef = useInjectionRef('NSubmenu', 'mergedDisabled', false)
    const internalKeyRef = toRef(props, 'internalKey')
    const mergedDisabledRef = computed(() => {
      return submenuDisabledRef.value || props.disabled
    })
    return {
      selected: useMemo(() => {
        if (rootMenuValueRef.value === props.internalKey) return true
        return false
      }, [rootMenuValueRef, internalKeyRef]),
      mergedDisabled: mergedDisabledRef
    }
  },
  computed: {
    popoverEnabled () {
      return !this.horizontal && this.root && this.menuCollapsed && !this.mergedDisabled
    }
  },
  methods: {
    handleClick (e) {
      if (!this.mergedDisabled) {
        this.NMenu.handleSelect(this.internalKey)
        this.onClick(e)
      }
    }
  }
}
</script>
