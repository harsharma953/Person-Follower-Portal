import "./VehicleData.css";
import { iconMap, unitMap } from '../../mapper/Icon';
import Card from "../Card/Card";

const VehicleData = ({distance,speed,steeringAngle,trackingStatus}) => {

  const vehicleInfo = {
    speed: speed,
    steeringAngle: steeringAngle,
    tracking: trackingStatus,
    objectdistance: distance,
  }

  return (
    <>
    <h1 className="vehicle-data-heading">Bot Data</h1>
      <div className="vehicle-container">
        {Object.keys(vehicleInfo).map((key) => {
        const Icon = iconMap[key];
        const unit = unitMap[key] || '';
        return (
          <Card
            key={key}
            keyLabel={key.replace(/([A-Z])/g, ' $1').toLowerCase()}
            value={`${vehicleInfo[key]} ${unit}`}
            Icon={Icon}
          />
        );
      })}
      </div>
     
    </>
  );
};

export default VehicleData;
