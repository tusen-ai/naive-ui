<markdown>
# 图标
</markdown>

<template>
  <n-alert title="Back in the U.S.S.R.">
    <template #icon>
      <n-icon>
        <ios-airplane />
      </n-icon>
    </template>
    Well the Ukraine girls really knock me out<br>
    They leave the West behind<br>
    And Moscow girls make me sing and shout<br>
    That Georgia's always on my mind<br>
    Aw come on!
  </n-alert>
</template>

<script lang="ts">
import { IosAirplane } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    IosAirplane
  }
})
</script>
