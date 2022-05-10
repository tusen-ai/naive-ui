<markdown>
# 样式

可以用 `style` 来设置 popover 的样式；你可以使用 `scrollable` 让 popover 内容可以滚动；在 `:scrollable="true"` 的情况下，你可以用 `content-style` 设定 popover 内容的样式。
</markdown>

<template>
  <n-space>
    <n-popover style="width: 500px" trigger="click">
      <template #trigger>
        <n-button>宽度 500px</n-button>
      </template>
      长得像根条一样
    </n-popover>
    <n-popover style="max-width: 100px" trigger="click">
      <template #trigger>
        <n-button> 最大宽度 100px </n-button>
      </template>
      内容长度不确定的时候，设置最大宽度可能更好看
    </n-popover>
    <n-popover style="max-height: 240px" trigger="click" scrollable>
      <template #trigger>
        <n-button>最大高度 240px</n-button>
      </template>
      演员失业 电缆失窃<br>
      共享富裕 共享恐惧<br>
      东方睡衣 涌上街头<br>
      街头嘈杂 公共聋哑<br>
      紧急换电缆 循环追捕令<br>
      紧急换电缆 循环追捕令<br>
      我有迷魂 额头滚烫<br>
      我有迷魂 人间明暗<br>
      鸟兽暗语 危险消息<br>
      自然友谊 自然躲避<br>
      西郊有密林 助君出重围<br>
      西郊有密林 助君出重围
    </n-popover>
    <n-popover
      style="max-height: 240px"
      content-style="padding: 0;"
      trigger="click"
      scrollable
    >
      <template #trigger>
        <n-button>可滚动 & 无 padding</n-button>
      </template>
      演员失业 电缆失窃<br>
      共享富裕 共享恐惧<br>
      东方睡衣 涌上街头<br>
      街头嘈杂 公共聋哑<br>
      紧急换电缆 循环追捕令<br>
      紧急换电缆 循环追捕令<br>
      我有迷魂 额头滚烫<br>
      我有迷魂 人间明暗<br>
      鸟兽暗语 危险消息<br>
      自然友谊 自然躲避<br>
      西郊有密林 助君出重围<br>
      西郊有密林 助君出重围
    </n-popover>
    <n-popover
      trigger="click"
      content-style="padding: 0;"
      header-style="padding: 0;"
    >
      <template #trigger>
        <n-button>有 header & 无 padding</n-button>
      </template>
      <template #header>
        <n-text strong depth="1">
          下面就是分割线
        </n-text>
      </template>
      上面就是分割线
    </n-popover>
    <n-popover style="padding: 0" trigger="click">
      <template #trigger>
        <n-button>没有 padding</n-button>
      </template>
      你可以随便放点什么
    </n-popover>
  </n-space>
</template>
