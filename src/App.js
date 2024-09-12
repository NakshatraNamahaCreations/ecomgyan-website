import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Blogs from "./Components/Blogs";
import Courses from "./Components/Courses";
import Tools from "./Components/Tools";
import Login from "./Components/Login";
import Header from "./Components/Header";
import "./App.css";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import Coursesdetails from "./Components/Coursesdetails";
import Content from "./Components/Content";
import Asin from "./Components/Asin";
import Product from "./Components/Product";
import Chat from "./Components/Chat";
import Privacy from "./Components/Privacy";
import Terms from "./Components/Terms";
import Refund from "./Components/Refund";
import Chatlogin from "./Components/Chatlogin";
import Chatsignup from "./Components/Chatsignup";
import Header1 from "./Components/Header1";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Header1 /> <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
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
              <Tools />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
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
          path="/chatlogin"
          element={
            <>
              <Chatlogin />
            </>
          }
        />
        <Route
          path="/chatsignup"
          element={
            <>
              <Chatsignup />
            </>
          }
        />
        <Route
          path="/coursesdetail"
          element={
            <>
              <Header />
              <Coursesdetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <Header />
              <Chat />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/content/:id"
          element={
            <>
              <Header />
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
              <Product />
              <Footer />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <Header />
              <Privacy />
              <Footer />
            </>
          }
        />
        <Route
          path="/termsofuse"
          element={
            <>
              <Header />
              <Terms />
              <Footer />
            </>
          }
        />
        <Route
          path="/refund-policy"
          element={
            <>
              <Header />
              <Refund />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
