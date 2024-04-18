import classes from "./SwitchToggle.module.css";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function SwitchToggle({ onToggle, selectedDays }) {
  return (
    <div className={classes.container}>
      {DAYS.map((day) => (
        <div key={day} className={classes.dayContainer}>
          <span className={classes.dayName}>{day}</span>
          <label className={classes.switch}>
            <input
              type="checkbox"
              checked={selectedDays[day.toLowerCase()]}
              onChange={() => onToggle(day.toLowerCase())}
            />
            <span className={classes.slider}></span>
          </label>
        </div>
      ))}
    </div>
  );
}
