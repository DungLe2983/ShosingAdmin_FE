import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../services/loginService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      const decodedToken = jwtDecode(data.token);
      const userRole = decodedToken.role; // Adjust according to your token structure

      if (userRole === "admin") {
        // Lưu token hoặc xử lý response tùy theo API của bạn
        localStorage.setItem("token", data.token);
        navigate("/"); // Chuyển hướng sau khi đăng nhập thành công
      } else {
        setError(
          "You are not authorized to access this page. Please log in with an admin account."
        );
      }
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full p-8 space-y-6 bg-white rounded shadow-md md:max-w-lg lg:max-w-xl pb-20'>
        <h2 className='text-heading2-bold text-center'>Login</h2>
        {error && (
          <div className='p-3 text-sm text-red-600 bg-red-100 rounded'>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className='space-y-4 py-10'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email:
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200'
              placeholder='Enter your email'
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password:
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200'
              placeholder='Enter your password'
              required
              disabled={loading}
            />
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 disabled:bg-indigo-400'
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
