<markdown>
# Style

You can use `style` to set popover's style. You can set `scrollable` to make popover's content scrollable. If popover is scrollable, You can use `content-style` to set popover's content style.
</markdown>

<template>
  <n-space>
    <n-popover style="width: 500px" trigger="click">
      <template #trigger>
        <n-button> Width 500px </n-button>
      </template>
      Looks like a bar
    </n-popover>
    <n-popover style="max-width: 100px" trigger="click">
      <template #trigger>
        <n-button> Max width 100px </n-button>
      </template>
      Who kicks a hole in the sky so the heaven cry over me.
    </n-popover>
    <n-popover style="max-height: 240px" trigger="click" scrollable>
      <template #trigger>
        <n-button>Max height 240px</n-button>
      </template>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
    </n-popover>
    <n-popover style="padding: 0" trigger="click">
      <template #trigger>
        <n-button> No padding </n-button>
      </template>
      Put whatever you want.
    </n-popover>
    <n-popover
      style="max-height: 240px"
      content-style="padding: 0;"
      trigger="click"
      scrollable
    >
      <template #trigger>
        <n-button>Scrollable & no padding</n-button>
      </template>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
    </n-popover>
    <n-popover
      trigger="click"
      content-style="padding: 0;"
      header-style="padding: 0;"
    >
      <template #trigger>
        <n-button>With header & no padding</n-button>
      </template>
      <template #header>
        <n-text strong depth="1">
          Divider is on the bottom.
        </n-text>
      </template>
      Divider is on the top.
    </n-popover>
  </n-space>
</template>
