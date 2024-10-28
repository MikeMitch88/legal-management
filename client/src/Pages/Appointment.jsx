import { Typography } from 'antd';
import React, { useState } from 'react';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert';
import axios from 'axios';
import './Appointment.css'; // Import the CSS file

const Appointment = () => {
  const [date, setDate] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedTimeOption, setSelectedTimeOption] = useState(null);
  const [appointmentType, setAppointmentType] = useState(null);
  const [notes, setNotes] = useState('');
  const [showForm, setShowForm]=useState()

  const timeOptions = [
    { value: '09:00', label: '09:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '11:00', label: '14:00 PM' },
    { value: '11:00', label: '16:00 PM' },
  ];

  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation' },
    { value: 'follow_up', label: 'Follow-up' },
    { value: 'court_appearance', label: 'Court Appearance' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/admin/appointments', {
        date,
        time: selectedTimeOption?.value,
        clientName,
        clientEmail,
        appointmentType: appointmentType?.value,
        notes,
      });
      Swal.fire('Success', 'Appointment created successfully!', 'success');
    } catch (error) {
      Swal.fire('Error', 'There was an error creating the appointment', 'error');
    }
  };

  return (
    <div>
      <Typography.Title level={6}>Appointments</Typography.Title>

      <button className=" btn btn-success" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Appointment'}
        </button>
      
          {showForm && (
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className='form-group'>
          <label>Client Name</label>
          <input
            type='text'
            className='form-control'
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Client Email</label>
          <input
            type='email'
            className='form-control'
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Select Date</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat='MM/dd/yyyy'
            className='form-control'
            required
          />
        </div>
        <div className='form-group'>
          <label>Select Time</label>
          <Select
            options={timeOptions}
            value={selectedTimeOption}
            onChange={setSelectedTimeOption}
            className='form-control'
            required
          />
        </div>
        <div className='form-group'>
          <label>Appointment Type</label>
          <Select
            options={appointmentTypes}
            value={appointmentType}
            onChange={setAppointmentType}
            className='form-control'
            required
          />
        </div>
        <div className='form-group'>
          <label>Notes/Comments</label>
          <textarea
            className='form-control'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Create Appointment
        </button>
      </form>
          )}
    </div>
  );
};

export default Appointment;
