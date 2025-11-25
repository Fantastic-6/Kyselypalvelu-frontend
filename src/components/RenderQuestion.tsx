import { useState } from "react";
import type { Question } from "../types";

type questionProps = {
  question: Question;
}

function RenderQuestion({ question }: questionProps) {
  const [answer, setAnswer] = useState("");
  switch (question.questionType) {
    case "TEXT": 
      return ( 
        <div>
          <p>{question.questionText}</p>
          <input type="text" value={answer} onChange={event => setAnswer(event.target.value)} />
        </div>
      )
    case "RADIO":
      return (
        <div>
          <p>{question.questionText}</p>
          <input type="radio" name="radioOption" value={"yes"} onClick={event => setAnswer(event.target.value)} />
          <input type="radio" name="radioOption" value={"no"} onClick={event => setAnswer(event.target.value)} />
        </div>
      )
    case "CHECKBOX":
      return (
        <div>
          <p>{question.questionText}</p>
          <input type="checkbox" />
          <input type="checkbox" />
        </div>
      )
    case "SCALE":
      return (
        <div>
          <p>{question.questionText}</p>
          <input type="range" min={1} max={5} />
        </div>
      )
    default:
      break;
  }
  
}
export default RenderQuestion;
