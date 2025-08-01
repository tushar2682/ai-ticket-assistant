import React, { useEffect, useState } from "react";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
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
      } catch (error) {
        console.error("Error fetching tickets:", error);
        alert("An error occurred while loading tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div>
      <h2>Your Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket._id}>
              <strong>{ticket.title}</strong> - {ticket.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tickets;
