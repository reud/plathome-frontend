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
}
export interface EzRequesterModel {
  protocol: RequestTypes;
  protocolModel: string;
  parameterModel: string;
}

export enum DeviceTypes {
  RaspberryPi3BPlus = 'Raspberry Pi 3B+',
  RaspberryPiZero = 'Raspberry Pi zero W (WH)',
  Etc = 'Etc'
}

export enum RequestTypes {
  HTTP = 'http',
  HTTPS = 'https'
}
