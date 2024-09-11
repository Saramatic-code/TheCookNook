from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)  # Explicitly set autoincrement
    username = Column(String(255), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    profile_description = Column(Text, nullable=True)
    phone_number = Column(String(15), nullable=True)
    profile_image = Column(String(255), nullable=True)
    receive_sms_notifications = Column(Boolean, default=True)
    profile_visibility = Column(String(10), default='public')
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)  # Explicitly set autoincrement
    title = Column(String(255), nullable=False)
    image = Column(String(255), nullable=True)
    prep_time_value = Column(Integer, nullable=True)
    prep_time_unit = Column(String(10), nullable=True)
    cook_time_value = Column(Integer, nullable=True)
    cook_time_unit = Column(String(10), nullable=True)
    servings = Column(Integer, nullable=True)
    total_cost = Column(Float, nullable=True)
    currency = Column(String(3), nullable=True)
    nutrition_facts = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

# Add more models for ingredients, categories, etc. as needed
