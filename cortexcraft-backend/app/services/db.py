from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def fetch_data():
    session = SessionLocal()
    try:
        result = session.execute("SELECT * FROM your_table").fetchall()
        return result
    finally:
        session.close()
