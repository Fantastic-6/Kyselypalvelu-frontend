import { useState } from "react";
import type { Question } from "../types";

type questionProps = {
  question: Question;
};

function RenderQuestion({ question }: questionProps) {
  const [answer, setAnswer] = useState("");

  const boxes = document.querySelectorAll<HTMLInputElement>('input[type=checkbox]');

  switch (question.questionType) {
    case "TEXT":
      return (
        <div>
          <p>{question.questionText}</p>
          <input
            type="text"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          />
        </div>
      );
    case "RADIO":
      return (
        <div>
          <p>{question.questionText}</p>
          {question.options.map((option) => (
            <div>
              <label htmlFor={option.optionId.toString()}>{option.title}</label>
              <input
                id={option.optionId.toString()}
                type="radio"
                name="radioOption"
                value={option.title}
                checked={answer === option.title}
                onClick={() => setAnswer(option.title)}
              />
            </div>
          ))}
        </div>
      );
    case "CHECKBOX":
      return (
        <div>
          <p>{question.questionText}</p>
          {question.options.map((option) => (
            <div>
              <label htmlFor={option.optionId.toString()}>{option.title}</label>
              <input
                id={option.optionId.toString()}
                type="checkbox"
                name={option.title}
                value={option.title}
                onClick={() => setAnswer(() => {
                  let answers = "";
                  boxes.forEach(checkbox => {
                    if(checkbox.checked) {
                      answers = answers + ";" + checkbox.name
                    }
                  })
                  console.log(answers);
                  return answers;
                })}
              />
            </div>
          ))}
        </div>
      );
    case "SCALE":
      return (
        <div>
          <p>{question.questionText}</p>
          <input
            type="range"
            min={"1"}
            max={"5"}
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          />
          <p>Current value: {answer}</p>
        </div>
      );
    default:
      break;
  }

}
export default RenderQuestion;
