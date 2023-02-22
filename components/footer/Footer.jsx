import React from "react";
import classes from "./Footer.module.css";
import { FiInstagram } from "react-icons/fi";
import { FaTelegram } from "react-icons/fa";
import { BiMap } from "react-icons/bi";

const year = new Date().getFullYear();
const Footer = () => {
  return (
    <>
      <div className={classes.footer}>
        <div className={classes.footerLeft}>
          <div className={classes.footerContact}>
            <h2>Contact us</h2>
            <h4>Jeonju, South Korea</h4>
            <h4>010-3238-2555</h4>
          </div>
        </div>
        <div className={classes.footerCenter}>
          <div className={classes.footerContact}>
            <h2>Firdavs Market</h2>
            <h4>Always eagerly ready to serve you</h4>
            <div className={classes.footerLinks}>
              <a
                className={classes.icon}
                href="https://t.me/Firdavs_restaurant1"
                rel="noopener noreferrer"
              >
                <FaTelegram />
              </a>
              <a
                className={classes.icon}
                target="_blank"
                rel="noopener noreferrer"
                href="https://instagram.com/firdavs_restaurant_1?igshid=MWI4MTIyMDE="
              >
                <FiInstagram />
              </a>
              <a
                className={classes.icon}
                href="https://maps.app.goo.gl/KfggUUGjGEhSSrPe9?g_st=it"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BiMap />
              </a>
            </div>
          </div>
        </div>
        <div className={classes.footerContact}>
          <h2>Working Hours</h2>
          <h4>Monday-Sunday:</h4>
          <h4>10:00 Am - 11:00 Pm</h4>
        </div>
      </div>
      <div className={classes.copyRight}>
        <h3>©{year} Firdavs Market. All rights reserved</h3>
        {/* <div className="google-t" id="google_translate_element"></div> */}
        <div id="google_translate_element" />
      </div>
    </>
  );
};

export default Footer;
