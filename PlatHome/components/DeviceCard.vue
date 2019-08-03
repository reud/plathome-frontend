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
      <p class="grey--text subtitle-1">1,000 miles of wonder</p>
    </v-card-text>
    <v-card-actions>
      <v-btn text>Share</v-btn>

      <v-btn text color="purple">
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{
          show ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
        }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { DeviceData } from '@/types';

@Component
export default class DeviceCard extends Vue {
  public show: boolean = false;
  @Prop({ required: true })
  public deviceData!: DeviceData;
}
</script>

<style scoped></style>
