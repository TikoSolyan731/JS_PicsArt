

# PicsArt Project

My PicsArt project


## Configuring Project

To run the project you need to

1. Install the dependencies

```bash
npm install 
```

2. Run the application

```bash
npm start
```

## Project Settings

```dotenv
PORT=3001
HOST=127.0.0.1
DB_URI=mongodb+srv://user123:testpassword@cluster0.eyluv.mongodb.net/db1?retryWrites=true&w=majority
JWT_SECRET=hndkahav
```

## Description

```text
EP - /users
METHOD - GET
QUERY PARAMS - username, limit, offset
DESCRIPTION - Get all users

---

EP - users/:user_id
METHOD - GET
PATH PARAMS - user_id
DESCRIPTION- Get user by user id

---

EP - /users
METHOD - POST
REQ BODY - user_schema
DESCRIPTION - Create a new user and save it in the DB

---

EP - /users/:user_id
METHOD - PUT
PATH PARAMS - user_id
REQ BODY - user_schema
DESCRIPTION - Update a user by user id

---

EP - /users/:user_id
METHOD - DELETE
PATH PARAMS - user_id
DESCRIPTION - Delete a user by user id

---

EP - /users/:user_id/posts
METHOD - GET
PATH PARAMS - user_id
QUERY PARAMS - search, limit, offset
DESCRIPTION - Get a user's all posts

---

EP - /users/:user_id/posts
METHOD - POST
PATH PARAMS - user_id
REQ BODY - post_schema
DESCRIPTION - Create a post for user with user id

---

EP - /users/:user_id/posts/:post_id
METHOD - GET
PATH PARAMS - user_id, post_id
DESCRIPTION - Get a post from user by post_id

---

EP - /users/:user_id/posts/:post_id
METHOD - PUT
PATH PARAMS - user_id, post_id
REQ BODY - post_schema
DESCRIPTION - Update a post from user by post_id

---

EP - /users/:user_id/posts/:post_id
METHOD - DELETE
PATH PARAMS - user_id, post_id
DESCRIPTION - Delete a post from user by post_id

---

EP - /posts/all
METHOD - GET
QUERY PARAMS - search, limit, offset
DESCRIPTION - Get all posts sorted by last created
```