const Library = require("./library");

const url = "mongodb://localhost:27017/";
const dbName = "library";
const collectionName = "books";

//create a new variable to 'collectiob and instantiate library'
//const collection = new Library(url, dbName, collectionName);
const libraryInstance = new Library(url, dbName, collectionName);

//async () =>  {
(async () => {
  // Find all books and print them to the console
  try {
    const allBooks = await libraryInstance.allBooks();
    allBooks.forEach((book) => console.log(book));
  } catch (error) {
    console.error("Error fetching books:", error);
  }
})();
