import React, { useState, useEffect } from 'react';
import './ClientList.css'; 

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/users/clients')  
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    return (
        <div className="client-list-container">
            <h2>Client List</h2>
            {clients.length === 0 ? (
                <p>No clients found.</p>
            ) : (
                <table className="client-list-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Passport-ID</th>
                            <th>Country of Origin</th>
                            <th> Residential Address </th>
                            <th>postal code</th>
                            <th>Telephone</th>
                            <th>Age</th>
                            <th>Marital Status</th>
                            <th>Address</th>
                            <th>Education</th>
                                
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                                <td>{client.passport_id}</td>
                                <td>{client.country_of_origin}</td>
                                <td>{client.residential_address}</td>
                                <td>{client.postal_code}</td>
                                <td>{client.telephone_no}</td>
                                <td>{client.age}</td>
                                <td>{client.maritalStatus}</td>
                                <td>{client.postal_address}</td>
                                <td>{client.education}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClientList;