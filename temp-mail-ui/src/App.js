import React, { useState } from "react";
import EmailSelector from "./components/EmailSelector";
import Inbox from "./components/Inbox";
import "./App.css";

function App() {
  const [selectedEmail, setSelectedEmail] = useState("");

  return (
    <div className="app">
      <h1>📧 Temp Mail</h1>

      <EmailSelector setSelectedEmail={setSelectedEmail} />

      {selectedEmail && <Inbox email={selectedEmail} />}
    </div>
  );
}

export default App;