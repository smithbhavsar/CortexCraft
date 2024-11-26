import boto3
from botocore.exceptions import NoCredentialsError
from app.core.config import settings

s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
)

def upload_file_to_s3(file_name: str):
    try:
        response = s3_client.upload_file(file_name, settings.S3_BUCKET_NAME, file_name)
        return response
    except NoCredentialsError:
        raise Exception("Credentials not available")
