from fastapi import FastAPI
from app.api import users, s3, db
from app.core.config import settings

app = FastAPI(title="CortexCraft Backend", version="1.0.0")

# Register routes
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(s3.router, prefix="/s3", tags=["S3"])
app.include_router(db.router, prefix="/db", tags=["Database"])

@app.get("/")
def root():
    return {"message": "Welcome to CortexCraft Backend"}
