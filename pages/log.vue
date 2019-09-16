<template>
  <v-container>
    <v-textarea
      name="log"
      label="log"
      auto-grow
      readonly
      :value="log"
    ></v-textarea>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { vxm } from '@/store';

@Component
export default class Log extends Vue {
  get log(): string {
    return vxm.log.log;
  }
}
</script>
