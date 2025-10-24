import axios from '../utils/axiosInstance'
import { useState } from 'react';
import { toast } from 'react-toastify';
import loginValidator from '../validators/loginValidator';
import { useNavigate } from 'react-router-dom';

const initialFormdata = {
    email : "",
    password : ""
};
const initialFormError = {
    email : "",
    password : "",
};
const Login = () => {
     const [formData, setFormData] = useState(initialFormdata);
     const [formError, setFormError] = useState(initialFormError);
     const [loading, setLoading] = useState(false);
    
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = loginValidator({
          email : formData.email,
          password : formData.password
        });

        if(errors.email || errors.password){
            setFormError(errors);
        }else{
           try{
             setLoading(true);

             //api request
             const requestBody = {
               email : formData.email,
               password : formData.password
             }
             const response = await axios.post(
              "/auth/signin",
              requestBody
            ); 
             //restoring user information and token to browser local storage
              const data = response.data;
              window.localStorage.setItem("blogData", JSON.stringify(data.data));//browserlocalstorage stores data in string form

              const p=response.data.message;
             
             toast.success(p, {
               position :"top-right",
               autoClose : 3000,
             });
             
             setFormData(initialFormdata);
             setFormError(initialFormError);
             setLoading(false);
             
             navigate("/");
           }catch(error){
              setLoading(false);
              setFormError(initialFormError);
              const data = error.response.data;
              toast.error(data.message, {
               position :"top-right",
               autoClose : 3000,
             });

           }
        }
    };
      
     const handleChange = (e) => {
          setFormData( (prev) => ({...prev, [e.target.name] : e.target.value}));
    };
    return (
    <div className="form-container">
      <form className="inner-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Login Form</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="doe@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
        { formError.email && <p className="error">{formError.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="***********"
            value={formData.password}
            onChange={handleChange}
          />
        { formError.password && <p className="error">{formError.password}</p>}
        </div>

        <a className="forgot-password" to="/forgot-password">
          Forgot Password
        </a>

        <div className="form-group">
         <input 
            className="button" 
            type="submit" 
            value={`${loading ? "Loading..." : "Login"}`}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
