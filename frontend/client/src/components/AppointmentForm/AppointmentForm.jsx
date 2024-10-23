// src/components/AppointmentForm.js
import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const AppointmentForm = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [relatedClients, setRelatedClients] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic, including making AJAX requests
    try {
      const response = await axios.post('/admin/appointments', {
        date,
        time,
        // Include other necessary fields
      });
      Swal.fire('Success', 'Appointment created successfully!', 'success');
    } catch (error) {
      Swal.fire('Error', 'There was an error creating the appointment.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Select Date</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="MM/dd/yyyy"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Select Time</label>
        <input
          type="time"
          className="form-control"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      {/* Additional fields as necessary */}
      <button type="submit" className="btn btn-primary">
        Create Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;
