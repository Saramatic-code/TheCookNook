# schemas.py

from typing import Optional, List
from pydantic import BaseModel

# Base schema for Recipe
class RecipeBase(BaseModel):
    title: str
    image: Optional[str] = None
    prep_time_value: Optional[int] = None
    prep_time_unit: Optional[str] = None
    cook_time_value: Optional[int] = None
    cook_time_unit: Optional[str] = None
    servings: Optional[int] = None
    total_cost: Optional[float] = None
    currency: Optional[str] = None
    nutrition_facts: Optional[dict] = None

# Schema for Recipe creation
class RecipeCreate(RecipeBase):
    pass

# Full schema for Recipe with additional fields
class Recipe(RecipeBase):
    id: int

    class Config:
        orm_mode = True

# User schema base
class UserBase(BaseModel):
    username: str
    email: str
    profile_description: Optional[str] = None
    phone_number: Optional[str] = None
    profile_image: Optional[str] = None
    receive_sms_notifications: Optional[bool] = True
    profile_visibility: Optional[str] = 'public'

# User schema for creation
class UserCreate(UserBase):
    password: str

# Full schema for User with additional fields
class User(UserBase):
    id: int
    created_at: Optional[str]
    updated_at: Optional[str]

    class Config:
        orm_mode = True
