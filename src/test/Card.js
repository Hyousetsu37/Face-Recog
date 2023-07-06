import React from "react";

const Card = ({ id, name, email }) => {
  return (
    <div className="bg-green-300 text-center p-3 m-2 rounded-lg inline-block shadow-xl shadow-slate-500 border-1 transition ease-in-out delay-200 hover:scale-105 duration-200">
      <img src={`https://robohash.org/${id}?150x150`} alt="robot" />
      <div>
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Card;
