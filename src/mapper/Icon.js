// iconMap.js
import { IoMdSpeedometer } from 'react-icons/io';
import { TbSteeringWheel } from 'react-icons/tb';
import { SiStatuspal } from 'react-icons/si';
import { GiPathDistance } from 'react-icons/gi';

export const iconMap = {
  speed: IoMdSpeedometer,
  steeringAngle: TbSteeringWheel,
  tracking: SiStatuspal,
  objectdistance: GiPathDistance,
};

export const unitMap = {
  speed: 'm/sec',
  steeringAngle: 'Rad',
  tracking: '',
  objectdistance: 'm',
};
