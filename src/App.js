import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Blogs from "./Components/Blogs";
import Courses from "./Components/Courses";
import Tools from "./Components/Tools";
import Login from "./Components/Login";
import Header from "./Components/Header";
// import "./App.css";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import Coursesdetails from "./Components/Coursesdetails";
import Content from "./Components/Content";
import Asin from "./Components/Asin";
import Product from "./Components/Product";
import Asindetails from "./Components/Asindetails";
import Productdetails from "./Components/Productdetails";
import Header1 from "./Components/Header1";
import Plan from "./Components/Plan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Header1 />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <Header1 />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <>
              <Header />
              <Header1 />
              <Blogs />
              <Footer />
            </>
          }
        />
        <Route
          path="/courses"
          element={
            <>
              <Header />
              <Header1 />
              <Courses />
              <Footer />
            </>
          }
        />
        <Route
          path="/tools"
          element={
            <>
              <Header />
              <Header1 />
              <Tools />
              <Footer />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Signup />
            </>
          }
        />
        <Route
          path="/coursesdetail"
          element={
            <>
              <Header />
              <Header1 />
              <Coursesdetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/content/:id"
          element={
            <>
              <Header />
              <Header1 />
              <Content />
              <Footer />
            </>
          }
        />
        <Route
          path="/asin-code"
          element={
            <>
              <Header />
              <Header1 />
              <Asin />
              <Footer />
            </>
          }
        />
        <Route
          path="/product-search"
          element={
            <>
              <Header />
              <Header1 />
              <Product />
              <Footer />
            </>
          }
        />
        <Route
          path="/asin-details"
          element={
            <>
              <Header />
              <Header1 />
              <Asindetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/product-details"
          element={
            <>
              <Header />
              <Header1 />
              <Productdetails />
              <Footer />
            </>
          }
        />

        <Route
          path="/Plans"
          element={
            <>
              <Header />
              <Header1 />
              <Plan />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
