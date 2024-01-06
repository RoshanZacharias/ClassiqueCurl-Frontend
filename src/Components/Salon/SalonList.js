import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import AdminNavbar from '../Navbar/AdminNavbar';
import { baseURL } from '../../api/api';

const SalonList = () => {
    const navigate = useNavigate();
    const [salons, setSalons] = useState([]);

    const handleViewClick = (salonId) => {
        navigate(`/admin-home/salon-list/salon-request-approval/${salonId}`);
        console.log(`View button clicked for Salon ID ${salonId}`);
      };

    useEffect(() => {
        axios.get(`${baseURL}/admin-side/salon-list/`)
            .then(response => {
                console.log(response.data)
                setSalons(response.data);
                
            })
            .catch(error => {
                console.error('Error fetching salon data:', error);
            });
    }, []);

    return (
        <div>
            <AdminNavbar/>
            <h1>Salon Requests</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Salon Name</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Mobile</th>
                        <th>Image</th>
                        <th>Action</th>
                        {/* Add other fields as needed */}
                    </tr>
                </thead>
                <tbody>
                {salons.map(salon => (
                    <tr key={salon.id}>
                    <td>{salon.id}</td>
                    <td>{salon.salon_name}</td>
                    <td>{salon.email}</td>
                    <td>{salon.location}</td>
                    <td>{salon.mobile}</td>
                    <td>
                        {/* Display the image directly inside the cell */}
                        <img src={`${baseURL}${salon.salon_image}`} alt="Salon Image" style={{ width: '50px', height: '50px' }} />
                    </td>
                    <td>
                        <Button variant="primary" onClick={() => handleViewClick(salon.id)}>
                        View
                        </Button>
                    </td>
                    {/* Add other fields as needed */}
                    </tr>
                ))}
                </tbody>

            </Table>
        </div>
    );
};

export default SalonList;
