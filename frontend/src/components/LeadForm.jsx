import { useState } from "react";
import axios from "axios";

function LeadForm({ onLeadAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/leads", formData);

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "New",
        notes: "",
      });

      onLeadAdded(); // refresh dashboard
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Add Lead</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <br />

        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />
        <br />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Add Lead</button>
      </form>
    </div>
  );
}

export default LeadForm;
