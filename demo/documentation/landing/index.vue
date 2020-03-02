<i18n>
{
  "zh-CN": {
    "start": "开始使用",
    "intro1": "一个实验性的 Vue UI 框架",
    "intro2": "在意样式，带主题，完整，快",
    "intro3": "有点意思"
  },
  "en-US": {
    "start": "Getting Start",
    "intro1": "An Experimental Vue UI Framework",
    "intro2": "Caring About Styles, Themed, Batteries Included, Fast",
    "intro3": "Intresting Somehow"
  }
}
</i18n>

<template>
  <n-config-consumer>
    <template v-slot="{ styleScheme, theme }">
      <div>
        <landing-footer />
        <div class="banner">
          <left-image class="left-image" />
          <right-image class="right-image" />
          <n-h1
            style="margin-top: 0;"
            class="naive-title"
          >
            <span
              @mouseenter="handleTitleMouseEnter"
              @mouseleave="handleTitleMouseLeave"
            >Na{{ hover ? 'ï' : 'i' }}ve UI</span>
          </n-h1>
          <n-p style="font-size: 16px; margin-bottom: 0;">
            {{ $t("intro1") }}
          </n-p>
          <n-p style="font-size: 16px; margin-bottom: 4px; margin-top: 4px; font-weight: 600;">
            {{ $t("intro2") }}
          </n-p>
          <n-p style="font-size: 16px; margin-top: 0;">
            {{ $t("intro3") }}
          </n-p>
          <n-button type="primary" :ghost="theme === 'dark'" size="large" @click="handleStartClick">
            {{ $t("start") }}
          </n-button>
        </div>
      </div>
    </template>
  </n-config-consumer>
</template>

<script>
import LandingFooter from './footer'
import leftImage from './Left'
import rightImage from './Right'

export default {
  components: {
    LandingFooter,
    leftImage,
    rightImage
  },
  data () {
    return {
      hover: false
    }
  },
  methods: {
    handleStartClick () {
      this.$router.push(
        /^(\/[^/]+){2}/.exec(this.$route.path)[0] + '/doc/start'
      )
    },
    handleTitleMouseEnter () {
      this.hover = true
    },
    handleTitleMouseLeave () {
      this.hover = false
    }
  }
}
</script>

<style scoped>
.banner {
  text-align: center;
  position: absolute;
  top: calc(50% - 36px);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.naive-title {
  font-family: 'Metropolis';
  font-size: 80px;
  margin-bottom: 18px;
}

@media only screen and (max-width: 1920px) {
  .left-image {
    right: calc(50% + 270px);
    width: calc(50% - 270px);
    min-width: 440px;
  }
  .right-image {
    left: calc(50% + 270px);
    width: calc(50% - 270px);
    min-width: 440px;
  }
}

@media only screen and (min-width: 1920px) {
  .left-image {
    left: 0;
    width: 700px;
  }
  .right-image {
    right: 0;
    width: 700px;
  }
}

.left-image {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.right-image {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
