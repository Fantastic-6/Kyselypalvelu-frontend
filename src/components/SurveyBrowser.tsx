import { useState, useEffect } from "react";
import type { Survey } from "../types";

function SurveyBrowser() {
  // fetch
  const [surveys, setSurveys] = useState<Survey[]>([]);
  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = () => {
    //fetch("http://localhost:8080/api/surveys")
    fetch(import.meta.env.VITE_API_URL + "/active-surveys")
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "Error when fetching surveys: " + response.statusText
          );
        return response.json();
      })
      .then((surveys) => setSurveys(surveys))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>Kyselyt</h1>
      <table>
        <thead>
          <tr>
            <th className="title">Kyselyn nimi</th>
            <th>Kuvaus</th>
            <th>Sulkeutumispäivä</th>
            <th>Sulkeutumisaika</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <tr key={survey.surveyId}>
              <td>{survey.title}</td>
              <td>{survey.description}</td>
              <td>{survey.deadlineDate}</td>
              <td>{survey.deadlineTime}</td>
              <td>
                <a href={`#/survey/${survey.surveyId}`}>Vastaa kyselyyn</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SurveyBrowser;
