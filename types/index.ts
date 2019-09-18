export interface Item {
  icon: string;
  title: string;
  to: string;
}

export interface DeviceData {
  ezRequesterModels: EzRequesterModel[];
  deviceType: DeviceTypes;
  ipAddress: string;
  hostname: string;
  description: string;
  state: string;
}

export interface JSONDeviceData {
  ezRequesterModels: JSONEzRequesterModel[];
  type: string;
  ip: string;
  hostname: string;
  description: string;
  state: string;
}

export interface DeviceDataState {
  deviceData: DeviceData[];
}

export interface LogState {
  log: string;
}

export interface EzRequesterModel {
  protocol: RequestTypes;
  protocolModel: string;
  parameterModel: string;
}

export interface JSONEzRequesterModel {
  protocol: string;
  parameter: string;
}

export enum DeviceTypes {
  RaspberryPi3BPlus = 'raspberry pi 3b+',
  RaspberryPiZero = 'raspberry pi zero w (wh)',
  Etc = 'etc'
}

export enum RequestTypes {
  HTTP = 'http',
  HTTPS = 'https'
}
