<markdown>
# Click to switch

If `@update:current` is set, you can switch step by click.
</markdown>

<template>
  <n-steps v-model:current="current">
    <n-step
      title="I Me Mine"
      description="All through the day, I me mine I me mine, I me mine"
    />
    <n-step
      title="Let It Be"
      description="When I find myself in times of trouble Mother Mary comes to me"
    />
    <n-step
      title="Come Together"
      description="Here come old flat top He come grooving up slowly"
    />
    <n-step
      disabled
      title="Something"
      description="Something in the way she moves Attracts me like no other lover"
    />
  </n-steps>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const currentRef = ref<number | undefined>(1)
    return {
      current: currentRef
    }
  }
})
</script>
