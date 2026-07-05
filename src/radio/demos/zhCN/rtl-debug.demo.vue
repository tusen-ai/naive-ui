<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstableRadioRtl, unstableSpaceRtl } from 'naive-ui'
import { ref } from 'vue'

const checkedValueRef = ref<string | null>(null)
const rtlEnabled = ref(false)
const rtlStyles = [unstableRadioRtl, unstableSpaceRtl]
const checkedValue = checkedValueRef
const value = ref(null)
const songs = [
  {
    value: 'Rock\'n\'Roll Star',
    label: 'Rock\'n\'Roll Star'
  },
  {
    value: 'Shakermaker',
    label: 'Shakermaker'
  },
  {
    value: 'Live Forever',
    label: 'Live Forever'
  },
  {
    value: 'Up in the Sky',
    label: 'Up in the Sky'
  },
  {
    value: '...',
    label: '...'
  }
].map((s) => {
  s.value = s.value.toLowerCase()
  return s
})

function handleChange(e: Event) {
  checkedValueRef.value = (e.target as HTMLInputElement).value
}
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-space>
        <n-radio
          :checked="checkedValue === 'Definitely Maybe'"
          value="Definitely Maybe"
          name="basic-demo"
          @change="handleChange"
        >
          Definitely Maybe
        </n-radio>
        <n-radio-group v-model:value="value" name="radiobuttongroup1">
          <n-radio-button
            v-for="song in songs"
            :key="song.value"
            :value="song.value"
          >
            {{ song.label }}
          </n-radio-button>
        </n-radio-group>
      </n-space>
    </n-config-provider>
  </n-space>
</template>
