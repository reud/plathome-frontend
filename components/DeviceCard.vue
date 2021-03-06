<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      <h2>{{ deviceData.ipAddress }} ( {{ deviceData.hostname }} )</h2>
    </v-card-title>

    <v-card-text>
      <v-chip :color="stateColor" text-color="white">
        <v-avatar>
          <v-icon>{{ stateIcon }}</v-icon>
        </v-avatar>
        {{ deviceData.state }}
      </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="purple" :to="`/detail?ip=${deviceData.ipAddress}`">
        Detail
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="descriptionClicked">
        <v-icon>{{
          show ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
        }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-btn
          v-for="(model, i) in deviceData.ezRequesterModels"
          :key="i"
          block
          color="secondary"
          dark
          :loading="ezRequesterSendingStates[i]"
          :disabled="ezRequesterSendingStates[i]"
          @click="sendRequest(i)"
          >{{ model.parameterModel }}</v-btn
        >
        <v-card-text>
          {{ deviceData.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator';
import { DeviceData } from '@/types';
import { vxm } from '@/store';
import { EzRequest } from '@/apis';
@Component
export default class DeviceCard extends Vue {
  @Prop({ default: false })
  public show!: boolean;
  @Prop({ required: true })
  public deviceData!: DeviceData;

  public stateColor: string = 'red';
  public stateIcon: string = 'error';
  public ezRequesterSendingStates: boolean[] = [];

  @Emit()
  moreClicked() {}
  created() {
    for (let i = 0; i < this.deviceData.ezRequesterModels.length; ++i) {
      this.ezRequesterSendingStates.push(false);
    }
  }
  mounted() {
    switch (this.deviceData.state) {
      case 'waiting':
        this.stateColor = 'grey';
        this.stateIcon = 'device_unknown';
        break;
      case 'alive':
        this.stateColor = 'green';
        this.stateIcon = 'done';
        break;
      case 'timeout':
        this.stateColor = 'red';
        this.stateIcon = 'notification_important';
        break;
      default:
        break;
    }
  }
  // WIP
  public async sendRequest(i: number) {
    Vue.set(this.ezRequesterSendingStates, i, true);
    const p = this.deviceData.ezRequesterModels[i].parameterModel;
    const m = this.deviceData.ezRequesterModels[i].protocolModel;
    const u = `${m}://${this.deviceData.ipAddress}${p}`;
    vxm.log.SET_LOG(`GET: ${u}`);
    try {
      const r = await EzRequest(u);
      vxm.log.SET_LOG(`RESULT: ${JSON.stringify(r.data)}`);
    } catch (e) {
      vxm.log.SET_LOG(`FAILED: ${JSON.stringify(e.toString())}`);
    }
    Vue.set(this.ezRequesterSendingStates, i, false);
  }
  descriptionClicked() {
    this.moreClicked();
  }
}
</script>

<style scoped></style>
