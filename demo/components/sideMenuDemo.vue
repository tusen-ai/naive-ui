<template>
  <div>
    <div class="service-container">
      <nv-service-layout>
        <nv-with-padding
          :padding-left="48"
          :padding-right="48"
        >
          <nv-table>
            <template v-slot:header>
              <nv-tr>
                <nv-th>ID</nv-th>
                <nv-th>Cluster</nv-th>
                <nv-th>Cluster Type</nv-th>
                <nv-th>Tags</nv-th>
                <nv-th>Network Type</nv-th>
                <nv-th>Cluster Status</nv-th>
                <nv-th>Nodes</nv-th>
                <nv-th>Location</nv-th>
                <nv-th>Version</nv-th>
                <nv-th>Actions</nv-th>
              </nv-tr>
            </template>
            <template v-slot:body>
              <nv-tr
                v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
                :key="i"
              >
                <nv-td>1</nv-td>
                <nv-td>Name1</nv-td>
                <nv-td>Type1</nv-td>
                <nv-td>bla</nv-td>
                <nv-td>blablabla</nv-td>
                <nv-td>Running</nv-td>
                <nv-td>6</nv-td>
                <nv-td>Beijing</nv-td>
                <nv-td>1.12.6-aliyun.1</nv-td>
                <nv-td>Manage | View Logs | Dashboard | Scale Out | More</nv-td>
              </nv-tr>
            </template>
          </nv-table>
        </nv-with-padding>
      </nv-service-layout>
    </div>
    <div class="nav-container">
      <nv-navbar />
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
