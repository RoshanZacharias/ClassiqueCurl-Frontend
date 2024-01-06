import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';

import {
  MDBBtn,
} from 'mdb-react-ui-kit';
import { baseURL } from '../../api/api';



const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleViewClick = (userId) => {
        console.log(`View button clicked for Salon ID ${userId}`);
      };

    useEffect(() => {
        axios.get(`${baseURL}/admin-side/user-list/`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);



    const handleSearch = async (e) => {
      try {
        e.preventDefault();
        const response = await axios.get(`${baseURL}/admin-side/users/search/?search=${searchTerm}`);
        const data = response.data;  
        console.log('DATA:', data);
        setUsers(data);
        
      } catch (error) {
        console.error('Error searching:', error);
      }
    };




    

    const handleBlockUnblock = async (userId, isBlocked) => {
        try {
          const url = `${baseURL}/admin-side/users/${userId}/${isBlocked ? 'unblock' : 'block'}/`;
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error(`Failed to ${isBlocked ? 'unblock' : 'block'} user.`);
          }
      
          
          setUsers(prevUsers => {
            return prevUsers.map(user => {
              if (user.id === userId) {
                return { ...user, is_blocked: !isBlocked };
              }
              return user;
            });
          });
      
      
          const data = await response.json();
          
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
      
      

    return (
        <div>
          <AdminNavbar/>
            <h1 style={{ maxWidth: '90%', margin: 'auto', marginTop:'20px', marginBottom:'10px' }}>User List</h1>

            <form className='d-flex input-group w-auto' style={{ width: '50%',  paddingBottom:'20px', marginLeft:'1000px' }}>
          <input
            type='search'
            className='form-control'
            placeholder='Search'
            aria-label='Search'
            onChange={(e)=>setSearchTerm(e.target.value)}
            style={{borderRadius: '10px'}}
          />
          <MDBBtn color='primary' onClick={handleSearch} style={{borderRadius: '10px', marginLeft:'10px'}} >
            Search
          </MDBBtn>
        </form>


            <Table striped bordered hover style={{ maxWidth: '90%', margin: 'auto', marginTop:'20px', marginBottom:'10px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>
                            <Button
                                variant={user.is_blocked ? 'success' : 'danger'}
                                onClick={() => handleBlockUnblock(user.id, user.is_blocked)}
                                >
                                {user.is_blocked ? 'Unblock' : 'Block'}
                                </Button>


                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;
