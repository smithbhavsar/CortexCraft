from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.db_service import save_requirement , get_all_requirements

router = APIRouter()

class Requirement(BaseModel):
    project_name: str
    goals: list[str]
    constraints: list[str]
    stakeholders: list[str]
    timelines: str

@router.post("/")
async def create_requirement(requirement: Requirement):
    try:
        req_id = save_requirement(requirement)
        # Here, return the created requirement as a Pydantic model.
        return {**requirement.model_dump(), "id": req_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/")
async def get_requirement():
    try:
        requirements = get_all_requirements()  # Function to fetch all tasks
        return requirements
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
