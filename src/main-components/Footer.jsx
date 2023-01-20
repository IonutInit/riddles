import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faWhatsappSquare,
  faGithubSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

const Footer = () => {
  const shareUrl = encodeURI(window.location.hostname);
  const shareTitle = "The Riddle Fiddle";

  return (
    <div className="footer">
      <div className="footer-line"></div>

      <div className="footer-container">
        <div className="documentation-container">
          <a
            className="icons"
            href={"https://riddles.cojocaru.co.uk"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithubSquare} />
          </a>
        </div>

        <div className="social-container">
          <a
            className="icons"
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookSquare} />
          </a>
          <a
            className="icons"
            href={`https://twitter.com/share?url=${shareUrl}&text=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitterSquare} />
          </a>
          <a
            className="icons"
            href={`whatsapp://send?text=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faWhatsappSquare} />
          </a>
          <a
            className="icons"
            href={`https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>

      <div className="documentation-container"></div>
    </div>
  );
};

export default Footer;
