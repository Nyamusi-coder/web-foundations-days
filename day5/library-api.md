# Library API Design

## Endpoints

### 1. List Books
- **Method:** `GET`
- **Path:** `/books`
- **Description:** Retrieves a list of all books in the library.
- **Success Status Code:** `200 OK`

### 2. Get One Book
- **Method:** `GET`
- **Path:** `/books/:id`
- **Description:** Retrieves the details of a specific book by its ID.
- **Success Status Code:** `200 OK`

### 3. Create a Book
- **Method:** `POST`
- **Path:** `/books`
- **Description:** Adds a new book to the library's collection.
- **Example Request Body:**
  ```json
  {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "year": 1937
  }