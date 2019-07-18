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
      <div class="popover-grid">
        <n-popover
          placement="top-start"
          trigger="click"
          style="grid-area: 1 / 2 / 2 / 3;"
        >
          <template v-slot:activator>
            <n-button
              style="margin: 0;"
            >
              Top Start
            </n-button>
          </template>
          <div class="large-text">
            Oops!
          </div>
        </n-popover>
        <n-popover
          placement="top"
          trigger="click"
          style="grid-area: 1 / 3 / 2 / 4;"
        >
          <template v-slot:activator>
            <n-button
              style="margin: 0;"
            >
              Top
            </n-button>
          </template>
          <div class="large-text">
            Oops!
          </div>
        </n-popover>
        <n-popover
          placement="top-end"
          trigger="click"
          style="grid-area: 1 / 4/ 2 / 5;"
        >
          <template v-slot:activator>
            <n-button
              style="margin: 0;"
            >
              Top End
            </n-button>
          </template>
          <div class="large-text">
            Oops!
          </div>
        </n-popover>
        <n-popover
          placement="left-start"
          trigger="click"
          style="grid-area: 2 / 1 / 3 / 2;"
        >
          <template v-slot:activator>
            <n-button
              style="margin: 0;"
            >
              Left Start
            </n-button>
          </template>
          <div class="large-text">
            Oops!
          </div>
        </n-popover>
        <n-popover
          placement="left"
          trigger="click"
          style="grid-area: 3 / 1 / 4 / 2;"
        >
          <template v-slot:activator>
            <n-button
              style="margin: 0;"
            >
              Left
            </n-button>
          </template>
          <div class="large-text">
            Oops!
          </div>
        </n-popover>
        <n-popover
          placement="left-end"
          trigger="click"
          style="grid-area: 4 / 1 / 5 / 2;"
        >
          <template v-slot:activator>
            <n-button
              style="margin: 0;"
            >
              Left End
            </n-button>
          </template>
          <div class="large-text">
            Oops!
          </div>
        </n-popover>
        <n-popover
          placement="right-start"
          trigger="click"
          style="grid-area: 2 / 5 / 3 / 6;"
        >
          <template v-slot:activator>
            <n-button
              style="margin: 0;"
            >
              Right Start
            </n-button>
          </template>
          <div class="large-text">
            Oops!
          </div>
        </n-popover>
        <n-popover
          placement="right"
          trigger="click"
          style="grid-area: 3 / 5 / 4 / 6;"
        >
          <template v-slot:activator>
            <n-button
              style="margin: 0;"
            >
              Right
            </n-button>
          </template>
          <div class="large-text">
            Oops!
          </div>
        </n-popover>
        <n-popover
          placement="right-end"
          trigger="click"
          style="grid-area: 4 / 5 / 5 / 6;"
        >
          <template v-slot:activator>
            <n-button
              style="margin: 0;"
            >
              Right End
            </n-button>
          </template>
          <div class="large-text">
            Oops!
          </div>
        </n-popover>
        <n-popover
          placement="bottom-start"
          trigger="click"
          style="grid-area: 5 / 2 / 6 / 3;"
        >
          <template v-slot:activator>
            <n-button
              style="margin: 0;"
            >
              Bottom Start
            </n-button>
          </template>
          <div class="large-text">
            Oops!
          </div>
        </n-popover>
        <n-popover
          placement="bottom"
          trigger="click"
          style="grid-area: 5 / 3 / 6 / 4;"
        >
          <template v-slot:activator>
            <n-button
              style="margin: 0;"
            >
              Bottom
            </n-button>
          </template>
          <div class="large-text">
            Oops!
          </div>
        </n-popover>
        <n-popover
          placement="bottom-end"
          trigger="click"
          style="grid-area: 5 / 4 / 6 / 5;"
        >
          <template v-slot:activator>
            <n-button
              style="margin: 0;"
            >
              Bottom End
            </n-button>
          </template>
          <div class="large-text">
            Oops!
          </div>
        </n-popover>
      </div>
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

<style scoped lang="scss">
.popover-grid {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 18px;
  justify-content: center;
  align-items: center;
  .n-button {
    width: 120px;
  }
}

.large-text {
  font-size: 72px;
}
</style>
