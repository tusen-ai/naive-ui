<markdown>
# Grid Basic

</markdown>

<template>
  <n-grid
    cols="3 400:4 500:5 600:6 700:7"
    :x-gap="12"
    :y-gap="8"
    :collapsed="collapsed"
    :collapsed-rows="3"
    style="align-items: center"
  >
    <n-grid-item span="10">
      <div class="light-green">
        0
      </div>
    </n-grid-item>
    <n-grid-item span="0">
      <div class="light-green">
        0.5
      </div>
    </n-grid-item>
    <n-grid-item :span="2" offset="0 400:1 500:2 600:3">
      <div class="green">
        1
      </div>
    </n-grid-item>
    <n-grid-item span="0">
      <div class="light-green">
        1.5
      </div>
    </n-grid-item>
    <n-grid-item :span="2">
      <div class="light-green">
        2
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        3
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="light-green">
        4
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        5
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="light-green">
        6
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        7
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="light-green">
        6
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        7
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="light-green">
        8
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        9
      </div>
    </n-grid-item><n-grid-item>
      <div class="light-green">
        10
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        11
      </div>
    </n-grid-item>
    <n-grid-item suffix style="justify-self: end">
      <n-button @click="collapsed = !collapsed">
        <template v-if="collapsed">
          Expand
        </template>
        <template v-else>
          Collapse
        </template>
      </n-button>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const collapsedRef = ref(true)
    return {
      collapsed: collapsedRef
    }
  }
})
</script>

<style>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>
