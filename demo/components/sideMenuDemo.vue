<template>
  <div>
    <div class="service-container">
      <n-nimbus-service-layout>
        <n-with-padding
          :padding-left="48"
          :padding-right="48"
        >
          <n-table>
            <n-thead>
              <n-tr>
                <n-th>ID</n-th>
                <n-th>Cluster</n-th>
                <n-th>Cluster Type</n-th>
                <n-th>Tags</n-th>
                <n-th>Network Type</n-th>
                <n-th>Cluster Status</n-th>
                <n-th>Nodes</n-th>
                <n-th>Location</n-th>
                <n-th>Version</n-th>
                <n-th>Actions</n-th>
              </n-tr>
            </n-thead>
            <n-tbody>
              <n-tr
                v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
                :key="i"
              >
                <n-td>1</n-td>
                <n-td>Name1</n-td>
                <n-td>Type1</n-td>
                <n-td>bla</n-td>
                <n-td>blablabla</n-td>
                <n-td>Running</n-td>
                <n-td>6</n-td>
                <n-td>Beijing</n-td>
                <n-td>1.12.6-aliyun.1</n-td>
                <n-td>Manage | View Logs | Dashboard | Scale Out | More</n-td>
              </n-tr>
            </n-tbody>
          </n-table>
        </n-with-padding>
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
