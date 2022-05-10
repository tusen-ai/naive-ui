<template>
  <n-layout
    :native-scrollbar="false"
    :position="isMobile ? 'static' : 'absolute'"
    :style="isMobile ? undefined : 'top: var(--header-height);'"
  >
    <div class="banner" style="overflow: hidden">
      <right-image v-if="!(isMobile || isTablet)" class="right-image" />
      <n-h1 :style="titleStyle" class="naive-title">
        <span
          @mouseenter="handleTitleMouseEnter"
          @mouseleave="handleTitleMouseLeave"
        >Na{{ hover ? 'ï' : 'i' }}ve UI</span>
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
      <left-image class="left-image" />
    </div>
    <n-layout-footer>
      <landing-footer centered />
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import LandingFooter from './Footer.vue'
import leftImage from './Left.vue'
import rightImage from './Right.vue'
import { i18n, useIsMobile, useIsTablet } from '../../utils/composables'
import { useThemeName } from '../../store'

export default defineComponent({
  components: {
    LandingFooter,
    leftImage,
    rightImage
  },
  setup () {
    const isMobileRef = useIsMobile()
    return {
      isMobile: isMobileRef,
      isTablet: useIsTablet(),
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
          intro1: '一个 Vue 3 组件库',
          intro2: '比较完整，主题可调，使用 TypeScript，快',
          intro3: '有点意思',
          intro4: '换个主题'
        },
        'en-US': {
          start: 'Get Started',
          intro1: 'A Vue 3 Component Library',
          intro2: 'Fairly Complete, Theme Customizable, Uses TypeScript, Fast',
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
})
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

.banner::after {
  content: '';
  width: 100%;
  height: 64px;
}

.naive-title {
  line-height: 1;
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
  .left-image {
    position: relative;
    left: -16px;
    min-width: unset;
    width: 300px;
    top: 8px;
    transform: none;
  }
}
</style>
