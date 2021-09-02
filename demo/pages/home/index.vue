<template>
  <n-layout
    :native-scrollbar="false"
    :position="isMobile ? 'static' : 'absolute'"
    :style="isMobile ? undefined : 'top: var(--header-height);'"
  >
    <div class="banner" :class="`banner--${theme}`" style="overflow: hidden">
      <component class="banner-background" :is="backgroundImage"/>
      <div class="banner-right">
        <div class="banner-right__content">
          <n-h1 :style="titleStyle" class="naive-title">
            <span
              @mouseenter="handleTitleMouseEnter"
              @mouseleave="handleTitleMouseLeave"
              >Na{{ hover ? 'ï' : 'i' }}ve UI</span
            >
          </n-h1>
          <n-p style="font-size: 16px; margin-top: 0; margin-bottom: 0">
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
        </div>
      </div>
      <div class="banner-left">
        <div class="banner-left__image"/>
      </div>
    </div>
    <n-layout-footer>
      <landing-footer centered />
    </n-layout-footer>
  </n-layout>
</template>

<script>
import { computed } from 'vue'
import LandingFooter from './Footer.vue'
import { i18n, useIsMobile, useIsTablet } from '../../utils/composables'
import { useThemeName } from '../../store'
import backgroundImageDark from './BackgroundDark.vue'
import backgroundImageLight from './BackgroundLight.vue'

export default {
  components: {
    LandingFooter,
    backgroundImageDark,
    backgroundImageLight
  },
  setup () {
    const isMobileRef = useIsMobile()
    const themeRef = useThemeName()
    const backgroundImageRef = computed(() => {
      return themeRef.value === 'light' ? backgroundImageLight : backgroundImageDark
    })
    return {
      isMobile: isMobileRef,
      isTablet: useIsTablet(),
      theme: themeRef,
      backgroundImage: backgroundImageRef,
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
          intro1: '一个 Vue 3 组件库',
          intro2: '比较完整，主题可调，使用 TypeScript，不算太慢',
          intro3: '有点意思',
          intro4: '换个主题'
        },
        'en-US': {
          start: 'Get Started',
          intro1: 'A Vue 3 Component Library',
          intro2:
            'Fairly Complete, Customizable Themes, Uses TypeScript, Not Too Slow',
          intro3: 'Kinda Interesting',
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
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  justify-content: center;
}

.banner-background {
  position: absolute;
  width: 100%;
  height: 100%;
}

.banner-left {
  width: 50%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
}

.banner-left__image {
  width: 80%;
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
}

.banner--light .banner-left__image {
  background-image: url('../../assets/images/banner/left_image_light.png');
}

.banner--dark .banner-left__image {
  background-image: url('../../assets/images/banner/left_image_dark.png');
}

.banner-right {
  position: absolute;
  right: 0;
  width: 50%;
  display: flex;
  justify-content: center;
}

.banner-right__content {
  text-align: left;
}

.naive-title {
  line-height: 1;
  font-family: Metropolis, sans-serif;
  margin-bottom: 18px !important;
}

@media only screen and (max-width: 1023px) {
  .banner {
    position: static;
    text-align: left;
    padding-left: 16px;
    transform: none;
    padding-top: 60px;
    padding-right: 16px;
    min-height: 550px;
    height: calc(100vh - 124px);
  }

  .banner-right {
    position: static;
    width: 100%;
  }

  .banner-background {
    display: none;
  }

  .banner-left {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }

  .banner-left__image {
    width: 100%;
    background-position: center;
    background-size: auto 100%;
  }

  .banner--light .banner-left__image {
    background-image: url('../../assets/images/banner/image_mobile_light.png');
  }

  .banner--dark .banner-left__image {
    background-image: url('../../assets/images/banner/image_mobile_dark.png');
  }
}
</style>
