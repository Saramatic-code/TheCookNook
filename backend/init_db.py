# init_db.py

from database import engine
from models import Base

# Create the database tables
Base.metadata.create_all(bind=engine)
print("Database tables created.")
 