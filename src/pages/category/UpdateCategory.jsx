import axios from '../../utils/axiosInstance'
import { toast } from 'react-toastify';
import { useState, useEffect} from 'react';
import { useNavigate, useParams} from "react-router-dom";
import addCategoryValidator from '../../validators/addCategoryValidator';

const initialFormdata = {
    title : "",
    desc : ""
};
const initialFormError = {
    title : ""
};

const UpdateCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormdata);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const categoryId = params.id;
  // console.log(categoryId);

  useEffect(() => {
    if(categoryId){
      const getCategory = async () => {
        try{

         //api request
         const response = await axios.get(
            `/category/${categoryId}`
         );
         const data = response.data.data;
         
         setFormData({title : data.category.title, desc : data.category.desc});

       }catch(error){
        const data = error.response.data;
        toast.error(data.message, {
            position :"top-right",
            autoClose : 3000,
          });
       }
      };

      getCategory();
    }
  }, [categoryId]);
  
  const handleChange = (e) => {
      setFormData((prev) => ({...prev, [e.target.name] : e.target.value}));
  }
  
  const handleSubmit = async (e) => {
      e.preventDefault();

      const errors = addCategoryValidator({title : formData.title});

      if(errors.title){
          setFormError(errors);
      }else{
        try{
         setLoading(true);

         //api request
         const response = await axios.put(
            `/category/${categoryId}`,
            formData
         );

         const p=response.data.message;
                      
        toast.success(p, {
            position :"top-right",
            autoClose : 3000,
        });
                      
        setFormData(initialFormdata);
        setFormError(initialFormError);
        setLoading(false);

        navigate("/categories");
       }catch(error){
         setLoading(false);
         setFormError(initialFormError);
          console.log(error);
        const data = error.response.data;
        toast.error(data.message, {
            position :"top-right",
            autoClose : 3000,
          });
      }
    }
  }
  return (
    <div>
      <button className="button-block" onClick={() => navigate(-1)}>Go Back</button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Update Category</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Technology"
              value={formData.title}
              onChange={handleChange}
            />
             { formError.title && <p className="error">{formError.title}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="desc"
              placeholder="Lorem ipsum"
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <input 
            className="button"
            type="submit"
            value={ `${loading ? "Updating" : "Update"}`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
