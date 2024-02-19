import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <div>
            <header className='py-4 px-5 d-flex justify-content-between'>
                <div className='text-white fs-3'>Feedback</div>
                <nav>
                    <ul className='d-flex h-100 align-items-center gap-5' style={{ listStyle: 'none' }}>
                        <li className='text-white cursor px-4 py-2 rounded' style={{ cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.2)' }} onClick={() => {
                            localStorage.clear();
                            navigate('/login');
                        }}><p className='m-0'>Log Out</p></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header
