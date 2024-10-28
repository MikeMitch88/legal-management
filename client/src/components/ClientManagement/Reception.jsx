
import React, { useState } from "react";
import './Reception.css'


const ClientDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postalCode: "",
    telephone_no: "",
    residentialAddress: "",
    country: "",
    age: "",
    occupation: "",
    maritalStatus: "single",
    typeOfMarriage: "customary",
    dateOfMarriage: "",
    education: "none",
    income: "0",
  
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          [name]: [...prev[name], value],
        };
      } else {
        return {
          ...prev,
          [name]: prev[name].filter((item) => item !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);
    const response = await fetch('http://127.0.0.1:5000/api/users/register_client', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
  });

  if (response.ok) {
      alert('Client registered successfully!');
  } else {
      alert('Failed to register client.');
  }
};

  return (
      <div >
         <button className=" btn btn-success" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Client'}
        </button>
          {/* <h1>Client's Details Form</h1> */}
          {showForm && (
              <form onSubmit={handleSubmit} className="form-container">
                  {/* Personal Details Section */}
                  <fieldset>
                      <legend>Personal Details</legend>
                      <label htmlFor="name">Name:</label>
                      <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                      />
                      <br />

                      <label htmlFor="idNumber">
                          Proof of Registration/Passport/Refugee ID number:
                      </label>
                      <input
                          type="text"
                          id="passport_id"
                          name="passport_id"
                          value={formData.passport_id}
                          onChange={handleInputChange}
                      />
                      <br />

                      <label htmlFor="address">Postal Address:</label>
                      <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                      />
                      <br />

                      <label htmlFor="postalCode">Postal Code:</label>
                      <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                      />
                      <br />

                      <label htmlFor="telephone">Telephone No. (COMPULSORY):</label>
                      <input
                          type="tel"
                          id="telephone_no"
                          name="telephone_no"
                          value={formData.telephone_no}
                          onChange={handleInputChange}
                          required
                      />
                      <br />

                      <label htmlFor="residentialAddress">
                          Current Residential Address:
                      </label>
                      <input
                          type="text"
                          id="residentialAddress"
                          name="residentialAddress"
                          value={formData.residentialAddress}
                          onChange={handleInputChange}
                      />
                      <br />

                      <label htmlFor="country">Country of Origin:</label>
                      <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                      />
                      <br />

                      <label htmlFor="age">Age:</label>
                      <input
                          type="number"
                          id="age"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                      />
                      <br />

                      <label htmlFor="occupation">Occupation:</label>
                      <input
                          type="text"
                          id="occupation"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleInputChange}
                      />
                      <br />

                      <label>Marital Status:</label>
                      <select
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleInputChange}
                      >
                          <option value="single">Single</option>
                          <option value="separated">Separated</option>
                          <option value="cohabiting">Cohabiting</option>
                          <option value="married">Married</option>
                          <option value="widowed">Widowed</option>
                          <option value="divorced">Divorced</option>
                          <option value="other">Other</option>
                      </select>
                      <br />

                      <label>Type of Marriage/Union:</label>
                      <select
                          name="typeOfMarriage"
                          value={formData.typeOfMarriage}
                          onChange={handleInputChange}
                      >
                          <option value="customary">Customary</option>
                          <option value="christian">Christian</option>
                          <option value="civil">Civil</option>
                          <option value="islamic">Islamic</option>
                          <option value="hindu">Hindu</option>
                          <option value="other">Other</option>
                      </select>
                      <br />

                      <label htmlFor="dateOfMarriage">
                          Date of Marriage/Start of Union (dd/mm/yyyy):
                      </label>
                      <input
                          type="date"
                          id="dateOfMarriage"
                          name="dateOfMarriage"
                          value={formData.dateOfMarriage}
                          onChange={handleInputChange}
                      />
                      <br />

                      <label htmlFor="education">Highest Level of Education:</label>
                      <select
                          name="education"
                          value={formData.education}
                          onChange={handleInputChange}
                      >
                          <option value="none">None</option>
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                          <option value="university">University/ College Level</option>
                      </select>
                      <br />

                      <label htmlFor="income">Income per Month:</label>
                      <select
                          name="income"
                          value={formData.income}
                          onChange={handleInputChange}
                      >
                          <option value="0">0 KES</option>
                          <option value="less5000">&lt; 5000 KES</option>
                          <option value="5000-10000">5,000-10,000 KES</option>
                          <option value="10000-20000">10,000-20,000 KES</option>
                          <option value="20000">20,000 KES +</option>
                      </select>
          
                  </fieldset>

                  {/* Nature of the Problem Section */}
                  <fieldset>
                      <legend>Nature of the Problem</legend>
                      <div className="checkbox-group">
                          <label><input type="checkbox" name="problem" value="custody" onChange={handleInputChange} /> Custody and Maintenance</label>
                          <label><input type="checkbox" name="problem" value="resettlement" onChange={handleInputChange} /> Resettlement</label>
                          <label><input type="checkbox" name="problem" value="defilement" onChange={handleInputChange} /> Defilement/Rape</label>
                          <label><input type="checkbox" name="problem" value="family-reunification" onChange={handleInputChange} /> Family Reunification</label>
                          <label><input type="checkbox" name="problem" value="security-assessment" onChange={handleInputChange} /> Security Assessment</label>
                          <label><input type="checkbox" name="problem" value="assault" onChange={handleInputChange} /> Assault (Includes by partner)</label>
                          <label><input type="checkbox" name="problem" value="psycho-social-support" onChange={handleInputChange} /> Psycho-social support</label>
                          <label><input type="checkbox" name="problem" value="livelihood" onChange={handleInputChange} /> Livelihood related issues</label>
                          <label><input type="checkbox" name="problem" value="other" onChange={handleInputChange} /> Other (Specify)</label>
                          <input type="text" name="otherProblem" value={formData.otherProblem} onChange={handleInputChange} placeholder="Specify other" />
                      </div>

                      <h3>How did you hear about RELON-Kenya? (Tick)</h3>
                      <div className="radio-group">
                          <label><input type="radio" name="source" value="radio" onChange={handleInputChange} /> Radio</label>
                          <label><input type="radio" name="source" value="tv" onChange={handleInputChange} /> TV</label>
                          <label><input type="radio" name="source" value="print" onChange={handleInputChange} /> Print Media</label>
                          <label><input type="radio" name="source" value="church" onChange={handleInputChange} /> Church</label>
                          <label><input type="radio" name="source" value="relative" onChange={handleInputChange} /> Relative</label>
                          <label><input type="radio" name="source" value="referral" onChange={handleInputChange} /> Referral (From)</label>
                          <input type="text" name="referralSource" value={formData.referralSource} onChange={handleInputChange} placeholder="Specify referral" />
                          <label><input type="radio" name="source" value="forum" onChange={handleInputChange} /> Forum/Meeting</label>
                          <label><input type="radio" name="source" value="other" onChange={handleInputChange} /> Other</label>
                          <input type="text" name="otherSource" value={formData.otherSource} onChange={handleInputChange} placeholder="Specify other" />
                      </div>

                      <h3>Have you sought help elsewhere before coming to RELON-Kenya?</h3>
                      <label><input type="radio" name="soughtHelp" value="yes" onChange={handleInputChange} /> Yes</label>
                      <label><input type="radio" name="soughtHelp" value="no" onChange={handleInputChange} /> No</label>
                      <input type="text" name="helpDetails" value={formData.helpDetails} onChange={handleInputChange} placeholder="If yes, from where/whom?" />

                      <h3>Action to be taken</h3>
                      <div className="checkbox-group">
                          <label><input type="checkbox" name="action" value="pro-bono" onChange={handleInputChange} /> Pro bono lawyer</label>
                          <label><input type="checkbox" name="action" value="justice-system" onChange={handleInputChange} /> Informal Justice System</label>
                          <label><input type="checkbox" name="action" value="children-office" onChange={handleInputChange} /> Children's Office</label>
                          <label><input type="checkbox" name="action" value="police" onChange={handleInputChange} /> Police</label>
                          <label><input type="checkbox" name="action" value="ngo" onChange={handleInputChange} /> Other NGO</label>
                          <input type="text" name="otherNgo" value={formData.otherNgo} onChange={handleInputChange} placeholder="Specify other NGO" />
                          <label><input type="checkbox" name="action" value="relon-lawyer" onChange={handleInputChange} /> To see Relon Lawyer</label>
                          <label><input type="checkbox" name="action" value="no-case" onChange={handleInputChange} /> Client has no case</label>
                      </div>
                  </fieldset>




                  {/* Submit Button */}
                  <button className="btn" type="submit">Submit</button>
              </form>
          )}
    </div>
  );
};

export default ClientDetails;