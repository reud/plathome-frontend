<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <p>Add New Device</p>
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
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Add extends Vue {
  public valid: boolean = false;
  public ipAddrModel: string = '192.168.0.0';
  public hostname: string = '';
  public progress: string = '';
  public hostnameLock: boolean = false;
  // a function for mock and tests
  public sleep(time: number): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  // mock function
  public async resolveHostname() {
    this.progress = 'hostname resolver started...';
    this.hostnameLock = true;
    await this.sleep(3000);
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
