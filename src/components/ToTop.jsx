
import React, { useState } from 'react';
import { useEffect } from 'react';

import './ToTop.css'


//кнопка скрола вверх
const ToTop = () => {

    const [showToTopButton, setShowToTopButton] = useState(false);
    useEffect(() => {
        function handleScroll() {
          if (window.pageYOffset > 200) {
            setShowToTopButton(true);
          } else {
            setShowToTopButton(false);
          }
        }
      
        window.addEventListener("scroll", handleScroll);
      
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);


    return (
        <div className='top-btn'>
           {showToTopButton && (
  <div className="to-top-button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
    &#9650;
  </div>
)} 
        </div>
    );
};

export default ToTop;