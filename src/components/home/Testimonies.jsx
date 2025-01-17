import React from 'react'
import lady from '../../assets/lady.png'
import man from '../../assets/man.png'
import granny from '../../assets/granny.png'
import './Testimonies.css'

const Testimonies = () => {
  
  return (
    
    
    <div className='testimonies_container'>
        
        <h3>TESTIMONIALS</h3>
        <h1>See how we are changing lives</h1>
        <h6>LifeTrak health tracker has empowered countless individuals to take control of their 
          <br/>wellness journeys. Our users have verifiably reported improved physical and mental 
          <br/>health after interacting with our various features. <br/>
        Here’s what some of them have to say:</h6>
        


          <div className="square__grid">
              <div className="square1">
              <div className='text_icon'>
              <img className='iconx'src={lady} alt="icon"/>
              {/* <h3>Instant Consultation</h3> */}
              </div>
                <h5>“As someone managing asthma, this tracker has been a game-changer. It helps me monitor triggers, track symptoms, and stay consistent with my medication. The reminders and health insights have made managing my condition so much easier. I finally feel in control of my health!”</h5>
              </div>
        
        
        
              <div className="square2">
              <div className='text_icon'>
              <img className='icony' src={man} alt="icon"/>
              {/* <h3>Health Tracking</h3> */}
              </div>
                <h5> I thought it was too late to turn my health around, but this tracker proved me wrong. It helped me stay consistent with my fitness goals, reminded me to take my medications, and even improved my sleep patterns. The personalized features made it easy to stick with, and now I feel better than I have in years!"</h5>
              </div>
        
        
              <div className="square3">
              <div className='text_icon'>
              <img className='iconz'src={granny} alt="icon"/>
              {/* <h3>Personalized Fitness Plans</h3> */}
              </div>
                <h5>At 74, keeping track of my health felt overwhelming, but this tracker has made it so simple. From reminders for my medications to tracking my daily walks, it’s been a blessing. I feel more independent and confident about my health now.</h5>          
              </div>
              </div>
        
        </div>
  )
}

export default Testimonies