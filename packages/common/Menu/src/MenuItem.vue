<template>
  <li v-if="!shouldBeRenderedAsDropdownItem && isFirstLevel" class="n-menu-item-wrapper">
    <n-tooltip trigger="hover" :disabled="!NMenu.collapsed" placement="right" :delay="300">
      <template v-slot:activator>
        <div
          class="n-menu-item"
          :style="{ paddingLeft: delayedPaddingLeft + 'px' }"
          :class="{
            'n-menu-item--selected': selected,
            'n-menu-item--disabled': synthesizedDisabled
          }"
          @click="handleClick"
        >
          <div
            v-if="$slots.icon"
            class="n-menu-item__icon"
            :style="{
              width: maxIconSize && (maxIconSize + 'px'),
              height: maxIconSize && (maxIconSize + 'px'),
              fontSize: activeIconSize && (activeIconSize + 'px'),
            }"
          >
            <slot name="icon" />
          </div>
          <div class="n-menu-item__header">
            <slot>
              <render :render="title" />
            </slot>
          </div>
        </div>
      </template>
      <render :render="title" />
    </n-tooltip>
  </li>
  <li
    v-else-if="!shouldBeRenderedAsDropdownItem"
    class="n-menu-item"
    :style="{ paddingLeft: delayedPaddingLeft + 'px' }"
    :class="{
      'n-menu-item--selected': selected,
      'n-menu-item--disabled': synthesizedDisabled
    }"
    @click="handleClick"
  >
    <!-- identical part start -->
    <div
      v-if="$slots.icon"
      class="n-menu-item__icon"
      :style="{
        width: iconSize && (iconSize + 'px'),
        height: iconSize && (iconSize + 'px'),
        fontSize: iconSize && (iconSize + 'px'),
      }"
    >
      <slot name="icon" />
    </div>
    <!-- identical part start end -->
    <div class="n-menu-item__header">
      <slot>
        <render :render="title" />
      </slot>
    </div>
  </li>
  <n-dropdown-item v-else :name="name" :label="title" :value="value" :selected="selected" />
</template>

<script>
import collectable from '../../../mixins/collectable'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import render from '../../../utils/render'
import NTooltip from '../../Tooltip'
import NDropdownItem from '../../Dropdown/src/DropdownItem'

export default {
  name: 'NMenuItem',
  components: {
    NTooltip,
    NDropdownItem,
    render
  },
  mixins: [
    collectable('NSubMenu', 'menuItemNames', 'name', true),
    withapp,
    themeable
  ],
  inject: {
    NMenu: {
      default: null
    },
    NSubMenu: {
      default: null
    },
    NMenuItemGroup: {
      default: null
    },
    NMenuUl: {
      default: null
    }
  },
  props: {
    value: {
      type: Number,
      default: null
    },
    title: {
      type: [ String, Function ],
      default: null
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      delayedPaddingLeft: null
    }
  },
  computed: {
    disabledCollectable () {
      return this.shouldBeRenderedAsDropdownItem
    },
    shouldBeRenderedAsDropdownItem () {
      if (this.NMenuUl) return false
      return !this.isFirstLevel && this.NMenu.collapsed
    },
    useCollapsedIconSize () {
      return this.NMenu.collapsed && this.isFirstLevel
    },
    maxIconSize () {
      return Math.max(this.collapsedIconSize, this.iconSize)
    },
    activeIconSize () {
      if (this.useCollapsedIconSize) {
        return this.collapsedIconSize
      } else {
        return this.iconSize
      }
    },
    collapsedIconSize () {
      return this.NMenu.collapsedIconSize || this.NMenu.iconSize
    },
    iconSize () {
      return this.NMenu.iconSize
    },
    isFirstLevel () {
      return !this.NSubMenu && !this.NMenuItemGroup
    },
    paddingLeft () {
      if (this.isFirstLevel && this.NMenu.collapsedWidth !== null && this.NMenu.collapsed) {
        return this.NMenu.collapsedWidth / 2 - this.iconSize / 2
      }
      if (this.NMenuItemGroup) {
        return this.NMenu.indent / 2 + this.NMenuItemGroup.paddingLeft
      } else if (this.NSubMenu) {
        return this.NMenu.indent + this.NSubMenu.paddingLeft
      } else {
        return this.NMenu.rootIndent || this.NMenu.indent
      }
    },
    synthesizedDisabled () {
      return ((this.NSubMenu && this.NSubMenu.synthesizedDisabled) || this.disabled)
    },
    selected () {
      if (this.NMenu.value === this.name) {
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
