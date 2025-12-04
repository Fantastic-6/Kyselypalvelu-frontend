import { useState, useEffect } from "react";
import type { Question, Response } from "../types";
import RenderQuestion from "./RenderQuestion";
import { useParams } from "react-router";

function SurveyView() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const [responses, setResponses] = useState<Map<number, string>>(new Map);

  function handleDataFromChild(r: Response) {
    setResponses((prev) => prev.set(r.questionId, r.responseText));
  }

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
        <RenderQuestion question={question} sendDataToParent={handleDataFromChild} />
      ))}
      <button onClick={() => {console.log(responses)}}>Lähetä vastaukset</button>
    </>
  );
}
export default SurveyView;
