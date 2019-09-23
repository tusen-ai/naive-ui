<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      2. About `content-selector` and `container-selector`
    </div>
    <!--EXAMPLE_START-->
    <n-back-top
      content-selector=".n-doc"
      :right="100"
    >
      <div style="width: 40px; height: 40px; line-height: 40px; text-align: center;">
        2.1
      </div>
    </n-back-top>
    <n-back-top
      container-selector=".n-scrollbar-container"
      :right="160"
    >
      <div style="width: 40px; height: 40px; line-height: 40px; text-align: center;">
        2.2
      </div>
    </n-back-top>
    <!--EXAMPLE_END-->
    <pre
      class="n-doc-section__inspect"
    >{{ explain }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
const explain = `确定 <n-back-top /> 会让哪一个元素的 scrollTop 为 0，有两种方式。
第一种是使用 content-selector，在你无法控制外部容器的时候尽量使用它。
例如 
<others-layout>
  <your-content class="content" />
  <n-back-top content-selector=".content" />
</others-layout>
当你不方便控制 <others-layout> 的时候，使用 content-selector 来选择你希望滚动的内容，
naive-ui 会自动帮你找到它首个可滚动的祖先节点。

<your-container class="container">
  <your-content>
  </your-content>
  <n-back-top container-selector=".container" />
</your-container>
当你可以控制滚动容器的时候，可以使用 container-selector 来选择你合适的滚动容器。
当然，如果滚动的是 document，你什么都不用写。
`

export default {
  data () {
    return {
      explain
    }
  }
}
</script>
