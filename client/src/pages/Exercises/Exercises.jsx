import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllExercises } from "../../services/internalApiServices";
import classes from "./Exercises.module.css";
import Card from "../../components/Card";
import Accordion from "../../UI/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Exercises = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: ({ signal }) => getAllExercises({ signal }),
  });

  const [filteredData, setFilteredData] = useState([]);
  const [accordionContent, setAccordionContent] = useState({
    categories: [],
    primaryMuscles: [],
    secondaryMuscles: [],
  });

  useEffect(() => {
    if (data) {
      setFilteredData(data.exercises);
      setAccordionContent({
        categories: data.labels.categories,
        primaryMuscles: data.labels.primaryMuscles,
        secondaryMuscles: data.labels.secondaryMuscles,
      });
    }
  }, [data]);

  const handleSelectionChange = (selectedItems) => {
    if (data) {
      const isSelectedItemsEmpty = Object.keys(selectedItems).every(
        (key) => selectedItems[key].length === 0
      );

      if (isSelectedItemsEmpty) {
        setFilteredData(data.exercises);
      } else {
        const filteredExercises = data.exercises.filter((exercise) => {
          return Object.keys(selectedItems).some((key) => {
            return selectedItems[key].some(
              (selectedItem) =>
                exercise[key] && exercise[key].includes(selectedItem)
            );
          });
        });

        setFilteredData(filteredExercises);
      }
    }
  };

  let content;
  if (isLoading) {
    content = <FontAwesomeIcon icon={faSpinner} spin size="3x" />;
  } else if (filteredData.length > 0) {
    content = filteredData.map((exercise) => (
      <Card key={exercise._id} exercise={exercise} />
    ));
  } else {
    content = <p>No exercises found.</p>;
  }

  return (
    <div className={classes.container}>
      <h2>Exercises</h2>
      <div className={classes.content}>
        <div className={classes.accordionContainer}>
          <Accordion
            sections={[
              {
                label: "Category",
                dataLabel: "category",
                content: accordionContent.categories,
              },
              {
                label: "Primary Muscles",
                dataLabel: "primaryMuscles",
                content: accordionContent.primaryMuscles,
              },
              {
                label: "Secondary Muscles",
                dataLabel: "secondaryMuscles",
                content: accordionContent.secondaryMuscles,
              },
            ]}
            onSelectionChange={handleSelectionChange}
          />
        </div>
        <div className={classes.contentContainer}>{content}</div>
      </div>
    </div>
  );
};

export default Exercises;
