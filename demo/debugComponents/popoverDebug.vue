<template>
  <div style="height: 3000px;">
    <div style="height: 400px;" />
    <div style="margin-left: 400px;">
      <n-popover
        v-model="v"
        trigger="manual"
      >
        <template v-slot:activator>
          <button
            v-if="v"
            @click="toggle"
          >
            Activator button
          </button>
          <span
            v-else
            @click="toggle"
          >Activator span</span>
        </template>
        <span>Out Out Out</span>
      </n-popover>
      <n-tooltip arrow>
        <template v-slot:activator>
          <span>LongLongLongLong</span>
        </template>
        <span>LongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLong</span>
      </n-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      v: true
    }
  },
  methods: {
    toggle () {
      this.v = !this.v
    }
  }
}
</script>
