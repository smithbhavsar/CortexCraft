from sqlalchemy import Column, Integer, String
from app.db.database import Base


class Requirement(Base):
    __tablename__ = "requirements"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String, index=True)
    goals = Column(String)
    constraints = Column(String)
    stakeholders = Column(String)
    timelines = Column(String)

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    task_name = Column(String)
    description = Column(String)
    assignee = Column(String)
    timeline = Column(String)