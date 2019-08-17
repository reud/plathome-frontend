<template>
  <v-card flat>
    <v-bottom-nav :active.sync="bottomNav" :value="true" fixed app>
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        color="teal"
        flat
        :value="item.title"
        :to="item.to"
      >
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Item } from '@/types';

@Component
export default class BottomNav extends Vue {
  @Prop()
  public items!: Item[];
  public bottomNav: string = 'home';
}
</script>

<style scoped></style>
