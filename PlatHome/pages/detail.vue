<template>
  <h2>{{ $route.query.test }}</h2>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class detail extends Vue {
  public ipAddr: string | (string | null)[] = this.$route.query.ip;
}
</script>

<style scoped></style>
