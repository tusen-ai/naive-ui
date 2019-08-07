<template>
  <div class="n-input-key-value">
    <div
      v-for="(item, index) in value"
      :key="index"
      class="n-input-key-value__item"
    >
      <p class="n-input-key-value__item--title">
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
          <n-icon
            class="n-input-key-value__item--action--add"
            type="md-remove-circle"
            size="30"
            color="#C0818B"
            @click="remove(index)"
          />
          <n-icon
            v-if="index==value.length-1"
            class="n-input-key-value__item--action--remove"
            type="md-add-circle"
            size="30"
            color="#4DB199"
            @click="add"
          />
        <!-- </span> -->
        </div>
      </div>

      <!-- {{ value }} -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'NInputKeyValuePairs',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [{
          key: '',
          value: ''
        } ]
      }
    },
    title: {
      type: String,
      default: 'Label'
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
      this.value.push({})
    },
    remove (index) {
      if (index === 0) {
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
