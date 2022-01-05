<markdown>
# Customizing countdown

Do whatever you want.
</markdown>

<template>
  <n-space item-style="display: flex; align-items: center;">
    <n-statistic label="I'm free to be whatever I" tabular-nums>
      <n-countdown
        :render="renderCountdown"
        :duration="996 * 1000"
        :active="active"
      />
    </n-statistic>
    <n-switch v-model:value="active" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { CountdownProps } from 'naive-ui'

export default defineComponent({
  setup () {
    const renderCountdown: CountdownProps['render'] = ({
      hours,
      minutes,
      seconds
    }) => {
      return [
        h(
          'span',
          {
            style: 'display: inline-block; transform: rotate(90deg);'
          },
          [String(hours).padStart(2, '0')]
        ),
        ':',
        h(
          'span',
          {
            style: 'display: inline-block; transform: rotate(180deg);'
          },
          [String(minutes).padStart(2, '0')]
        ),
        ':',
        h(
          'span',
          {
            style: 'display: inline-block; transform: rotate(270deg);'
          },
          [String(seconds).padStart(2, '0')]
        )
      ]
    }
    return {
      renderCountdown,
      active: ref(false)
    }
  }
})
</script>
