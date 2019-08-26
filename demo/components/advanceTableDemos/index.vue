<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Alert / n-alert
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <basicUsage />
      <slotUsage />
      <seniorUsage />
      <tablePropsUsage />
      <eventUsage />
      <tableMethodsUsage />
      <columnUsage />
    </div>
  </div>
</template>

<script>
import seniorUsage from './seniorUsage.demo.vue'
import basicUsage from './basicUsage.demo.vue'
import slotUsage from './slotUsage.demo.vue'
import tablePropsUsage from './tableProps.vue'
import eventUsage from './event.vue'
import columnUsage from './column.vue'

import tableMethodsUsage from './tableMethods.vue'

export default {
  components: {
    seniorUsage,
    basicUsage,
    slotUsage,
    eventUsage,
    columnUsage,
    tablePropsUsage,
    tableMethodsUsage
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
