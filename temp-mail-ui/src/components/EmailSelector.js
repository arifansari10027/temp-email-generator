import React, { useEffect, useState } from "react";

function EmailSelector({ setSelectedEmail }) {
  const [emails, setEmails] = useState([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
  fetch("https://api.klickon.tech/emails")
    .then(res => res.json())
    .then(data => {
      setEmails(data);

      if (data.length > 0) {
        setCurrent(data[0]);
        setSelectedEmail(data[0]);
      }
    })
    .catch(err => console.error(err));
}, [setSelectedEmail]);

  const changeEmail = () => {
    if (emails.length === 0) {
      alert("Emails not loaded yet");
      return;
    }

    const random = emails[Math.floor(Math.random() * emails.length)];

    setCurrent(random);
    setSelectedEmail(random);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(current);
    alert("Copied!");
  };

  return (
    <div className="email-box">
      <input value={current} readOnly />

      <button onClick={changeEmail}>
        Change Email
      </button>

      <button onClick={copyEmail}>
        Copy
      </button>
    </div>
  );
}

export default EmailSelector;