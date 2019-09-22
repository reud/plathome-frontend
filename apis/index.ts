import axios from 'axios';
import { DeviceData, JSONDeviceData } from '@/types';
import { vxm } from '@/store';
import { JSONParse, ParseJSON } from '@/utilities';

export const URL = 'http://192.168.0.66:8080/';

export async function GetDevices() {
  const res = await axios.get<JSONDeviceData[]>(URL + 'device');
  const d: DeviceData[] = [];
  for (const jd of res.data) {
    d.push(JSONParse(jd));
  }
  vxm.devices.CHANGE_DEVICE_DATA(d);
}

export async function PutDevice(deviceData: DeviceData) {
  // TODO: status code check
  await axios.put<JSONDeviceData>(URL + 'device', ParseJSON(deviceData));
  vxm.devices.SET_DEVICE_DATA(deviceData);
}

export async function DeleteDevice(ip: string) {
  const convertedIP = ip.replace(/\./g, '_');
  await axios.delete(URL + 'device' + `?ip=${convertedIP}`);
  await GetDevices();
}
