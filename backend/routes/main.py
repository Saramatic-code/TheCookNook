from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@app.post("/login/")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    authenticated_user = crud.authenticate_user(db, user.username, user.password)
    if not authenticated_user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return authenticated_user

@app.get("/recipes/")
def read_recipes(db: Session = Depends(get_db), user: schemas.User = Depends(get_current_user)):
    return crud.get_recipes(db=db, user_id=user.id)

@app.post("/recipes/", response_model=schemas.Recipe)
def create_recipe(recipe: schemas.RecipeCreate, db: Session = Depends(get_db), user: schemas.User = Depends(get_current_user)):
    return crud.create_recipe(db=db, recipe=recipe, user_id=user.id)

@app.get("/ingredients/")
def read_ingredients(db: Session = Depends(get_db)):
    return crud.get_ingredients(db=db)

@app.post("/ingredients/", response_model=schemas.Ingredient)
def create_ingredient(ingredient: schemas.IngredientCreate, db: Session = Depends(get_db)):
    return crud.create_ingredient(db=db, ingredient=ingredient)
