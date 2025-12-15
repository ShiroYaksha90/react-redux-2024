import React from "react";
import Option from "./Option";
export default function Question({ question }) {
  return (
    <div>
      <h4>{question.question}</h4>

      <Option question={question} />
    </div>
  );
}
