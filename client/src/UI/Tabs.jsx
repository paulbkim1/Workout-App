import React, { useState } from "react";
import classes from "./Tabs.module.css";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <ul className={classes.tabsList}>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`${classes.tab} ${
              index === activeTab ? classes.active : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className={classes.tabContent}>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
