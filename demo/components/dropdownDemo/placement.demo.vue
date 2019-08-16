<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Placement
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-dropdown placement="bottom-start">
        <template v-slot:activator>
          menu
        </template>
        <n-dropdown-item
          v-for="item in items"
          :key="item"
          @click="handleClick(item)"
        >
          {{ item }}
        </n-dropdown-item>
      </n-dropdown>
      <!--EXAMPLE_END-->
    </div>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: ['item1longlonglong', 'item2longlonglong', 'item3longlonglong', 'item4longlonglong']
    }
  },
  methods: {
    handleClick (item) {
      this.$NMessage.info(item)
    }
  }
}
</script>
