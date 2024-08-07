import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import "./VehicleData.css";
import { iconMap, unitMap } from '../../mapper/Icon';
import { IoMdSpeedometer } from "react-icons/io";
import { TbSteeringWheel } from "react-icons/tb";
import { GiPathDistance } from "react-icons/gi";
import { SiStatuspal } from "react-icons/si";
import Card from "../Card/Card";

const VehicleData = () => {

  const [vehicleInfo, setVehicleInfo] = useState({
    speed: '75',
    steeringAngle: '0.8',
    tracking: 'Active',
    objectdistance: '120',
  });

  // useEffect(() => {
  //   try {
  //     const client = new Client({
  //       brokerURL: "ws://10.167.96.48:15674/ws",
  //       connectHeaders: {
  //         login: "admin",
  //         passcode: "admin",
  //         host: "/",
  //       },
  //       onConnect: () => {
  //         console.log("Connected to RabbitMQ");

  //         client.subscribe("/amq/queue/VehicleDataQueue", (message) => {
  //           const data = JSON.parse(message.body);
  //           setVehicleInfo(data); // Update state with the received vehicle data
  //         });
  //       },
  //       onStompError: (err) => {
  //         console.log("Stomp-Err: " + JSON.stringify(err));
  //       },
  //     });

  //     client.activate();

  //     return () => {
  //       client.deactivate();
  //     };
  //   } catch (error) {
  //     console.error("Error in connecting to RabbitMQ:", error);
  //   }
  // }, []);

  return (
    <>
     <h3 className="vehicle-data-heading">Vehicle Data</h3>
      <div className="vehicle-container">
        {/* <table className="vehicle-info-table">
          <tbody>
            <tr>
              <td className="parameter">
                Speed 
                <span className="icon-container"><IoMdSpeedometer className="icon" /></span>:
               
              </td>
              <td className="value">{vehicleInfo?.speed || "N/A"} m/sec</td>
            </tr>
            <tr>
              <td className="parameter">
                Steering Angle
                <span className="icon-container"><TbSteeringWheel className="icon" /></span>:
               
              </td>
              <td className="value">
                {vehicleInfo?.steeringAngle || "N/A"} Radian
              </td>
            </tr>

            <tr>
              <td className="parameter">
                Tracking Status
                <span className="icon-container"><SiStatuspal className="icon" /></span>:
              </td>
              <td className="value">{vehicleInfo?.tracking || "N/A"}</td>
            </tr>
            <tr>
              <td className="parameter">
                Object Distance
                <span className="icon-container"><GiPathDistance className="icon" /></span>:
              </td>
              <td className="value">
                {vehicleInfo?.objectdistance || "N/A"} m
              </td>
            </tr>
          </tbody>
        </table> */}
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
