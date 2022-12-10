import React, { useState } from "react";
import CustomerPage from "./CustomerPage";
import TrainingPage from "./TrainingPage";
import CalendarPage from "./CalendarPage";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabApp() {
  const [value, setValue] = useState("");

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        allowScrollButtonsMobile
      >
        <Tab value="customers" label="Customers" />
        <Tab value="training" label="Training" />
        <Tab value="calendar" label="Calendar" />
      </Tabs>
      {value === "" && <CustomerPage />}
      {value === "customers" && <CustomerPage />}
      {value === "training" && <TrainingPage />}
      {value === "calendar" && <CalendarPage />}
    </>
  );
}

export default TabApp;
