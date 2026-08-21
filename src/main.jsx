import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EnrollmentProvider } from "./context/EnrollmentContext";
import "../styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EnrollmentProvider>
      <App />
    </EnrollmentProvider>
  </React.StrictMode>
);
