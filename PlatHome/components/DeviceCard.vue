<template>
  <v-card color="purple" class="white--text">
    <v-layout row>
      <v-flex xs7>
        <v-card-title primary-title>
          <div>
            <div class="headline">naspi</div>
            <div>192.168.0.0</div>
            <div>alive</div>
          </div>
        </v-card-title>
      </v-flex>
      <v-flex xs5>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
          height="125px"
          contain
        ></v-img>
      </v-flex>
    </v-layout>
    <v-divider light></v-divider>
    <v-card-actions class="pa-3">
      ping
      <v-spacer></v-spacer>
      EzRequests
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DeviceCard'
};
</script>

<style scoped></style>
