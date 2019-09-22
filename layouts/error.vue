<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

interface ErrorInterface {
  statusCode?: number;
}
@Component
export default class Error extends Vue {
  @Prop()
  public error: ErrorInterface = {};
  public static layout = 'empty';
  public pageNotFound: string = '404 Not Found';
  public otherError: string = 'An error occurred';

  public head() {
    const title: string =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
