<template>
  <li
    class="n-menu-item"
    :class="{
      'n-menu-item--selected': selected,
      'n-menu-item--disabled': disabled
    }"
  >
    <template v-if="renderContentAsPopover">
      <n-tooltip
        :placement="menuItemPopoverPlacement"
        :disabled="rootMenuIsHorizontal || !rootMenuCollapsed"
      >
        <template v-slot:activator>
          <n-menu-item-content
            :padding-left="delayedPaddingLeft"
            :max-icon-size="maxIconSize"
            :active-icon-size="activeIconSize"
            :title="title"
            :disabled="syntheticDisabled"
            :title-extra="titleExtra"
            @click="handleClick"
          >
            <template v-if="$scopedSlots.icon" v-slot:icon>
              <slot name="icon" />
            </template>
            <template v-if="$scopedSlots['header-extra']" v-slot:header-extra>
              <slot name="extra" />
            </template>
            <slot />
          </n-menu-item-content>
        </template>
        {{ title }}
      </n-tooltip>
    </template>
    <n-menu-item-content
      v-else
      :max-icon-size="maxIconSize"
      :active-icon-size="activeIconSize"
      :padding-left="delayedPaddingLeft"
      :title="title"
      :title-extra="titleExtra"
      :disabled="syntheticDisabled"
      @click="handleClick"
    >
      <template v-if="$scopedSlots.icon" v-slot:icon>
        <slot name="icon" />
      </template>
      <template v-if="$scopedSlots['header-extra']" v-slot:header-extra>
        <slot name="header-extra" />
      </template>
      <slot />
    </n-menu-item-content>
  </li>
</template>

<script>
import collectable from '../../_mixins/collectable'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import simulatedComputed from '../../_mixins/simulatedComputed'
import NMenuItemContent from './MenuItemContent'
import NTooltip from '../../tooltip'
import menuContentMixin from './menuContentMixin'

export default {
  name: 'NMenuItem',
  components: {
    NMenuItemContent,
    NTooltip
  },
  mixins: [
    collectable('PenetratedNSubmenu', 'menuItemNames', 'name', true, function (injectedNSubmenu) {
      const injectedNMenu = this.NMenu
      if (injectedNMenu !== injectedNSubmenu.NMenu) {
        if (injectedNSubmenu.rootMenuIsHorizontal) return false
        return true
      }
    }),
    simulatedComputed({
      selected: {
        get () {
          if (this.rootMenuValue === this.name) {
            return true
          } else {
            return false
          }
        },
        deps: ['rootMenuValue'],
        default: false
      }
    }),
    withapp,
    themeable,
    menuContentMixin
  ],
  props: {
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
    syntheticDisabled () {
      if (this.disabled !== undefined) return this.disabled
      return this.PenetratedNSubmenu && this.PenetratedNSubmenu.syntheticDisabled
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
      if (!this.syntheticDisabled) {
        this.NMenu.handleSelect(this.name)
        this.$emit('click', this)
      }
    }
  }
}
</script>
