import { useContext, useState } from "react";
import type { Question, Response } from "../types";
import { responseContext } from "./SurveyView";

type questionProps = {
  question: Question;
};

function RenderQuestion({ question }: questionProps) {
  const boxes = document.querySelectorAll<HTMLInputElement>(
    "input[type=checkbox]"
  );

  // tässä lista johon vastaukset lisätään
  const context = useContext(responseContext);

  const [response, setResponse] = useState<Response>({
    questionId: question.questionId,
    responseText: ""
  });

  switch (question.questionType) {
    case "TEXT":
      return (
        <div>
          <p>{question.questionText}</p>
          <input
            type="text"
            value={response.responseText}
            onChange={(event) =>
              setResponse({ ...response, responseText: event.target.value })
            }
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
                checked={response.responseText === option.title}
                onClick={() =>
                  setResponse({ ...response, responseText: option.title })
                }
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
                onClick={() =>
                  setResponse(() => {
                    let answers = "";
                    boxes.forEach((checkbox) => {
                      if (checkbox.checked) {
                        answers = answers + ";" + checkbox.name;
                      }
                    });
                    console.log(answers);
                    return {...response, responseText: answers};
                  })
                }
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
            value={response.responseText}
            onChange={(event) =>
              setResponse({ ...response, responseText: event.target.value })}
          />
          <p>Current value: {response.responseText}</p>
        </div>
      );
    default:
      break;
  }
}
export default RenderQuestion;
