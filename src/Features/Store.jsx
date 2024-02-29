import { configureStore } from "@reduxjs/toolkit";

import employeeReducer from "./Employeeslice";
import UserReducer from "./Userslice";

export const store = configureStore({
  reducer: {
    employeeStore: employeeReducer,
    userStore: UserReducer,
  },
});
