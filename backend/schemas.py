from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class IngredientBase(BaseModel):
    item: str
    quantity: str
    notes: Optional[str] = None
    price: float
    currency: str

class IngredientCreate(IngredientBase):
    pass

class Ingredient(IngredientBase):
    id: int

    class Config:
        orm_mode = True

class RecipeBase(BaseModel):
    title: str
    prep_time: str
    cook_time: str
    servings: int
    instructions: str
    nutrition_facts: Optional[str] = None
    total_cost: float

class RecipeCreate(RecipeBase):
    ingredients: List[IngredientCreate]

class Recipe(RecipeBase):
    id: int
    user_id: int
    ingredients: List[Ingredient]

    class Config:
        orm_mode = True

class FavoriteBase(BaseModel):
    user_id: int
    recipe_id: int

class FavoriteCreate(FavoriteBase):
    pass

class Favorite(FavoriteBase):
    id: int

    class Config:
        orm_mode = True

class CommentBase(BaseModel):
    content: str
    user_id: int
    recipe_id: int

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int

    class Config:
        orm_mode = True
