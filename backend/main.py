from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Recipe as RecipeModel
from schemas import Recipe, RecipeCreate
from typing import List

app = FastAPI()

@app.get("/recipes/", response_model=List[Recipe])
async def get_recipes(db: Session = Depends(get_db)):
    recipes = db.query(RecipeModel).all()
    return recipes

@app.get("/recipes/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(RecipeModel).filter(RecipeModel.id == recipe_id).first()
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe
