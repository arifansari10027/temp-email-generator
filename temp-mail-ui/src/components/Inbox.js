import React, { useEffect, useState, useCallback } from "react";

function Inbox({ email }) {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchInbox = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.klickon.tech/inbox/${email}`
      );
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  }, [email]);

  useEffect(() => {
    fetchInbox();
    const interval = setInterval(fetchInbox, 5000);
    return () => clearInterval(interval);
  }, [fetchInbox]);

  return (
    <div className="inbox">
      <h2>Inbox: {email}</h2>

      {messages.length === 0 ? (
        <p>No emails yet...</p>
      ) : (
        messages.map((mail) => (
          <div
            key={mail.id}
            className="message"
            onClick={() => setSelected(mail)}
          >
            <div className="subject">{mail.subject}</div>
            <div className="body-preview">
              {mail.body.substring(0, 60)}...
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="modal-content">
            <h3>{selected.subject}</h3>
            <p>{selected.body}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inbox;