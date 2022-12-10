import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AgGridReact } from "ag-grid-react";
import { TRAINING_URL, API_URL } from "../constants";
import AddTraining from "../components/AddTraining";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function TrainingPage() {
  const [trainings, setTrainings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [columnDefs] = useState([
    {
      field: "date",
      cellRenderer: (params) => {
        return dayjs(params.data.date).format("MM/DD/YYYY HH:mm");
      },
      sortable: true,
      filter: true,
    },
    { field: "duration", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true },
    {
      field: "customer.firstname",
      headerName: "Customer",
      sortable: true,
      filter: true,
    },
    {
      width: 150,
      cellRenderer: (params) => (
        <button
          color="error"
          size="small"
          onClick={() => deleteTraining(params.data)}
        >
          Delete
        </button>
      ),
    },
  ]);

  useEffect(() => {
    fetchTrainings();
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch(API_URL + "/customers")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Something went wrong while fetching survey!");
        }
      })
      .then((data) => {
        setCustomers(data.content);
      })
      .catch((err) => console.error(err));
  };

  const fetchTrainings = () => {
    fetch(TRAINING_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Something went wrong while fetching survey!");
        }
      })
      .then((data) => {
        setTrainings(data);
      })
      .catch((err) => console.error(err));
  };

  const addTraining = (training) => {
    fetch(API_URL + "/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) {
          fetchTrainings();
        } else {
          alert("Something went wrong in adding");
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteTraining = (data) => {
    if (window.confirm("Are you sureyy?"))
      fetch(API_URL + "/trainings/" + data.id, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchTrainings();
          } else {
            alert("Something went wrong in deletion");
          }
        })
        .catch((err) => console.error(err));
  };

  return (
    <>
      <div
        className="ag-theme-material"
        style={{ height: 550, width: "100%", margin: "auto" }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSixe={10}
          suppressCellFocus={true}
        />
        <AddTraining addTraining={addTraining} customers={customers} />
      </div>
    </>
  );
}

export default TrainingPage;
