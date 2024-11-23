import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Title from "../components/form/Title";
import Subtitle from "../components/form/SubTitle";
import BtnGoogle from "../components/form/BtnGoogle";
import "../components/styles.css";
import EyeOff from "../assets/mdi_eye-off.png";
import loginStore from "../stores/useLoginStore";

const Login = () => {
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const {
    userName,
    email,
    password,
    setUserName,
    setEmail,
    setPassword,
    login,
  } = loginStore();

  const validateForm = () => {
    let valid = true;
    let newErrors = { userName: "", email: "", password: "" };

    if (!userName) {
      newErrors.userName = "Username harus diisi!";
      valid = false;
    }

    if (!email) {
      newErrors.email = "Email harus diisi!";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password harus diisi!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (login()) {
        toast.success("Login berhasil!");
        navigate("/");
      } else {
        toast.error("Email atau Password anda salah!");
      }
    } else {
      toast.error("Mohon lengkapi semua data!");
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <Header />
      <div className="template d-flex justify-content-center align-items-center align-self-center">
        <div className="form_container p-4 my-4 bg-white border rounded">
          <Title title="Masuk ke Akun" />
          <Subtitle subtitle="Yuk, lanjutin belajarmu di videobelajar" />
          <form
            id="login"
            name="login"
            onSubmit={handleLogin}
            onKeyDown={handleEnterPress}
          >
            <div className="mb-2">
              <label htmlFor="userName" className="text-secondary DM_Sans fs-6">
                Username
                <span className="text-danger fs-6 ms-1">*</span>
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter Username"
                className="DM_Sans form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {errors.userName && (
                <p className="text-danger fs-6">{errors.userName}</p>
              )}
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="text-secondary DM_Sans fs-6">
                E-mail
                <span className="text-danger fs-6 ms-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                className="DM_Sans form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-danger fs-6">{errors.email}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="text-secondary DM_Sans fs-6">
                Password
                <span className="text-danger fs-6 ms-1">*</span>
              </label>
              <div className="input_field border rounded d-flex">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="DM_Sans border-0 fs-6 form-control password"
                />
                <img
                  src={EyeOff}
                  className="passwordVisibleIcon d-flex justify-content-center align-items-center align-self-center me-2 h-50 cursor-pointer"
                  onClick={togglePasswordVisibility}
                  alt="Toggle Password Visibility"
                />
              </div>
              {errors.password && (
                <p className="text-danger fs-6">{errors.password}</p>
              )}
            </div>

            <p className="text-end mt-2">
              <a
                href="#"
                className="text-decoration-none fw-medium text-secondary"
              >
                Lupa Password?
              </a>
            </p>

            <div className="d-grid mt-2">
              <button
                type="submit"
                className="btn-first btn border-0 p-2 rounded"
              >
                Masuk
              </button>
            </div>

            <div className="d-grid mt-2">
              <button
                type="button"
                className="btn-second btn border-0 p-2 rounded"
                onClick={() => navigate("/register")}
              >
                Daftar
              </button>
            </div>

            <p className="text-center text-secondary my-2">atau</p>
            <BtnGoogle className="btn-google" keyword="Masuk dengan Google" />
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;