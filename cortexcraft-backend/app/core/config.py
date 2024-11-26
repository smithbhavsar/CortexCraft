from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "CortexCraft"
    aws_access_key_id: str
    aws_secret_access_key: str
    s3_bucket_name: str
    database_url: str

    class Config:
         env_file = "../.env"

settings = Settings()
