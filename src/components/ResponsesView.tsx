import { useEffect, useState } from "react";
import { type Option, type ResponseReport } from "../types";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

function ResponsesView() {

    const [responses, setResponses] = useState<ResponseReport[]>([]);

    useEffect(() => {
        fetchResponses();
    }, [])

    const fetchResponses = () => {
        fetch(import.meta.env.VITE_API_URL + "/responses")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching responses: " + response.statusText);
                return response.json();

            })
            .then(surveys => setResponses(surveys))
            .catch(err => console.error(err))
    }

    const getOptions = (optionList: Option[]) => {
        return optionList.map(o => o.title).join(", ");
    }

    const getResponseText = (text: string) => {
        if (text == null) {
            return "";
        } else {
            return text + " ";
        }
    }


    const columns: GridColDef[] = [
        {
            field: "title", headerName: "Survey",
            valueGetter: (_value, row) => {
                return row.question.survey.title;
            }
        },
        {
            field: "questionText", headerName: "Question", width: 200,
            valueGetter: (_value, row) => {
                return row.question.questionText;
            }
        },
        { field: "session", headerName: "Session id" },
        {
            field: "options", width: 500, headerName: "Response(s)",
            valueGetter: (_value, row) => {
                return getResponseText(row.responseText) + getOptions(row.question.options)
            }
        },
        {
            field: "timeSubmitted", headerName: "Time Submitted", width: 150,
            valueFormatter: (value: Date) => dayjs(value).format("DD.MM.YYYY HH:mm")
        }

    ]

    return (
        <>
            <h2>Kyselyiden vastaukset</h2>
            <DataGrid
                getRowId={row => row.responseId}
                rows={responses}
                columns={columns}
                showToolbar
            />
        </>
    )
}

export default ResponsesView;

