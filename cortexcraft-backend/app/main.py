from fastapi import FastAPI
from app.routers import requirements, planning
from app.config import settings

app = FastAPI(
    title="CortexCraft",
    description="SDLC Automation Platform Backend",
    version="1.0.0"
)

# Include routers
app.include_router(requirements.router, prefix="/api/requirements", tags=["Requirements"])
app.include_router(planning.router, prefix="/api/planning", tags=["Planning"])

@app.get("/")
def read_root():
    return {"message": "Welcome to CortexCraft API!"}
