<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Indeterminate
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-checkbox
        v-model="isChecked"
        :indeterminate="indeterminate"
        style="width: 120px;"
      >
        checkbox
      </n-checkbox>
      <n-checkbox
        v-model="isChecked"
        :indeterminate="indeterminate"
        style="width: 120px;"
      />
      <n-checkbox
        v-model="isChecked"
        :indeterminate="indeterminate"
        disabled
        style="width: 120px;"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">isChecked: {{ isChecked }}
indeterminate: {{ indeterminate }}</pre>
    <div class="n-doc-section__inspect">
      <n-button @click="isChecked = !isChecked">
        isChecked
      </n-button>
      <n-button @click="indeterminate = !indeterminate">
        indeterminate
      </n-button>
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
      isChecked: false,
      indeterminate: false
    }
  }
}
</script>
