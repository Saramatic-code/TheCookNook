from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from .database import Base

class Recipe(Base):
    __tablename__ = "recipes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    prep_time = Column(Integer)
    cook_time = Column(Integer)
    servings = Column(Integer)
    instructions = Column(String)
    nutrition_facts = Column(String)  # Could be JSON if desired

class Ingredient(Base):
    __tablename__ = "ingredients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    quantity = Column(String)
    recipe_id = Column(Integer, ForeignKey("recipes.id"))
