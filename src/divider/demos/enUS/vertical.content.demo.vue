<markdown>
# Vertical Title
</markdown>

<template>
  <div style="height: 200px">
    This
    <n-divider vertical title-placement="before">
      Solid
    </n-divider>
    And
    <n-divider
      vertical
      type="dashed"
      :theme-overrides="{
        borderWidth: '4px',
      }"
    >
      Dashed
    </n-divider>
    And
    <n-divider
      vertical
      type="dotted"
      title-placement="after"
      :theme-overrides="{
        borderWidth: '4px',
      }"
    >
      Dotted
    </n-divider>
  </div>
</template>
