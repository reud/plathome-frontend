import axios from 'axios';
import { DeviceData, JSONDeviceData } from '@/types';
import { vxm } from '@/store';
import { JSONParse } from '@/utilities';

export async function getDevices() {
  const res = await axios.get<JSONDeviceData[]>('http://localhost:8080/device');
  const d: DeviceData[] = [];
  for (const jd of res.data) {
    d.push(JSONParse(jd));
  }
  vxm.devices.CHANGE_DEVICE_DATA(d);
}
