import axios from "axios";
import { getAuthToken } from "../util/auth";

const http = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllExercises = async () => {
  const res = await http.get("/exercises/get-all-exercises", {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return res.data;
};

export async function getCategoryExercises({ signal, category }) {
  const capitaledCategory =
    category.charAt(0).toUpperCase() + category.slice(1);
  const res = await http.get(
    "/exercises/category?category=" + capitaledCategory,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  return res.data;
}

export async function getExerciseDetails({ signal, id }) {
  const res = await http.get(`/exercises/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  return res.data;
}

export const auth = async ({ authType, authData }) => {
  try {
    const res = await http.post("/auth/" + authType, authData);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};

export const addExerciseToPlan = async ({ day, exerciseId }) => {
  const res = await http.put(
    `/exercises/add/${day}?exercise-id=${exerciseId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  return res.data;
};

export async function getExercisePlan({ signal }) {
  const res = await http.get("/exercises/get-exercise-plan", {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  return res.data;
}

export async function getTodaysExercise({ signal }) {
  const res = await http.get("/exercises/get-todays-exercise", {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  return res.data;
}

export const updateExerciseRoutine = async (exercisePlan) => {
  const res = await http.put(
    `/exercises/update-routine`,
    { exercisePlan },
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  return res.data;
};

export const deleteExerciseFromPlan = async ({ day, exerciseId }) => {
  const res = await http.delete(
    `/exercises/delete-from-plan?day=${day}&exerciseId=${exerciseId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  return res.data;
};
