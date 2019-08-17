import { DeviceData, DeviceTypes, RequestTypes } from '../types';

export const deviceDataMock: DeviceData = {
  ezRequesterModels: [
    {
      protocol: RequestTypes.HTTP,
      protocolModel: 'http',
      parameterModel: '/hogehoge?exam=hoge'
    },
    {
      protocol: RequestTypes.HTTPS,
      protocolModel: 'https',
      parameterModel: '/hogehoges?exams=hoges'
    }
  ],
  deviceType: DeviceTypes.Etc,
  ipAddress: '192.168.0.xxx',
  hostname: 'example.local',
  description:
    'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.'
};

export const deviceDataEmpty: DeviceData = {
  ezRequesterModels: [],
  deviceType: DeviceTypes.Etc,
  ipAddress: 'x',
  hostname: '',
  description: ''
};
