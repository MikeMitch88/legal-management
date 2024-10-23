// src/components/CasePriorityForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';

const CasePriorityForm = ({ token }) => {
  const formik = useFormik({
    initialValues: {
      priority: '',
      id: '', // Assuming you have the ID of the case to be updated
    },
    validationSchema: Yup.object({
      priority: Yup.string().required('Please select priority.'),
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
          priority: values.priority,
          id: values.id,
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

  const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  return (
    <form onSubmit={formik.handleSubmit} id="form_case_imp">
      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <Select
          id="priority"
          name="priority"
          options={priorityOptions}
          onChange={(option) => formik.setFieldValue('priority', option.value)}
          placeholder="Select priority"
        />
        {formik.touched.priority && formik.errors.priority ? (
          <div className="text-danger">{formik.errors.priority}</div>
        ) : null}
      </div>

      <button type="submit" className="btn btn-primary">
        Update Case Priority
      </button>
    </form>
  );
};

export default CasePriorityForm;
