import {
  action,
  getter,
  Module,
  mutation,
  VuexModule
} from 'vuex-class-component';
import Vuex from 'vuex';
import Vue from 'vue';
import { DeviceData, DeviceDataState } from '../types';

Vue.use(Vuex);
//  for TS1219
@Module({ namespacedPath: 'devices/', target: 'nuxt' })
// @ts-ignore
export class DeviceDataStore extends VuexModule implements DeviceDataState {
  // @ts-ignore
  @getter deviceData: DeviceData[] = [];

  @mutation
  // @ts-ignore
  public SET_DEVICE_DATA(payload: DeviceData) {
    this.deviceData.push(payload);
  }

  @mutation
  // @ts-ignore
  public CHANGE_DEVICE_DATA(payload: DeviceData[]) {
    this.deviceData = payload;
  }

  @action({})
  // @ts-ignore
  public initialize() {
    // actions内で簡単にthisからmutationを呼び出せる。
    this.CHANGE_DEVICE_DATA([]);
  }
}

const store = new Vuex.Store({
  modules: {
    devices: DeviceDataStore.ExtractVuexModule(DeviceDataStore)
  }
});

export default DeviceDataStore.ExtractVuexModule(DeviceDataStore);

export const vxm = {
  devices: DeviceDataStore.CreateProxy(store, DeviceDataStore)
};
