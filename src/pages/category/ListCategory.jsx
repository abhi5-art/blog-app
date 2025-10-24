import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from '../../utils/axiosInstance'
import { toast } from "react-toastify";
import moment from 'moment/moment'
import {Modal, Button} from 'react-bootstrap'

const ListCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [searchvalue, setSearchValue] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
       const getCategories = async () => {
          try{
            setLoading(true);

            //api request
            const response = await axios.get(`/category?page=${currentPage}&q=${searchvalue}`);
            const data = response.data.data;
            setCategories(data.categories);
            setTotalPage(data.pages);
            console.log(data);

            setLoading(false);
          }catch(error){
            setLoading(false);

            const data = error.response.data;
            toast.error(data.message, {
                position :"top-right",
                autoClose : 3000,
            });
          }
       };

       getCategories();
  }, [currentPage]);

  useEffect(() => {
     if(totalPage > 1){
       let tempPageCount = [];

       for(let i=1;i<=totalPage;i++){
         tempPageCount = [...tempPageCount,i];
       }
       setPageCount(tempPageCount);
     }else{
       setPageCount([]);
     }
  }, [totalPage]);
  
  const handlePrev = () => {
    setCurrentPage((prev) => prev-1);
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev+1);
  };
  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  const handleSearch = async (e) => {
     try{ 
        const input = e.target.value;
        setSearchValue(input);

        //api request
        const response = await axios.get(`/category?q=${input}&page=${currentPage}`);
        const data = response.data.data;

        setCategories(data.categories);
        setTotalPage(data.pages);
     }catch(error){
       const data = error.response.data;
       toast.error(data.message, {
          position :"top-right",
          autoClose : 3000,
        });
     }
  }
  const handleDelete = async () => {
     try{  
      //api request
      const response1 = await axios.delete(`/category/${categoryId}`);

      const p=response1.data.message;
                      
      toast.success(p, {
            position :"top-right",
            autoClose : 3000,
      });
      setShowModel(false);
      
      const response2 = await axios.get(`/category?page=${currentPage}&q=${searchvalue}`);
      const data = response2.data.data;
      setCategories(data.categories);
      setTotalPage(data.pages);

     }catch(error){
       setShowModel(false);
       const data = error.response.data;
       toast.error(data.message, {
          position :"top-right",
          autoClose : 3000,
        });
     }
  }
  // console.log(pageCount);
  return (
    <div>
      <button 
      className="button-block" 
      onClick={() => navigate("new-category")}>
        Add New Category
       </button>

      <h2 className="table-title">Category list</h2>
      <input
        className="saerch-input"
        type="text"
        name="search"
        placeholder="Search here"
        onChange={handleSearch}
      />

      {loading ? "Loading Categories..." : (
      <table style={{marginLeft : "25px"}}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
           {categories.map( (category) => (
            <tr key={category._id}>
             <td>{category.title}</td>
             <td>{category.desc}</td>
             <td>
              {moment(category.createdAt).format("YYYY-MM-DD HH:mm:ss")}
             </td>
             <td>
              {moment(category.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
             </td>
             <th>
               <button 
                className="button" 
                onClick={() => navigate(`update-category/${category._id}`)}>
                 Update
               </button>
               <button
               className="button"
               onClick={() => {
                 setShowModel(true);
                 setCategoryId(category._id);
               }}>
                Delete
               </button>
             </th>
            </tr>
           ))}
        </tbody>
      </table>
      )};

      {pageCount.length && (
      <div className="pag-container">
        <button
        className="pag-button"
        onClick={handlePrev}
        disabled={currentPage === 1}>
          prev
        </button>
        {pageCount.map((pageNumber, index) => (
            <button 
            className="pag-button" 
            key={index}
            onClick={() => handlePage(pageNumber)}
            style={{
               backgroundColor : currentPage === pageNumber ? "#ccc" : "",
            }}
            >
            {pageNumber}
            </button>
        ))}
        <button 
        className="pag-button" 
        onClick={handleNext} 
        disabled={currentPage === totalPage}>
          next
        </button>
      </div>
      )}

      <Modal show={showModel} onHide={() => {
         setShowModel(false);
         setCategoryId(null);
      }}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <div style={{ margin : "0 auto" }}>
            <Button className="no-button" onClick={() => {
              setShowModel(false);
              setCategoryId(null);
            }}>
              No
             </Button>
            <Button className="yes-button" onClick={handleDelete}>Yes</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListCategory;
