import os
from dotenv import load_dotenv
from fastapi import FastAPI
from .database import engine
from . import models

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")

app = FastAPI()

models.Base.metadata.create_all(bind=engine)
