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
      <p class="green--text subtitle-1">Working</p>
    </v-card-text>
    <v-card-actions>
      <v-btn text>Share</v-btn>

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

@Component
export default class DeviceCard extends Vue {
  @Prop({ default: false })
  public show!: boolean;
  @Prop({ required: true })
  public deviceData!: DeviceData;

  @Emit()
  moreClicked() {}

  descriptionClicked() {
    this.moreClicked();
  }
}
</script>

<style scoped></style>
