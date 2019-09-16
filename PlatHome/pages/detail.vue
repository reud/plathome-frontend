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
              <v-btn dark icon to="/">
                <v-icon>chevron_left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn dark icon class="mr-3" @click="deleteThisDevice">
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn dark icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">
                <p>{{ deviceData.hostname }} ({{ deviceData.ipAddress }})</p>
                <div v-if="isUpdating">
                  <v-chip color="orange" text-color="white">
                    <v-avatar>
                      <v-icon>autorenew</v-icon>
                    </v-avatar>
                    Checking
                  </v-chip>
                </div>
                <div v-else>
                  <v-chip color="green" text-color="white">
                    <v-avatar>
                      <v-icon>check_circle</v-icon>
                    </v-avatar>
                    Alive
                  </v-chip>
                </div>
              </div>
            </v-card-title>
          </v-layout>
        </v-img>

        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">important_devices</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ deviceData.deviceType }}</v-list-tile-title>
              <v-list-tile-sub-title>Device Type</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">edit</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{
                deviceData.description
              }}</v-list-tile-title>
              <v-list-tile-sub-title>Description</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile v-for="(r, k) in deviceData.ezRequesterModels" :key="k">
            <v-list-tile-action>
              <v-icon color="indigo">reply</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>
                {{
                  `${r.protocol}://${deviceData.ipAddress}${r.parameterModel}`
                }}</v-list-tile-title
              >
              <v-list-tile-sub-title
                >EzRequester Parameter
              </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                dark
                icon
                :loading="ezRequesterSendingStates[k]"
                :disabled="ezRequesterSendingStates[k]"
                @click="sendRequest(k)"
              >
                <v-icon>redo</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Send ping manually </v-list-tile-title>
              <v-list-tile-sub-title
                >Check Status Manually</v-list-tile-sub-title
              >
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                dark
                icon
                :loading="isUpdating"
                :disabled="isUpdating"
                @click="sendPing"
              >
                <v-icon>redo</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
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
import { Sleep } from '@/utilities';
import { DeleteDevice } from '@/apis';

@Component
export default class detail extends Vue {
  public ipAddr: string = 'default';
  public deviceData: DeviceData = deviceDataEmpty;
  public isUpdating: boolean = false;
  public ezRequesterSendingStates: boolean[] = [];
  public p: string = 'ou';
  created() {
    // GET parameter はcreatedで取らないとエラー
    this.ipAddr = this.$route.query.ip as string;
    this.deviceData = vxm.devices.deviceMap.get(this.ipAddr);

    for (let i = 0; i < this.deviceData.ezRequesterModels.length; ++i) {
      this.ezRequesterSendingStates.push(false);
    }
  }
  public async sendPing() {
    this.isUpdating = true;
    await Sleep(1000);
    this.isUpdating = false;
  }

  public async sendRequest(i: number) {
    Vue.set(this.ezRequesterSendingStates, i, true);
    // this.ezRequesterSendingStates[i] = true;
    await Sleep(1000);
    // this.ezRequesterSendingStates[i] = false;
    Vue.set(this.ezRequesterSendingStates, i, false);
  }

  public async deleteThisDevice() {
    await DeleteDevice(this.ipAddr);
    alert('device deleted!');
    this.$router.push('/');
  }
}
</script>

<style scoped></style>
