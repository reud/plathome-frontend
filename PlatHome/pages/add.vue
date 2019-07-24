<template>
  <v-form v-model="valid">
    <p>Add New Device</p>
    <v-form ref="form">
      <v-text-field
        v-model="ipAddrModel"
        :rules="ipAddrRule"
        label="IP Address"
      ></v-text-field>
    </v-form>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Add extends Vue {
  public valid: boolean = false;
  public ipAddrModel: string = '192.168.0.0';

  public validateIpAddr(ipAddr: string): boolean {
    const ipAddrRegex = /^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    return ipAddrRegex.test(ipAddr);
  }

  public get ipAddrRule(): Array<(v: string) => any> {
    // いつかルール追加するかも・・・？
    const rules: Array<(v: string) => any> = [];
    const ipRegexRule = (v: string) =>
      this.validateIpAddr(v) || 'IP address do not match with IP regex';
    rules.push(ipRegexRule);
    return rules;
  }
}
</script>

<style scoped></style>
