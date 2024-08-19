from sqlalchemy import Column, Integer, String
from .database import Base

class Recipe(Base):
    __tablename__ = "recipes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    prep_time = Column(Integer)
    cook_time = Column(Integer)
    servings = Column(Integer)
    instructions = Column(String)
    ingredients = Column(String)  