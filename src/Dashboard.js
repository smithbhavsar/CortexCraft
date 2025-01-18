import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState(null);

  const { userInput, projectDetails: initialProjectDetails } = location.state || {};

  useEffect(() => {
    if (initialProjectDetails) {
      // If project details are already passed, use them
      setProjectDetails(initialProjectDetails);
      setLoading(false);
    } else if (userInput) {
      // Fetch project details based on userInput if not passed
      const fetchProjectDetails = async () => {
        try {
          const response = await axios.post("http://127.0.0.1:5000/get-project-details", {
            user_input: userInput,
          });

          if (response.data && !response.data.error) {
            setProjectDetails(response.data);
          } else {
            console.log("Project not found");
          }
        } catch (error) {
          console.error("Error fetching project details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProjectDetails();
    } else {
      navigate("/error"); // Redirect if no userInput or projectDetails
    }
  }, [userInput, initialProjectDetails, navigate]);

  if (loading) {
    return <div>Loading project details...</div>;
  }

  if (!projectDetails) {
    return <div>No project details found.</div>;
  }

  const { project_scope, business_rules, user_stories, task_breakdown } = projectDetails;

  console.log("Project Details:", project_scope, business_rules, user_stories, task_breakdown);

  const renderTaskBreakdown = () => {
    if (Array.isArray(task_breakdown) && typeof task_breakdown[0] === "string") {
      return (
        <ul className="details-list">
          {task_breakdown.map((task, index) => (
            <li key={index} className="detail-item">
              {task}
            </li>
          ))}
        </ul>
      );
    } else if (Array.isArray(task_breakdown)) {
      return task_breakdown.map((task, index) => {
        const subTasksKey = Object.keys(task).find(
          (key) => key.toLowerCase() === "sub-tasks"
        );

        return (
          <div key={index} className="task-container">
            <h3 className="task-title">{task.Task}</h3>
            {subTasksKey && Array.isArray(task[subTasksKey]) ? (
              <ul className="details-list">
                {task[subTasksKey].map((subtask, subtaskIndex) => (
                  <li key={subtaskIndex} className="detail-item">
                    {subtask}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No subtasks available.</p>
            )}
          </div>
        );
      });
    } else {
      return <p>No task breakdown available.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      {project_scope ? (
        <>
          <header className="dashboard-header">
            <h1>{project_scope.Title}</h1>
            <p>{project_scope.Description}</p>
          </header>

          <section className="details-section">
            <h2 className="section-title">Business Rules</h2>
            {business_rules && business_rules.length > 0 ? (
              <ul className="details-list">
                {business_rules.map((rule, index) => (
                  <li key={index} className="detail-item">
                    {rule}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No business rules found.</p>
            )}
          </section>

          <section className="details-section">
            <h2 className="section-title">User Stories</h2>
            {user_stories && user_stories.length > 0 ? (
              <ul className="details-list">
                {user_stories.map((story, index) => (
                  <li key={index} className="detail-item">
                    {story}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No user stories found.</p>
            )}
          </section>

          <section className="details-section">
            <h2 className="section-title">Task Breakdown</h2>
            {renderTaskBreakdown()}
          </section>
        </>
      ) : (
        <div>No project scope available.</div>
      )}
    </div>
  );
}

export default Dashboard;
