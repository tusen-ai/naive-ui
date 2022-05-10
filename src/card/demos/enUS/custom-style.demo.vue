<markdown>
# Custom

Card provides `content-style`, `header-style`, `footer-style` to help you customize style. For example you want an card with no padding to put whatever you want.
</markdown>

<template>
  <n-card content-style="padding: 0;">
    <n-tabs
      type="line"
      size="large"
      :tabs-padding="20"
      pane-style="padding: 20px;"
    >
      <n-tab-pane name="PARKLIFE">
        PARKLIFE
      </n-tab-pane>
      <n-tab-pane name="ROCKLIFE">
        ROCKLIFE
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
