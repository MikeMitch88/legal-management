import React, {useState} from "react";
import "./Legal.css"; 

const ClientDetailsForm = () => {

  const [formData, setFormData] = useState({
    filledBy: "",
    arrivalDate: "",
    rsdProcess: "",
    rsdDate: "",
    status: "",
    spouseAddress: "",
    spousePostalCode: "",
    spouseContact: "",
    spouseResidence: "",
    spouseOccupation: "",
    spouseIncome: "",
    spouseKnow: "",
    altContactName: "",
    altContactPostal: "",
    altContactPhone: "",
    altContactResidence: "",
    children: [{ present: false, previous: false, sex: "", dob: "", occupation: "" }] // For children section
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form refresh
    console.log("Submitted Data: ", formData);

    // Post the formData to your backend endpoint, e.g. using fetch:
    fetch("/submit_form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    
    <div >
      <h1>Client Details Form - Part B</h1>
      
      <form className="form-container" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Part B: To Be Filled in by Legal Counsel</legend>

          {/* Section 3: Filled in by */}
          <div className="form-group">
            <label>3. Please check filled in by:</label><br />
            <label>
              <input type="checkbox" id="relonLawyer" name="filledBy" value="RELON Lawyer" onChange={handleChange} /> RELON lawyer
            </label>
            <label>
              <input type="checkbox" id="proBonoLawyer" name="filledBy" value="Pro Bono Lawyer" onChange={handleChange} /> Pro-bono lawyer
            </label>
          </div>

          {/* Section 4: Further information on client */}
          <div className="form-group">
            <strong>4. Further information on client</strong><br /><br />
            <label>If Unaccompanied:</label>
          </div>

          <div className="form-group">
            <label htmlFor="arrivalDate">When did you arrive in Kenya:</label>
            <input type="date" id="arrivalDate" value={formData.arrivalDate} name="arrivalDate" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Have you gone through the RSD process?</label><br />
            <label>
              <input type="checkbox" id="rsdYes" name="rsdProcess" value="Yes" onChange={handleChange} /> Yes
            </label>
            <label>
              <input type="checkbox" id="rsdNo" name="rsdProcess" value="No" onChange={handleChange} /> No
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="rsdDate">If yes, when:</label>
            <input type="date" id="rsdDate" name="rsdDate" value={formData.rsdDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="status">What is your status:</label>
            <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} />
          </div>

          {/* Section: Spouse/Partner/Relative Details */}
          <div className="form-group">
            <strong>NAME OF SPOUSE/ PARTNER/RELATIVE</strong>
          </div>

          <div className="form-group">
            <label htmlFor="spouseAddress">Address:</label>
            <input type="text" id="spouseAddress" name="spouseAddress" value={formData.spouseAddress} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="spousePostalCode">Postal Code:</label>
            <input type="text" id="spousePostalCode" name="spousePostalCode" value={formData.spousePostalCode} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="spouseContact">Telephone Contact:</label>
            <input type="tel" id="spouseContact" name="spouseContact" value={formData.spouseContact} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="spouseResidence">Residence:</label>
            <input type="text" id="spouseResidence" name="spouseResidence" value={formData.spouseResidence} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="spouseOccupation">Occupation:</label>
            <input type="text" id="spouseOccupation" name="spouseOccupation" value={formData.spouseOccupation} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="spouseIncome">Monthly Income:</label>
            <input type="number" id="spouseIncome" name="spouseIncome" value={formData.spouseIncome} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Does your spouse/partner/relative know that you are here?</label><br />
            <label>
              <input type="checkbox" id="spouseYes" name="spouseKnow" value="Yes" onChange={handleChange}/> Yes
            </label>
            <label>
              <input type="checkbox" id="spouseNo" name="spouseKnow" value="No" onChange={handleChange} /> No
            </label>
          </div>

          {/* Section: Children Information */}
          <div className="form-group">
            <strong>CHILDREN: (Please indicate whether from previous or present union)</strong>
          </div>

          <div className="form-group">
            <table>
              <thead>
                <tr>
                  <th>List of Children</th>
                  <th>Present</th>
                  <th>Previous</th>
                  <th>Sex</th>
                  <th>Date of Birth/Age</th>
                  <th>Occupation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><input type="checkbox" name="child1Present" /></td>
                  <td><input type="checkbox" name="child1Previous" /></td>
                  <td><input type="text" name="child1Sex" /></td>
                  <td><input type="date" name="child1Dob" /></td>
                  <td><input type="text" name="child1Occupation" /></td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>

          {/* Section: Alternative Contact Person */}
          <div className="form-group">
            <strong>ALTERNATIVE CONTACT PERSON:</strong>
          </div>

          <div className="form-group">
            <label htmlFor="altContactName">Name:</label>
            <input type="text" id="altContactName" name="altContactName" value={formData.altContactName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="altContactPostal">Postal Address:</label>
            <input type="text" id="altContactPostal" name="altContactPostal" value={formData.altContactPostal} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="altContactPhone">Telephone Number:</label>
            <input type="tel" id="altContactPhone" name="altContactPhone" value={formData.altContactPhone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="altContactResidence">Residential Address:</label>
            <input type="text" id="altContactResidence" name="altContactResidence" value={formData.altContactResidence} onChange={handleChange} />
          </div>

          {/* Submit button */}
          <div className="form-groups">
            <button type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
      </div>
      
  );
};

export default ClientDetailsForm;
