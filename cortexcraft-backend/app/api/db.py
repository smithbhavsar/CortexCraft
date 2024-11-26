from fastapi import APIRouter
from app.services.db import fetch_data

router = APIRouter()

@router.get("/data")
def get_data():
    data = fetch_data()
    return {"data": data}
