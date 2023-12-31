import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {clearAdminAuth} from '../../Redux/AdminSlice'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

export default function AdminNavbar() {
  const adminUser = useSelector(state => state.admin);
  console.log('ADMIN-USER:', adminUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openBasic, setOpenBasic] = useState(false);

  const logout = () =>{
    dispatch(clearAdminAuth());
    navigate('/admin-login');
}

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Admin Panel</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
          <MDBNavbarItem>
              <Link to="/admin-home/user-list">
                <MDBNavbarLink>Users</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Salons</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <Link to="/admin-home/salon-list">
                <MDBNavbarLink>Salon Request</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href='/admin-home/bookings'>Bookings</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Notifications</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink  onClick={logout}>Logout</MDBNavbarLink>
            </MDBNavbarItem>

            

            
          </MDBNavbarNav>

          <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='Search' aria-label='Search' />
            <MDBBtn color='primary'>Search</MDBBtn>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}