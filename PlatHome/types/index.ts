export interface Item {
  icon: string;
  title: string;
  to: string;
}

export interface EzRequesterModel {
  url: string;
  protocol: RequestTypes;
  model: string;
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
