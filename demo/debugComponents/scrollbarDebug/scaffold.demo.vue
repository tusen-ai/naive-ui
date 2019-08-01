<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Scrollbar
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <div style="width: 400px; height: 300px;">
        <n-scrollbar>
          <div style="background: linear-gradient(red, blue); width: 800px; height: 500px;">
            666
          </div>
        </n-scrollbar>
      </div>
      <div style="width: 400px; height: 300px;">
        <n-scrollbar>
          <div style="background: linear-gradient(red, blue); width: 400px; height: 500px;">
            666
          </div>
        </n-scrollbar>
      </div>
      <div style="width: 400px; height: 300px;">
        <n-scrollbar>
          <div style="background: linear-gradient(red, blue); width: 800px; height: 300px;">
            666
          </div>
        </n-scrollbar>
      </div>
      <div style="width: 400px; height: 300px;">
        <n-scrollbar>
          <div style="background: linear-gradient(red, blue); height: 300px;">
            <div style="background: yellow; width: 100%; color: black;">
              666
            </div>
          </div>
        </n-scrollbar>
      </div>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">Inspect some value here</pre>
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
