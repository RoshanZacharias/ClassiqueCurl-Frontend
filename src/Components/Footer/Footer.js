import './FooterStyle.css'

import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='top'>
        <div>
            <h1>ClassiqueCurl</h1>
            <p>Where Every Curl Tells a Story of Grace.</p>
        </div>
        <div>
            <a href="/">
                <i className='fa-brands fa-facebook-square'></i>
            </a>

            <a href="/">
                <i className='fa-brands fa-instagram-square'></i>
            </a>

            <a href="/">
                <i className='fa-brands fa-twitter-square'></i>
            </a>
        </div>
      </div>
      <div className='bottom'>
        <div>
            <h4>Project</h4>
            <a href="/">ChangeLog</a>
            <a href="/">Status</a>
            <a href="/">Licence</a>
            <a href="/">All Versions</a>
        </div>

        <div>
            <h4>Community</h4>
            <a href="/">GitHub</a>
            <a href="/">Issues</a>
            <a href="/">Project</a>
            <a href="/">Twitter</a>
        </div>

        <div>
            <h4>Help</h4>
            <a href="/">Support</a>
            <a href="/">Troubleshooting</a>
            <a href="/">Contact Us</a>
            
        </div>

        <div>
            <h4>Others</h4>
            <a href="/">Terms of Service</a>
            <a href="/">Privacy Policy</a>
            <a href="/">Licence</a>
           
        </div>
      </div>
    </div>
  )
}

export default Footer
