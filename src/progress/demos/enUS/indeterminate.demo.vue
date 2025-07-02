<markdown>
# Indeterminate progress

Use  `indeterminate` attribute to set indeterminate progress, with `duration` to control the animation duration.
</markdown>

<template>
  <n-space vertical>
    <n-progress type="line" :percentage="60" indeterminate :duration="5" />

    <n-progress
      type="line"
      :percentage="60"
      indicator-placement="inside"
      indeterminate
      :duration="5"
    />
  </n-space>
</template>
