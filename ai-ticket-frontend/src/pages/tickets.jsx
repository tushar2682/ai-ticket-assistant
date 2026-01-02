import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Tickets({ detailspage }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (detailspage && id) {
          // Fetch single ticket details
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'}/api/tickets/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const data = await response.json();

          if (response.ok) {
            setTicket(data.ticket || data);
          } else {
            alert(data.message || "Failed to fetch ticket.");
          }
        } else {
          // Fetch all tickets
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'}/api/tickets`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const data = await response.json();

          if (response.ok) {
            setTickets(data.tickets || []);
          } else {
            alert(data.message || "Failed to fetch tickets.");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [detailspage, id]);

  if (loading) return <p>Loading...</p>;

  if (detailspage && ticket) {
    return (
      <div>
        <button onClick={() => navigate("/")}>Back to Tickets</button>
        <h2>Ticket Details</h2>
        <div>
          <h3>{ticket.title}</h3>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Description:</strong> {ticket.description}</p>
          {ticket.createdAt && <p><strong>Created:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <ul>
          {tickets.map((t) => (
            <li key={t._id}>
              <a href={`/tickets/${t._id}`} onClick={(e) => { e.preventDefault(); navigate(`/tickets/${t._id}`); }}>
                <strong>{t.title}</strong> - {t.status}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tickets;
