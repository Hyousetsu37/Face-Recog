/* eslint-disable react/prop-types */
import "./ImageLinkForm.css";

export function ImageLinkForm({ getImageUrl, onSubmit }) {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col items-center border rounded-2xl w-[900px] form">
        <p className="text-2xl text-black-700 font-semibold italic">
          {"This Magic Brain will detect faces in your pictures. Give it a try"}
        </p>
        <div className="justify-center">
          <input
            className="text-base p-2 w-[500px] my-2 mx-4 rounded-2xl"
            type="text"
            onChange={getImageUrl}
          />
          <button
            onClick={onSubmit}
            className="w-24 font-semibold bg-violet-500 border p-1 rounded shadow-xl shadow-teal-900/50 transition ease-in-out hover:scale-105 hover:text-white duration-300 active:translate-y-1 "
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}
