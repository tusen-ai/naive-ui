<template>
  <div class="doc">
    <h1>选择 / n-select</h1>
    <hr>
    <h2>基本用法</h2>
    <n-select
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
    <textarea rows="40"><n-select
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
    <h2>多选</h2>
    <n-select
      v-model="selectedArray"
      multiple
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
    SelectedArray: {{ selectedArray }}
    <hr>
    <textarea rows="40"><n-select
  v-model="selectedArray"
  multiple
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedValue: null,
      selectedArray: []
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
