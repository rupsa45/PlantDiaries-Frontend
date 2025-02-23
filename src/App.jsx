import { Route,Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import CreateAccount from "./pages/Auth/CreateAccount";
import ForgetOtp from "./pages/Auth/ForgetOtp";
import HomePage from "./pages/HomePage";
import AddInputPage from "./pages/AddInputPage";
import DiscoverPage from "./pages/DiscoverPage";
import DetailsPage from "./pages/DetailsPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPassword from "./pages/Auth/ResetPassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditPlantDiaryPage from "./pages/EditPlantDiaryPage";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAccount/>} />
        <Route path="/forgot-otp" element={<ForgetOtp/>}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/plant-diary-form" element={<AddInputPage/>}/>
        <Route path="/discover" element={<DiscoverPage/>}/>
        <Route path="/details/:id" element={<DetailsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/edit-post/:id" element={<EditPlantDiaryPage/>}/>
      </Routes>
    </>
  )
}

export default App
