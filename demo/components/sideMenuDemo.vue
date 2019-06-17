<template>
  <div>
    <div class="service-container">
      <n-nimbus-service-layout
        name="已经不需要，一些挽留字句"
        :items="[
          {
            name: '第一个服务'
          },
          {
            name: '第二个服务',
            childItems: [
              {
                name: '二级菜单１'
              },
              {
                name: '二级菜单2'
              },
              {
                name: '二级菜单3'
              },
              {
                name: '二级菜单4'
              },
              {
                name: '二级菜单5'
              }
            ]
          },
          {
            name: '第三个服务'
          }
        ]"
      >
        <n-gradient-text>你觉得应该怎么写</n-gradient-text>
        <textarea
          rows="50"
          style="width: 100%;"
        ><n-nimbus-service-layout
  name="已经不需要，一些挽留字句"
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
  <n-gradient-text>你觉得应该怎么写</n-gradient-text>
  ...
</n-nimbus-service-layout></textarea>
      </n-nimbus-service-layout>
    </div>
    <div class="nav-container">
      <n-navbar />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.nav-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  min-width: 1280px;
  background-color: #1f263e;
}
.service-container {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-width: 1280px;
  background-color: #171D33;
  overflow: auto;
}
</style>
