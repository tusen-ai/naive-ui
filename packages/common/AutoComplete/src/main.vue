<template>
  <div class="n-auto-complete">
    <n-base-select-option-collector v-if="!!$slots.default">
      <slot />
    </n-base-select-option-collector>
    <n-input ref="activator" :value="value" :placeholder="placeholder" @focus="active = true" @input="handleInput" />
    <div
      ref="contentContainer"
      v-clickoutside="handleClickOutsideMenu"
      class="n-detached-content-container n-select-detached-content-container"
      :class="{
        [namespace]: namespace
      }"
    >
      <div
        ref="content"
        class="n-detached-content-content"
      >
        <transition name="n-select-menu--transition">
          <n-base-select-menu
            v-if="active"
            ref="contentInner"
            class="n-select-menu"
            :theme="synthesizedTheme"
            :pattern="value"
            :options="filteredOptions"
            :multiple="false"
            :size="size"
            :remote="remote"
            :loading="loading"
            :no-data-content="'Please Search'"
            :not-found-content="'Not Found'"
            :emit-option="false"
            :filterable="false"
            :is-selected="isSelected"
            :use-slot="!!$slots.default"
            @menu-toggle-option="handleToggleOption"
          >
            <n-base-select-render-options v-if="!!$slots.default" :options="filteredOptions" />
          </n-base-select-menu>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NInput from '../../Input'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import zindexable from '../../../mixins/zindexable'
import clickoutside from '../../../directives/clickoutside'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asformitem from '../../../mixins/asformitem'
import {
  NBaseSelectMenu,
  NBaseSelectOptionCollector,
  NBaseSelectRenderOptions
} from '../../../base/SelectMenu'

export default {
  name: 'NAutoComplete',
  components: {
    NInput,
    NBaseSelectMenu,
    NBaseSelectOptionCollector,
    NBaseSelectRenderOptions
  },
  directives: {
    clickoutside
  },
  mixins: [
    withapp,
    themeable,
    detachable,
    zindexable,
    placeable,
    asformitem()
  ],
  props: {
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'medium'
    },
    options: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    widthMode: {
      type: String,
      default: 'activator'
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    filteredOptions () {
      return this.options.map(literal => typeof literal === 'string' ? ({
        label: literal,
        value: literal
      }) : literal)
    }
  },
  methods: {
    isSelected () {

    },
    handleInput (value) {
      this.$emit('input', value)
      this.active = true
    },
    handleToggleOption (option) {
      this.$emit('input', option.label)
      this.$emit('select', option.value)
      this.active = false
    },
    handleClickOutsideMenu (e) {
      if (!this.$refs.activator.$el.contains(e.target)) {
        this.active = false
      }
    }
  }
}
</script>
