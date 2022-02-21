<markdown>
# Change position

For example: right 40px & bottom 160px.
</markdown>

<template>
  <n-back-top
    :right="40"
    :bottom="160"
    :style="{
      transition: 'all .3s cubic-bezier(.4, 0, .2, 1)'
    }"
  >
    <div
      style="
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      "
    >
      Change Position
    </div>
  </n-back-top>
</template>
