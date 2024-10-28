import { Typography } from 'antd';
import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import './Task.css'; // Make sure to create this CSS file

const Task = () => {
  const [clients, setClients] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
  ];

  const assignedToOptions = [
    { value: 'user1', label: 'John Doe' },
    { value: 'user2', label: 'Jane Smith' },
    { value: 'user3', label: 'Michael Johnson' },
  ];

  const relatedOptions = [
    { value: 'case1', label: 'Case 1 - John Doe vs Company A' },
    { value: 'case2', label: 'Case 2 - Jane Smith vs Organization B' },
  ];

  const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const formik = useFormik({
    initialValues: {
      task_subject: '',
      start_date: '',
      end_date: '',
      project_status_id: '',
      priority: '',
      assigned_to: [],
      related_id: '',
    },
    validationSchema: Yup.object({
      task_subject: Yup.string().required('Please enter subject.'),
      start_date: Yup.date().required('Please enter start date.'),
      end_date: Yup.date().required('Please enter end date.'),
      project_status_id: Yup.string().required('Please select status.'),
      priority: Yup.string().required('Please select priority.'),
      assigned_to: Yup.array().min(1, 'Please select at least one employee.'),
    }),
    onSubmit: async (values) => {
      try {
        Swal.fire({
          title: 'Processing...',
          text: 'Please wait while we update the case priority.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await axios.post('/admin/changeCasePriority', {
          ...values,
          _token: token,
        });

        Swal.close();

        if (response.data.errors) {
          const errors = response.data.errors;
          let errorMessages = '';
          Object.values(errors).forEach((msg) => {
            errorMessages += `<li>${msg}</li>`;
          });
          Swal.fire({
            title: 'Error',
            html: `<ul>${errorMessages}</ul>`,
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: 'Success',
            text: "Case priority changed successfully.",
            icon: 'success',
          });
        }
      } catch (error) {
        console.error('Error updating priority:', error);
        Swal.fire({
          title: 'Error',
          text: 'An unexpected error occurred.',
          icon: 'error',
        });
      }
    },
  });

  const loadRelatedClients = async (inputValue) => {
    try {
      const response = await axios.get(select2Case, { params: { search: inputValue } });
      return response.data.items.map(item => ({
        id: item.id,
        text: `${item.first_name} ${item.middle_name} ${item.last_name}`,
        otherfield: item,
      }));
    } catch (error) {
      console.error('Error loading related clients:', error);
    }
  };

  return (
    <>
    <div className="">   
      <Typography.Title level={6}>Tasks</Typography.Title>
      </div>
      
      <form onSubmit={formik.handleSubmit} id="add_client" className="task-form">
        <div className="form-group">
          <label>Task Subject</label>
          <input
            type="text"
            name="task_subject"
            value={formik.values.task_subject}
            onChange={formik.handleChange}
            className={`form-control ${formik.touched.task_subject && formik.errors.task_subject ? 'is-invalid' : ''}`}
          />
          {formik.touched.task_subject && formik.errors.task_subject && (
            <div className="invalid-feedback">{formik.errors.task_subject}</div>
          )}
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              formik.setFieldValue('start_date', date);
            }}
            dateFormat="MM/dd/yyyy" // Update with your actual date format
            className={`form-control ${formik.touched.start_date && formik.errors.start_date ? 'is-invalid' : ''}`}
          />
          {formik.touched.start_date && formik.errors.start_date && (
            <div className="invalid-feedback">{formik.errors.start_date}</div>
          )}
        </div>

        <div className="form-group">
          <label>End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
              formik.setFieldValue('end_date', date);
            }}
            dateFormat="MM/dd/yyyy" // Update with your actual date format
            className={`form-control ${formik.touched.end_date && formik.errors.end_date ? 'is-invalid' : ''}`}
          />
          {formik.touched.end_date && formik.errors.end_date && (
            <div className="invalid-feedback">{formik.errors.end_date}</div>
          )}
        </div>

        <div className="form-group">
          <label>Project Status</label>
          <Select
            name="project_status_id"
            options={statusOptions}
            onChange={(option) => formik.setFieldValue('project_status_id', option.value)}
            placeholder="Select status"
            className={`form-control ${formik.touched.project_status_id && formik.errors.project_status_id ? 'is-invalid' : ''}`}
          />
          {formik.touched.project_status_id && formik.errors.project_status_id && (
            <div className="invalid-feedback">{formik.errors.project_status_id}</div>
          )}
        </div>

        <div className="form-group">
          <label>Priority</label>
          <Select
            name="priority"
            options={priorityOptions}
            onChange={(option) => formik.setFieldValue('priority', option.value)}
            placeholder="Select priority"
            className={`form-control ${formik.touched.priority && formik.errors.priority ? 'is-invalid' : ''}`}
          />
          {formik.touched.priority && formik.errors.priority && (
            <div className="invalid-feedback">{formik.errors.priority}</div>
          )}
        </div>

        <div className="form-group">
          <label>Assigned To</label>
          <Select
            name="assigned_to"
            options={assignedToOptions}
            isMulti
            onChange={(options) => formik.setFieldValue('assigned_to', options.map(opt => opt.value))}
            placeholder="Select users"
            className={`form-control ${formik.touched.assigned_to && formik.errors.assigned_to ? 'is-invalid' : ''}`}
          />
          {formik.touched.assigned_to && formik.errors.assigned_to && (
            <div className="invalid-feedback">{formik.errors.assigned_to}</div>
          )}
        </div>

        <div className="form-group">
          <label>Related Client</label>
          <Select
            id="related_id"
            options={relatedOptions}
            loadOptions={loadRelatedClients}
            onChange={(option) => formik.setFieldValue('related_id', option.value)}
            placeholder="Search customer"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    
    </>
  );
};

export default Task;
