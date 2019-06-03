<template>
  <div class="nv-card" :style="style">
    <!-- <div class="mask">
      <div class="intro">
        <div></div>
        <div class="ribbon">
          <nv-icon type="md-lock" size="16" style="margin-right: 4px;"/>
          <div>Access Required</div>
        </div>
      </div>
    </div> -->
    <div class="intro">
      <nv-icon type="logo-github" size="32"/>
      <div class="ribbon">
        <nv-icon type="md-lock" size="16" style="margin-right: 4px;"/>
        <div>Access Required</div>
      </div>
    </div>
    <div class="title">{{ title }}</div>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: "NvCard",
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      style: {}
    }
  },
  beforeMount () {
    if (this.width !== undefined) {
      this.style.width = `${this.width}px`
    }
  }
};
</script>
