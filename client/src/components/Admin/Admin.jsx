import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'; // Import your CSS file for styling

function Admin() {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [error, setError] = useState(null);

    // Fetch users when component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/users/all', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                setError('Failed to fetch users. Please try again later.');
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editUserId) {
                // Update user
                await axios.put(`http://127.0.0.1:5000/api/users/${editUserId}`, { email, password, role }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                alert('User successfully updated!');
            } else {
                // Add new user
                const response = await axios.post(
                    'http://127.0.0.1:5000/api/users/add',
                    { email, password, role },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                if (response.status === 201) {
                    alert('User successfully created!');
                }
            }

            const response = await axios.get('http://127.0.0.1:5000/api/users/all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(response.data);

            // Clear form fields and reset states
            setEmail('');
            setPassword('');
            setRole('');
            setEditUserId(null);
            setShowForm(false);
            
        } catch (error) {
            console.error('Error saving user:', error);
            alert('Failed to save user. Please check your inputs.');
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle edit button click
    const handleEdit = (user) => {
        setEmail(user.email);
        setRole(user.role);
        setEditUserId(user.id);
        setShowForm(true);
    };

    // Handle delete button click
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('User successfully deleted!');
            // fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user.');
        }
    };

    return (
        <div className="admin-container">
            <h2>Manage Users</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {/* Add User Button */}
            <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add User'}
            </button>

            {/* User Form */}
            {showForm && (
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    {/* Password Input with Toggle Visibility */}
                    <div style={{ position: 'relative' }}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                        {/* Eye Icon */}
                        <span
                            onClick={togglePasswordVisibility}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '35px',
                                cursor: 'pointer',
                                userSelect: 'none',
                            }}
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </span>
                    </div>

                    {/* Role Input */}
                    <div>
                        <label htmlFor="role">Role:</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="">--Select Role--</option>
                            <option value="admin">Admin</option>
                            <option value="reception">Reception</option>
                            <option value="legal">Legal</option>
                            <option value="psychology">Psychology</option>
                        </select>
                    </div>

                    {/* Save Button */}
                    <div>
                        <button type="submit" className="btn btn-primary">
                            {editUserId ? 'Update User' : 'Create User'}
                        </button>
                    </div>
                </form>
            )}

            
            {/* Users Table */}
            <button className="btn btn-success" onClick={() => setShowTable(!showTable)}>
                {showTable ? 'Cancel' : 'View Users'}
            </button>
            {showTable && (
            <table onSubmit={handleSubmit} className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleEdit(user)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    );
}

export default Admin;