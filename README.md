# Healthy Recipe App
## _Your Go-To App for Healthy Recipes_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

The Healthy Recipe App is a cloud-enabled, mobile-ready, and offline-storage compatible full-stack web application that allows users to create, read, update, and delete recipes. It is built using **FastAPI** for the backend, **PostgreSQL** for the database, and **React** with **Next.js** and **Tailwind CSS** for the frontend.

- Type in your favorite recipes
- Store them securely in the cloud
- ✨Magic ✨

## Features

- **CRUD Operations**: Users can create, view, update, and delete recipes.
- **PostgreSQL Database**: Recipes and related data are stored securely in a PostgreSQL database.
- **FastAPI Backend**: A robust and fast backend API built with FastAPI.
- **React Frontend**: A dynamic and responsive frontend built with React and Next.js.
- **Tailwind CSS**: For styling the frontend, making the UI visually appealing and responsive.
- **Next.js**: Server-side rendering for improved performance and SEO.

## Tech

The Healthy Recipe App uses a number of open-source projects to work properly:

- [FastAPI](https://fastapi.tiangolo.com/) - Modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org/docs) - The React Framework for Production.
- [Tailwind CSS](https://tailwindcss.com/docs) - A utility-first CSS framework packed with classes like flex, pt-4, text-center, and rotate-90 that can be composed to build any design, directly in your markup.
- [PostgreSQL](https://www.postgresql.org/) - The world’s most advanced open-source relational database.
- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.

And of course, the Healthy Recipe App itself is open source with a [public repository](https://github.com/Saramatic/Healthy-Recipe-App) on GitHub.

## Installation

Healthy Recipe App requires [Node.js](https://nodejs.org/) v10+ and [Python 3.x](https://www.python.org/) to run.

Clone the repository, install the dependencies, and start the server.

1. **Clone the Repository**

    ```bash
    git clone https://github.com/Saramatic/Healthy-Recipe-App.git
    cd Healthy-Recipe-App
    ```

2. **Backend Setup**

    Navigate to the backend directory:

    ```bash
    cd backend
    ```

    Create a virtual environment and activate it:

    ```bash
    python3 -m venv env
    source env/bin/activate  # On Windows: .\env\Scripts\activate
    ```

    Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

    Set up the PostgreSQL database and apply migrations:

    ```bash
    psql -U postgres
    CREATE DATABASE recipe_db;
    alembic upgrade head
    ```

    Run the FastAPI server:

    ```bash
    uvicorn main:app --reload
    ```

3. **Frontend Setup**

    Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

    Install the required Node.js packages:

    ```bash
    npm install
    ```

    Run the React development server:

    ```bash
    npm run dev
    ```

## Docker

The Healthy Recipe App is easy to install and deploy in a Docker container.

By default, Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

cd Healthy-Recipe-App

    docker build -t <youruser>/healthy-recipe-app:${package.json.version} .

This will create the Healthy Recipe App image and pull in the necessary dependencies. Be sure to swap out ${package.json.version} with the actual version of the app.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):


    docker run -d -p 8000:8080 --restart=always --cap-add=SYS_ADMIN --name=healthy-recipe-app <youruser>/healthy-recipe-app:${package.json.version}

   Note: --cap-add=SYS-ADMIN is required for certain functionalities.


Verify the deployment by navigating to your server address in your preferred browser.

    127.0.0.1:8000
    
 License
MIT

Free Software, Hell Yeah!


### Key Improvements:
- **Docker Section**: All Docker-related information, including the Docker build and run commands, is consolidated under the "Docker" section.
- **Flow Continuity**: The previously separate paragraphs about building the Docker image, running it, and verifying the deployment are now seamlessly integrated.
- **Proper Code Block Usage**: Commands and code snippets are properly formatted within code blocks for clarity.

This version should now include all the relevant information in the correct order and formatting, making it easy to read and understand within a single markdown file.
