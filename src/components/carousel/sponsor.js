import React from 'react';  

import OwlCarousel from 'react-owl-carousel'; 
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';


const options = {  
    loop: true,
    margin: 10,
    smartSpeed: 1000,
    autoplayTimeout: 3000,
    autoplay: false,
    nav: false,
    dots: false,
    responsiveClass: true,
    navText: [
        '<i className="fa-solid fa-angle-left"></i>',
        '<i className="fa-solid fa-angle-right"></i>',
    ],
    responsive: {
        0: {
            items: 2,
        },
        400: {
            items: 3,
        },
        600: {
            items: 4,
        },
        767: {
            items: 5,
        },
        991: {
            items: 4,
        },
        1199: {
            items: 5,
        },
        1243: {
            items: 6,
        },
        1799: {
            items: 9,
        },
    },
};  


const SponsorCarousel = () => {  
    return (  
        <OwlCarousel className="footer__sponsor owl-theme owl-carousel" {...options}>
            <div className="footer__sponsor__items">
                <a href="#0">
                    <img src="assets/img/sponsor/s1.png" alt="simg"/>
                </a>
            </div>
            <div className="footer__sponsor__items">
                <a href="#0">
                    <img src="assets/img/sponsor/s12.png" alt="simg"/>
                </a>
            </div>
            <div className="footer__sponsor__items">
                <a href="#0">
                    <img src="assets/img/sponsor/s3.png" alt="simg"/>
                </a>
            </div>
            <div className="footer__sponsor__items">
                <a href="#0">
                    <img src="assets/img/sponsor/s4.png" alt="simg"/>
                </a>
            </div>
            <div className="footer__sponsor__items">
                <a href="#0">
                    <img src="assets/img/sponsor/s5.png" alt="simg"/>
                </a>
            </div>
            <div className="footer__sponsor__items">
                <a href="#0">
                    <img src="assets/img/sponsor/s6.png" alt="simg"/>
                </a>
            </div>
            <div className="footer__sponsor__items">
                <a href="#0">
                    <img src="assets/img/sponsor/s7.png" alt="simg"/>
                </a>
            </div>
            <div className="footer__sponsor__items">
                <a href="#0">
                    <img src="assets/img/sponsor/s8.png" alt="simg"/>
                </a>
            </div>
            <div className="footer__sponsor__items">
                <a href="#0">
                    <img src="assets/img/sponsor/s9.png" alt="simg"/>
                </a>
            </div>
            <div className="footer__sponsor__items">
                <a href="#0">
                    <img src="assets/img/sponsor/s10.png" alt="simg"/>
                </a>
            </div>
        </OwlCarousel >
    );  
}  

export default SponsorCarousel;