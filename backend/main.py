from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/recipes/")
def create_recipe(recipe: models.Recipe, db: Session = Depends(get_db)):
    return crud.create_recipe(db=db, recipe=recipe)

@app.get("/recipes/{recipe_id}")
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = crud.get_recipe(db=db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return db_recipe

@app.put("/recipes/{recipe_id}")
def update_recipe(recipe_id: int, updated_recipe: models.Recipe, db: Session = Depends(get_db)):
    db_recipe = crud.get_recipe(db=db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db_recipe.name = updated_recipe.name
    db_recipe.prep_time = updated_recipe.prep_time
    db_recipe.cook_time = updated_recipe.cook_time
    db_recipe.servings = updated_recipe.servings
    db_recipe.instructions = updated_recipe.instructions
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

@app.delete("/recipes/{recipe_id}")
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = crud.get_recipe(db=db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    crud.delete_recipe(db=db, recipe_id=recipe_id)
    return {"message": "Recipe deleted successfully"}
