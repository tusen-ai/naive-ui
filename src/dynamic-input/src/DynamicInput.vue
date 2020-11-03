<template>
  <div class="n-dynamic-input">
    <div
      v-for="(_, index) in value"
      :key="keyField ? _[keyField] : index"
      :data-key="keyField ? _[keyField] : index"
      class="n-dynamic-input-item"
    >
      <slot v-if="$slots.default" :value="value[index]" :index="index" />
      <n-dynamic-input-input-preset
        v-else-if="preset === 'input'"
        :value="value[index]"
        :parent-path="NFormItem && NFormItem.path"
        :path="NFormItem && NFormItem.path + '[' + index + ']'"
        @update:value="handleValueChange(index, $event)"
      />
      <n-dynamic-input-pair-preset
        v-else-if="preset === 'pair'"
        :value="value[index]"
        :parent-path="NFormItem && NFormItem.path"
        :path="NFormItem && NFormItem.path + '[' + index + ']'"
        @update:value="handleValueChange(index, $event)"
      />
      <div class="n-dynamic-input-item__action">
        <n-button-group>
          <n-button
            v-if="!removeDisabled"
            circle
            @click="remove($event, index)"
          >
            <template #icon>
              <md-remove />
            </template>
          </n-button>
          <n-button
            :disabled="insertionDisabled"
            circle
            @click="createItem($event, index)"
          >
            <template #icon>
              <md-add />
            </template>
          </n-button>
        </n-button-group>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
import NButton from '../../button'
import NButtonGroup from '../../button-group'
import {
  MdAdd,
  MdRemove
} from 'vicons/ionicons-v4'
import NDynamicInputInputPreset from './InputPreset.vue'
import NDynamicInputPairPreset from './PairPreset.vue'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/index'
import { warn } from '../../_utils/naive'
import { call } from '../../_utils/vue'

export default {
  name: 'DynamicInput',
  components: {
    NDynamicInputInputPreset,
    NDynamicInputPairPreset,
    NButtonGroup,
    NButton,
    MdAdd,
    MdRemove
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  provide () {
    return {
      NDynamicInput: this
    }
  },
  props: {
    max: {
      type: Number,
      default: undefined
    },
    value: {
      validator (value) {
        return Array.isArray(value) && value.length
      },
      required: true
    },
    preset: {
      validator (value) {
        return ['input', 'pair'].includes(value)
      },
      default: 'input'
    },
    keyField: {
      type: String,
      default: null
    },
    /** for preset pair */
    keyPlaceholder: {
      type: String,
      default: ''
    },
    valuePlaceholder: {
      type: String,
      default: ''
    },
    /** for preset input */
    placeholder: {
      type: String,
      default: ''
    },
    onCreate: {
      type: Function,
      default: undefined
    },
    onRemove: {
      type: Function,
      default: undefined
    },
    onClear: {
      type: Function,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    onInput: {
      validator () {
        if (__DEV__) warn('dynamic-input', '`on-input` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    }
  },
  data () {
    return {
      NFormItem: null // useless code, for debug
    }
  },
  computed: {
    insertionDisabled () {
      return this.max !== null && this.value.length >= this.max
    },
    removeDisabled (index) {
      return this.value.length === 1 && !this.onClear
    }
  },
  methods: {
    doInput (value) {
      const {
        onInput,
        'onUpdate:value': onUpdateValue
      } = this
      if (onInput) call(onInput, value)
      if (onUpdateValue) call(onUpdateValue, value)
    },
    handleValueChange (index, value) {
      this.value[index] = value
    },
    createItem (e, index) {
      const { onCreate } = this
      if (onCreate) {
        this.value.splice(index + 1, 0, onCreate(index + 1))
      } else if (this.$slots.default) {
        this.value.splice(index + 1, 0, null)
      } else {
        switch (this.preset) {
          case 'input':
            this.value.splice(index + 1, 0, null)
            break
          case 'pair':
            this.value.splice(index + 1, 0, { key: null, value: null })
            break
        }
      }
    },
    remove (e, index) {
      if (this.value.length === 1) {
        const onClear = this.onClear
        if (onClear) {
          const keyField = this.keyField
          if (keyField) {
            const memorizedKeyField = this.value[0][keyField]
            this.doInput([Object.assign(onClear(), {
              [keyField]: memorizedKeyField
            })])
          } else {
            this.doInput([onClear()])
          }
        } else {
          switch (this.preset) {
            case 'input':
              this.doInput([null])
              break
            case 'pair':
              this.doInput([{ key: null, value: null }])
              break
          }
        }
      } else {
        const changedValue = Array.from(this.value)
        changedValue.splice(index, 1)
        this.doInput(changedValue)
        const { onRemove } = this
        if (onRemove) onRemove(index)
      }
    }
  }
}
</script>
