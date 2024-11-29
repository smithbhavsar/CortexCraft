from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.db_service import save_task

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
