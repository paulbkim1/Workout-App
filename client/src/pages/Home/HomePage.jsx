import { NavLink } from "react-router-dom";

import classes from "./HomePage.module.css";
import abs from "../../assets/abs.jpg";
import Footer from "../../components/Footer";
import appPic from "../../assets/app-picture.png";
import girlLifting from "../../assets/girl-lifting-weights.jpg";

const HomePage = () => {
  return (
    <div>
      <header className={classes.header}>
        <NavLink className={classes.logo} to="/">
          HappyLifts
        </NavLink>
        <nav>
          <NavLink to="/auth/login" className={classes.navLink}>
            Login
          </NavLink>
          <NavLink to="/auth/signup" className={classes.navLink}>
            Signup
          </NavLink>
        </nav>
      </header>
      <div>
        <div className={classes.introContainer}>
          <section>
            <div>
              <h1>HappyLifts</h1>
              <p className={classes.text}>
                Elevate your workout experience with our specialized tracking
                app, designed to seamlessly add and customize workouts to your
                plan
              </p>
              <NavLink to="/auth/login" className={classes.loginButton}>
                Get started
              </NavLink>
            </div>

            <img src={appPic} alt="Picture of app" />
          </section>
        </div>
        <div className={classes.customRegimenContainer}>
          <section>
            <h2>Custom fitness regimen</h2>
            <p className={classes.text}>
              Explore a diverse collection of over 150 workouts in our extensive
              database
            </p>
            <img src={abs} alt="Picture of man with abs" />
            <p className={classes.text}>
              <span className={classes.span}>
                Variety for Every Fitness Level:
              </span>{" "}
              Discover a broad selection of 150 thoughtfully curated workouts
              that cater to diverse fitness levels. From beginner-friendly
              routines to advanced challenges, our extensive database ensures
              that there's something suitable for everyone, regardless of their
              fitness journey.
            </p>
            <p className={classes.text}>
              <span>Comprehensive Fitness Solutions:</span> Our extensive
              database goes beyond sheer quantity, offering a comprehensive
              range of workouts encompassing strength training, flexibility
              routines, and more. Whether you're targeting specific muscle
              groups, aiming for weight loss, or simply seeking a well-rounded
              fitness routine, our curated collection provides the tools for a
              diverse and satisfying workout journey.
            </p>
          </section>
        </div>
        <div className={classes.fitnessJourneyContainer}>
          <section>
            <h2>Elevate Your Fitness Journey with HappyLifts</h2>
            <img src={girlLifting} alt="Girl lifting weights" />
            <p className={classes.text}>
              Enjoy seamless tracking and diverse exercises, ensuring a
              motivating and effective experience for individuals of all fitness
              levels.
            </p>
            <p className={classes.text}>
              Connect with a thriving community of individuals who share your
              aspirations for personal growth and development.
            </p>
          </section>{" "}
        </div>
        <div className={classes.joinContainer}>
          <section>
            <h2>Join now</h2>
            <NavLink to="/auth/signup" className={classes.joinButton}>
              Get started
            </NavLink>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
