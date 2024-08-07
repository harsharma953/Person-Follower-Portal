import "./Card.css";
const Card = ({ keyLabel, value, Icon }) => {
  return (
    <div className="card-content">
      <span className="icon-container">
        {Icon && <Icon className="icon" />}
      </span>
      <span className="value"><h3>{value || "N/A"}</h3></span>
      <span className="key"><p>{keyLabel}</p></span>   
    </div>
  );
};

export default Card;
