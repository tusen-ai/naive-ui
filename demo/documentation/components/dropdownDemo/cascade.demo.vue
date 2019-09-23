<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Cascade
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-dropdown
        placement="bottom-start"
        trigger="hover"
      >
        <template v-slot:activator>
          <div>menu</div>
        </template>
        <n-dropdown-item>
          item1
        </n-dropdown-item>
        <n-dropdown-item>
          item2
        </n-dropdown-item>
        <n-dropdown-item>
          item3
        </n-dropdown-item>
        <n-dropdown-submenu>
          <template v-slot:activator>
            <n-dropdown-item
              arrow
            >
              submenu
            </n-dropdown-item>
          </template>
          <n-dropdown-item>
            item4
          </n-dropdown-item>
          <n-dropdown-item>
            item5
          </n-dropdown-item>
          <n-dropdown-submenu>
            <template v-slot:activator>
              <n-dropdown-item
                arrow
              >
                submenu2
              </n-dropdown-item>
            </template>
            <n-dropdown-item>
              item6
            </n-dropdown-item>
            <n-dropdown-item>
              item7
            </n-dropdown-item>
          </n-dropdown-submenu>
        </n-dropdown-submenu>
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
    }
  }
}
</script>
