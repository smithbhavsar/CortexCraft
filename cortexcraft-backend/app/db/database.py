# app/db/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings  # Assuming your DB URL is stored here

DATABASE_URL = settings.DATABASE_URL

# Create engine and session factory
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})  # Only required for SQLite, remove if using PostgreSQL
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all models
Base = declarative_base()
