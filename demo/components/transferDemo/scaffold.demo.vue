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
      <n-transfer
        ref="transfer"
        v-model="value"
        :options="options"
      />
      <!--EXAMPLE_END-->
    </div>
    <div class="n-doc-section__inspect">
      <n-button @click="regenOptions">
        Regen Options
      </n-button>
      <n-button @click="regenValues">
        Regen Values
      </n-button>
    </div>
    <pre class="n-doc-section__inspect">{{ JSON.stringify(value) }}</pre>
    <pre class="n-doc-section__inspect">{{ $refs.transfer ? $refs.transfer._data : null }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
let prefix = null

function genOptions () {
  prefix = Math.random().toString(36).slice(2, 5)
  return Array.apply(null, { length: 20 }).map((v, i) => ({
    label: prefix + 'Option' + i,
    value: prefix + i
  }))
}

function genValues () {
  return Array.apply(null, { length: 5 }).map((v, i) => prefix + i)
}

export default {
  data () {
    return {
      options: genOptions(),
      value: genValues()
    }
  },
  mounted () {
  },
  methods: {
    regenOptions () {
      this.options = genOptions()
    },
    regenValues () {
      this.value = genValues()
    }
  }
}
</script>
