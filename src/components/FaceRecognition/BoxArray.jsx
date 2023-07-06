import { BoundingBox } from "./boundingBox";

/* eslint-disable react/prop-types */
export function BoxArray({ arrayBox }) {
  try {
    const boxArray = arrayBox.map((box, i) => {
      return <BoundingBox key={i} box={box} />;
    });
    return <>{boxArray}</>;
  } catch (error) {
    return <BoundingBox key={1} box={arrayBox} />;
  }
}
