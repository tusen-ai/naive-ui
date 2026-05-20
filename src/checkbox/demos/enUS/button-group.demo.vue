<markdown>
# Button group

Checkbox also have a button group style. You can use `n-checkbox-button` inside `n-checkbox-group`.
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
  message.info(`Checked: ${checked}`)
}

function handleUpdateValueSmall(value: (string | number)[]) {
  message.info(`Small selected: ${JSON.stringify(value)}`)
}

function handleUpdateValueMedium(value: (string | number)[]) {
  message.info(`Medium selected: ${JSON.stringify(value)}`)
}

function handleUpdateValueLarge(value: (string | number)[]) {
  message.info(`Large selected: ${JSON.stringify(value)}`)
}

const roles = [
  {
    value: 'jotaro',
    label: 'Jotaro Kujo'
  },
  {
    value: 'dio',
    label: 'DIO'
  },
  {
    value: 'josuke',
    label: 'Josuke Higashikata'
  },
  {
    value: 'giorno',
    label: 'Giorno Giovanna'
  }
].map((s) => {
  s.value = s.value.toLowerCase()
  return s
})
</script>

<template>
  <n-space vertical>
    <n-space>Standalone usage:</n-space>
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>Button</th>
          <th>Value</th>
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
              Small
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
              Medium
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
              Large (Disabled)
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
              Disabled Checked
            </n-checkbox-button>
          </td>
          <td>{{ checkedDisabledChecked }}</td>
        </tr>
      </tbody>
    </n-table>
    <n-divider />
    <n-space>Button group:</n-space>
    <n-space vertical>
      <n-space>Small size</n-space>
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
      <n-space>Selected: {{ valueSmall }}</n-space>
      <n-space>Medium size</n-space>
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
      <n-space>Selected: {{ valueMedium }}</n-space>
      <n-space>Large size</n-space>
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
      <n-space>Selected: {{ valueLarge }}</n-space>
    </n-space>
  </n-space>
</template>
