<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      class="hidden-sm-and-down"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon
        class="hidden-sm-and-down"
        @click="drawer = !drawer"
      />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <BottomNav :items="items" class="hidden-md-and-up" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Item } from '@/types';
import BottomNav from '@/components/BottomNav.vue';

@Component({
  components: { BottomNav }
})
export default class Default extends Vue {
  public clipped: boolean = false;
  public drawer: boolean = false;
  public fixed: boolean = false;
  public miniVariant: boolean = false;
  public right: boolean = true;
  public title: string = 'PlatHome';

  public items: Item[] = [
    {
      icon: 'add',
      title: 'add',
      to: '/add'
    },
    {
      icon: 'home',
      title: 'home',
      to: '/'
    },
    {
      icon: 'play_arrow',
      title: 'Action',
      to: '/action'
    }
  ];
}
</script>
