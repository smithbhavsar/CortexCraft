import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState(null);
  const [editedDetails, setEditedDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { userInput, projectDetails: initialProjectDetails } = location.state || {};

  useEffect(() => {
    if (initialProjectDetails) {
      setProjectDetails(initialProjectDetails);
      setEditedDetails(initialProjectDetails);
      setLoading(false);
    } else if (userInput) {
      const fetchProjectDetails = async () => {
        try {
          const response = await axios.post("http://127.0.0.1:5000/get-project-details", {
            user_input: userInput,
          });

          if (response.data && !response.data.error) {
            setProjectDetails(response.data);
            setEditedDetails(response.data);
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
      navigate("/error");
    }
  }, [userInput, initialProjectDetails, navigate]);

  if (loading) return <div>Loading project details...</div>;
  if (!projectDetails) return <div>No project details found.</div>;

  const handleInputChange = (section, value) => {
    setEditedDetails((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put("http://127.0.0.1:5000/update-project-details", {
        user_input: userInput,
        updated_data: editedDetails,
      });

      if (response.data.success) {
        setProjectDetails(editedDetails);
        setIsEditing(false);
        alert("Project details updated successfully!");
      }
    } catch (error) {
      console.error("Error updating project details:", error);
      alert("Failed to update project details.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>{projectDetails.project_scope.Title}</h1>
        <p>{projectDetails.project_scope.Description}</p>
      </header>

      <section className="details-section">
        <h2 className="section-title">Business Rules</h2>
        {isEditing ? (
          <textarea
            value={editedDetails.business_rules.join("\n")}
            onChange={(e) => handleInputChange("business_rules", e.target.value.split("\n"))}
          />
        ) : (
          <ul className="details-list">
            {projectDetails.business_rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="details-section">
        <h2 className="section-title">User Stories</h2>
        {isEditing ? (
          <textarea
            value={editedDetails.user_stories.join("\n")}
            onChange={(e) => handleInputChange("user_stories", e.target.value.split("\n"))}
          />
        ) : (
          <ul className="details-list">
            {projectDetails.user_stories.map((story, index) => (
              <li key={index}>{story}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="details-section">
        <h2 className="section-title">Task Breakdown</h2>
        {isEditing ? (
          <textarea
            value={editedDetails.task_breakdown.join("\n")}
            onChange={(e) => handleInputChange("task_breakdown", e.target.value.split("\n"))}
          />
        ) : (
          <ul className="details-list">
            {projectDetails.task_breakdown.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        )}
      </section>

      <div className="edit-buttons">
        {isEditing ? (
          <>
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button className="cancel-button" onClick={() => {
              setEditedDetails(projectDetails); // Reset changes
              setIsEditing(false); // Exit edit mode
            }}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
