import React from "react";
import "../CSS/FootNote.css";
import legalImage from "../Logos/protected.png";
import careerImage from "../Logos/career.png";
import socialImage from "../Logos/social.png";

function Footnote() {
  return (
    <div>
      <div className="jos">
        <center>
          <b>
            <h5>@Contact</h5>
          </b>
          <h6>EmailOficial@proiect.EchipaDeSoc</h6>
          <b>
            <h4>AboutUs</h4>
          </b>
          <div className="container text-center coloane">
            <div className="row">
              <div className="col">
                <h5>
                  <b>Legal</b>
                </h5>
                <img className="legal" src={legalImage} alt="" />
              </div>
              <div className="col">
                <h5>
                  <b>Careers</b>
                </h5>
                <img className="legal" src={careerImage} alt="" />
              </div>
              <div className="col">
                <h5>
                  <b>Social</b>
                </h5>
                <img className="legal" src={socialImage} alt="" />
              </div>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}

export default Footnote;
