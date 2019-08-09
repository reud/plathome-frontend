<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <h2>Add New Device</h2>
      <v-layout wrap>
        <v-text-field
          v-model="ipAddrModel"
          :rules="ipAddrRule"
          label="IP Address"
        ></v-text-field>
      </v-layout>
      <v-layout wrap>
        <v-text-field
          v-model="hostname"
          label="hostname"
          :disabled="hostnameLock"
        ></v-text-field>
        <v-btn @click="resolveHostname">get hostname from IP address</v-btn>
        <p>{{ progress }}</p>
      </v-layout>
      <v-layout wrap>
        <v-select
          v-model="selectedDevice"
          :items="deviceTypes"
          label="device type"
        ></v-select>
      </v-layout>
      <h2>API Settings</h2>
      <h3>EZ requester</h3>
      <v-btn block color="secondary" dark @click="addRequestButtonPush"
        >Add Request Button</v-btn
      >
      <v-layout v-for="(ezRequest, i) in ezRequests" :key="i" wrap>
        <!--v-modelなど色々仮実装 -->
        <v-flex xs2 md2>
          <v-select
            v-model="ezRequest.protocolModel"
            :items="requestTypes"
            :label="'protocol'"
            @change="insertToProtocol(i)"
          ></v-select>
        </v-flex>
        <v-flex xs10 md10>
          <v-text-field
            v-model="ezRequest.parameterModel"
            :label="
              `${ezRequest.protocolModel}://${ipAddrModel}<param ${i + 1}>`
            "
          ></v-text-field>
        </v-flex>
        <v-btn block color="red" dark @click="deleteEzRequest(i)"
          >Delete param {{ i + 1 }}</v-btn
        >
      </v-layout>
      <v-textarea v-model="description" color="teal">
        <template v-slot:label>
          <div>Description<small>(optional)</small></div>
        </template>
      </v-textarea>
      <v-layout justify-end="">
        <v-btn
          :loading="isUpdating"
          :disabled="isUpdating"
          color="blue-grey"
          class="ma-2 white--text"
          @click="addNewDevice"
        >
          Upload
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { GetValueArrayFromEnum, MapToEnum, Sleep } from '@/utilities';
import { DeviceTypes, EzRequesterModel, RequestTypes } from '@/types';

@Component
export default class Add extends Vue {
  public valid: boolean = false;
  public ipAddrModel: string = '192.168.0.0';
  public hostname: string = '';
  public progress: string = '';
  public hostnameLock: boolean = false;
  public deviceTypes: string[] = GetValueArrayFromEnum(DeviceTypes);
  public selectedDevice: string = '';
  // 実際のデータではデータベースから既存値を取ってくる処理になると思う
  public requestTypes: string[] = GetValueArrayFromEnum(RequestTypes);
  public ezRequests: EzRequesterModel[] = [];
  public isUpdating: boolean = false;
  public description: string = '';
  addRequestButtonPush() {
    this.ezRequests.push({
      protocol: RequestTypes.HTTP,
      protocolModel: RequestTypes.HTTP,
      parameterModel: ''
    });
  }
  get RequestUrl() {
    return `://${this.ipAddrModel}`;
  }
  // mock function
  public async resolveHostname() {
    this.progress = 'hostname resolver started...';
    this.hostnameLock = true;
    await Sleep(3000);
    this.hostname = 'mock-hostname';
    this.progress = '';
    this.hostnameLock = false;
  }

  // mock function
  public async addNewDevice() {
    this.isUpdating = true;
    await Sleep(3000);
    this.isUpdating = false;
  }

  public static validateIpAddr(ipAddr: string): boolean {
    const ipAddrRegex = /^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    return ipAddrRegex.test(ipAddr);
  }

  public get ipAddrRule(): Array<(v: string) => any> {
    // いつかルール追加するかも・・・？
    const rules: Array<(v: string) => any> = [];
    const ipRegexRule = (v: string) =>
      Add.validateIpAddr(v) || 'IP address do not match with IP regex';
    rules.push(ipRegexRule);
    return rules;
  }

  public deleteEzRequest(index: number) {
    this.ezRequests.splice(index, 1);
  }

  public insertToProtocol(index: number) {
    const converted: RequestTypes | undefined = MapToEnum(
      RequestTypes,
      this.ezRequests[index]
    );
    if (converted !== undefined) {
      this.ezRequests[index].protocol = converted;
    }
  }
}
</script>

<style scoped></style>
