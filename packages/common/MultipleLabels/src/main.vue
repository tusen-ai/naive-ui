<template>
  <div class="n-multiple-labels">
    <div
      v-for="(item, index) in value"
      :key="index"
      class="n-multiple-labels__item"
    >
      <p class="n-multiple-labels__item--title">
        {{ title }}
      </p>
      <div class="n-multiple-labels__item--content">
        <slot :item="item">
          <n-input
            v-model="item.key"
            class="n-multiple-labels__item--input"
            :placeholder="placeholderKey"
          />
          <n-input
            v-model="item.value"
            class="n-multiple-labels__item--input"
            :placeholder="placeholderValue"
          />
        </slot>

        <div class="n-multiple-labels__item--action">
          <!-- <span> -->
          <n-icon
            class="n-multiple-labels__item--action--add"
            type="md-remove-circle"
            size="30"
            color="#C0818B"
            @click="remove(index)"
          />
          <n-icon
            v-if="index==value.length-1"
            class="n-multiple-labels__item--action--remove"
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
  name: 'NMultipleLabels',
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
  methods: {
    add () {
      this.value.push({
        key: '',
        value: ''
      })
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
    }
  }
}
</script>
