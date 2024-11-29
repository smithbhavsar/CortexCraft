import boto3
from botocore.exceptions import NoCredentialsError
from app.config import settings

s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
)

def upload_to_s3(file_path, bucket_name, object_name):
    try:
        s3_client.upload_file(file_path, bucket_name, object_name)
        return f"File {object_name} uploaded to bucket {bucket_name}"
    except NoCredentialsError:
        return "S3 credentials not available"
