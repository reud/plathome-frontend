<template>
  <v-container>
    <v-card color="blue-grey darken-2" class="white--text">
      <v-card-title primary-title>
        <div>
          <div class="headline">Unlimited music now</div>
          <span
            >Listen to your favorite artists and albums whenever and wherever,
            online and offline.</span
          >
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat dark>Listen now</v-btn>
      </v-card-actions>
    </v-card>
    <DeviceCard :device-data="deviceData" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';
import DeviceCard from '@/components/DeviceCard.vue';
import { deviceDataMock } from '@/mocks';
import { DeviceData } from '@/types';

@Component({
  components: {
    DeviceCard,
    Logo,
    VuetifyLogo
  }
})
export default class Index extends Vue {
  public deviceData: DeviceData = deviceDataMock;
}
</script>
