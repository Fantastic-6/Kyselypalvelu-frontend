import { type GridColDef, DataGrid, type GridRenderCellParams } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import type { Survey } from "../types";
import Button from "@mui/material/Button";
function SurveyBrowser() {

    // fetch
    const [surveys, setSurveys] = useState<Survey[]>([]);
    useEffect(() => {
        fetchSurveys();
    }, [])

    const fetchSurveys = () => {
        //fetch("http://localhost:8080/api/surveys")
        fetch(import.meta.env.VITE_API_URL + "/surveys")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching surveys: " + response.statusText);
                return response.json();

            })
            .then(surveys => setSurveys(surveys))
            .catch(err => console.error(err))
    }

    const columns: GridColDef[] = [
        { field: "title", width: 200 , headerName: "Otsikko"},
        { field: "description", width: 400 , headerName: "Kuvaus"},
        { field: "deadlineDate", headerName: "Sulkeutumispäivä"},
        { field: "deadlineTime", headerName: "Sulkeutumisaika" },
        { headerName: "", sortable: false, filterable: false, field: "surveyId", 
          renderCell: (params: GridRenderCellParams) => 
            <Button color="error" size="small" href={`#/survey/${params.row.surveyId}`}>Answer Survey</Button>
        }
    ]

    return (
        <>
            <h2>Kyselyt</h2>
            <DataGrid
                getRowId={row => row.surveyId}
                rows={surveys}
                columns={columns}
            />
        </>
    )
}


export default SurveyBrowser;
