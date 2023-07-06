/* eslint-disable react/prop-types */
import { BoxArray } from "./BoxArray";
import "./FaceRecognition.css";

export function FaceRecognition({ imgUrl, arrayBox }) {
  return (
    <div className="flex justify-center">
      <div className="absolute mt-2">
        {imgUrl && (
          <img
            src={imgUrl}
            id="inputImage"
            alt="image for detection"
            className="w-[500px] h-auto"
          />
        )}
        <BoxArray className="bounding-box" arrayBox={arrayBox} />
      </div>
    </div>
  );
}
