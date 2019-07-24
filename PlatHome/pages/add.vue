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
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Sleep } from '@/utilities';
import { DeviceTypes } from '@/types';
@Component
export default class Add extends Vue {
  public valid: boolean = false;
  public ipAddrModel: string = '192.168.0.0';
  public hostname: string = '';
  public progress: string = '';
  public hostnameLock: boolean = false;
  public deviceTypes: string[] = DeviceTypes;
  public selectedDevice: string = '';
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
