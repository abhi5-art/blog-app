import { useState } from "react"
import signupValidator from "../validators/signupValidator";
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const initialFormdata = {
    name : "",
    email : "",
    password : "",
    confirmPassword : "",
};
const initialFormError = {
    name : "",
    email : "",
    password : "",
    confirmPassword : "",
};
const Signup = () => {
    const [formData, setFormData] = useState(initialFormdata);
    const [formError, setFormError] = useState(initialFormError);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = signupValidator({
          name : formData.name,
          email : formData.email,
          password : formData.password,
          confirmPassword : formData.confirmPassword
        });

        if(errors.name || errors.email || errors.confirmPassword || errors.password){
            setFormError(errors);
        }else{
           try{
             setLoading(true);

             //api request
             const requestBody = {
               name : formData.name,
               email : formData.email,
               password : formData.password
             }
             const response = await axios.post(
              "/auth/signup",
              requestBody
            ); 
              const p=response.data.message;
             console.log(response.data.message);
             
             toast.success(p, {
               position :"top-right",
               autoClose : 3000,
             });
             
             setFormData(initialFormdata);
             setFormError(initialFormError);
             setLoading(false);
             
             navigate("/login");
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
        console.log(formData);
    };
    const handleChange = (e) => {
          setFormData( (prev) => ({...prev, [e.target.name] : e.target.value}));
    };
    return(
    <div className="form-container">
      <form className="inner-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Signup Form</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Jhon Doe"
            value={formData.name}
            onChange={handleChange}
          />
          { formError.name && <p className="error">{formError.name}</p>}
        </div>

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

        <div className="form-group">
          <label>Confirm password</label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            placeholder="***********"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          { formError.confirmPassword && <p className="error">{formError.confirmPassword}</p>}
        </div>

        <div className="form-group">
          <input 
            className="button" 
            type="submit" 
            value={`${loading ? "Saving..." : "Signup"}`}
          />
        </div>
      </form>
    </div>
    )
}

export default Signup;