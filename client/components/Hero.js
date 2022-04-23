import React from 'react';
import '../../public/styles/style.css';

const Hero = () => {
  return (
    // <>
    //   HeroBanner
    //   <div>best selling products</div>
    //   <p>something here</p>
    //   <div>
    //     {['product1', 'product2'].map((product) => (
    //       <div>{product}</div>
    //     ))}
    //   </div>
    //   footer
    // </>
    <div className="hero-banner-container">
      <div>
        <h1>Our #1 product!!</h1>
        <img
          className="hero-banner-image"
          src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          alt="hero-banner"
        />
      </div>
    </div>
  );
};

export default Hero;
