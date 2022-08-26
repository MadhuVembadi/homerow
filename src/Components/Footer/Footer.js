import React from 'react'
import { MdEmail, MdOutlineColorLens } from 'react-icons/md'
import { BsGithub } from 'react-icons/bs'
import { FaDiscord, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Footer.css'

function Footer() {
    return (
        <div className='footer'>

            <div className='m-3'>
                <span id="key">tab</span>
                <span className='text-muted'> + </span>
                <span id="key">enter</span>
                <span className='text-muted'> - </span>
                <span className='text-muted'>restart test</span>
            </div>

            <div className='d-flex justify-content-between'>
                <ul className='d-flex list-unstyled justify-content-start'>
                    <li className='me-3'><a href="mailto:vembadi.madhu@gmail.com" className='text-decoration-none text-muted'><MdEmail className='mb-1 me-1' />E-Mail</a></li>

                    <li className='me-3'><a href="https://github.com/MadhuVembadi" target="_blank" className='text-decoration-none text-muted'><BsGithub className='mb-1 me-1' />GitHub</a></li>

                    <li className='me-3'><a href="" target="_blank" className='text-decoration-none text-muted'><FaDiscord className='mb-1 me-1' />Discord</a></li>

                    <li className='me-3'><a href="https://twitter.com/MadhuVembadi" target="_blank" className='text-decoration-none text-muted'><FaTwitter className='mb-1 me-1' />Twitter</a></li>

                    <li className='me-3'><a href="https://www.linkedin.com/in/madhu-vembadi-078111212/" target="_blank" className='text-decoration-none text-muted'><FaLinkedin className='mb-1 me-1' />Linkedin</a></li>

                    <li className='me-3'><a href="https://www.instagram.com/madhu.vembadi/" target="_blank" className='text-decoration-none text-muted'><FaInstagram className='mb-1 me-1' />Instagram</a></li>
                </ul>
                <ul className="d-flex list-unstyled text-muted justify-content-end">
                    <li className='me-3'><MdOutlineColorLens className='mb-1 me-1' />Theme</li>
                    <li className='me-3'><FontAwesomeIcon icon={faCodeBranch} className='me-1' />Version</li>
                </ul>


            </div>
        </div>
    )
}

export default Footer