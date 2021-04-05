<template>
  <div>
    <n-layout-footer position="absolute" style="z-index: auto">
      <landing-footer style="max-width: 1200px; margin: auto" />
    </n-layout-footer>
    <div class="banner">
      <right-image class="right-image" v-if="!isMobile" />
      <n-h1 :style="titleStyle" class="naive-title">
        <span
          @mouseenter="handleTitleMouseEnter"
          @mouseleave="handleTitleMouseLeave"
          >Na{{ hover ? 'ï' : 'i' }}ve UI</span
        >
      </n-h1>
      <n-p style="font-size: 16px; margin-bottom: 0">
        {{ t('intro1') }}
      </n-p>
      <n-p
        style="
          font-size: 16px;
          margin-bottom: 4px;
          margin-top: 4px;
          font-weight: 500;
        "
      >
        {{ t('intro2') }}
      </n-p>
      <n-p style="font-size: 16px; margin-top: 0">
        {{ t('intro3') }}
      </n-p>
      <div>
        <n-button
          type="default"
          size="large"
          style="margin-right: 12px"
          @click="handleThemeChangeClick"
        >
          {{ t('intro4') }}
        </n-button>
        <n-button
          type="primary"
          :ghost="theme === 'dark'"
          size="large"
          @click="handleStartClick"
        >
          {{ t('start') }}
        </n-button>
      </div>
      <left-image class="left-image" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import LandingFooter from './Footer.vue'
import leftImage from './Left.vue'
import rightImage from './Right.vue'
import { i18n, useIsMobile } from '../../utils/composables'
import { useThemeName } from '../../store'

export default {
  components: {
    LandingFooter,
    leftImage,
    rightImage
  },
  setup () {
    const isMobileRef = useIsMobile()
    return {
      isMobile: isMobileRef,
      theme: useThemeName(),
      titleStyle: computed(() => {
        if (isMobileRef.value) {
          return 'margin-top: 0; font-size: 64px !important'
        } else {
          return 'margin-top: 0; font-size: 80px !important'
        }
      }),
      ...i18n({
        'zh-CN': {
          start: '开始使用',
          intro1: '一个 Vue UI 框架',
          intro2: '在意样式，带主题，比较完整，不算太慢',
          intro3: '有点意思',
          intro4: '换个主题'
        },
        'en-US': {
          start: 'Get Started',
          intro1: 'A Vue UI Framework',
          intro2:
            'Caring About Styles, Themed, Batteries Included, Not Rather Slow',
          intro3: 'Interesting Somehow',
          intro4: 'Change Theme'
        }
      })
    }
  },
  data () {
    return {
      hover: false,
      themeOptions: {
        dark: {
          next: 'light'
        },
        light: {
          next: 'dark'
        }
      }
    }
  },
  methods: {
    handleStartClick () {
      this.$router.push(this.$route.path + '/docs/installation')
    },
    handleTitleMouseEnter () {
      this.hover = true
    },
    handleTitleMouseLeave () {
      this.hover = false
    },
    handleThemeChangeClick () {
      this.theme = this.themeOptions[this.theme].next
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
  font-family: Metropolis, sans-serif;
  margin-bottom: 18px !important;
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

@media only screen and (max-width: 600px) {
  .banner {
    text-align: left;
    margin-left: 16px;
    top: calc(50vh - 64px);
  }
  .left-image {
    position: relative;
    left: -16px;
    min-width: unset;
    width: 72vw;
    top: 8px;
    transform: none;
  }
}
</style>
