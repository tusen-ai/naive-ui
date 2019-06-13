<template>
  <div
    class="n-card"
    :style="style"
  >
    <!-- <div class="mask">
      <div class="intro">
        <div></div>
        <div class="ribbon">
          <n-icon type="md-lock" size="16" style="margin-right: 4px;"/>
          <div>Access Required</div>
        </div>
      </div>
    </div> -->
    <div class="intro">
      <n-icon
        type="logo-github"
        size="32"
      />
      <div class="ribbon">
        <n-icon
          type="md-lock"
          size="16"
          style="margin-right: 4px;"
        />
        <div>Access Required</div>
      </div>
    </div>
    <div class="title">
      {{ title }}
    </div>
    <div class="content">
      {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NCard',
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
      required: false,
      default: 14
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
}
</script>
