import React from "react";
import HeroSection from "./Hero";
import AboutUsBriefComponent from "./AboutUsBriefComponent";
import Features from "./Features";
import Pricing from "./PricingSection";
import Testimonials from "./Testimonials";
import CTA from "./CTA";

const LandingPage = ()=>{
    return(
        <div>
              <HeroSection />
        <AboutUsBriefComponent />
        <Features/>
        <Pricing/>
        <Testimonials/>
<CTA/>
        </div>
    )
}

export default LandingPage