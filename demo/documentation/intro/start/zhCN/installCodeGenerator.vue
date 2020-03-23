<template>
  <div>
    <n-card title="生成按需引入代码">
      <n-form>
        <n-row :gutter="12">
          <n-form-item-col label="导入组件" :span="12">
            <n-select
              v-model="componentsToImport"
              placeholder="导入组件"
              :options="options"
              filterable
              clearable
              multiple
            />
          </n-form-item-col>
          <n-form-item-col label="导入语言" :span="6">
            <n-select
              v-model="locales"
              placeholder="导入语言"
              :options="localeOptions"
              filterable
              clearable
              multiple
            />
          </n-form-item-col>
          <n-form-item-col label="导入格式" :span="6">
            <n-select
              v-model="format"
              placeholder="导入格式"
              :options="formatOptions"
            />
          </n-form-item-col>
        </n-row>
      </n-form>
      <n-code :code="code" :language="'js'" />
    </n-card>
  </div>
</template>

<script>
import {
  createInstallStatements,
  exportedComponents
} from 'src/components'

export default {
  data () {
    return {
      components: Object.keys(exportedComponents),
      localeOptions: [
        {
          label: '中文', value: 'zhCN'
        },
        {
          label: 'English', value: 'enUS'
        }
      ],
      locales: ['zhCN', 'enUS'],
      formatOptions: [
        {
          label: 'ES Module',
          value: 'esm'
        },
        {
          label: 'Common JS',
          value: 'cjs'
        }
      ],
      format: 'esm',
      componentsToImport: [
        'Button'
      ]
    }
  },
  computed: {
    code () {
      return this.createInstallStatements(
        this.componentsToImport,
        this.locales,
        this.format
      )
    },
    options () {
      return this.components.map(component => ({
        label: component.replace(/([a-z])([A-Z])/g, '$1 $2'),
        value: component
      }))
    }
  },
  methods: {
    createInstallStatements
  }
}
</script>

<style scoped>
.n-select {
  margin: 0 8px 12px 0;
}
</style>
