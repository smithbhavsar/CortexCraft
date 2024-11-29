from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.db_service import save_task, get_all_tasks

router = APIRouter()

class Task(BaseModel):
    task_name: str
    description: str
    assignee: str
    timeline: str

@router.post("/tasks")
async def create_task(task: Task):
    try:
        result = save_task(task)
        return {"message": "Task created successfully", "task": task}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/tasks")
async def get_tasks():
    try:
        tasks = get_all_tasks()  # Function to fetch all tasks
        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

