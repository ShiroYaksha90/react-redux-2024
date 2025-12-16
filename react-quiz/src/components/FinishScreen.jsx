import React from "react";
export default function FinishScreen({
  points,
  maxPossiblePoints,
  highScore,
  dispatch,
}) {
  const precentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (precentage === 100) emoji = "🥇";
  if (precentage >= 80 && precentage < 100) emoji = "🎉";
  if (precentage >= 50 && precentage < 80) emoji = "🙃";
  if (precentage > 0 && precentage < 50) emoji = "😕";
  if (precentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emoji} You scored{" "}
        <strong>
          {points} out of {maxPossiblePoints} ({Math.ceil(precentage)})%
        </strong>
      </p>
      <p className="highscore">Highscore: {highScore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz!
      </button>
    </>
  );
}
