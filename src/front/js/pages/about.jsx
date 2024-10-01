import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/about.css";
import { AboutUs } from "../component/aboutUs.jsx";
import { NewsletterSection } from "../component/newsletter.jsx";
export const About = () => {
  return (
    <section id="about" className="bg-black">
      < AboutUs/>
      <NewsletterSection />
    </section>
  );
};