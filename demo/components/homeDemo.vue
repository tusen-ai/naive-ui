<template>
  <div>
    <div class="main-container">
      <n-home-layout>
        <n-with-padding
          :padding-top="16"
          :padding-bottom="23"
        >
          <n-gradient-header :font-size="18">
            All Services
          </n-gradient-header>
        </n-with-padding>
        <n-masonry-group>
          <n-service-card
            v-for="service in services"
            :key="service.title"
            :title="service.title"
            :items="service.items"
            class="grid-item"
            style="width: 271.5px"
          />
        </n-masonry-group>
      </n-home-layout>
    </div>
    <div class="nav-container">
      <n-navbar />
    </div>
  </div>
</template>

<script>
const services = [
  {
    title: 'Compute',
    items: ['Lambda2', 'Importer & Debrief']
  },
  {
    title: 'Data',
    items: ['VTS', 'Dataset', 'Rancher']
  },
  {
    title: 'Storage',
    items: ['Lambda', 'Tsflow', 'Tuyaco', 'Truenas']
  },
  {
    title: 'HR',
    items: ['Moka', 'Greenhouse', 'Online Interview Tool']
  },
  {
    title: 'Cloud',
    items: ['Aliyun', 'Rancher', 'Jenkins', 'Xray', 'MissionControl']
  },
  {
    title: 'Workspace',
    items: ['DingdingWeb', 'Exmail', 'GSuite', 'Moka', 'Jira']
  },
  {
    title: 'Monitoring',
    items: ['Guardian', 'Prometheus Server']
  },
  {
    title: 'Identity & Secunit',
    items: ['IDM', 'IAM']
  },
  {
    title: 'Network',
    items: ['CloudWAN']
  }
]

export default {
  data () {
    return {
      services
    }
  }
}
</script>

<style scoped>
.nav-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  min-width: 1280px;
  background-color: #1f263e;
}
.main-container {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  width: 100%;
  min-width: 1280px;
  background-color: #171D33;
  overflow: auto;
}
</style>
