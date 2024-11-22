import { useMemo, useState } from "react";
import { useUserSelector } from "../store/hooks";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useMountEffect } from "primereact/hooks";
import { Messages } from "primereact/messages";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import { User } from "../store/user-slice";
import "./success.css";

export default function Success() {
  const msgs = useRef<Messages>(null);

  useMountEffect(() => {
    if (msgs.current) {
      msgs.current?.clear();
      msgs.current?.show([
        {
          sticky: true,
          severity: "success",
          summary: "Success",
          detail: "A new user has been registered successfully",
          closable: false,
        },
      ]);
    }
  });
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
      <div className="success-wrapper">
        <Messages ref={msgs} />
        {/* <h1>A new user has been registered successfully</h1> */}
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
