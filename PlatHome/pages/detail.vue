<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/lists/ali.png"
          height="300px"
        >
          <v-layout column fill-height>
            <v-card-title>
              <v-btn dark icon>
                <v-icon>chevron_left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn dark icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">
                {{ deviceData.hostname }} ({{ deviceData.ipAddress }})
              </div>
              <v-chip color="green" text-color="white">Alive</v-chip>
            </v-card-title>
          </v-layout>
        </v-img>

        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>(650) 555-1234</v-list-tile-title>
              <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>chat</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action></v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>(323) 555-6789</v-list-tile-title>
              <v-list-tile-sub-title>Work</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>chat</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider inset></v-divider>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
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
