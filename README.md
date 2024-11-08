# The Cook Nook 🍲

## Your Go-To Place for Connecting Through Recipes!

"The Cook Nook" brings families and friends together over cherished recipes, creating a digital space to preserve memories and share the joy of cooking. Established in 2024, this project preserves family history, allowing users to digitize recipes and connect over shared meals.

---

## About The Cook Nook

> "The Cook Nook" was born from a desire to preserve family traditions and memories through recipes. It allows families to store treasured recipes digitally, keeping them safe and accessible for future generations. Each recipe tells a story and connects family members, even when they're apart.

With The Cook Nook, family recipes passed down through generations, some even written in Italian, are more than just food instructions; they represent moments of togetherness and celebrations. This app ensures that these cherished memories are preserved, allowing loved ones to connect, share, and relive these experiences. The Cook Nook is more than just a recipe website; it's a place where family, friends, and food come together to create lasting bonds.

---

## Tech Stack

### Frontend

* **React** - JavaScript library for building user interfaces
* **Next.js** - Production-ready React framework
* **Tailwind CSS** - Utility-first CSS framework for rapid UI development

### Backend

* **FastAPI** - Modern, fast web framework for building APIs
* **SQLAlchemy** - Database ORM for PostgreSQL
* **Psycopg2** - PostgreSQL database adapter for Python
* **Pydantic** - Data validation library
* **Uvicorn** - ASGI server for FastAPI

---
---

##  Getting Started

### Frontend Setup

1. **Clone the Repository**:
   ```bash
   git clone 
   https://github.com/Saramatic-code/TheCookNook.git](https://github.com/Saramatic-code/TheCookNook.git)
    ```
 2. **Navigate to the Project Directory**:
    ```bash
    cd TheCookNook/src
    ```
        
3. **Install Dependencies**:
     ```bash
    npm install
    ```        
        
4.  **Run the Development Server**:
     ```bash
    npm run dev
    ```
   
5. **Open http://localhost:3000 to view the app in the browser.**

---   
##  Backend Setup

1. **Clone the Backend Repository**:
    ```bash
    git clone [https://github.com/Saramatic-code/TheCookNookBackend.git](https://github.com/Saramatic-code/TheCookNookBackend.git)
    ```
    
2. **Navigate to the Project Directory**:
    ```bash
    cd TheCookNookBackend
    ```
    
 3. **Set Up the Environment**:
    * Create a .env file in the root directory and add your database and authentication credentials.
    
4. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
    
5. **Run the Application**:
    ```bash
    uvicorn main:app --reload
    ```
    
---

## 📂 Directory Structure

### Frontend
```bash
src/
  ├── api/                   # API handling for the frontend
  ├── components/            # Reusable components like Navbar, Footer, Sidebar
  ├── pages/                 # Next.js pages for routing
  │   ├── api/               # API routes for server-side functionality
  │   ├── recipes/           # Recipe-specific pages
  │   ├── accountSettings.js # User account settings page
  │   ├── favorites.js       # Favorites page
  │   └── ...                # Other page components
  ├── styles/                # Global styles and Tailwind configuration
  └── public/                # Static assets (images, icons)
```
---

## Backend
 ```
 TheCookNookBackend/
  ├── models/                # Database models for recipes, users, favorites, etc.
  ├── routers/               # API routes for different functionalities
  │   ├── recipes.py         # Routes for recipe management
  │   ├── favorites.py       # Routes for managing favorites
  │   ├── users.py           # User account and authentication routes
  │   └── ...                # Other routes
  ├── schemas/               # Pydantic schemas for data validation
  ├── config.py              # Configuration and environment setup
  └── main.py                # Main application file
  ```
---  
## 📜 License
This project is licensed under the MIT License.

---

## 📞 Contact
If you have any questions or want to contribute, feel free to reach out via GitHub!

---

## ✨ Project History
>"The Cook Nook" was created to preserve family history and create connections through food. With recipes passed down through generations, it allows users to relive memories of cooking with loved ones. The app provides a space to store, organize, and share these recipes while offering specific permissions to protect treasured family recipes.

>Beyond its family-focused mission, The Cook Nook welcomes all who wish to share, create, and build stronger relationships through cooking. Whether you're preserving family recipes, connecting with friends, or trying new dishes with loved ones from afar, The Cook Nook enables it all with ease.

---
## Welcome to "The Cook Nook"—Let's cook, share, and build memories, one recipe at a time.

### With warm regards,
### Sarahmarie
### xoxo

![The Cook Nook Logo](public/TheCookNook.png)
# The Cook Nook 🍲

**Your Go-To Place for Connecting Through Recipes!**

"The Cook Nook" brings families and friends together over cherished recipes, creating a digital space to preserve memories and share the joy of cooking. Established in 2024, this project preserves family history, allowing users to digitize recipes and connect over shared meals.

---

