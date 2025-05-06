import { useState, useEffect } from "react";
import './App.css'
import {Route, Routes} from "react-router-dom";

import supabase from "./config/supabaseClients";

import ProtectedRoute from "./ProtectedRoutes";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import Home from "./Home";
//while submitting any form, e.preventDefault() is used to prevent the default action of the form
//like refreshing the page or submitting the form

function App() {
  
  return (
   <div>
    <Routes>

      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<SignIn/>} />
      
      {/* All protected routes go inside this */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />



    </Routes>
   </div>
  )
}

export default App;
