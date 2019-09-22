<template>
  <v-container>
    <v-card color="blue-grey darken-2" class="white--text">
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ devicesData.length }} device exists</div>
          <span>Welcome to your PlatHome, Device Utopia is Here</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat dark @click="refresh">Refresh</v-btn>
      </v-card-actions>
    </v-card>
    <v-layout wrap>
      <v-flex
        v-for="(deviceData, i) in devicesData"
        :key="i"
        xs12
        sm12
        md6
        lg4
        xl3
      >
        <DeviceCard
          :device-data="deviceData"
          :show="showDesc"
          @more-clicked="showDesc = !showDesc"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';
import DeviceCard from '@/components/DeviceCard.vue';
import { DeviceData } from '@/types';
import { vxm } from '@/store';
import { GetDevices } from '@/apis';

@Component({
  components: {
    DeviceCard,
    Logo,
    VuetifyLogo
  }
})
export default class Index extends Vue {
  public showDesc: boolean = false;
  get devicesData(): DeviceData[] {
    return vxm.devices.deviceData;
  }
  public async refresh() {
    vxm.log.SET_LOG('refresh button clicked');
    await GetDevices();
  }
  async asyncData() {
    vxm.log.SET_LOG('read devices from network...');
    await GetDevices();
  }
}
</script>
