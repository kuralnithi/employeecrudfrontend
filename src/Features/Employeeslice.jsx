  import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";

  export const createEmployee = createAsyncThunk("createEmployee", async (data) => {
    try {
      const responce = await axios
        .post("http://localhost:5000/api/createemployee", { data })
        .then((res) => res.data.data);
      console.log("create Employee respomce", responce);

      return responce;
    } catch (error) {
      console.log("error", error);
    }
  });

  export const getEmployee = createAsyncThunk("getEmployee", async () => {
    try {
      const responce = await axios
        .get("http://localhost:5000/api/getemployee")
        .then((res) => res.data.data);
      console.log("get Employee respomce", responce);

      return responce;
    } catch (error) {
      console.log("error in gettin employee", error);
    }
  });

  export const deleteEmployee = createAsyncThunk("deleteEmployee", async (data) => {
    try {
      const responce = await axios
        .post("http://localhost:5000/api/deleteemployee", { data })
        .then((res) => res.data.data);
      console.log("delete Employee respomce", responce);

      return responce;
    } catch (error) {
      console.log("error", error);
    }
  });

  const employeeSlice = createSlice({
    name: "employee",
    initialState: [],
    reducers:{
  sortedEmployees:(state,action)=>{
  state.length = 0;
      action.payload.map((obj)=>{state.push(obj)})
  console.log("in dispatch of sortEmployees");
  }
  },

    extraReducers: (builder) => {
      builder
      .addCase(createEmployee.fulfilled, (state, action) => {
          state.length=0
          action.payload.map((obj)=>{state.push(obj)})
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
          state.length=0
          action.payload.map((obj)=>{state.push(obj)})
      })
    
      .addCase(deleteEmployee.fulfilled, (state, action) => {
          state.length=0
          action.payload.map((obj)=>{state.push(obj)})
      })
    },
  });



  export default employeeSlice.reducer

  export const {sortedEmployees} = employeeSlice.actions