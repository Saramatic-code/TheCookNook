from pydantic import BaseModel

class RecipeBase(BaseModel):
    name: str
    prep_time: int
    cook_time: int
    servings: int
    instructions: str
    nutrition_facts: str

class RecipeCreate(RecipeBase):
    pass

class Recipe(RecipeBase):
    id: int

    class Config:
        orm_mode = True
