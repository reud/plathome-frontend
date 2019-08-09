<template>
  <h2>Welcome {{ this.$route.query.ip }}</h2>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class detail extends Vue {
  public ipAddr: string | (string | null)[] = 'default';

  created() {
    // GET parameter はcreatedで取らないとエラー
    this.ipAddr = this.$route.query.ip;
  }
}
</script>

<style scoped></style>
