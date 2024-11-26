from pydantic import BaseSettings

class Settings(BaseSettings):
    # Database configuration
    DATABASE_URL: str = "postgresql://postgres:Vartika123@db-cortexcraft.cjua400sqzt6.us-east-1.rds.amazonaws.com:5432/db-cortexcraft"

    # AWS Configuration
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    S3_BUCKET_NAME: str = "cortex-craft-assets"

    class Config:
        env_file = ".env"

settings = Settings()
