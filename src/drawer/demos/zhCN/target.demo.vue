<markdown>
# 显示在指定区域

你可以通过设定 `to` 属性来自定义显示区域。记得要设定 `:trap-focus="false"` 和 `:block-scroll="false"`，否则 drawer 外的内容将无法被聚焦，body 也将无法滚动。
</markdown>

<template>
  <n-button-group>
    <n-button @click="activate('top')">
      上
    </n-button>
    <n-button @click="activate('right')">
      右
    </n-button>
    <n-button @click="activate('bottom')">
      下
    </n-button>
    <n-button @click="activate('left')">
      左
    </n-button>
  </n-button-group>
  <div
    id="drawer-target"
    style="
      position: relative;
      width: 100%;
      height: 300px;
      border: 1px solid rgba(128, 128, 128, 0.2);
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    "
  >
    显示区域
  </div>
  <n-drawer
    v-model:show="active"
    :width="200"
    :height="200"
    :placement="placement"
    :trap-focus="false"
    :block-scroll="false"
    to="#drawer-target"
  >
    <n-drawer-content title="斯通纳">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { DrawerPlacement } from 'naive-ui'

export default defineComponent({
  setup () {
    const active = ref(false)
    const placement = ref<DrawerPlacement>('right')
    const activate = (place: DrawerPlacement) => {
      active.value = true
      placement.value = place
    }
    return {
      active,
      placement,
      activate
    }
  }
})
</script>
