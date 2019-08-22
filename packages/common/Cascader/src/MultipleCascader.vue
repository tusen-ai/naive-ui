<template>
  <div
    ref="self"
    class="n-cascader"
    :class="{
      [`n-cascader--${size}-size`]: true,
      'n-cascader--disabled': disabled
    }"
    @click="toggleMenu"
  >
    <div
      ref="activator"
      class="n-cascader-link"
      :class="{
        'n-cascader-link--active': active
      }"
    >
      <div
        class="n-cascader-link__tags"
      >
        <div
          class="n-cascader-link__tag-wrapper"
        >
          <div
            v-for="item in []"
            :key="item"
            class="n-cascader-link__tag"
          >
            <div class="n-cascader-link-tag__content">
              {{ item }}
            </div>
            <n-icon
              class="n-cascader-link-tag__icon"
              type="md-close"
            />
          </div>
        </div>
      </div>
      <div
        class="n-cascader-link__placeholder"
      >
        {{ placeholder }}
      </div>
    </div>

    <div
      ref="contentContainer"
      class="n-cascader-menu__content-wrapper"
    >
      <div
        ref="content"
        class="n-cascader-menu__content"
      >
        <transition name="n-cascader-menu--transition">
          <CasPanel
            v-if="active"
            ref="menu"
            v-clickoutside.lazy="handleMenuClickOutside"
            :value="value"
            :multiple="multiple"
            :options="optionsWithId"
            :active-id="activeId"
            :traced-option="tracedOption"
            :enable-all-options="enableAllOptions"
            @input="handleMenuInput"
            @option-click="handleOptionClick"
            @menu-keyup-space="handleKeyUpSpace"
            @menu-keyup-enter="handleKeyUpEnter"
            @menu-keyup-up="handleKeyUpUp"
            @menu-keyup-down="handleKeyUpDown"
            @menu-keyup-left="handleKeyUpLeft"
            @menu-keyup-right="handleKeyUpRight"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon/index'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import toggleable from '../../../mixins/toggleable'
import clickoutside from '../../../directives/clickoutside'
import CasPanel from './CasPanel'
import cloneDeep from 'lodash/cloneDeep'
import { type } from './utils'

export default {
  name: 'MultipleCascader',
  components: {
    NIcon,
    CasPanel
  },
  directives: {
    clickoutside
  },
  mixins: [detachable, toggleable, placeable],
  props: {
    options: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    placeholder: {
      type: String,
      default: 'Please Select'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    expandTrigger: {
      validator (expandTrigger) {
        return ['click', 'hover'].includes(expandTrigger)
      },
      default: 'click'
    },
    enableAllOptions: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      labelPlaceholder: 'Please Select',
      activeId: null,
      tracedOption: null,
      firstOption: null
    }
  },
  computed: {
    type: type,
    expandTriggeredByHover () {
      return this.expandTrigger === 'hover'
    },
    expandTriggeredByClick () {
      return this.expandTrigger === 'click'
    },
    optionsWithId () {
      const optionsWithId = cloneDeep(this.options)
      let id = 0
      const valueSet = new Set(this.value)
      const value = this.value
      const checkedOptions = []
      function markPath (option) {
        const parent = option.parent
        if (parent) {
          parent.checkedLeafCount += 1
          markPath(parent)
        }
      }
      const type = this.type
      function traverse (options, parent = null, depth = 0) {
        const length = options.length
        for (let i = 0; i < length; ++i) {
          const option = options[i]
          option.parent = parent
          option.prevSibling = options[(i + length - 1) % length]
          option.nextSibling = options[(i + length + 1) % length]
          option.depth = depth
          option.id = id++
          option.checkedLeafCount = 0
          if (type === 'multiple') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
              option.leafCount = 0
              option.children.forEach(child => {
                if (!child.disabled) {
                  option.leafCount += child.leafCount
                }
              })
            } else {
              if (option.disabled) {
                option.leafCount = 0
              } else {
                option.leafCount = 1
              }
              option.checked = valueSet.has(option.value)
              if (option.checked) {
                checkedOptions.push(option)
              }
            }
          } else if (type === 'multiple-all-options') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            }
            option.leafCount = 0
            option.checkedLeafCount = 0
            option.checked = valueSet.has(option.value)
          } else if (type === 'single-all-options') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            }
            option.leafCount = 0
            option.checkedLeafCount = 0
            option.checked = option.value === value
          } else if (type === 'single') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            }
            option.leafCount = 0
            option.checkedLeafCount = 0
            option.checked = option.value === value
          }
        }
      }
      if (type === 'multiple') {
        traverse(optionsWithId)
        for (const checkedOption of checkedOptions) {
          markPath(checkedOption)
        }
      } else if (this.type === 'multiple-all-options') {
        traverse(optionsWithId)
      } else if (type === 'single-all-options') {
        traverse(optionsWithId)
      } else if (type === 'single') {
        traverse(optionsWithId)
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.firstOption = optionsWithId[0]
      return optionsWithId
    }
  },
  watch: {
    options () {
      this.tracedOption = null
      this.activeId = null
      this.firstOption = null
    },
    active (newActive) {
      if (!newActive) {
        this.tracedOption = null
      } else {
        this.$nextTick().then(() => {
          const contentContainer = this.$refs.contentContainer
          if (contentContainer) {
            const firstSubmenu = contentContainer.querySelector('.n-cascader-submenu')
            if (firstSubmenu) firstSubmenu.focus()
          }
        })
      }
    },
    tracedOption (newOption) {
      if (newOption) {
        this.$nextTick().then(() => {
          const submenu = this.$refs.contentContainer.querySelector(`[data-depth="${newOption.depth}"]`)
          if (submenu) submenu.focus()
        })
      }
    }
  },
  methods: {
    handleMenuClickOutside () {
      this.deactivate()
    },
    toggleMenu () {
      if (this.disabled) {
        this.deactivate()
        return
      }
      this.toggle()
    },
    handleOptionMouseEnter (e, option) {
      if (this.expandTriggeredByHover && !option.disabled) {
        this.activeId = option.id
      }
    },
    handleOptionClick (e, option, menu) {
      if (this.expandTriggeredByClick && !option.disabled) {
        this.activeId = option.id
        this.tracedOption = option
      }
    },
    handleKeyUpSpace (menu) {
      this.handleKeyUpEnter(menu)
    },
    handleKeyUpEnter (menu) {
      const options = menu && menu.$refs.options
      if (options) {
        const option = options.find(option => option.id === this.tracedOption.id)
        if (option) {
          option.handleOptionCheck()
        }
      }
    },
    handleKeyUpDown (menu) {
      if (this.active) {
        let scrollbar = null
        if (menu && menu.$refs.scrollbar) {
          scrollbar = menu.$refs.scrollbar
        }
        if (this.tracedOption) {
          let optionIterator = this.tracedOption.nextSibling
          while (optionIterator !== this.tracedOption && optionIterator.disabled) {
            optionIterator = optionIterator.nextSibling
          }
          this.tracedOption = optionIterator
          this.activeId = this.tracedOption.id
          const el = menu && menu.$el && menu.$el.querySelector(`[data-id="${this.activeId}"]`)
          if (scrollbar && el) {
            scrollbar.scrollToElement(el)
          }
        } else {
          const firstOption = this.firstOption
          if (!firstOption) {
            return
          }
          let optionIterator = firstOption
          while (optionIterator.disabled) {
            optionIterator = optionIterator.nextSibling
            if (optionIterator === firstOption) {
              break
            }
          }
          this.tracedOption = optionIterator
          this.activeId = this.tracedOption.id
          const el = menu && menu.$el && menu.$el.querySelector(`[data-id="${this.activeId}"]`)
          if (scrollbar && el) {
            scrollbar.scrollToElement(el)
          }
        }
      }
    },
    handleKeyUpUp (menu) {
      if (this.active && this.tracedOption) {
        let scrollbar = null
        if (menu && menu.$refs.scrollbar) {
          scrollbar = menu.$refs.scrollbar
        }
        let optionIterator = this.tracedOption.prevSibling
        while (optionIterator !== this.tracedOption && optionIterator.disabled) {
          optionIterator = optionIterator.prevSibling
        }
        this.tracedOption = optionIterator
        this.activeId = this.tracedOption.id
        const el = menu && menu.$el && menu.$el.querySelector(`[data-id="${this.activeId}"]`)
        if (scrollbar && el) {
          scrollbar.scrollToElement(el)
        }
      }
    },
    handleKeyUpLeft () {
      if (this.active && this.tracedOption && this.tracedOption.parent) {
        this.tracedOption = this.tracedOption.parent
        this.activeId = this.tracedOption.id
      }
    },
    handleKeyUpRight () {
      if (this.active && this.tracedOption) {
        const firstChild = this.tracedOption.children && this.tracedOption.children[0]
        if (firstChild) {
          this.tracedOption = firstChild
          this.activeId = firstChild.id
        }
      }
    },
    handleMenuInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
