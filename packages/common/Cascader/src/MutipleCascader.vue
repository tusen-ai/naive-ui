<template>
  <div
    ref="select"
    class="n-select"
    :class="{
      [`n-select--${size}-size`]: true,
      'n-select--disabled': disabled
    }"
    @click="toggleMenu"
  >
    <div
      ref="activator"
      class="n-select-link"
      :class="{
        'n-select-link--active': active,
        'n-select-link--selected': selectedItems&&selectedItems.length
      }"
    >
      <div
        class="n-select-link__tags"
        :class="{
          'n-select-link__tags--selected': selectedItems&&selectedItems.length
        }"
      >
        <div
          class="n-select-link__tag-wrapper"
        >
          <div
            v-for="item in selectedItems"
            :key="item"
            class="n-select-link__tag"
          >
            <div class="n-select-link-tag__content">
              {{ item }}
            </div>
            <n-icon
              class="n-select-link-tag__icon"
              type="md-close"
              @click.stop="deleteItem(item)"
            />
          </div>
        </div>
      </div>
      <div
        class="n-select-link__placeholder"
        :class="{
          'n-select-link__placeholder--verbose-transition': verboseTransition
        }"
      >
        {{ placeholder }}
      </div>
    </div>

    <div
      ref="contentWrapper"
      class="n-cascader-menu__content-wrapper"
    >
      <div
        ref="content"
        class="n-cascader-menu__content"
      >
        <div
          ref="contentInner"
        >
          <transition name="n-select-menu--transition">
            <CasPanel
              v-if="active"
              :data="items"
              :selected-items="selectedItems"
              :selected="selected"
              @changeSelect="changeSelect"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon/index'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import toggleable from '../../../mixins/toggleable'
import CasPanel from './CasPanel'

export default {
  name: 'MutipleCascader',
  components: {
    NIcon,
    CasPanel
  },
  mixins: [detachable, toggleable, placeable],
  model: {
    prop: 'selectedValue',
    event: 'input'
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/require-prop-types
    selectedValue: {
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
    verboseTransition: {
      type: Boolean,
      default: false
    },
    emitItem: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lightBarTop: null,
      showLightBar: false,
      label: '',
      labelPlaceholder: 'Please Select',
      selectedItems: [],
      selected: {}
    }
  },
  watch: {
    active (newValue) {
      if (newValue === true) {
        this.$nextTick().then(
          () => {
            document.addEventListener('click', this.nativeCloseMenu)
          }
        )
      } else {
        this.$nextTick().then(
          () => {
            document.removeEventListener('click', this.nativeCloseMenu)
          }
        )
      }
    },
    selectedItems (val) {
      let keys = Object.keys(this.selected)
      for (let index of keys) {
        this.$set(this.selected, index, false)
      }
      for (let index of val) {
        this.setSelected(index)
      }
      this.$nextTick().then(this.updatePosition)
      this.$emit('input', val)
    }
  },
  beforeDestroy () {
    document.removeEventListener('click', this.nativeCloseMenu)
  },
  methods: {
    /**
     * @param {string} value
     */
    nativeCloseMenu (e) {
      if (!this.$refs.select.contains(e.target)) {
        this.deactivate()
      }
    },
    toggleMenu () {
      if (this.disabled) return
      this.toggle()
    },
    changeSelect (val) {
      let index = this.selectedItems.indexOf(val)
      if (index < 0) {
        this.selectedItems.push(val)
      } else {
        this.selectedItems.splice(index, 1)
      }

      if (this.selected[val]) {
        this.setSelected(val)
      }
    },
    setSelected (val) {
      let arr = val.split('/')
      let key = ''
      for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
          key = arr[i]
        } else {
          key = key + '/' + arr[i]
        }
        this.$set(this.selected, key, true)
      }
    },
    deleteItem (val) {
      let index = this.selectedItems.indexOf(val)
      this.selectedItems.splice(index, 1)
      this.$forceUpdate()
    }
  }
}
</script>
