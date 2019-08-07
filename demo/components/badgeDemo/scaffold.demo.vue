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
      <n-badge
        :value="value"
        :max="10"
        style="margin-right: 24px;"
      >
        <n-icon
          type="ios-alarm"
          :size="24"
        />
      </n-badge>
      <n-badge
        dot
        style="margin-right: 24px;"
      >
        <n-icon
          type="ios-alarm"
          :size="24"
        />
      </n-badge>
      <n-badge
        :value="value"
        type="error"
        style="margin-right: 24px;"
      >
        <n-icon
          type="ios-alarm"
          :size="24"
        />
      </n-badge>
      <n-badge
        :value="value"
        type="info"
        style="margin-right: 24px;"
      >
        <n-icon
          type="ios-alarm"
          :size="24"
        />
      </n-badge>
      <n-badge
        :value="value"
        type="success"
        style="margin-right: 24px;"
      >
        <n-icon
          type="ios-alarm"
          :size="24"
        />
      </n-badge>
      <n-badge
        :value="value"
        type="warning"
        style="margin-right: 24px;"
      >
        <n-icon
          type="ios-alarm"
          :size="24"
        />
      </n-badge>
      <!--EXAMPLE_END-->
    </div>
    <div class="n-doc-section__inspect">
      <n-input-number v-model="value" />
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
      value: 0
    }
  }
}
</script>
