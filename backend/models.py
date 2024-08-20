from sqlalchemy import Column, Integer, String, ForeignKey, Float, Table, Text
from sqlalchemy.orm import relationship
from .database import Base

# Association table for many-to-many relationship between Recipe and Ingredient
recipe_ingredient = Table(
    'recipe_ingredient', Base.metadata,
    Column('recipe_id', Integer, ForeignKey('recipes.id')),
    Column('ingredient_id', Integer, ForeignKey('ingredients.id'))
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    recipes = relationship("Recipe", back_populates="owner")
    favorites = relationship("Favorite", back_populates="user")
    comments = relationship("Comment", back_populates="user")

class Recipe(Base):
    __tablename__ = "recipes"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    prep_time = Column(String)
    cook_time = Column(String)
    servings = Column(Integer)
    instructions = Column(Text)
    nutrition_facts = Column(Text)
    total_cost = Column(Float)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="recipes")
    ingredients = relationship("Ingredient", secondary=recipe_ingredient, back_populates="recipes")
    favorites = relationship("Favorite", back_populates="recipe")
    comments = relationship("Comment", back_populates="recipe")

class Ingredient(Base):
    __tablename__ = "ingredients"
    id = Column(Integer, primary_key=True, index=True)
    item = Column(String, index=True)
    quantity = Column(String)
    notes = Column(String)
    price = Column(Float)
    currency = Column(String)

    recipes = relationship("Recipe", secondary=recipe_ingredient, back_populates="ingredients")

class Favorite(Base):
    __tablename__ = "favorites"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    recipe_id = Column(Integer, ForeignKey("recipes.id"))

    user = relationship("User", back_populates="favorites")
    recipe = relationship("Recipe", back_populates="favorites")

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id"))
    recipe_id = Column(Integer, ForeignKey("recipes.id"))

    user = relationship("User", back_populates="comments")
    recipe = relationship("Recipe", back_populates="comments")
