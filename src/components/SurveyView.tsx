import { useState, useEffect } from "react";
import type { Question } from "../types";
import RenderQuestion from "./RenderQuestion";
import { useParams } from "react-router";
function SurveyView(){
  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    fetchQuestions()
  }, []);
  const {id} = useParams();
  const fetchQuestions = () => {
    fetch(import.meta.env.VITE_API_URL + "/" + id + "/questions")
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
      <h1>Suvery {id}</h1>
      
      {questions.map(question => (
        <RenderQuestion question={question} />
      ))}
    </>
  );

}
export default SurveyView;
