from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.db_service import save_task, get_all_tasks, get_task_by_id

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

@router.get("/tasks/{task_id}", response_model=Task)
async def get_task(task_id: int):
    try:
        task = get_task_by_id(task_id)  # Fetch a single task from DB by ID
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        return task
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
