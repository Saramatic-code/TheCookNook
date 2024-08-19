from sqlalchemy.orm import Session
from . import models

def get_recipe(db: Session, recipe_id: int):
    return db.query(models.Recipe).filter(models.Recipe.id == recipe_id).first()

def create_recipe(db: Session, recipe: models.Recipe):
    db.add(recipe)
    db.commit()
    db.refresh(recipe)
    return recipe

def delete_recipe(db: Session, recipe_id: int):
    recipe = get_recipe(db, recipe_id)
    if recipe:
        db.delete(recipe)
        db.commit()
