import React from "react";
import { useState, useEffect } from "react";
import type { Question } from "../types";

function SurveyView(){
  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    fetchQuestions()
  }, []);

  const fetchQuestions = () => {
    fetch(import.meta.env.VITE_API_URL + "/2/questions")
      .then(response => {
        if(!response.ok)
          throw new Error("Error when fetching questions" + response.statusText);
        return response.json();
      })
      .then(questions => setQuestions(questions))
      .catch(err => console.error(err))
  }
  return (
    <>
      <h1>Otsikko</h1>
      {questions.map((question) => {
        <div id={question.questionId}>
          <h1>{question.questionText}</h1>
          <input required={question.isRequired} value={question.questionType} />
        </div>
      })}
    </>
  );

}
export default SurveyView();
