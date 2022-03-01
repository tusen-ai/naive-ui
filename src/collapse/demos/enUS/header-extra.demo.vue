<markdown>
# Extra info in header

Put some info on the right side of the item.
</markdown>

<template>
  <n-collapse>
    <n-collapse-item title="right" name="1">
      good
      <template #header-extra>
        good
      </template>
    </n-collapse-item>
    <n-collapse-item title="right" name="2">
      nice
      <template #header-extra>
        nice
      </template>
    </n-collapse-item>
    <n-collapse-item title="right" name="3">
      very good
      <template #header-extra>
        very good
      </template>
    </n-collapse-item>
  </n-collapse>
</template>
