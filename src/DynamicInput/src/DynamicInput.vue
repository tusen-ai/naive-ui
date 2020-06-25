<template>
  <div class="n-dynamic-input">
    <div
      v-for="(_, index) in value"
      :key="keyField ? _[keyField] : index"
      :data-key="keyField ? _[keyField] : index"
      class="n-dynamic-input-item"
    >
      <slot v-if="$scopedSlots.default" :value="value[index]" :index="index" />
      <n-dynamic-input-input-preset
        v-else-if="preset === 'input'"
        v-model="value[index]"
        :parent-path="NFormItem && NFormItem.path"
        :path="NFormItem && NFormItem.path + '[' + index + ']'"
      />
      <n-dynamic-input-pair-preset
        v-else-if="preset === 'pair'"
        v-model="value[index]"
        :parent-path="NFormItem && NFormItem.path"
        :path="NFormItem && NFormItem.path + '[' + index + ']'"
      />
      <div class="n-dynamic-input-item__action">
        <n-button-group>
          <n-button
            v-if="!removeDisabled"
            circle
            @click="remove($event, index)"
          >
            <template v-slot:icon>
              <md-remove />
            </template>
          </n-button>
          <n-button
            :disabled="insertionDisabled"
            circle
            @click="createItem($event, index)"
          >
            <template v-slot:icon>
              <md-add />
            </template>
          </n-button>
        </n-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import NButton from '../../Button'
import NButtonGroup from '../../button-group'
import mdAdd from '../../_icons/md-add'
import mdRemove from '../../_icons/md-remove'
import NDynamicInputInputPreset from './InputPreset'
import NDynamicInputPairPreset from './PairPreset'

export default {
  name: 'NDynamicInput',
  components: {
    NDynamicInputInputPreset,
    NDynamicInputPairPreset,
    NButtonGroup,
    NButton,
    mdAdd,
    mdRemove
  },
  provide () {
    return {
      NDynamicInput: this
    }
  },
  props: {
    max: {
      type: Number,
      default: null
    },
    value: {
      validator (value) {
        return Array.isArray(value) && value.length
      },
      required: true
    },
    onCreate: {
      type: Function,
      default: null
    },
    onClear: {
      type: Function,
      default: null
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
    handleValueChange (value) {
      this.value = value
    },
    createItem (e, index) {
      const onCreate = this.onCreate
      if (onCreate) {
        this.value.splice(index + 1, 0, onCreate(index + 1))
      } else if (this.$scopedSlots.default) {
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
      this.$emit('create', index + 1)
    },
    remove (e, index) {
      if (this.value.length === 1) {
        const onClear = this.onClear
        if (onClear) {
          const keyField = this.keyField
          if (keyField) {
            const memorizedKeyField = this.value[0][keyField]
            this.$emit('input', [ Object.assign(onClear(), {
              [keyField]: memorizedKeyField
            })])
          } else {
            this.$emit('input', [ onClear() ])
          }
        } else if (this.$scopedSlots.default) {
          return
        } else {
          switch (this.preset) {
            case 'input':
              this.$emit('input', [ null ])
              break
            case 'pair':
              this.$emit('input', [ { key: null, value: null } ])
              break
          }
        }
        this.$emit('clear')
      } else {
        const changedValue = Array.from(this.value)
        changedValue.splice(index, 1)
        this.$emit('input', changedValue)
        this.$emit('remove', index)
      }
    }
  }
}
</script>
