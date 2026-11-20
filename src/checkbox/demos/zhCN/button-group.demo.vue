<markdown>
# 按钮组

复选框也有按钮组样式，你可以在 `n-checkbox-group` 中使用 `n-checkbox-button`。
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()

const checkedSmall = ref(true)
const checkedMedium = ref(false)
const checkedDisabled = ref(false)
const checkedDisabledChecked = ref(true)

const valueSmall = ref<(string | number)[]>([])
const valueMedium = ref<(string | number)[]>([])
const valueLarge = ref<(string | number)[]>([])

function handleCheckedChange(checked: boolean) {
  message.info(`选中状态：${checked}`)
}

function handleUpdateValueSmall(value: (string | number)[]) {
  message.info(`小尺寸选中的值：${JSON.stringify(value)}`)
}

function handleUpdateValueMedium(value: (string | number)[]) {
  message.info(`中尺寸选中的值：${JSON.stringify(value)}`)
}

function handleUpdateValueLarge(value: (string | number)[]) {
  message.info(`大尺寸选中的值：${JSON.stringify(value)}`)
}

const roles = [
  {
    value: 'jotaro',
    label: '空条承太郎'
  },
  {
    value: 'dio',
    label: 'DIO'
  },
  {
    value: 'josuke',
    label: '东方仗助'
  },
  {
    value: 'giorno',
    label: '乔鲁诺·乔巴拿'
  }
].map((s) => {
  s.value = s.value.toLowerCase()
  return s
})
</script>

<template>
  <n-space vertical>
    <n-space>独立使用：</n-space>
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>按钮</th>
          <th>选中值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <n-checkbox-button
              v-model:checked="checkedSmall"
              size="small"
              @update:checked="handleCheckedChange"
            >
              小尺寸
            </n-checkbox-button>
          </td>
          <td>{{ checkedSmall }}</td>
        </tr>
        <tr>
          <td>
            <n-checkbox-button
              v-model:checked="checkedMedium"
              size="medium"
              @update:checked="handleCheckedChange"
            >
              中尺寸
            </n-checkbox-button>
          </td>
          <td>{{ checkedMedium }}</td>
        </tr>
        <tr>
          <td>
            <n-checkbox-button
              v-model:checked="checkedDisabled"
              disabled
              size="large"
              @update:checked="handleCheckedChange"
            >
              大尺寸（禁用）
            </n-checkbox-button>
          </td>
          <td>{{ checkedDisabled }}</td>
        </tr>
        <tr>
          <td>
            <n-checkbox-button
              v-model:checked="checkedDisabledChecked"
              disabled
              @update:checked="handleCheckedChange"
            >
              禁用选中
            </n-checkbox-button>
          </td>
          <td>{{ checkedDisabledChecked }}</td>
        </tr>
      </tbody>
    </n-table>
    <n-divider />
    <n-space>按钮组：</n-space>
    <n-space vertical>
      <n-space>小尺寸</n-space>
      <n-checkbox-group
        v-model:value="valueSmall"
        size="small"
        @update:value="handleUpdateValueSmall"
      >
        <n-checkbox-button
          v-for="role in roles"
          :key="role.value"
          :value="role.value"
          :label="role.label"
        />
      </n-checkbox-group>
      <n-space>选中的值：{{ valueSmall }}</n-space>
      <n-space>中尺寸</n-space>
      <n-checkbox-group
        v-model:value="valueMedium"
        size="medium"
        @update:value="handleUpdateValueMedium"
      >
        <n-checkbox-button
          v-for="role in roles"
          :key="role.value"
          :value="role.value"
          :label="role.label"
        />
      </n-checkbox-group>
      <n-space>选中的值：{{ valueMedium }}</n-space>
      <n-space>大尺寸</n-space>
      <n-checkbox-group
        v-model:value="valueLarge"
        size="large"
        @update:value="handleUpdateValueLarge"
      >
        <n-checkbox-button
          v-for="role in roles"
          :key="role.value"
          :value="role.value"
          :label="role.label"
        />
      </n-checkbox-group>
      <n-space>选中的值：{{ valueLarge }}</n-space>
    </n-space>
  </n-space>
</template>
