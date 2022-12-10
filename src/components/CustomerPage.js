import React, { useEffect, useState } from "react";
import EditPage from "../components/EditPage";
import AddCustomer from "../components/AddCustomer";
import { AgGridReact } from "ag-grid-react";
import { API_URL } from "../constants";
import { CSVLink } from "react-csv";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [columnDefs] = useState([
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true, width: 150 },
    { field: "postcode", sortable: true, filter: true, width: 120 },
    {
      width: 150,
      cellRenderer: (params) => (
        <EditPage data={params.data} editCustomer={editCustomer} />
      ),
    },
    {
      width: 150,
      cellRenderer: (params) => (
        <button
          color="error"
          size="small"
          onClick={() => deleteCustomer(params.data)}
        >
          Delete
        </button>
      ),
    },
  ]);

  useEffect(() => {
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

  const addCustomer = (customer) => {
    fetch(API_URL + "/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();
        } else {
          alert("Something went wrong in adding");
        }
      })
      .catch((err) => console.error(err));
  };

  const editCustomer = (customer, url) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();
        } else {
          alert("Something went wrong in updating");
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (data) => {
    if (window.confirm("Are you sure?"))
      fetch(data.links[1].href, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchCustomers();
          } else {
            alert("Something went wrong in deletion");
          }
        })
        .catch((err) => console.error(err));
  };

  const headers = [
    { label: "First name", key: "firstname" },
    { label: "Last name", key: "lastname" },
    { label: "Street address", key: "streetaddress" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Postcode", key: "postcode" },
    { label: "City", key: "city" },
  ];

  return (
    <>
      <div
        className="ag-theme-material"
        style={{ height: 550, width: "100%", margin: "auto" }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSixe={10}
          suppressCellFocus={true}
        />
      </div>
      <AddCustomer addCustomer={addCustomer} />
      <CSVLink
        headers={headers}
        data={customers}
        filename={"customers_file.csv"}
        className="btn btn-primary"
        target="_blank"
      >
        Download customers
      </CSVLink>
      ;
    </>
  );
}
export default CustomerPage;
