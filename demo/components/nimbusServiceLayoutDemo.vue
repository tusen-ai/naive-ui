<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Nimbus Service Layout / n-nimbus-service-layout
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Usage
        </div>
        <div class="n-doc-section__view">
          <n-nimbus-service-layout
            icon="md-musical-notes"
            name="My Generation"
            :items="[
              {
                name: '第一个服务',
                path: '/n-nimbus-service-layout?param=666'
              },
              {
                name: '第二个服务',
                childItems: [
                  {
                    name: '二级菜单１',
                    path: '/n-nimbus-service-layout?param=777'
                  },
                  {
                    name: '二级菜单2',
                    path: '/n-nimbus-service-layout?param=888'
                  },
                  {
                    name: '二级菜单3',
                    path: '/n-nimbus-service-layout?param=999'
                  },
                  {
                    name: '二级菜单4',
                    path: '/n-nimbus-service-layout?param=000'
                  },
                  {
                    name: '二级菜单5',
                    path: '/n-nimbus-service-layout?param=111'
                  }
                ]
              },
              {
                name: '第三个服务',
                path: '/n-nimbus-service-layout?param=222'
              }
            ]"
          >
            Well people try to pug us down<br>
            Talkin' bout my generation.<br>
            Just because we get around.<br>
            Talkin' bout my generation.
          </n-nimbus-service-layout>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-nimbus-service-layout
  icon="md-musical-notes"
  name="My Generation"
  :items="[
    {
      name: '第一个服务',
      path: '/n-nimbus-service-layout?param=666'
    },
    {
      name: '第二个服务',
      childItems: [
        {
          name: '二级菜单１',
          path: '/n-nimbus-service-layout?param=777'
        },
        {
          name: '二级菜单2',
          path: '/n-nimbus-service-layout?param=888'
        },
        {
          name: '二级菜单3',
          path: '/n-nimbus-service-layout?param=999'
        },
        {
          name: '二级菜单4',
          path: '/n-nimbus-service-layout?param=000'
        },
        {
          name: '二级菜单5',
          path: '/n-nimbus-service-layout?param=111'
        }
      ]
    },
    {
      name: '第三个服务',
      path: '/n-nimbus-service-layout?param=222'
    }
  ]"
>
  Well people try to pug us down<br>
  Talkin' bout my generation.<br>
  Just because we get around.<br>
  Talkin' bout my generation.
</n-nimbus-service-layout></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import docCodeEditorMixin from './docCodeEditorMixin'
export default {
  mixins: [docCodeEditorMixin],
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.n-doc {
  width: 1080px;
  .n-doc-section__view {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 800px;
    overflow: hidden;
    border: 2px solid #5C657EFF;
  }
}
</style>
