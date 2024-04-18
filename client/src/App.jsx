import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Home/HomePage";
import MuscleGroups from "./pages/MuscleGroups/MuscleGroups";
import Exercises from "./pages/Exercises/Exercises";
import { queryClient } from "./util/http";
import MuscleGroupDetail from "./pages/MuscleGroupDetail/MuscleGroupDetail";
import ExerciseDetail from "./pages/ExerciseDetail/ExerciseDetail";
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import WorkoutPlan from "./pages/WorkoutPlan/WorkoutPlan";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth/:authType",
        element: <Auth />,
      },
      {
        path: "user",
        element: <RootLayout />,

        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "workout-plan",
            element: <WorkoutPlan />,
          },
          {
            path: "muscle-groups",
            children: [
              { index: true, element: <MuscleGroups /> },
              { path: ":muscleGroup", element: <MuscleGroupDetail /> },
            ],
          },
          {
            path: "exercises",
            children: [
              { index: true, element: <Exercises /> },
              { path: ":id", element: <ExerciseDetail /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
