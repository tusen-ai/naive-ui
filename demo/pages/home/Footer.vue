<template>
  <n-layout-footer
    bordered
    class="footer"
    :class="{
      ['footer--centered']: centered
    }"
  >
    <div class="footer-links">
      <div class="footer-links-col">
        <n-text depth="1" class="col-header">{{ t('resources') }}</n-text>
        <n-button disabled text>{{ t('designResources') }}</n-button>
        <n-button text tag="a" target="_blank" href="https://xicons.org">{{
          t('icons')
        }}</n-button>
      </div>
      <div class="footer-links-col">
        <n-text depth="1" class="col-header">{{ t('help') }}</n-text>
        <n-button text @click="push('/docs/common-issues')">{{
          t('commonIssues')
        }}</n-button>
        <n-button text @click="push('/docs/changelog')">{{
          t('changelog')
        }}</n-button>
      </div>
      <div class="footer-links-col">
        <n-text depth="1" class="col-header">{{ t('community') }}</n-text>
        <n-button text tag="a" target="_blank" href="https://www.github.com">
          Github
        </n-button>
        <n-button text>Discord</n-button>
        <n-button text>钉钉</n-button>
      </div>
      <div class="footer-links-col footer-links-col--last">
        <n-text depth="1" class="col-header">{{ t('contact') }}</n-text>
        <n-button
          text
          tag="a"
          target="_blank"
          href="https://www.tusimple.com/"
          >{{ t('tusimple') }}</n-button
        >
        <n-button text>{{ t('joinUs') }}</n-button>
      </div>
    </div>
    <n-divider class="footer-divider" />
    <div style="text-align: center; padding: 20px">
      <n-text depth="3">Naive UI {{ version }} · Made by Tusimple</n-text>
    </div>
  </n-layout-footer>
</template>

<script>
import { i18n } from '../../utils/composables'
import { push } from '../../store'
import { version } from 'naive-ui'

export default {
  props: {
    centered: Boolean
  },
  setup () {
    return {
      version,
      push,
      ...i18n({
        'zh-CN': {
          resources: '资源',
          designResources: '设计资源',
          help: '帮助',
          community: '社区',
          contact: '联系我们',
          changelog: '更新日志',
          commonIssues: '常见问题',
          tusimple: '图森未来',
          joinUs: '加入我们',
          icons: '图标库'
        },
        'en-US': {
          resources: 'Resources',
          designResources: 'Design Resources',
          help: 'Help',
          community: 'Community',
          contact: 'Contact Us',
          changelog: 'Change Log',
          commonIssues: 'Common Issues',
          tusimple: 'TuSimple',
          joinUs: 'Join Us',
          icons: 'Icon Library'
        }
      })
    }
  }
}
</script>

<style scoped>
.footer {
  --x-padding: 56px;
  margin-top: auto;
}

.footer.footer--centered .footer-links {
  margin: auto;
  max-width: 960px;
  --x-padding: 36px;
}

.footer-links {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: var(--x-padding);
  padding-bottom: 0;
  padding-top: 32px;
}

.footer-links-col {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 24px;
  padding-bottom: 24px;
}

.col-header {
  white-space: nowrap;
}

@media only screen and (min-width: 1024px) {
  .footer.footer--centered .footer-links-col.footer-links-col--last {
    flex: 0 0 0;
  }
}

.footer.footer--centered .footer-links-col {
  width: initial;
}

.footer-divider {
  margin: 0;
  padding: 0 var(--x-padding);
}

.footer-links-col > * {
  line-height: 2;
}

.col-header {
  font-weight: 500;
}

.link {
  text-decoration: none;
}
</style>
