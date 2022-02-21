<markdown>
# Grid

Use checkboxes with a grid.
</markdown>

<template>
  <n-checkbox-group>
    <n-grid :y-gap="8" :cols="2">
      <n-gi>
        <n-checkbox value="Pushes Open" label="Pushes Open" />
      </n-gi>
      <n-gi>
        <n-checkbox value="The Window" label="The Window" />
      </n-gi>
      <n-gi>
        <n-checkbox value="And Raises" label="And Raises" />
      </n-gi>
      <n-gi>
        <n-checkbox value="The Spyglass" label="The Spyglass" />
      </n-gi>
    </n-grid>
  </n-checkbox-group>
</template>
