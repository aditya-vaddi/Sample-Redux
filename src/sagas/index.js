import { authenticate } from './authenticate';
import { listOfDevices } from './getDeviceSaga';
export default [
  authenticate,
  listOfDevices
];
