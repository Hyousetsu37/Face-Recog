/* eslint-disable react/prop-types */
export function Rank({ user }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg text-white text">
        {`${user.name}, Your current entry count is:`}
      </div>
      <div className="text-2xl text-white pb-2">{`${user.entries}`}</div>
    </div>
  );
}
