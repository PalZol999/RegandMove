import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GetDoctorAppointments,
  GetUserAppointments,
  UpdateAppointmentStatus,
} from "../../apicalls/appointments";
import { ShowLoader } from "../../redux/loaderSlice";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "doctor") {
      const response = await GetDoctorAppointments(user.id);
      if (response.success) {
        setAppointments(response.data);
      }
    } else {
      const response = await GetUserAppointments(user.id);
      if (response.success) {
        setAppointments(response.data);
      }
    }
  };

  const onUpdate = async (id, status) => {
    try {
      dispatch(ShowLoader(true));
      const response = await UpdateAppointmentStatus(id, status);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(ShowLoader(false));
    } catch (error) {
      message.error(error.message);
      dispatch(ShowLoader(false));
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "slot",
    },
    {
      title: "Coach",
      dataIndex: "doctorName",
    },
    {
      title: "Trainee",
      dataIndex: "userName",
    },
   
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (record.status === "pending" && user.role === "doctor") {
          return (
            <div className="flex gap-1">
              <span className="underline cursor-pointer" onClick={() => onUpdate(record.id, "cancelled")}>Cancel</span>
              <span className="underline cursor-pointer" onClick={() => onUpdate(record.id, "approved")}>Approve</span>
            </div>
          );
        }
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="table-responsive">
        <Table columns={columns} dataSource={appointments || []} />
      </div>
    </div>
  );
}

export default Appointments;