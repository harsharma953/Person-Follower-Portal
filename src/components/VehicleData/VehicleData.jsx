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
     <h3 className="vehicle-data-heading">Vehicle Data</h3>
      <div className="vehicle-container">
        {Object.keys(vehicleInfo).map((key) => {
        const Icon = iconMap[key];
        const unit = unitMap[key] || ''; // Default to an empty string if not found
        return (
          <Card
            key={key}
            keyLabel={key.replace(/([A-Z])/g, ' $1').toLowerCase()} // Formatting key
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
