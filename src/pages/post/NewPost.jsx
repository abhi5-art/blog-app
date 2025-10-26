import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import axios from '../../utils/axiosInstance'
import { toast } from 'react-toastify';
import addPostValidator from '../../validators/addPostValidator';

const initialFormdata = {
    title : "",
    desc : "",
    category : ""
};
const initialFormError = {
    title : "",
    category : ""
};

 
const NewPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormdata);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [extensionError, setExtensionError] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isDisable, setIsDisable] = useState(false);

  const handleChange = (e) => {
      setFormData((prev) => ({...prev, [e.target.name] : e.target.value}));
  }
  
   useEffect(() => {
         const getCategories = async () => {
            try{  
              //api request
              const response = await axios.get(`/category?size=100`);
              const data = response.data.data;
              setCategories(data.categories);
  
            }catch(error){  
              const data = error.response.data;
              toast.error(data.message, {
                  position :"top-right",
                  autoClose : 3000,
              });
            }
         };
  
         getCategories();
    }, []);
  
  const handleSubmit = async (e) => {
        e.preventDefault();
  
        const errors = addPostValidator({title : formData.title, category : formData.category});
  
        if(errors.title || errors.category){
            setFormError(errors);
        }else{
          try{
           setLoading(true);
           
           let input = formData;

           if (fileId) {
             input = { ...input, file: fileId };
           }

           //api request
           const response = await axios.post(
              "/posts",
              input
           );
  
           const p=response.data.message;
                        
          toast.success(p, {
              position :"top-right",
              autoClose : 3000,
          });
                        
          setFormData(initialFormdata);
          setFormError(initialFormError);
          setLoading(false);
  
          navigate("/posts");
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

  const handleFileChange = async (e) => {
    const formInput = new FormData();//formData class used to upload files 
    console.log(e.target.files);
    formInput.append("image", e.target.files[0]);

    const type = e.target.files[0].type;

    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
      setExtensionError(null);

      try {
        setIsDisable(true);
        // api request
        const response = await axios.post("/file/upload", formInput);
        const data = response.data;
        setFileId(data.data._id);

        toast.success(data.message, {
              position :"top-right",
              autoClose : true,
          });
        setIsDisable(false);
      } catch (error) {
        setIsDisable(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    } else {
      setExtensionError("Only .png or .jpg or .jpeg file allowed");
    }
  };
//    const handleFileChange = async (e) => {
//     const formInput = new FormData();
//     console.log(e.target.files);
    
//     // Check if files exist
//     if (!e.target.files || e.target.files.length === 0) {
//         setExtensionError("Please select a file");
//         return;
//     }
    
//     const file = e.target.files[0];
//     formInput.append("image", file);

//     const type = file.type;

//     if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
//       setExtensionError(null);

//       try {
//         setIsDisable(true);
//         // api request
//         const response = await axios.post("/file/upload", formInput, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });
//         console.log(response);
//         const data = response.data;
//         setFileId(data.data._id);

//         toast.success(data.message, {
//           position: "top-right",
//           autoClose: true,
//         });
//         setIsDisable(false);
//       } catch (error) {
//         setIsDisable(false);
//         // Handle error properly
//         if (error.response) {
//           const data = error.response.data;
//           toast.error(data.message, {
//             position: "top-right",
//             autoClose: true,
//           });
//         } else {
//           toast.error("An error occurred while uploading the file", {
//             position: "top-right",
//             autoClose: true,
//           });
//         }
//       }
//     } else {
//       setExtensionError("Only .png or .jpg or .jpeg file allowed");
//     }
// };
  return (
    <div>
      <button className="button-block" onClick={() => navigate(-1)}>Go Back</button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">New Post</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="React blog post"
              value={formData.title}
              onChange={handleChange}
            />
            { formError.title && <p className="error">{formError.title}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="desc"
              placeholder="Lorem ipsum"
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Select an image</label>
            <input
              className="form-control"
              type="file"
              name="file"
              placeholder="Lorem ipsum"
              onChange={handleFileChange}
            />
            {extensionError && <p className="error">{extensionError}</p>}
          </div>

          <div className="form-group">
            <label>Select a category</label>
            <select className="form-control" name="category" value={formData.category} onChange={handleChange}>

              {categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.title}</option>
              ))}
            </select>
            { formError.category && <p className="error">{formError.category}</p>}
          </div>

          <div className="form-group">
            <input 
            className="button" 
            type="submit" 
            value={`${loading ? "Adding..." : "Add"}`}
          />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
