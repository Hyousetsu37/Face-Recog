import { Tilt } from "react-tilt";
import brain from "./brain.png";
import "./Logo.css";

export function Logo() {
  return (
    <div className="m-4 mt-0">
      <Tilt
        className="Tilt flex items-center place-content-center border-2 rounded shadow-lg shadow-gray-400"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <img src={brain} alt="Brain logo" />
      </Tilt>
    </div>
  );
}
