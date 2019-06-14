<template>
  <div class="doc">
    <h1>scaffold</h1>
    <hr>
    <h2>基本用法</h2>
    <n-dropdown
      v-model="selectedValue"
      placeholder="Please Select Type"
      :items="[
        {
          label: 'Artifactory',
          value: 'Artifactory'
        },
        {
          label: 'Registry',
          value: 'Registry'
        },
        {
          label: 'Public',
          value: 'Public'
        },
        {
          label: 'Custom',
          value: 'Custom'
        }
      ]"
    />
    <br>SelectedValue: {{ selectedValue === null ? 'null' : selectedValue }}<br>
    <textarea rows="40"><n-dropdown
  v-model="selectedValue"
  placeholder="Please Select Type"
  :items="[
    {
      label: 'Artifactory',
      value: 'Artifactory'
    },
    {
      label: 'Registry',
      value: 'Registry'
    },
    {
      label: 'Public',
      value: 'Public'
    },
    {
      label: 'Custom',
      value: 'Custom'
    }
  ]"
/></textarea>
    <hr>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedValue: null
    }
  }
}
</script>

<style scoped lang="scss">
.doc {
  width: 900px;
  margin: auto;
  background-color: #5C657E;
  min-height: 900px;
  padding: 0px 40px;
  textarea {
    width: 100%;
    min-height: 3em;
  }
}

</style>
