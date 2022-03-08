<markdown>
# Rtl Debug
</markdown>

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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableRadioRtl, unstableSpaceRtl } from 'naive-ui'

export default defineComponent({
  setup () {
    const checkedValueRef = ref<string | null>(null)
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableRadioRtl, unstableSpaceRtl],
      checkedValue: checkedValueRef,
      value: ref(null),
      songs: [
        {
          value: "Rock'n'Roll Star",
          label: "Rock'n'Roll Star"
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
      }),
      handleChange (e: Event) {
        checkedValueRef.value = (e.target as HTMLInputElement).value
      }
    }
  }
})
</script>
