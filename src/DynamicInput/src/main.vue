<template>
  <div class="n-dynamic-input">
    <div
      v-for="(item, index) in value"
      :key="index"
      class="n-dynamic-input-item"
    >
      <n-dynamic-input-input
        v-if="preset==='input'"
        :item="item"
        :index="index"
        :parent-path="NFormItem && NFormItem.path"
        :path="NFormItem && NFormItem.path + '[' + index + ']'"
      />
      <n-dynamic-input-pair
        v-else-if="preset==='pair'"
        :item="item"
        :index="index"
        :parent-path="NFormItem && NFormItem.path"
        :path="NFormItem && NFormItem.path + '[' + index + ']'"
      />
      <slot v-else :item="item" :index="index" />
      <div class="n-dynamic-input-item__action">
        <n-button-group>
          <n-button
            circle
            @click="remove(index)"
          >
            <template v-slot:icon>
              <md-remove />
            </template>
          </n-button>
          <n-button
            v-if="index === value.length-1"
            circle
            @click="add"
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
import NButtonGroup from '../../Button/src/ButtonGroup'
import mdAdd from '../../_icons/md-add'
import mdRemove from '../../_icons/md-remove'
import asformitem from '../../_mixins/asformitem'
import NDynamicInputPair from './pair'
import NDynamicInputInput from './input'

export default {
  name: 'NDynamicInput',
  components: {
    NDynamicInputPair,
    NDynamicInputInput,
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
  mixins: [asformitem({
    change: 'change',
    blur: 'blur',
    focus: 'focus',
    input: 'input'
  })],
  props: {
    value: {
      type: Array,
      required: true
    },
    placeholderKey: {
      type: String,
      default: 'Key'
    },
    placeholderValue: {
      type: String,
      default: 'Value'
    },
    onAdd: {
      type: Function,
      default: null
    },
    preset: {
      type: String,
      default: 'input'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    changeValue (value) {
      this.value = value
    },
    add () {
      if (this.onAdd) {
        this.onAdd((item) => {
          this.value.push(item)
        })
        return
      }
      switch (this.preset) {
        case 'input':
          this.value.push('')
          break
        case 'pair':
          this.value.push({ key: '', value: '' })
          break
        case 'custom':
          this.value.push({})
          break
        default:
          this.value.push({})
      }
    },
    remove (index) {
      if (index === 0 && this.value.length <= 1) {
      } else {
        this.value.splice(index, 1)
      }
      this.$emit('remove', index)
    }
  }
}
</script>
