import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

import { Routes, Route } from 'react-router-dom'
import PrivateLayout from './components/layout/PrivateLayout'
import PublicLayout from './components/layout/PublicLayout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Setting from './pages/Setting'
import ListCategory from './pages/category/ListCategory'
import ListPost from './pages/post/ListPost'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NewCategory from './pages/category/NewCategory'
import UpdateCategory from './pages/category/UpdateCategory'
import VerifyUser from './pages/VerifyUser'
import NewPost from './pages/post/NewPost'
import DetailedPost from './pages/post/DetailedPost'
import UpdatePost from './pages/post/UpdatePost'
function App() {

  return (
     <>

      <Routes>
      <Route element={<PrivateLayout />}>
         <Route path='/' element={<Home/>}/>

         <Route path='categories' element={<ListCategory/>}/>
         <Route path='categories/new-category' element={<NewCategory/>}/>
         <Route path='categories/update-category/:id' element={<UpdateCategory/>}/>

         <Route path='posts' element={<ListPost/>}/>
         <Route path='posts/new-post' element={<NewPost/>}/>
         <Route path='posts/detail-post' element={<DetailedPost/>}/>
         <Route path='posts/update-post' element={<UpdatePost/>}/>

         <Route path='profile' element={<Profile/>}/>
         <Route path='setting' element={<Setting/>}/>
         <Route path='setting/verify-user' element={<VerifyUser/> } />
      </Route>
      <Route element={<PublicLayout />}>
         <Route path="signup" element={<Signup />}/>
         <Route path="login" element={<Login />}/>
      </Route>
      </Routes>
      <ToastContainer />

     </>
  )
}

export default App;
