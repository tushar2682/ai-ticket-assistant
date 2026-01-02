import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../component/Layout";

function Tickets({ detailspage }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState({ title: "", description: "" });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        if (detailspage && id) {
          // Fetch single ticket details - GET /api/tickets/tickets/:id
          // Backend route: router.get('/tickets/:id') mounted at /api/tickets = /api/tickets/tickets/:id
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'}/api/tickets/tickets/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (response.ok) {
            setTicket(data);
          } else {
            if (response.status === 401) {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            } else {
              alert(data.error || data.message || "Failed to fetch ticket.");
            }
          }
        } else {
          // Fetch all tickets - GET /api/tickets/tickets
          // Backend route: router.get('/tickets') mounted at /api/tickets = /api/tickets/tickets
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'}/api/tickets/tickets`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (response.ok) {
            // Backend returns array directly, not wrapped in {tickets: []}
            setTickets(Array.isArray(data) ? data : []);
          } else {
            if (response.status === 401) {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            } else {
              alert(data.error || data.message || "Failed to fetch tickets.");
            }
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
  }, [detailspage, id, navigate]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!createForm.title.trim() || !createForm.description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setCreating(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'}/api/tickets/tickets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: createForm.title.trim(),
          description: createForm.description.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh tickets list
        const ticketsResponse = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'}/api/tickets/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const ticketsData = await ticketsResponse.json();
        if (ticketsResponse.ok) {
          setTickets(Array.isArray(ticketsData) ? ticketsData : []);
        }
        setCreateForm({ title: "", description: "" });
        setShowCreateForm(false);
        alert("Ticket created successfully!");
      } else {
        alert(data.error || data.message || "Failed to create ticket.");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("An error occurred while creating the ticket.");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (detailspage && ticket) {
    return (
      <Layout>
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={() => navigate("/")}
            className="mb-4 text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tickets
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ticket Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{ticket.title}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                ticket.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {ticket.status}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Description:</p>
              <p className="text-gray-800">{ticket.description}</p>
            </div>
            {ticket.createdAt && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Created:</p>
                <p className="text-gray-800">{new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Tickets</h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {showCreateForm ? "Cancel" : "+ Create Ticket"}
          </button>
        </div>

        {showCreateForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter ticket title"
                  value={createForm.title}
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter ticket description"
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={creating}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? "Creating..." : "Create Ticket"}
              </button>
            </form>
          </div>
        )}

        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4 text-gray-600">No tickets found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/tickets/${t._id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{t.title}</h3>
                    {t.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{t.description}</p>
                    )}
                  </div>
                  <div className="ml-4 flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      t.status === 'open' ? 'bg-green-100 text-green-800' :
                      t.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {t.status}
                    </span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Tickets;
