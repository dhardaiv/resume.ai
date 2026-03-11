"""App configuration from environment."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    embedding_model_id: str = "sentence-transformers/all-MiniLM-L6-v2"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
