import React from 'react';
import { FcHome, FcList, FcAddRow } from "react-icons/fc"
import { Outlet, Link } from 'react-router-dom';

const Layout = () => (
    <>
        <div className='bg-gray-200 h-full w-full font-thin border-b-2 p-0 border-solid border-1 border-black'>
            <nav className='bg-white text-center p-0'>
                <ul className='list-none m-0 p-3'>
                    <li className='inline p-3 hover:bg-gray-100'>
                        <Link to="/">
                            <FcHome className="inline-block text-2xl font-thin align-top" /> Home
                        </Link>
                    </li>
                    <li className='inline p-3 hover:bg-gray-100'>
                        <Link to="/trips">
                            <FcList className="inline-block text-2xl font-thin align-top" /> Trips
                        </Link>
                    </li>
                    <li className='inline p-3 hover:bg-gray-100'>
                        <Link to="/create">
                            <FcAddRow className="inline-block text-2xl font-thin align-top" /> Create
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div>
            <Outlet />
        </div>
    </>
);


export default Layout;