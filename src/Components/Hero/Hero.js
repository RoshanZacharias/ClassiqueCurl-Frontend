import React, {useState} from 'react'
import './HeroStyle.css';
import {
  MDBBtn,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../api/api';


const Hero = (props) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.get(`${baseURL}/salons/search/?search=${searchTerm}`);
      const data = response.data;  
      console.log('DATA:', data);
      setUsers(data);
      navigate('/search', { state: { data } });
      
    } catch (error) {
      console.error('Error searching:', error);
    }
  };


  return (
    <div className={props.cName}>
      <form className='d-flex input-group w-auto' style={{ width: '50%', paddingTop:'20px',  paddingBottom:'20px', marginLeft:'1100px', marginRight:'20px' }}>
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
        <img src={props.heroImg} />
        

        <div className='hero-text'>
          
            <h1>{props.title}</h1>
            <p>{props.text}</p>
            <a href={props.url} className={props.btnClass}>{props.buttonText}</a>
        </div>

        
        
    </div>
  )
}

export default Hero
