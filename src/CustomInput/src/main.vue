<template>
  <div class="n-input-key-value">
    <div
      v-for="(item, index) in value"
      :key="index"
      class="n-input-key-value__item"
    >
      <p
        v-if="title"
        class="n-input-key-value__item--title"
      >
        {{ title }}
      </p>
      <div class="n-input-key-value__item--container">
        <div class="n-input-key-value__item--content">
          <slot :item="item">
            <div
              ref="default"
              class="n-input-key-value__item--input--container"
            >
              <n-input
                v-model="item.key"
                class="n-input-key-value__item--input"
                :placeholder="placeholderKey"
                @focus="checkValue"
              />
              <n-input
                v-model="item.value"
                class="n-input-key-value__item--input"
                :placeholder="placeholderValue"
                @focus="checkValue"
              />
            </div>
          </slot>
        </div>
        <div class="n-input-key-value__item--action">
          <!-- <span> -->
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
        <!-- </span> -->
        </div>
      </div>

      <!-- {{ value }} -->
    </div>
  </div>
</template>

<script>
import NButton from '../../Button'
import NButtonGroup from '../../Button/src/ButtonGroup'
import mdAdd from '../../_icons/md-add'
import mdRemove from '../../_icons/md-remove'

export default {
  name: 'NCustomInput',
  components: {
    NButtonGroup,
    NButton,
    mdAdd,
    mdRemove
  },
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
    preset: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
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

  },
  watch: {
    // value () {
    //   this.checkValue()
    // }
  },
  mounted () {
    // this.checkValue()
  },
  methods: {
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
    },
    checkValue () {
      let self = this
      if (this.$refs.default) {
        this.value.map((item, index) => {
          let result = {
            key: item.key ? item.key : '',
            value: item.value ? item.value : ''
          }
          self.$set(this.value, index, result)
        })
      }
    }
  }
}
</script>
