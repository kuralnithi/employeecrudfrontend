import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './ResetPasswordpage.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPasswordpage(props) {

    const [token, setToken] = useState('');

    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [responce, setResponce] = useState('');


    const [error, setError] = useState('');


    const navigate = useNavigate();

    const handletoken = (e) => {


        setToken(e.target.value);


    }

    const handleNewPassword = (e) => {


        setnewPassword(e.target.value);


    }


    const handleConfirmPassword = (e) => {


        setconfirmPassword(e.target.value);


    }





    const handleChangePasswordBtn = async () => {


        if (confirmPassword !== newPassword) {

            toast('Password not match')
            setError("Password not match");

            setTimeout(() => {
                setError("");



            }, 3000)

            return

        }

        if (confirmPassword == "" || newPassword == "" || token == "") {

            toast('enter the required fields')

            setError("enter the required fields");
            setTimeout(() => {
                setError("");



            }, 3000)
            return

        }

        if (newPassword.length < 8) {

            toast('Enter minimum 8 characters for password')

            setError("Enter minimum 8 characters for password");
            setTimeout(() => {
                setError("");



            }, 3000)
            return

        }


        const fetchpassword = await fetch('http://localhost:5000/api/resetpasswordpage', {


            method: 'post',

            headers: {

                "Content-Type": "application/json"

            },
            body: JSON.stringify({

                token: token,
                password: confirmPassword


            }
            )

        });

        const fetchResponce = await fetchpassword.json();

        console.log(fetchResponce);
        setResponce(fetchResponce.message);
        toast(fetchResponce.message);

        setTimeout(() => {
            setResponce("");



        }, 2000)

        setTimeout(() => {

//   navigate('/loading')

    setTimeout(() => {
    
      navigate('/')

    }, 3000); 


        }, 3000)

    }
    return (
        <div className='resetmain my-10 flex flex-col items-center'>
<div className="reset-heading text-4xl my-4 text-purple-500 font-bold"><span> CHANGE YOUR PASSWORD</span></div>
<div className="image w-60" >

    <img src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?w=740&t=st=1709133731~exp=1709134331~hmac=a1f755e5cf30f19b3d5499fdc9ca1f20690e5daacb6ebb3a1e8b4b52b8028fe4" alt="" />
</div>

            <div className="resetpage bg-gray-200 flex flex-col items-center w-96  rounded-3xl mx-8 shadow-2xl ">


                <div className="resetform form-group mt-4">
                    <div className="form-CONTROL ">
                        <input 
                className="border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                type="password"
                            
                        value={newPassword}
                            onChange={handleNewPassword}
                            placeholder='enter new password' />
                    </div>
                    <div className="form-CONTROL mt-3">
                        <input 
                className="border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            placeholder='enter confirm password' />
                    </div>
                    <div className="form-CONTROL mt-3">
                        <input
                className="border p-2 my-1  w-full rounded-md placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring focus:border-blue-300 "
                type="text"
                            value={token}
                            onChange={handletoken}
                            placeholder='Enter token' />
                    </div>
                    <div className="buttons flex flex-col text-center space-y-3">
                    <button onClick={handleChangePasswordBtn} className='bg-purple-600 hover:bg-purple-400 active:bg-purple-800   text-white font-bold px-2 mt-4  rounded py-1'>Change password</button>
                    <Link to={"/"} className='bg-blue-500 hover:bg-blue-400 active:bg-blue-700 text-white font-bold px-2 rounded py-1'>
                    Go to Home
                    </Link>
                    </div>
                    <br />
                    <div className='text-danger'>
                        {/* {responce && <p>{responce} </p>} */}
                        {/* {error && <p> {error} </p>} */}

                    </div>
                </div>

            </div>
            <ToastContainer/>
        </div>
    );
}

export default ResetPasswordpage;


