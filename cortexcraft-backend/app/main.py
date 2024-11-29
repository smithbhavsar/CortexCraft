from fastapi import FastAPI
from app.routers import requirements, planning
from app.config import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CortexCraft",
    description="SDLC Automation Platform Backend",
    version="1.0.0"
)

# Allow CORS from specific origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow only React app origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


# Include routers
app.include_router(requirements.router, prefix="/api/requirements", tags=["Requirements"])
app.include_router(planning.router, prefix="/api/planning", tags=["Planning"])

@app.get("/")
def read_root():
    return {"message": "Welcome to CortexCraft API!"}
