import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import axios from "axios";
import LeadForm from "./LeadForm";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leads");
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/leads/${id}`);
      fetchLeads(); // refresh table after delete
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/leads/${id}`, { status });
      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalLeads = leads.length;

  const newLeads = leads.filter((lead) => lead.status === "New").length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted",
  ).length;

  const qualifiedLeads = leads.filter(
    (lead) => lead.status === "Qualified",
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted",
  ).length;

  const lostLeads = leads.filter((lead) => lead.status === "Lost").length;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div>
        <h3>Lead Statistics</h3>

        <p>Total Leads: {totalLeads}</p>
        <p>New: {newLeads}</p>
        <p>Contacted: {contactedLeads}</p>
        <p>Qualified: {qualifiedLeads}</p>
        <p>Converted: {convertedLeads}</p>
        <p>Lost: {lostLeads}</p>
      </div>

      <hr />

      {/* ADD FORM */}
      <LeadForm onLeadAdded={fetchLeads} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <hr />

      {/* TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.company}</td>

              <td>
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead._id, e.target.value)}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>
              </td>

              <td>
                <button onClick={() => deleteLead(lead._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
