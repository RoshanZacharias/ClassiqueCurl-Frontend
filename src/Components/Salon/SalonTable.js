import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { baseURL } from '../../api/api';

const SalonTable = ({ salons }) => {
  return (
    <MDBTable style={{ maxWidth: '80%', margin: 'auto' }}>
      <MDBTableHead>
        <tr>
          <th>Salon Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Location</th>
          <th>Licence Number</th>
          <th>Licence</th>
          <th>Salon Image</th>
          <th>Status</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {salons.map((salon) => (
          <tr key={salon.id}>
            <td>{salon.salon_name}</td>
            <td>{salon.email}</td>
            <td>{salon.mobile}</td>
            <td>{salon.location}</td>
            <td>{salon.licence_number}</td>
            <td>
              <img src={`${baseURL}${salon.licence}`} alt="Licence" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </td>
            <td>
              <img src={`${baseURL}${salon.salon_image}`} alt="Salon Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </td>
            <td style={{ color: salon.is_verified ? 'green' : 'red' }}>
                {salon.is_verified ? 'Accepted' : 'Rejected'}
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default SalonTable;