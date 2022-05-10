<markdown>
# 自定义指示标

你可以自定义指示标内容。
</markdown>

<template>
  <n-progress type="circle" :percentage="20">
    <span style="text-align: center">20% 很小</span>
  </n-progress>
  <n-progress type="line" status="success" :percentage="20">
    别在这里写太长的内容，不然线会很短
  </n-progress>
</template>
