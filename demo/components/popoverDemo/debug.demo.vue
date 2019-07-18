<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      For debug usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap; width: 300px;"
    >
      <!--EXAMPLE_START-->
      <n-popover
        v-for="i in array"
        :key="i"
        :name="String(i)"
      >
        <template v-slot:activator>
          <div class="green-block">
            {{ i }}
          </div>
        </template>
        <div class="blue-block" />
      </n-popover>
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
      array: Array.apply(null, { length: 25 }).map((k, i) => i)
    }
  }
}
</script>

<style>
.green-block {
  width: 30px;
  height: 30px;
  background-color: green;
}
.blue-block {
  width: 30px;
  height: 30px;
  background-color: blue;
}
</style>
