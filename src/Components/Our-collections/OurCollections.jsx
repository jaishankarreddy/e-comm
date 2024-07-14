import React, { useState, useEffect, useRef } from 'react';
import './OurCollections.css'



const OurCollections = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (

        <div className='ourcollections'>
            <div className='collections-container'>
                <div className='collections-container-left'>
                    <h1>Category</h1>

{/* 
                    <div className="dropdown" ref={dropdownRef}>
                        <button className="dropdown-toggle" onClick={toggleDropdown}>
                            Toggle Dropdown
                        </button>
                        {isOpen && (
                            <div className="dropdown-menu">
                                <h4 className="dropdown-item" onClick={() => setIsOpen(false)}>Item 1</h4>
                                <h4 className="dropdown-item" onClick={() => setIsOpen(false)}>Item 2</h4>
                                <h4 className="dropdown-item" onClick={() => setIsOpen(false)}>Item 3</h4>
                                <h4 className="dropdown-item" onClick={() => setIsOpen(false)}>Item 4</h4>
                            </div>
                        )}
                    </div>
                </div>
                <div className="collections-container-right"> */}
                    
                      
                </div>
            </div>

        </div>
    )
}

export default OurCollections;