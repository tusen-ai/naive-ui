<template>
  <li
    class="n-menu-item"
    :style="{ paddingLeft: delayedPaddingLeft + 'px' }"
    :class="{
      'n-menu-item--selected': selected,
      'n-menu-item--disabled': synthesizedDisabled
    }"
    @click="handleClick"
  >
    <template v-if="renderContentAsPopover">
      <n-tooltip
        placement="right"
        :disabled="!rootMenuCollapsed"
      >
        <template v-slot:activator>
          <n-menu-item-content-wrapper
            :max-icon-size="maxIconSize"
            :active-icon-size="activeIconSize"
            :title="title"
            :title-extra="titleExtra"
            @click="handleClick"
          >
            <template v-slot:icon>
              <slot name="icon" />
            </template>
            <template v-slot:header-extra>
              <slot name="header-extra" />
            </template>
            <slot />
          </n-menu-item-content-wrapper>
        </template>
        {{ title }}
      </n-tooltip>
    </template>
    <n-menu-item-content-wrapper
      v-else
      :max-icon-size="maxIconSize"
      :active-icon-size="activeIconSize"
      :title="title"
      :title-extra="titleExtra"
      @click="handleClick"
    >
      <template v-slot:icon>
        <slot name="icon" />
      </template>
      <template v-slot:header-extra>
        <slot name="header-extra" />
      </template>
      <slot />
    </n-menu-item-content-wrapper>
  </li>
</template>

<script>
import collectable from '../../../mixins/collectable'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import NMenuItemContentWrapper from './MenuItemContentWrapper'
import NTooltip from '../../Tooltip'
import menuContentMixin from './menuContentMixin'

export default {
  name: 'NMenuItem',
  components: {
    NMenuItemContentWrapper,
    NTooltip
  },
  mixins: [
    collectable('NSubmenu', 'menuItemNames', 'name', true, function (injection) {
      return this.NMenu !== injection.NMenu
    }),
    withapp,
    themeable,
    menuContentMixin
  ],
  props: {
    value: {
      type: Number,
      default: null
    },
    title: {
      type: [ String, Function ],
      default: null
    },
    titleExtra: {
      type: [ String, Function ],
      default: null
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: undefined
    }
  },
  data () {
    return {
      delayedPaddingLeft: null
    }
  },
  computed: {
    synthesizedDisabled () {
      if (this.disabled !== undefined) return this.disabled
      return this.NSubmenu && this.NSubmenu.synthesizedDisabled
    },
    selected () {
      if (this.rootMenuValue === this.name) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    paddingLeft (value) {
      this.$nextTick().then(() => {
        this.delayedPaddingLeft = value
      })
    }
  },
  created () {
    this.delayedPaddingLeft = this.paddingLeft
  },
  methods: {
    handleClick () {
      if (!this.synthesizedDisabled) {
        this.NMenu.handleSelect(this.name)
        this.$emit('click', this)
      }
    }
  }
}
</script>
