import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './slider.css'

import Tweet1 from '../../../assets/pictures/tweet_bill.png'
import Tweet2 from '../../../assets/pictures/tweet_bruce.png'
import Tweet3 from '../../../assets/pictures/tweet_guido.png'
import Tweet4 from '../../../assets/pictures/tweet_michael.png'
import Tweet5 from '../../../assets/pictures/tweet-rock.png'

class DemoCarousel extends Component {
    render() {
     
        return (
            <Carousel autoPlay interval='3000' showThumbs={false} showStatus={false} infiniteLoop={true} showArrows={false}>

                <div className='tweet'>
                    <img src={Tweet1} alt='tweet-1'/>
                </div>
                <div className='tweet'>
                    <img src={Tweet2} alt='tweet-2'/>
                </div>
                <div className='tweet'>
                    <img src={Tweet3} alt='tweet-3'/>
                </div>
                <div className='tweet'>
                    <img src={Tweet4} alt='tweet-4'/>
                </div>
                <div className='tweet'>
                    <img src={Tweet5} alt='tweet-5'/>
                </div>
            </Carousel>
        )
    }
}


export default DemoCarousel