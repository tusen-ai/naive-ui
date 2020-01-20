<!--template>
  <n-select v-model="value" :options="options" />
</template-->

<template>
  <!-- <n-select v-model="value">
    <n-select-option label="label1" value="value1">
      Dog
    </n-select-option>
    <n-select-option label="label2" value="value2">
      Cat
    </n-select-option>
    <n-select-option label="label3" value="value3">
      Money
    </n-select-option>
    <n-select-option label="label4" value="value4">
      Tiger
    </n-select-option>
    <n-select-option label="label5" value="value5">
      Happy
    </n-select-option>
  </n-select> -->
  <n-select v-model="value" :options="options" multiple />
</template>
<script>
export default {
  data () {
    const options = []
    for (let i = 0; i < 10000; ++i) {
      options.push({
        label: String(i),
        value: i
      })
    }
    return {
      options,
      value: null
    }
  }
}
</script>
