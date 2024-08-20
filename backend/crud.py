from sqlalchemy.orm import Session
from . import models, schemas
from .security import get_password_hash, verify_password

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

# CRUD operations for recipes
def get_recipes(db: Session, user_id: int):
    return db.query(models.Recipe).filter(models.Recipe.user_id == user_id).all()

def create_recipe(db: Session, recipe: schemas.RecipeCreate, user_id: int):
    db_recipe = models.Recipe(**recipe.dict(), user_id=user_id)
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

# CRUD operations for ingredients
def get_ingredients(db: Session):
    return db.query(models.Ingredient).all()

def create_ingredient(db: Session, ingredient: schemas.IngredientCreate):
    db_ingredient = models.Ingredient(**ingredient.dict())
    db.add(db_ingredient)
    db.commit()
    db.refresh(db_ingredient)
    return db_ingredient

# CRUD operations for favorites
def add_favorite(db: Session, favorite: schemas.FavoriteCreate):
    db_favorite = models.Favorite(**favorite.dict())
    db.add(db_favorite)
    db.commit()
    db.refresh(db_favorite)
    return db_favorite

# CRUD operations for comments
def add_comment(db: Session, comment: schemas.CommentCreate):
    db_comment = models.Comment(**comment.dict())
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment
