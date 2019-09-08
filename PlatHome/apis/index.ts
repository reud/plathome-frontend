import axios from 'axios';
import { DeviceDataState } from '../types';
import { vxm } from '@/store';

export async function getDevices() {
  const res = await axios.get<DeviceDataState>('http://localhost:8080/device');
  alert(res.data);
  vxm.devices.CHANGE_DEVICE_DATA(res.data.deviceData);
}
