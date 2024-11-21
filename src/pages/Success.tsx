import { useUserSelector } from "../store/hooks";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import "./success.css";
import { User } from "../store/user-slice";
import { useMemo, useState } from "react";

export default function Success() {
  const { users } = useUserSelector((state) => state.user);
  const [colDefs] = useState<ColDef<User>[]>([
    { field: "firstName", headerName: "Name" },
    { field: "contact" },
    { field: "gender" },
    { field: "address", flex: 2 },
    { field: "dob", headerName: "Date Of Birth" },
    {
      field: "isSubscribed",
      headerName: "Susbscription status",
      valueGetter: (data) =>
        data.data?.isSubscribed ? "Subscribed" : "Not Subscribed",
    },
  ]);
  const defaultColumnDef = useMemo(() => {
    return { flex: 1, filter: true };
  }, []);
  return (
    <>
      {" "}
      <div className="success-wrapper">
        <h1>A new user has been registered successfully</h1>
        <Link to="/" rel="noopener noreferrer" className="p-button font-bold">
          Back to registration
        </Link>
      </div>
      <h1 className="users-heading">Registered Users</h1>
      <div className="users">
        <div className="table ag-theme-quartz">
          <AgGridReact
            rowData={users}
            columnDefs={colDefs}
            defaultColDef={defaultColumnDef}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
}
