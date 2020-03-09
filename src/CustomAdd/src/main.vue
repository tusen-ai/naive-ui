<template>
  <div class="n-custom-add">
    <div
      v-for="(item, index) in value"
      :key="index"
      class="n-custom-add-item"
      :class="{[`n-${syntheticTheme}-theme`]: syntheticTheme}"
    >
      <div v-if="NFormItem" class="n-custom-add-item__content">
        <slot :item="item" :index="index">
          <n-custom-add-item
            :item="item"
            :index="index"
            :parent-path="NFormItem.path"
            :path="NFormItem.path + '.' + index"
          />
        </slot>
      </div>
      <div v-else class="n-custom-add-item__content">
        <slot :item="item" :index="index">
          <n-custom-add-item
            :item="item"
            :index="index"
            @change-value="changeValue"
          />
        </slot>
      </div>
      <div class="n-custom-add-item__action">
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
            v-if="index===value.length-1"
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
import NCustomAddItem from './item'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NCustomAdd',
  components: {
    NCustomAddItem,
    NButtonGroup,
    NButton,
    mdAdd,
    mdRemove
  },
  provide () {
    return {
      NCustomAdd: this
    }
  },
  mixins: [themeable, asformitem({
    change: 'change',
    blur: 'blur',
    focus: 'focus',
    input: 'input'
  })],
  props: {
    value: {
      type: Array,
      default: () => {
        return [{
          key: '',
          value: ''
        }]
      }
    },
    placeholderKey: {
      type: String,
      default: 'Key'
    },
    placeholderValue: {
      type: String,
      default: 'Value'
    }
  },
  data () {
    return {
      labels: [
        {
          key: 'key1',
          value: 'value1'
        },
        {
          key: 'key2',
          value: 'value2'
        }
      ]
    }
  },
  computed: {
    parentPath () {
      return this.NFormItem.path
    }

  },
  methods: {
    changeValue (value) {
      this.value = value
    },
    add () {
      this.$emit('on-add')
      this.value.push({})
    },
    remove (index) {
      this.$emit('on-remove', index)
      if (index === 0 && this.value.length <= 1) {
        Object.keys(this.value[0]).forEach((key) => {
          let type = typeof (this.value[0][key])
          switch (type) {
            case 'boolean':
              this.$set(this.value[0], key, false)
              break
            default:
              this.$set(this.value[0], key, null)
              break
          }
        })
        return
      }
      this.value.splice(index, 1)
    }
  }
}
</script>
