from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://username:password@rds-endpoint:5432/cortexcraft_db"
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    AWS_REGION: str = "us-east-1"

    class Config:
        env_file = ".env"

settings = Settings()
