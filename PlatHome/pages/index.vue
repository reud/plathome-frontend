<template>
  <v-container>
    <v-card color="blue-grey darken-2" class="white--text">
      <v-card-title primary-title>
        <div>
          <div class="headline">6 device alive</div>
          <span>Welcome to your PlatHome, Device Utopia is Here</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn href="https://github.com/reud/PlatHome" target="_blank" flat dark
          >Open GitHub</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-layout wrap>
      <DeviceCard
        v-for="(deviceData, i) in devicesData"
        :key="i"
        :device-data="deviceData"
        :show="showDesc"
        @more-clicked="showDesc = !showDesc"
      />
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
}
</script>
