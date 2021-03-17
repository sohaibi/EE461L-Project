import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
// YT 1:18 <Footer /> in Home.js
function Footer() {
    return (
        <div className='footer-container'>
        {/* section for email sign up */}
            <section className='footer-subscription'>
                <p className ='footer-subscription-heading'>
                    Join our email list!
                </p> 
                {/* press enter == submit */}
                <div className="input-areas">
                    <form>
                        <input type='email' name='email' placeholder='Your Email'className='footer-input'/>
                        <button buttonStyle='btn--outline>'>Subscribe</button>
                    </form>
                </div>
            </section>

            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/sign-up'>How it Works</Link>
                        <Link to='/'>Terms of Service</Link>
                    </div>
                </div>

                <div className='footer-link-wrapper'> 
                    <div className='footer-link-items'>
                        <h2>Contact Us</h2>
                        <Link to='/'>Contact</Link>
                        <Link to='/'>Support</Link>
                    </div>
                </div>
            </div>

            <section className="socail-media">
                <div className="social-media-wrap">
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            WIRE Pdls <i className="fab fa-typo3"></i>
                        </Link>
                    </div>
                   <small className='website-rights'>WIRE Pdls © 2021 </small> 
                   <div class='social-icons'>
                        <Link class='social-icon-link youtube' to='/' target='_blank' aria-label='Youtube' >
                        <i class='fab fa-youtube' />
                        </Link>
                        <Link class='social-icon-link linkedin' to='/' target='_blank' aria-label='LinkedIn'> 
                        <i class='fab fa-linkedin' />
                        </Link>
                    </div>
                </div> 
            </section>
        </div>
    );
}

export default Footer
