import React, { useState } from "react";

interface SignUpProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log("Form is valid. Submitting:", formData);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("Sign up successful!");
        onClose();
      } catch (error) {
        console.error("Sign up failed:", error);
        alert("Sign up failed. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-n-8/50 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 space-y-8 bg-n-7 rounded-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-n-3 hover:text-n-1"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center text-n-1">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-n-3"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 text-n-1 bg-n-6 border border-n-5 rounded-lg focus:ring-primary-purple focus:border-primary-purple"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-n-3"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 text-n-1 bg-n-6 border border-n-5 rounded-lg focus:ring-primary-purple focus:border-primary-purple"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-n-3"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 text-n-1 bg-n-6 border border-n-5 rounded-lg focus:ring-primary-purple focus:border-primary-purple"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-primary-purple text-white py-2 px-4 rounded-lg hover:bg-primary-purple-dark focus:outline-none focus:ring-2 focus:ring-primary-purple focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-n-3">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-primary-purple hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
