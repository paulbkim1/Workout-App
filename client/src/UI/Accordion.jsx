import React, { useState } from "react";
import classes from "./Accordion.module.css";

const Accordion = ({ sections, onSelectionChange }) => {
  const [activeSectionIndices, setActiveSectionIndices] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  const toggleSection = (index) => {
    const sectionIsOpen = activeSectionIndices.includes(index);
    if (sectionIsOpen) {
      setActiveSectionIndices(activeSectionIndices.filter((i) => i !== index));
    } else {
      setActiveSectionIndices([...activeSectionIndices, index]);
    }
  };

  const handleCheckboxChange = (dataLabel, item) => {
    const isSelected = selectedItems[dataLabel]?.includes(item);

    const updatedSelection = {
      ...selectedItems,
      [dataLabel]: isSelected
        ? selectedItems[dataLabel].filter((i) => i !== item)
        : [...(selectedItems[dataLabel] || []), item],
    };

    setSelectedItems(updatedSelection);
    onSelectionChange(updatedSelection);
  };

  return (
    <div>
      {sections.map((section, index) => (
        <div key={index} className={classes.section}>
          <button
            className={classes.sectionHeader}
            onClick={() => toggleSection(index)}
          >
            {section.label}
            <span className={classes.toggleIndicator}>
              {activeSectionIndices.includes(index) ? "-" : "+"}
            </span>
          </button>
          <div
            className={`${classes.sectionContent} ${
              activeSectionIndices.includes(index) ? classes.active : ""
            }`}
          >
            {onSelectionChange ? (
              <div className={classes.inputContainer}>
                {section.content.map((item) => (
                  <div key={item} className={classes.input}>
                    <input
                      type="checkbox"
                      id={`${section.label}-${item}`}
                      checked={
                        selectedItems[section.dataLabel]?.includes(item) ||
                        false
                      }
                      onChange={() =>
                        handleCheckboxChange(section.dataLabel, item)
                      }
                    />
                    <label htmlFor={`${section.label}-${item}`}>{item}</label>
                  </div>
                ))}
              </div>
            ) : (
              <div>{section.content}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
