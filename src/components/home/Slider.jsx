// import React, { useState } from 'react';
// import './Slider.css';

// const Slider = () => {
//     const [position, setPosition] = useState(0);
//     const boxWidth = 500 + 20; // Box width + margin
//     const totalBoxes = 6;

//     const slideLeft = () => {
//         if (position < 3) {
//             setPosition(position + boxWidth);
//         }
//     };

//     const slideRight = () => {
//         const maxPosition = -boxWidth * (totalBoxes - 3);
//         if (position > maxPosition) {
//             setPosition(position - boxWidth);
//         }
//     };

//     return (
//         <div className='slider__container'>

//         <h3>TESTIMONIALS</h3>
//         <h1>See how we are changing lives</h1>
//         <h6>LifeTrak health tracker has empowered countless individuals to take control of their 
//           <br/>wellness journeys. Our users have verifiably reported improved physical and mental 
//           <br/>health after interacting with our various features. <br/>
//         Here’s what some of them have to say:</h6>

//         <div className="slider-container">

//             <button className="arrow left" onClick={slideLeft}>&#10094;</button>
//             <div className="slider" style={{ transform: `translateX(${position}px)` }}>
//                 {Array.from({ length: totalBoxes }, (_, i) => (
//                     <div className="box" key={i}>{i + 1}</div>
//                 ))}
//             </div>
//             <button className="arrow right" onClick={slideRight}>&#10095;</button>
//         </div>
//         </div>
//     );
// };

// export default Slider;



// import React, { useState, useEffect } from 'react';
// import './Slider.css';

// const Slider = () => {
//     const [position, setPosition] = useState(0);
//     const boxWidth = 500 + 20; // Box width + margin
//     const totalBoxes = 6;

//     // Duplicating boxes for infinite sliding effect
//     const boxes = Array.from({ length: totalBoxes * 1 }, (_, i) => i % totalBoxes + 1);

//     const slideLeft = () => {
//         setPosition((prevPosition) => {
//             const newPosition = prevPosition + boxWidth;
//             if (newPosition > 3) {
//                 // Reset to end if sliding too far left
//                 return -boxWidth * (totalBoxes - 1);
//             }
//             return newPosition;
//         });
//     };

//     const slideRight = () => {
//         setPosition((prevPosition) => {
//             const newPosition = prevPosition - boxWidth;
//             const maxPosition = -boxWidth * (totalBoxes);
//             if (newPosition <= maxPosition) {
//                 // Reset to start if sliding too far right
//                 return 0;
//             }
//             return newPosition;
//         });
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             slideRight();
//         }, 3000); // Auto-slide every 3 seconds

//         return () => clearInterval(interval);
//     }, []);

//     return (

//         <div className='slider__container'>

//          <h3>TESTIMONIALS</h3>
//          <h1>See how we are changing lives</h1>
//          <h6>LifeTrak health tracker has empowered countless individuals to take control of their 
//            <br/>wellness journeys. Our users have verifiably reported improved physical and mental 
//            <br/>health after interacting with our various features. <br/>
//          Here’s what some of them have to say:</h6>


//         <div className="slider-container">
//             <button className="arrow left" onClick={slideLeft}>&#10094;</button>
//             <div className="slider" style={{ transform: `translateX(${position}px)`, transition: 'transform 0.5s ease' }}>
//                 {boxes.map((box, i) => (
//                     <div className="box" key={i}>{box}</div>
//                 ))}
//             </div>
//             <button className="arrow right" onClick={slideRight}>&#10095;</button>
//         </div>
//         </div>
//     );
// };

// export default Slider;



import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = () => {
    const [position, setPosition] = useState(0);
    const boxWidth = 300 + 20; // Box width + margin
    const totalBoxes = 2;

    // Duplicating boxes for infinite sliding effect
    const boxes = Array.from({ length: totalBoxes }, (_, i) => i + 1);
    const extendedBoxes = [...boxes, ...boxes]; // Duplicate to create seamless effect

    const slideLeft = () => {
        setPosition((prevPosition) => {
            const newPosition = prevPosition + boxWidth;
            return newPosition > 0 ? -boxWidth * totalBoxes : newPosition;
        });
    };

    const slideRight = () => {
        setPosition((prevPosition) => {
            const newPosition = prevPosition - boxWidth;
            return newPosition <= -boxWidth * totalBoxes ? 0 : newPosition;
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            slideRight();
        }, 3000); // Auto-slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (


        <div className='slider__container'>

          <h3>TESTIMONIALS</h3>
          <h1>See how we are changing lives</h1>
          <h6>LifeTrak health tracker has empowered countless individuals to take control of their 
            <br/>wellness journeys. Our users have verifiably reported improved physical and mental 
            <br/>health after interacting with our various features. <br/>
          Here’s what some of them have to say:</h6>


        <div className="slider-container">
        
            <div className="slider" style={{ transform: `translateX(${position}px)`, transition: 'transform 0.5s ease' }}>
                {extendedBoxes.map((box, i) => (
                    <div className="box" key={i}>{box}</div>
                ))}
            </div>
            <div className='arrow'>
        {/* <button className="arrow left" onClick={slideLeft}>&#10094;</button> */}
        {/* <button className="arrow right" onClick={slideRight}>&#10095;</button> */}
        </div>  
        </div>
        
        </div>
    );
};

export default Slider;




// import React, { useState, useEffect, useRef } from 'react';
// import './Slider.css';

// const Slider = () => {
//     const [position, setPosition] = useState(0);
//     const boxWidth = 300 + 20; // Box width + margin
//     const totalBoxes = 2;
//     const transitionRef = useRef(null);
//     const sliderRef = useRef(null);

//     const boxes = Array.from({ length: totalBoxes }, (_, i) => i + 1);
//     const extendedBoxes = [...boxes, ...boxes, ...boxes]; // Tripling for continuous effect

//     const resetPosition = () => {
//         if (position <= -boxWidth * totalBoxes) {
//             transitionRef.current.style.transition = 'none';
//             setPosition(0);
//         } else if (position >= 0) {
//             transitionRef.current.style.transition = 'none';
//             setPosition(-boxWidth * (totalBoxes));
//         }
//     };

//     const slideLeft = () => {
//         transitionRef.current.style.transition = 'transform 0.5s ease';
//         setPosition((prevPosition) => prevPosition + boxWidth);
//     };

//     const slideRight = () => {
//         transitionRef.current.style.transition = 'transform 0.5s ease';
//         setPosition((prevPosition) => prevPosition - boxWidth);
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             slideRight();
//         }, 3000);

//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         if (sliderRef.current) {
//             sliderRef.current.addEventListener('transitionend', resetPosition);
//         }
//         return () => {
//             if (sliderRef.current) {
//                 sliderRef.current.removeEventListener('transitionend', resetPosition);
//             }
//         };
//     }, [position]);

//     return (
//         <div className="slider-container">
//             <button className="arrow left" onClick={slideLeft}>&#10094;</button>
//             <div className="slider-wrapper">
//                 <div 
//                     ref={(el) => {
//                         sliderRef.current = el;
//                         transitionRef.current = el;
//                     }}
//                     className="slider"
//                     style={{ 
//                         transform: `translateX(${position}px)`
//                     }}
//                 >
//                     {extendedBoxes.map((box, i) => (
//                         <div className="box" key={i}>{box}</div>
//                     ))}
//                 </div>
//             </div>
//             <button className="arrow right" onClick={slideRight}>&#10095;</button>
//         </div>
//     );
// };

// export default Slider;
