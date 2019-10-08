<template>
  <span
    class="ts-funnel-container"
    :class="{'ts-funnel-container--active':status}"
    @click.stop="()=>{}"
  >
    <n-icon
      style="vertical-align: middle;"
      :class="{'ts-funnel-container--active':status}"
      type="ios-funnel"
      size="12"
    />
    <!-- <n-popover
      trigger="click"
      style="padding:0;"
      padding="0"
    >
      <template v-slot:activator>
        <n-icon
          style="vertical-align: middle;color: #63e2b7;"
          :class="{'ts-funnel-container--active':status}"
          type="ios-funnel"
          size="12"
        />
      </template>
      <slot />
    </n-popover> -->

  </span>
</template>
<script>
export default {
  props: {
    status: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.ts-funnel-container {
  display: inline-block;
  width: 14px;
  cursor: pointer;
  position: relative;
  height: 16px;
  line-height: 16px;
}
.ts-funnel-container i {
  opacity: 0.4;
}
.ts-funnel-container--active i{
  opacity: 1;
}
.ts-funnel-container:hover i {
  opacity: 1;
}

</style>
