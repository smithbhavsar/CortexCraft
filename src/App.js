import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated to use useNavigate
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [examples] = useState([
    "Develop a live stock data visualization tool.",
    "Create a chatbot application for cricket-related queries.",
    "Create a web application for a cricket auction platform.",
    "Design an AI-driven chatbot for medical sales teams.",
    "Create an online trading app",
    "Create a crypto-wallet web application",
    "Develop a live stock analysis application.",
    "Develop Facebook clone app. ",
  ]);

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return alert("Please enter a prompt!");

    // Check if the prompt is in the examples list
    if (examples.includes(prompt)) {
      // If matched, fetch the data directly from the database and render the dashboard
      try {
        const response = await axios.post("http://127.0.0.1:5000/get-project-details", {
          user_input: prompt,
        });

        // Redirect to the dashboard page with project details and user_input
        navigate("/dashboard", { state: { userInput: prompt, projectDetails: response.data } });
      } catch (error) {
        console.error("Error fetching project details:", error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      // If not in the list, send to backend for requirement generation
      setLoading(true);
      try {
        const response = await axios.post("http://127.0.0.1:5000/generate-requirements", {
          user_input: prompt,
        });

        // Redirect to dashboard with generated project details and user_input
        navigate("/dashboard", { state: { userInput: prompt, projectDetails: response.data } });
        setPrompt(""); // Clear the prompt box
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>CortexCraft.AI</h1>
        <p>Turn your app ideas into actionable project requirements.</p>
      </header>
      <main>
        <form className="prompt-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Describe your app idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="5"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Submit"}
          </button>
        </form>
        <section className="examples">
          <h2>Need inspiration? Try these:</h2>
          <ul>
            {examples.map((example, index) => (
              <li key={index} onClick={() => setPrompt(example)}>
                {example}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 CortexCraft.AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
