# Books World

Books World is a web application designed for exchanging books among users. It provides a platform where users can list books they own and are willing to exchange, search for books they are interested in, and facilitate the swapping process. The project is structured into public and private sections to cater to different user functionalities.

## App Stucture

The application consists of two parts - Public (Accessible without authentication) and Private (Available for Registered Users).

### Public Part
* Home Page - Displays the search bar, all available books and showcases the three most recently added books.
* Catalog - Showcases recently added books for browsing.
* Single Book Page - Shows details about the book and comments section.
* Login Page - Allows users to log in to their accounts using email and password credentials.
* Register Page - Allows new users to create an account by providing an email, password, and password confirmation.
* About Page - Provides information about the Books World project.
* Points System (In the footer) - Explains the points system used for facilitating book exchanges.
* Delivery (In the footer) - Describes the book delivery process.
* Contacts (In the footer) - Provides my contacts.

### Private Part
* Profile Page - Shows a dashboard with Offered Books, Wishlist and users' Ordered Books.
* Offer a Book Page - Only logged in users can offer a book edit a book and delete it.
* Comments Section - Only logged in users can add comments about the book.
* Logout button

## Starting The Application
### The app can be found deployed here: https://bg-books-world.web.app
1. Enter the client folder
2. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Technologies Used
* Frontend: HTML, CSS, JavaScript, Bootstrap
* Database: Firestore Database
* Framework: Angular
* Hosting: Firebase
