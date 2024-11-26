from fastapi import APIRouter, HTTPException
from app.services.aws_s3 import upload_file_to_s3

router = APIRouter()

@router.post("/upload")
def upload_file(file_name: str):
    try:
        response = upload_file_to_s3(file_name)
        return {"message": "File uploaded successfully", "response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))