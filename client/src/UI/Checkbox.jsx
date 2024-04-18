import classes from "./Checkbox.module.css";

export default function Checkbox({
  muscles,
  muscleType,
  showCheckbox,
  setShowCheckbox,
  onCheckboxChange,
}) {
  return (
    <>
      <div className={classes.container}>
        <h2>{muscleType}</h2>
        <span onClick={() => setShowCheckbox((prev) => !prev)}>
          {showCheckbox ? "-" : "+"}
        </span>
      </div>
      {showCheckbox && (
        <div className={classes.label}>
          {muscles.map((muscle, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={muscle.value}
                onChange={(e) =>
                  onCheckboxChange(
                    parseInt(e.target.value, 10),
                    e.target.checked
                  )
                }
              />
              <span>{muscle.label}</span>
            </label>
          ))}
        </div>
      )}
    </>
  );
}
