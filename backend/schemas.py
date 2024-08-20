from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class RecipeBase(BaseModel):
    name: str
    prep_time: int
    cook_time: int
    servings: int
    instructions: str
    nutrition_facts: str

class RecipeCreate(RecipeBase):
    ingredients: list

class Recipe(RecipeBase):
    id: int
    user_id: int
    ingredients: list

    class Config:
        orm_mode = True

class IngredientBase(BaseModel):
    name: str
    quantity: str

class IngredientCreate(IngredientBase):
    pass

class Ingredient(IngredientBase):
    id: int

    class Config:
        orm_mode = True
