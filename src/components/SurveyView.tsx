import { useState, useEffect } from "react";
import type { Question, Response, Survey } from "../types";
import RenderQuestion from "./RenderQuestion";
import { useParams, useNavigate } from "react-router";

function SurveyView() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const [responses, setResponses] = useState<Map<number, string>>(new Map());

  const [survey, setSurvey] = useState<Survey>(); // For getting survey's name

  function handleDataFromChild(r: Response) {
    setResponses((prev) => prev.set(r.questionId, r.responseText));
  }

  useEffect(() => {
    fetchQuestions();
    fetchSurvey();
  }, []);

  const navigate = useNavigate();
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

  const fetchSurvey = () => {
    fetch(import.meta.env.VITE_API_URL + "/survey/" + id)
      .then((response) => {
        if (!response.ok)
          throw new Error("Error when fetching survey" + response.statusText);
        return response.json();
      })
      .then((survey) => setSurvey(survey))
      .catch((err) => console.error(err));
  };

  const saveResponses = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate required questions
    const requiredQuestions = questions.filter((q) => q.isRequired);
    const missingAnswers = requiredQuestions.filter((q) => {
      const answer = responses.get(q.questionId);
      return !answer || answer.trim() === "";
    });

    if (missingAnswers.length > 0) {
      alert(`Pakollisia kysymyksiä vastaamatta: ${missingAnswers.length} kpl`);
      return;
    }

    const response = await fetch(import.meta.env.VITE_API_URL + "/responses");
    const data: { session: number }[] = await response.json();

    const sessions = data
      .map((item) => item.session)
      .filter(
        (session): session is number =>
          session !== null && session !== undefined
      );

    const sessionNumber = Math.max(...sessions) + 1;

    for (const [key, value] of responses.entries()) {
      fetch(import.meta.env.VITE_API_URL + "/" + key + "/responses", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          responseText: value,
          session: sessionNumber
        })
      });
    }
    navigate("/");
  };

  return (
    <>
      <h1>{survey?.title}</h1>
      <form onSubmit={saveResponses}>
        <a className="return-btn" href={`/`}>
          Takaisin etusivulle
        </a>
        {questions.map((question) => (
          <RenderQuestion
            question={question}
            sendDataToParent={handleDataFromChild}
          />
        ))}
        <button className="green-btn" type="submit">
          Lähetä vastaukset
        </button>
      </form>
    </>
  );
}
export default SurveyView;
