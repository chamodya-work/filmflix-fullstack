import React from 'react'
import './Home.css'
import WhiteLine from '../../Components/WhiteLine/WhiteLine';
import Banner from '../Banner/Banner';
import Navbar from '../../Components/Navbar/Navbar';


const Home = () => {
    return(
        <div className='home'>
            <div className='home__firstSection'> 
                <Navbar />
                <WhiteLine />
                <Banner />
            </div>
        </div>
    );
}

export default Home;