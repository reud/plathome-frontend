import { RequestTypes } from '../types';
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
        <p>{{ selectedDevice }}</p>
      </v-layout>
      <h2>API Settings</h2>
      <h3>EZ requester</h3>
      <v-btn block color="secondary" dark @click="addRequestButtonPush"
        >Add Request Button</v-btn
      >
      <v-layout v-for="(ezRequest, i) in ezRequests" :key="i" wrap>
        <!--v-modelなど色々仮実装 -->
        <v-select
          v-model="ezRequest.model"
          :items="requestTypes"
          :label="'protocol'"
        ></v-select>
        <v-text-field
          v-model="RequestUrl"
          label="hostname"
          :disabled="true"
        ></v-text-field>
        <v-text-field
          v-model="ezRequest.parameterModel"
          :label="`parameter ${i + 1}`"
        ></v-text-field>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GetValueArrayFromEnum, Sleep } from '@/utilities';
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

  addRequestButtonPush() {
    this.ezRequests.push({
      url: '',
      protocol: RequestTypes.HTTP,
      protocolModel: RequestTypes.HTTP,
      parameterModel: ''
    });
  }
  get RequestUrl() {
    return `://${this.ipAddrModel}/`;
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
}
</script>

<style scoped></style>
