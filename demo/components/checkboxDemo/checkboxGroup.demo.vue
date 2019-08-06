<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Scaffold
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-checkbox-group v-model="cities">
        <n-checkbox
          :label="'BeijingLabel'"
        >
          Beijing
        </n-checkbox>
        <n-checkbox
          :label="'ShanghaiLabel'"
        >
          Shanghai
        </n-checkbox>
        <n-checkbox
          :label="'GuangzhouLabel'"
        >
          Guangzhou
        </n-checkbox>
        <n-checkbox
          :label="'ShenzhenLabel'"
        >
          Shenzhen
        </n-checkbox>
      </n-checkbox-group>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">{{ JSON.stringify(cities) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cities: ['666']
    }
  }
}
</script>
