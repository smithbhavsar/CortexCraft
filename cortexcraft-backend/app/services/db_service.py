# from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData
# from app.config import settings
# import logging

# logging.basicConfig(level=logging.INFO)

# DATABASE_URL = settings.DATABASE_URL

# # Set up database engine
# engine = create_engine(DATABASE_URL)
# metadata = MetaData()

# # Define tables
# requirements_table = Table(
#     "requirements", metadata,
#     Column("id", Integer, primary_key=True),
#     Column("project_name", String),
#     Column("goals", String),
#     Column("constraints", String),
#     Column("stakeholders", String),
#     Column("timelines", String)
# )

# tasks_table = Table(
#     "tasks", metadata,
#     Column("id", Integer, primary_key=True, autoincrement=True),
#     Column("task_name", String, nullable=False),
#     Column("description", String, nullable=True),
#     Column("assignee", String, nullable=True),
#     Column("timeline", String, nullable=True)
# )

# # Create tables
# metadata.create_all(engine)

# # Insert example
# def save_requirement(requirement):
#     with engine.connect() as conn:
#         result = conn.execute(
#             requirements_table.insert().values(
#                 project_name=requirement.project_name,
#                 goals=";".join(requirement.goals),
#                 constraints=";".join(requirement.constraints),
#                 stakeholders=";".join(requirement.stakeholders),
#                 timelines=requirement.timelines
#             )
#         )
#         return result.inserted_primary_key
    
# def save_task(task):
#     with engine.connect() as conn:
#         result = conn.execute(
#             tasks_table.insert().values(
#                 task_name=task.task_name,
#                 description=task.description,
#                 assignee=task.assignee,
#                 timeline=task.timeline
#             )
#         )
#         logging.info(f"Task saved with ID: {result.inserted_primary_key}")
#         return result.inserted_primary_key


from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData
from app.config import settings
import logging

logging.basicConfig(level=logging.INFO)

DATABASE_URL = settings.DATABASE_URL

# Set up database engine
engine = create_engine(DATABASE_URL)
metadata = MetaData()

# Define tables
requirements_table = Table(
    "requirements", metadata,
    Column("id", Integer, primary_key=True),
    Column("project_name", String),
    Column("goals", String),
    Column("constraints", String),
    Column("stakeholders", String),
    Column("timelines", String)
)

tasks_table = Table(
    "tasks", metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("task_name", String, nullable=False),
    Column("description", String, nullable=True),
    Column("assignee", String, nullable=True),
    Column("timeline", String, nullable=True)
)

# Create tables
metadata.create_all(engine)

# Insert example
def save_requirement(requirement):
    with engine.connect() as conn:
        with conn.begin():
            result = conn.execute(
                requirements_table.insert().values(
                project_name=requirement.project_name,
                goals=requirement.goals,
                constraints=requirement.constraints,
                stakeholders=requirement.stakeholders,
                timelines=requirement.timelines
            )
        )
        # return the inserted ID for the response
        return result.inserted_primary_key[0]

# Insert example
def save_task(task):
    with engine.connect() as conn:
        with conn.begin():
            result = conn.execute(
                tasks_table.insert().values(
                    task_name=task.task_name,
                    description=task.description,
                    assignee=task.assignee,
                    timeline=task.timeline
                )
            )
            logging.info(f"Task saved with ID: {result.inserted_primary_key}")
            return result.inserted_primary_key
