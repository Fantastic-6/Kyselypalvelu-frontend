import { useState, useEffect, createContext } from "react";
import type { Question, ResponseListContext } from "../types";
import RenderQuestion from "./RenderQuestion";
import { useParams } from "react-router";

// lista josta löytyy vastaukset
export const responseContext = createContext<ResponseListContext>([]);

function SurveyView() {
  const [questions, setQuestions] = useState<Question[]>([]);
  console.log(responseContext)
  useEffect(() => {
    fetchQuestions();
  }, []);
  const { id } = useParams();
  const fetchQuestions = () => {
    fetch(import.meta.env.VITE_API_URL + "/" + id + "/questions")
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "Error when fetching questions" + response.statusText
          );
        return response.json();
      })
      .then((questions) => setQuestions(questions))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>Kysely {id}</h1>

      {questions.map((question) => (
        <RenderQuestion question={question} />
      ))}
      <button onClick={() => {}}>Lähetä vastaukset</button>
    </>
  );
}
export default SurveyView;
