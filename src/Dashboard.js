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

  console.log("Project Details for task breakdown:", projectDetails.task_breakdown);

  const handleInputChange = (section, index, key, value) => {
    setEditedDetails((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
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

      {/* Business Rules Section */}
      <section className="details-section">
        <h2 className="section-title">Business Rules</h2>
        <table className="details-table">
          <thead>
            <tr>
              <th>Rule</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projectDetails.business_rules.map((rule, index) => (
              <tr key={index}>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedDetails.business_rules[index].rule}
                      onChange={(e) => handleInputChange("business_rules", index, "rule", e.target.value)}
                    />
                  ) : (
                    rule.rule
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      value={editedDetails.business_rules[index].status}
                      onChange={(e) => handleInputChange("business_rules", index, "status", e.target.value)}
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  ) : (
                    <span className={`status ${rule.status.toLowerCase().replace(" ", "-")}`}>
                      {rule.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* User Stories Section */}
      <section className="details-section">
        <h2 className="section-title">User Stories</h2>
        <table className="details-table">
          <thead>
            <tr>
              <th>Story</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projectDetails.user_stories.map((story, index) => (
              <tr key={index}>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedDetails.user_stories[index].story}
                      onChange={(e) => handleInputChange("user_stories", index, "story", e.target.value)}
                    />
                  ) : (
                    story.story
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      value={editedDetails.user_stories[index].status}
                      onChange={(e) => handleInputChange("user_stories", index, "status", e.target.value)}
                    >
                      <option value="To-Do">To-Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    <span className={`status ${story.status.toLowerCase().replace(" ", "-")}`}>
                      {story.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Task Breakdown Section */}
      <section className="details-section">
        <h2 className="section-title">Task Breakdown</h2>
        <table className="details-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projectDetails.task_breakdown.map((taskObj, index) => {
              let taskData;
              try {
                taskData = JSON.parse(taskObj.task); // Handle structured tasks
              } catch (error) {
                taskData = { Task: taskObj.task, "Sub-Tasks": [] }; // Handle simple tasks
              }

              return (
                <React.Fragment key={index}>
                  <tr>
                    <td rowSpan={taskData["Sub-Tasks"]?.length ? taskData["Sub-Tasks"].length + 1 : 1}>
                      {isEditing ? (
                        <input
                          type="text"
                          value={taskData.Task} // ✅ Fixed: Using `taskData.Task` instead of undefined `Tasks`
                          onChange={(e) => handleInputChange("task_breakdown", index, "task", e.target.value)}
                        />
                      ) : (
                        taskData.Task // ✅ Fixed
                      )}
                    </td>

                    {taskData["Sub-Tasks"]?.length > 0 ? (
                      <>
                        <td>{taskData["Sub-Tasks"][0]}</td>
                        <td>
                          {isEditing ? (
                            <select
                              value={taskObj.status?.[0] || "To-Do"} // ✅ Fixed: Ensure safe access using optional chaining
                              onChange={(e) => handleInputChange("task_breakdown", index, "status", e.target.value, 0)}
                            >
                              <option value="To-Do">To-Do</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          ) : (
                            <span className={`status ${taskObj.status?.[0]?.toLowerCase().replace(" ", "-")}`}>
                              {taskObj.status?.[0]}
                            </span>
                          )}
                        </td>
                      </>
                    ) : (
                      <td colSpan="2">
                        {isEditing ? (
                          <select
                            value={taskObj.status || "To-Do"}
                            onChange={(e) => handleInputChange("task_breakdown", index, "status", e.target.value)}
                          >
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        ) : (
                          <span className={`status ${taskObj.status?.toLowerCase().replace(" ", "-")}`}>
                            {taskObj.status}
                          </span>
                        )}
                      </td>
                    )}
                  </tr>

                  {taskData["Sub-Tasks"]?.slice(1).map((subTask, subIndex) => (
                    <tr key={`${index}-${subIndex}`}>
                      <td>{subTask}</td>
                      <td>
                        {isEditing ? (
                          <select
                            value={taskObj.status?.[subIndex + 1] || "To-Do"} // ✅ Fixed
                            onChange={(e) => handleInputChange("task_breakdown", index, "status", e.target.value, subIndex + 1)}
                          >
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        ) : (
                          <span className={`status ${taskObj.status?.[subIndex + 1]?.toLowerCase().replace(" ", "-")}`}>
                            {taskObj.status?.[subIndex + 1]}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </section>


      {/* Edit Buttons */}
      <div className="edit-buttons">
        {isEditing ? (
          <>
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button
              className="cancel-button"
              onClick={() => {
                setEditedDetails(projectDetails);
                setIsEditing(false);
              }}
            >
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