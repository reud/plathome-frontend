import {
  action,
  getter,
  Module,
  mutation,
  VuexModule
} from 'vuex-class-component';
import Vuex from 'vuex';
import Vue from 'vue';
import * as Moment from 'moment';
import { DeviceData, DeviceDataState, LogState } from '../types';
import { deepCopy } from '@/utilities';

Vue.use(Vuex);
// いつか消したい
export const strict = false;

//  for TS1219
@Module({ namespacedPath: 'devices/', target: 'nuxt' })
// @ts-ignore
export class DeviceDataStore extends VuexModule implements DeviceDataState {
  // @ts-ignore
  @getter deviceData: DeviceData[] = [];
  @getter deviceMap = new Map();
  @mutation
  public SET_DEVICE_DATA(payload: DeviceData) {
    this.deviceData.push(deepCopy(payload));
    this.deviceMap.set(deepCopy(payload).ipAddress, deepCopy(payload));
  }

  @mutation
  public CHANGE_DEVICE_DATA(payload: DeviceData[]) {
    this.deviceData = payload;
    this.deviceMap.clear();
    this.deviceData.forEach((v) => this.deviceMap.set(v.ipAddress, v));
  }

  @action({})
  // @ts-ignore
  public initialize() {
    // actions内で簡単にthisからmutationを呼び出せる。
    this.CHANGE_DEVICE_DATA([]);
    this.deviceMap.clear();
  }
}

//  for TS1219
@Module({ namespacedPath: 'log/', target: 'nuxt' })
// @ts-ignore
export class LogStore extends VuexModule implements LogState {
  // @ts-ignore
  @getter log: string = '';

  @mutation
  public SET_LOG(payload: string) {
    this.log += '<' + Moment().format('LLL') + '> ' + payload + '\n';
  }

  @mutation
  public CHANGE_LOG(payload: string) {
    this.log = payload;
  }

  @action({})
  public CLEAR_LOG() {
    this.CHANGE_LOG('');
  }
}

export const devices = DeviceDataStore.ExtractVuexModule(DeviceDataStore);
export const log = LogStore.ExtractVuexModule(LogStore);

const store = new Vuex.Store({
  modules: {
    devices,
    log
  }
});

export const vxm = {
  devices: DeviceDataStore.CreateProxy(
    store,
    DeviceDataStore
  ) as DeviceDataStore,
  log: LogStore.CreateProxy(store, LogStore) as LogStore
};
