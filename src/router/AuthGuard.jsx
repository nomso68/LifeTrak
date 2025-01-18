import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthGuard = ({ children, isDataAnalystRoute = false }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // If the user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If it's a data analyst route, check if the correct code is entered
  if (isDataAnalystRoute) {
    const handleCodeSubmit = async (e) => {
      e.preventDefault();
      const secretCode = code;

      // Send the code to the backend in the request headers
      try {
        const response = await fetch(
          "https://lifetrak.onrender.com/api/health-stats",
          {
            method: "GET", // Use GET to align with your backend route
            headers: {
              "Content-Type": "application/json",
              "x-analytics-code": secretCode, // Send the secret code in the headers
            },
          }
        );

        if (response.ok) {
          alert("Successful"); // Inform the user that the code is correct
          // If the code is valid, allow access to the page
          navigate("/health-stats"); // Redirect to the health stats page
        } else {
          setError("Invalid code. Access denied.");
        }
      } catch (error) {
        console.error("Error during code validation:", error);
        setError("An error occurred. Please try again.");
      }
    };

    // If the route is for data analysts, show a code input
    return (
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleCodeSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Analyst Code"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  // If no special route, render the child component
  return children;
};

export default AuthGuard;
