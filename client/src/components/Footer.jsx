import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <ul>
        <li>
          <span>Terms of Service</span>
        </li>
        <li>
          <span>Privacy Policy</span>
        </li>
        <li>
          <span>Careers</span>
        </li>
        <li>
          <span>Support</span>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
