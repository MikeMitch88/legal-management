import React, { useState } from 'react';
import './Psychology.css';

function Psychology() {
  const [formData, setFormData] = useState({
    presentingComplaint: '',
    pastMedicalHistory: '',
    familyHistory: '',
    pregnancy: '',
    birth: '',
    developmentalMilestones: '',
    childhood: '',
    adolescence: '',
    menstrualHistory: '',
    sexualHistory: '', 
    maritalHistory: '',
    educationWorkHistory: '',
    residence: '',
    friends: '',
    currentRelationships: '',
    hobbies: '',
    forensicHistory: '',
    substanceUseHistory: '',
    spiritualExperience: '',
    premorbidPersonality: '',
    etiologyPredisposing: '',
    etiologyPrecipitating: '',
    etiologyPerpetuating: '',
    etiologyProtective: '',
    mseAppearance: '',
    mseMood: '',
    mseSpeech: '',
    mseThought: '',
    msePerception: '',
    mseCognition: '',
    mseInsight: '',
    treatmentPlan: '',
    caseDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);

    fetch('/submit-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div >
      <h1>Medical and Social History Form</h1>

      <form onSubmit={handleSubmit} className="form-container">
        {/* Section: Presenting Complaint */}
        <section className="form-section">
          <h2>Presenting Complaint</h2>
          <label>History of Presenting Complaint:</label>
          <textarea
            name="presentingComplaint"
            value={formData.presentingComplaint}
            onChange={handleChange}
            placeholder="Describe the history here..."
          />
        </section>

        {/* Section: Past Medical and Psychiatric History */}
        <section className="form-section">
          <h2>Past Medical and Psychiatric History</h2>
          <textarea
            name="pastMedicalHistory"
            value={formData.pastMedicalHistory}
            onChange={handleChange}
            placeholder="Provide past medical and psychiatric history..."
          />
        </section>

        {/* Section: Family History */}
        <section className="form-section">
          <h2>Family History</h2>
          <textarea
            name="familyHistory"
            value={formData.familyHistory}
            onChange={handleChange}
            placeholder="Provide family history, including parents, siblings, and any history of mental illness..."
          />
        </section>

        {/* Section: Personal History */}
        <section className="form-section">
          <h2>Personal History</h2>
          <label>Pregnancy:</label>
          <textarea
            name="pregnancy"
            value={formData.pregnancy}
            onChange={handleChange}
            placeholder="Describe any pregnancy history..."
          />
          <label>Birth:</label>
          <textarea
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            placeholder="Details of birth..."
          />
          <label>Developmental Milestones:</label>
          <textarea
            name="developmentalMilestones"
            value={formData.developmentalMilestones}
            onChange={handleChange}
            placeholder="Developmental milestones..."
          />
          <label>Childhood:</label>
          <textarea
            name="childhood"
            value={formData.childhood}
            onChange={handleChange}
            placeholder="Describe childhood experiences..."
          />
          <label>Adolescence (Includes School Experiences):</label>
          <textarea
            name="adolescence"
            value={formData.adolescence}
            onChange={handleChange}
            placeholder="Adolescent experiences..."
          />
          <label>Menstrual History:</label>
          <input
            type="text"
            name="menstrualHistory"
            value={formData.menstrualHistory}
            onChange={handleChange}
            placeholder="Menstrual history..."
          />
          <label>Sexual History:</label>
          <input
            type="text"
            name="sexualHistory"
            value={formData.sexualHistory}
            onChange={handleChange}
            placeholder="Sexual history..."
          />
          <label>Marital History / History of Family of Procreation:</label>
          <textarea
            name="maritalHistory"
            value={formData.maritalHistory}
            onChange={handleChange}
            placeholder="Marital and family procreation history..."
          />
        </section>

        {/* Section: Educational and Work History */}
        <section className="form-section">
          <h2>Educational and Work History</h2>
          <textarea
            name="educationWorkHistory"
            value={formData.educationWorkHistory}
            onChange={handleChange}
            placeholder="Details of education and work history..."
          />
        </section>

        {/* Section: Social History */}
        <section className="form-section">
          <h2>Social History</h2>
          <label>Residence:</label>
          <input
            type="text"
            name="residence"
            value={formData.residence}
            onChange={handleChange}
            placeholder="Details of residence..."
          />
          <label>Friends:</label>
          <input
            type="text"
            name="friends"
            value={formData.friends}
            onChange={handleChange}
            placeholder="Details of friends..."
          />
          <label>Current Relationships:</label>
          <textarea
            name="currentRelationships"
            value={formData.currentRelationships}
            onChange={handleChange}
            placeholder="Describe current relationships..."
          />
          <label>Recreational Activities / Hobbies:</label>
          <textarea
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            placeholder="Recreational activities, hobbies..."
          />
          <label>Forensic History:</label>
          <textarea
            name="forensicHistory"
            value={formData.forensicHistory}
            onChange={handleChange}
            placeholder="Forensic history..."
          />
          <label>Substance Use History (Preference, Quantity, Frequency, Time):</label>
          <textarea
            name="substanceUseHistory"
            value={formData.substanceUseHistory}
            onChange={handleChange}
            placeholder="Substance use history..."
          />
          <label>Spiritual Experience:</label>
          <textarea
            name="spiritualExperience"
            value={formData.spiritualExperience}
            onChange={handleChange}
            placeholder="Describe spiritual experience..."
          />
          <label>Pre-morbid Personality:</label>
          <textarea
            name="premorbidPersonality"
            value={formData.premorbidPersonality}
            onChange={handleChange}
            placeholder="Pre-morbid personality..."
          />
        </section>

        {/* Section: Etiology */}
        <section className="form-section">
          <h2>Etiology</h2>
          <label>Predisposing (Genetic, Biological, Environmental):</label>
          <textarea
            name="etiologyPredisposing"
            value={formData.etiologyPredisposing}
            onChange={handleChange}
            placeholder="Predisposing factors..."
          />
          <label>Precipitating:</label>
          <textarea
            name="etiologyPrecipitating"
            value={formData.etiologyPrecipitating}
            onChange={handleChange}
            placeholder="Precipitating factors..."
          />
          <label>Perpetuating:</label>
          <textarea
            name="etiologyPerpetuating"
            value={formData.etiologyPerpetuating}
            onChange={handleChange}
            placeholder="Perpetuating factors..."
          />
          <label>Protective:</label>
          <textarea
            name="etiologyProtective"
            value={formData.etiologyProtective}
            onChange={handleChange}
            placeholder="Protective factors..."
          />
        </section>

        {/* Section: Mental Status Examination (MSE) */}
        <section className="form-section">
          <h2>Mental Status Examination (MSE)</h2>
          <label>Appearance and Behavior:</label>
          <textarea
            name="mseAppearance"
            value={formData.mseAppearance}
            onChange={handleChange}
            placeholder="Appearance and behavior..."
          />
          <label>Mood and Affect:</label>
          <textarea
            name="mseMood"
            value={formData.mseMood}
            onChange={handleChange}
            placeholder="Mood and affect..."
          />
          <label>Speech:</label>
          <textarea
            name="mseSpeech"
            value={formData.mseSpeech}
            onChange={handleChange}
            placeholder="Speech characteristics..."
          />
          <label>Thought:</label>
          <textarea
            name="mseThought"
            value={formData.mseThought}
            onChange={handleChange}
            placeholder="Thought process..."
          />
          <label>Perception:</label>
          <textarea
            name="msePerception"
            value={formData.msePerception}
            onChange={handleChange}
            placeholder="Perception..."
          />
          <label>Cognition:</label>
          <textarea
            name="mseCognition"
            value={formData.mseCognition}
            onChange={handleChange}
            placeholder="Cognition..."
          />
          <label>Insight:</label>
          <textarea
            name="mseInsight"
            value={formData.mseInsight}
            onChange={handleChange}
            placeholder="Insight..."
          />
        </section>

        {/* Section: Treatment Plan */}
        <section className="form-section">
          <h2>Treatment Plan</h2>
          <textarea
            name="treatmentPlan"
            value={formData.treatmentPlan}
            onChange={handleChange}
            placeholder="Describe the treatment plan..."
          />
        </section>

        {/* Section: Details of Case */}
        <section className="form-section">
          <h2>Details of Case</h2>
          <textarea
            name="caseDetails"
            value={formData.caseDetails}
            onChange={handleChange}
            placeholder="Provide the case details..."
          />
        </section>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Psychology;
