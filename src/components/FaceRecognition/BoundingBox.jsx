/* eslint-disable react/prop-types */
import "./FaceRecognition.css";

export function BoundingBox({ box }) {
  return (
    <div
      className="bounding-box"
      style={{
        top: box.topRow,
        right: box.rightCol,
        left: box.leftCol,
        bottom: box.bottomRow,
      }}
    ></div>
  );
}
