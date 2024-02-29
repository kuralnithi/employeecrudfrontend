import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  sortedEmployees,
} from "../../Features/Employeeslice";
import { userValid } from "../../Features/Userslice";
import { useNavigate } from "react-router-dom";

export default function EmployeePage() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeAge, setEmployeeAge] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [employeeCtc, setEmployeeCtc] = useState("");
  const [employeeLocation, setEmployeeLocation] = useState("");
  const [employeeExperience, setEmployeeExperience] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [sortName, setSortName] = useState("");
  const [sortLocation, setSortLocation] = useState("");
  const [Locations, setLocations] = useState([]);
  const [SortedEmployee, setSortedEmployee] = useState([]);
  const [showUpdate, setshowUpdate] = useState(true);

  const navigate = useNavigate();
  const valid = useSelector((state) => state.userStore.isValid);

  console.log("VVVVVVVVVV", valid);
  // const [employeeList,setEmployeeList]=useState([])

  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employeeStore);
  console.log("elist", employeeList);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      employeeName === "" ||
      employeeAge === "" ||
      employeeRole === "" ||
      employeeCtc === "" ||
      employeeLocation === ""
    ) {
      return toast.error("Please fill all the fields");
    }
    dispatch(
      createEmployee({
        name: employeeName,
        email: employeeEmail,
        role: employeeRole,
        age: employeeAge,
        experience: employeeExperience,
        ctc: employeeCtc,
        location: employeeLocation,
      })
    );

    setEmployeeName("");
    setEmployeeAge("");
    setEmployeeRole("");
    setEmployeeCtc("");
    setEmployeeExperience("");
    setEmployeeEmail("");
    setEmployeeLocation("");
    setEmployeeId("");
    showUpdate ? setshowUpdate(false) : setshowUpdate(true);
  };

  useEffect(() => {
    dispatch(getEmployee());
  }, []);
  console.log("llll", Locations);
  const handleEdit = (
    name,
    role,
    experience,
    ctc,
    age,
    email,
    location,
    id
  ) => {
    setEmployeeName(name);
    setEmployeeAge(age);
    setEmployeeRole(role);
    setEmployeeCtc(ctc);
    setEmployeeExperience(experience);
    setEmployeeEmail(email);
    setEmployeeLocation(location);
    setEmployeeId(id);

    setshowUpdate(false);
  };

  const handleDelete = async (_id) => {
    dispatch(deleteEmployee({ _id: _id }));
  };
  const handleSortByName = () => {
    const sortedEmployee = employeeList.filter((obj) =>
      obj.name.toLowerCase().startsWith(sortName.toLowerCase())
    );
    setSortedEmployee(sortedEmployee);
    setSortName("");
    // console.log("SE",SortedEmployee);
  };

  const handleSortByLocation = () => {
    const sortedEmployees = employeeList.filter((obj) => {
      return obj.location.startsWith(sortLocation);
    });
    console.log("SEEE", sortedEmployees);
    setSortedEmployee(sortedEmployees);
    setSortLocation("");
  };

  const handleLocationChange = (e) => {
    setSortLocation(e.target.value);
  };

  const handleSortNameChange = (e) => {
    setSortName(e.target.value);

    console.log(sortName);
  };
  const handleCancel = (e) => {
    e.preventDefault();

    setEmployeeName("");
    setEmployeeAge("");
    setEmployeeRole("");
    setEmployeeCtc("");
    setEmployeeExperience("");
    setEmployeeEmail("");
    setEmployeeLocation("");
    setEmployeeId("");
    setshowUpdate(true);
  };

  const handleLogout = () => {
    dispatch(userValid(false));

    localStorage.removeItem("employee-token");
    navigate("/");
  };

  return (
    <>
      <div className="">
        <header className="s  ticky top-0 z-10 shadow-lg">
          <div className="cart bg-gray-100 w-full flex justify-between  py-2 px-2 ">
            <div className="brand py-2 cursor-pointer hover:bg-red-300 rounded-full">
              <img
                className="w-6 md:w-10 lg:w-10 rounded-full"
                src="https://www.svgrepo.com/show/372383/employee-group.svg"
                alt=""
              />
            </div>

            <h1 className="font-bold text-lg "> EMPLOYEE DETAILS</h1>

            <div className="cartimg bg-gray-300 h-8 mt-1  px-2 rounded-2xl space-x-2 flex cursor-pointer">
              <div className="logoutbtn w-auto md:w-auto lg:w-auto px-1  py-1 rounded-xl font-bold text-white  bg-blue-400  hover:bg-blue-500 active:bg-gray-200">
                {valid && <button onClick={handleLogout}> Logout</button>}
              </div>
            </div>
          </div>
        </header>
        {valid ? (
          <main>
            <div className="form  shadow-xl rounded  ">
              <form
                action=""
                onSubmit={handleSubmit}
                className="bg-blue-100 px-5 mt-2"
              >
                <h1 type="submit" hidden={!showUpdate}>
                  Create Employee{" "}
                </h1>{" "}
                <hr />
                <h1 type="submit" hidden={showUpdate}>
                  {" "}
                  Update employee
                </h1>
                <input
                  // hidden={fgtUser}
                  type="text"
                  className="w-52 border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  placeholder="Enter employee name"
                  maxLength={20}
                />
                <input
                  // hidden={fgtUser}
                  type="text"
                  className="w-52 border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                  value={employeeRole}
                  onChange={(e) => setEmployeeRole(e.target.value)}
                  placeholder="Enter employee role"
                  maxLength={20}
                />
                <input
                  // hidden={fgtUser}
                  type="number"
                  className="w-52 border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                  value={employeeExperience}
                  onChange={(e) => setEmployeeExperience(e.target.value)}
                  placeholder="Enter employee experience"
                  max={80}
                />
                <input
                  // hidden={fgtUser}
                  type="email"
                  className="w-52 border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                  placeholder="Enter employee emailid"
                  maxLength={30}
                />
                <input
                  // hidden={fgtUser}
                  type="number"
                  className="w-52 border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                  value={employeeAge}
                  onChange={(e) => setEmployeeAge(e.target.value)}
                  placeholder="Enter employee age"
                  max={70}
                />
                <input
                  // hidden={fgtUser}
                  type="number"
                  className="w-52 border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                  value={employeeCtc}
                  onChange={(e) => setEmployeeCtc(e.target.value)}
                  placeholder="Enter employee ctc"
                  maxLength={20}
                />
                <input
                  // hidden={fgtUser}
                  type="text"
                  className="w-52 border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                  value={employeeLocation}
                  onChange={(e) => setEmployeeLocation(e.target.value)}
                  placeholder="Enter employee location"
                  maxLength={20}
                />
                <div className="btn flex justify-center space-x-5">
                  <button
                    className="py-2 bg-blue-400 px-2 my-2 rounded-xl hover:shadow-xl hover:font-bold "
                    type="submit"
                    hidden={!showUpdate}
                  >
                    Create{" "}
                  </button>
                  <button
                    className="py-2 bg-blue-400 px-2 my-2 rounded-xl hover:shadow-xl hover:font-bold "
                    onClick={handleCancel}
                    hidden={showUpdate}
                  >
                    cancel{" "}
                  </button>

                  <button
                    className="py-2 bg-blue-400 px-2 my-2 rounded-xl hover:shadow-xl hover:font-bold "
                    type="submit"
                    hidden={showUpdate}
                  >
                    {" "}
                    Update{" "}
                  </button>
                </div>
              </form>
            </div>

            <div className="">
              <div className="sortinput sm:flex md:flex bg-blue-200 sm:justify-center sm:space-x-5 py-2">
                <input
                  // hidden={fgtUser}
                  type="text"
                  className=" border p-2 my-1   rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                  value={sortName}
                  onChange={(e) => handleSortNameChange(e)}
                  placeholder="Enter name to sort"
                  maxLength={20}
                />
                <input
                  // hidden={fgtUser}
                  type="text"
                  className=" border p-2 my-1   rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                  value={sortLocation}
                  onChange={(e) => {
                    handleLocationChange(e);
                  }}
                  placeholder="Enter location to sort"
                  maxLength={20}
                />
              </div>
              <div className="sort flex justify-center">
                <button
                  className="bg-blue-200 p-2 m-2 rounded-xl"
                  onClick={handleSortByName}
                >
                  sort by name{" "}
                </button>
                <button
                  className="bg-blue-200 p-2 m-2 rounded-xl"
                  onClick={handleSortByLocation}
                >
                  sort by location{" "}
                </button>
              </div>
              <div className="table-responcive bg-red-100  overflow-x-auto ">
                <table className=" bg-gray-200  w-full divide-y-4 divide-gray-400 text-xs sm:text-sm md:text-md lg:text-lg ">
                  <tr className="">
                    <th className="px-2">Name </th>
                    <th className="px-2">Role </th>
                    <th className="px-2">Experience </th>
                    <th className="px-2">  CTC</th>
                    <th className="px-2">Age</th>
                    <th className="px-2">Email-id</th>
                    <th className="px-2">Location</th>
                  </tr>
                  {SortedEmployee.length !== 0
                    ? SortedEmployee.map((obj) => {
                        return (
                          <tr key={obj.email}>
                            <td className="px-2">{obj.name}</td>
                            <td className="px-2">{obj.role}</td>
                            <td className="px-2">{obj.experience}</td>
                            <td className="px-2">{obj.ctc}</td>
                            <td className="px-2">{obj.age}</td>
                            <td className="px-2">{obj.email}</td>
                            <td className="px-2">{obj.location}</td>
                            <td className="px-2">
                              <button
                                className="py-2 bg-orange-300 px-2 my-2 rounded-xl hover:shadow-xl hover:font-bold "
                                onClick={() => {
                                  handleEdit(
                                    obj.name,
                                    obj.role,
                                    obj.experience,
                                    obj.ctc,
                                    obj.age,
                                    obj.email,
                                    obj.location,
                                    obj._id
                                  );
                                }}
                              >
                                Edit
                              </button>
                            </td>
                            <td className="px-2">
                              <button
                                className="py-2 bg-red-500 px-2 my-2 rounded-xl hover:shadow-xl hover:font-bold "
                                onClick={() => {
                                  handleDelete(obj._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : employeeList.map((obj) => {
                        return (
                          <tr key={obj.email}>
                            <td className="px-2">{obj.name}</td>
                            <td className="px-2">{obj.role}</td>
                            <td className="px-2">{obj.experience}</td>
                            <td className="px-2">{obj.ctc}</td>
                            <td className="px-2">{obj.age}</td>
                            <td className="px-2">{obj.email}</td>
                            <td className="px-2">{obj.location}</td>
                            <td className="px-2">
                              <button
                                className="py-2 bg-orange-300 px-2 my-2 rounded-xl hover:shadow-xl hover:font-bold "
                                onClick={() => {
                                  handleEdit(
                                    obj.name,
                                    obj.role,
                                    obj.experience,
                                    obj.ctc,
                                    obj.age,
                                    obj.email,
                                    obj.location,
                                    obj._id
                                  );
                                }}
                              >
                                Edit
                              </button>
                            </td>
                            <td className="px-2">
                              <button
                                className="py-2 bg-red-400 px-2 my-2 rounded-xl hover:shadow-xl hover:font-bold "
                                onClick={() => {
                                  handleDelete(obj._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                </table>
              </div>
            </div>
            <ToastContainer />
          </main>
        ) : (
          <div> not valid </div>
        )}
      </div>
    </>
  );
}
