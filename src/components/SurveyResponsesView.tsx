import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { type Option, type ResponseReport, type Survey } from "../types";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

function SurveyResponsesView() {
    const { id } = useParams<{ id: string }>();
    const [responses, setResponses] = useState<ResponseReport[]>([]);
    const [survey, setSurvey] = useState<Survey | null>(null);

    useEffect(() => {
        if (id) {
            fetchSurvey();
            fetchResponses();
        }
    }, [id])

    const fetchSurvey = () => {
        fetch(import.meta.env.VITE_API_URL + `/survey/${id}`)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching survey: " + response.statusText);
                return response.json();
            })
            .then(surveyData => setSurvey(surveyData))
            .catch(err => console.error(err))
    }

    const fetchResponses = () => {
        fetch(import.meta.env.VITE_API_URL + `/survey/${id}/responses`)
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching responses: " + response.statusText);
                return response.json();
            })
            .then(responsesData => setResponses(responsesData))
            .catch(err => console.error(err))
    }

    const getOptions = (optionList: Option[]) => {
        return optionList.map(o => o.title).join(", ");
    }

    const getResponseText = (text: string) => {
        if (text == null) {
            return "";
        } else {
            return text;
        }
    }

    const columns: GridColDef[] = [
        {
            field: "questionText", headerName: "Kysymys", width: 300,
            valueGetter: (_value, row) => {
                return row.question.questionText;
            }
        },
        { field: "session", headerName: "Sessio ID", width: 100 },
        {
            field: "response", width: 300, headerName: "Vastaus",
            valueGetter: (_value, row) => {
                if (row.responseText != null) {
                    return getResponseText(row.responseText)
                } 
                else {
                    return getOptions(row.question.options)
                }
            }
        },
        {
            field: "timeSubmitted", headerName: "Vastausaika", width: 200,
            valueFormatter: (value: Date) => dayjs(value).format("DD.MM.YYYY HH:mm")
        }
    ]

    return (
        <>
            <h2>Vastaukset kyselyyn: {survey?.title}</h2>
            <p>{survey?.description}</p>
            <DataGrid
                getRowId={(row) => row.responseId}
                rows={responses}
                columns={columns}
                showToolbar
            />
        </>
    )
}

export default SurveyResponsesView;
