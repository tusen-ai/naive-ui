<template>
  <div class="n-dynamic-input">
    <n-button
      v-if="!mergedValue || mergedValue.length === 0"
      block
      ghost
      dashed
      @click="handleCreateClick"
    >
      <template #icon>
        <add-icon />
      </template>
      {{ localeNs.create }}
    </n-button>
    <div
      v-for="(_, index) in value"
      v-else
      :key="keyField ? _[keyField] : ensureKey(_, index)"
      :data-key="keyField ? _[keyField] : ensureKey(_, index)"
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
          <n-button v-if="!removeDisabled" circle @click="remove(index)">
            {{ index }}
            <template #icon>
              <remove-icon />
            </template>
          </n-button>
          <n-button
            :disabled="insertionDisabled"
            circle
            @click="createItem(index)"
          >
            {{ index }}
            <template #icon>
              <add-icon />
            </template>
          </n-button>
        </n-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRef, isProxy, toRaw } from 'vue'
import { NButton } from '../../button'
import { NButtonGroup } from '../../button-group'
import { RemoveIcon, AddIcon } from '../../_base/icons'
import NDynamicInputInputPreset from './InputPreset.vue'
import NDynamicInputPairPreset from './PairPreset.vue'
import {
  configurable,
  themeable,
  withCssr,
  asFormItem,
  locale
} from '../../_mixins'
import { createId } from 'seemly'
import styles from './styles'
import { warn, call } from '../../_utils'
import { useMergedState } from 'vooks'

const globalDataKeyMap = new WeakMap()

export default {
  name: 'DynamicInput',
  components: {
    NDynamicInputInputPreset,
    NDynamicInputPairPreset,
    NButtonGroup,
    NButton,
    AddIcon,
    RemoveIcon
  },
  mixins: [
    configurable,
    themeable,
    locale('DynamicInput'),
    asFormItem(),
    withCssr(styles)
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
    min: {
      type: Number,
      default: 0
    },
    value: {
      validator (value) {
        return Array.isArray(value) || value === null
      },
      default: undefined
    },
    defaultValue: {
      validator (value) {
        return Array.isArray(value)
      },
      default: []
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
    // for preset pair
    keyPlaceholder: {
      type: String,
      default: ''
    },
    valuePlaceholder: {
      type: String,
      default: ''
    },
    // for preset input
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
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    onClear: {
      validator () {
        warn(
          'dynamic-input',
          '`on-clear` is deprecated, it is out of usage anymore.'
        )
        return true
      },
      default: undefined
    },
    onInput: {
      validator () {
        if (__DEV__) {
          warn(
            'dynamic-input',
            '`on-input` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const uncontrolledValueRef = ref(props.value)
    const controlledValueRef = toRef(props, 'value')
    return {
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: useMergedState(controlledValueRef, uncontrolledValueRef),
      dataKeyMap: globalDataKeyMap
    }
  },
  computed: {
    insertionDisabled () {
      const { mergedValue } = this
      if (Array.isArray(mergedValue)) {
        const { max } = this
        return max !== undefined && mergedValue.length >= max
      }
      return false
    },
    removeDisabled () {
      const { mergedValue } = this
      if (Array.isArray(mergedValue)) return mergedValue.length <= this.min
      return true
    }
  },
  methods: {
    doUpdateValue (value) {
      const { onInput, 'onUpdate:value': onUpdateValue } = this
      if (onInput) call(onInput, value)
      if (onUpdateValue) call(onUpdateValue, value)
      this.uncontrolledValue = value
    },
    ensureKey (value, index) {
      if (value === undefined || value === null) return index
      if (typeof value !== 'object') return index
      const { dataKeyMap } = this
      const rawValue = isProxy(value) ? toRaw(value) : value
      let key = dataKeyMap.get(rawValue)
      if (key === undefined) {
        dataKeyMap.set(rawValue, (key = createId()))
      }
      return key
    },
    handleValueChange (index, value) {
      const { mergedValue } = this
      const newValue = Array.from(mergedValue ?? [])
      const originalItem = newValue[index]
      newValue[index] = value
      const { dataKeyMap } = this
      // update dataKeyMap
      if (
        originalItem &&
        value &&
        typeof originalItem === 'object' &&
        typeof value === 'object'
      ) {
        const rawOriginal = isProxy(originalItem)
          ? toRaw(originalItem)
          : originalItem
        const rawNew = isProxy(value) ? toRaw(value) : value
        // inherit key is value position is not change
        const originalKey = dataKeyMap.get(rawOriginal)
        if (originalKey !== undefined) {
          dataKeyMap.set(rawNew, originalKey)
        }
      }

      this.doUpdateValue(newValue)
    },
    handleCreateClick () {
      this.createItem(0)
    },
    createItem (index) {
      const { onCreate, mergedValue } = this
      const newValue = Array.from(mergedValue ?? [])
      if (onCreate) {
        newValue.splice(index + 1, 0, onCreate(index + 1))
        this.doUpdateValue(newValue)
      } else if (this.$slots.default) {
        newValue.splice(index + 1, 0, null)
        this.doUpdateValue(newValue)
      } else {
        switch (this.preset) {
          case 'input':
            newValue.splice(index + 1, 0, '')
            this.doUpdateValue(newValue)
            break
          case 'pair':
            newValue.splice(index + 1, 0, { key: '', value: '' })
            this.doUpdateValue(newValue)
            break
        }
      }
    },
    remove (index) {
      const { mergedValue } = this
      if (!Array.isArray(mergedValue)) return
      const { min } = this
      if (mergedValue.length <= min) return
      const newValue = Array.from(mergedValue)
      newValue.splice(index, 1)
      this.doUpdateValue(newValue)
      const { onRemove } = this
      if (onRemove) onRemove(index)
    }
  }
}
</script>
