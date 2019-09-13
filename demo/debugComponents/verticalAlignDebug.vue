<template>
  <div style="padding: 100px;">
    <div style="width: 100%; line-height: 60px; text-decoration: underline overline;">
      123456ggg
      <n-select
        multiple
        :options="options"
        style="width: 200px;"
      />
      <n-select
        :options="options"
        style="width: 200px;"
      />
      <n-input style="width: 200px; display: inline-block;" />
    </div>
    <n-input />
    <n-select :options="options" />
    <n-select
      multiple
      :options="options"
      style="width: 200px;"
    />
    <div style="width: 100%; line-height: 60px; text-decoration: underline overline;">
      123456ggg
      <input
        style="height: 60px;display: inline-block; vertical-align: baseline;"
        value="666"
      >
      <n-checkbox />
      <div
        style="height: 60px; background: red; display: inline-block; vertical-align: baseline;"
      >
        666
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        label: 'test',
        value: 'test'
      }]
    }
  }
}
</script>
