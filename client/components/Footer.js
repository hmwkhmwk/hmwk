import React from "react";
import { GoMarkGithub } from "react-icons/go";
import { AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => (
  <div id="footer">
    <div className="footerHalf">
      <div className="bigText">hmwk</div>
      <h3>
        Easy homework photo-submission for students, easy homework tracking for
        teachers.
      </h3>
      <div>
        <a href="https://github.com/hmwkhmwk/hmwk">
          <GoMarkGithub color="##e36397" size={32} /> GitHub
        </a>
      </div>
    </div>
    <div className="footerHalf">
      <a href="https://www.linkedin.com/in/victor-lam-chen/">
        <AiOutlineLinkedin size={25} /> Victor Chen | Software Engineer
      </a>
      <a href="https://www.linkedin.com/in/kay-chen-9a9679165/">
        <AiOutlineLinkedin size={25} /> Kay Chen | UX-UI Designer
      </a>
      <a href="https://www.linkedin.com/in/cecilia-yu-chung-chang/">
        <AiOutlineLinkedin size={25} /> Cecilia Yu Chung Chang | Jr. Software
        Engineer
      </a>
      <a href="https://www.linkedin.com/in/rt-lin/">
        <AiOutlineLinkedin size={25} /> RT Lin | Software Engineer
      </a>
      <a href="https://www.linkedin.com/in/fishxy2/">
        <AiOutlineLinkedin size={25} /> Yunice Xiao | Jr. Software Engineer
      </a>
      <h2>&copy; November 2020</h2>
    </div>
  </div>
);

export default Footer;
