<template>
  <div>
    <h2>Welcome {{ deviceData.ipAddress }}</h2>
    <p>{{ deviceData.hostname }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { DeviceData } from '@/types';
import { deviceDataEmpty } from '@/mocks';
import { vxm } from '@/store';

@Component
export default class detail extends Vue {
  public ipAddr: string = 'default';
  public deviceData: DeviceData = deviceDataEmpty;
  created() {
    // GET parameter はcreatedで取らないとエラー
    this.ipAddr = this.$route.query.ip as string;
    this.deviceData = vxm.devices.deviceMap.get(this.ipAddr);
  }
}
</script>

<style scoped></style>
