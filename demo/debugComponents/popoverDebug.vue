<template>
  <div style="height: 3000px;">
    <div style="margin-left: 400px;">
      <!-- <n-popover
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
      </n-popover> -->
      <n-popover
        arrow
        trigger="click"
        :value="true"
      >
        <template v-slot:activator>
          <span>LongLongLongLong</span>
        </template>
        <span>LongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLong</span>
      </n-popover>
    </div>
    <div style="height: 100px;" />
    <div style="margin-left: 400px;">
      <!-- <n-popover
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
      </n-popover> -->
      <n-popover
        arrow
        trigger="click"
        :value="true"
      >
        <template v-slot:activator>
          <span>LongLongLongLong</span>
        </template>
        <span>LongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLong</span>
      </n-popover>
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
