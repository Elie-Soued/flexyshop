### Overview

Flexyshop is an e-commerce application built to practice Angular and NgRx.


#### Run the application

To clone and run the frontend:

```bash
git clone https://github.com/Elie-Soued/flexyshop.git
cd flexyshop
ng serve

```

Open your browser at http://localhost:4200/ to see the app.  


#### Topics covered in this project and main highlights


##### NgRx
As mentioned, this project is centered around NgRx.
- Product data was fetched from dummyjson.com and stored in-memory using the NgRx store.
- The store manages both product inventory and the user's shopping cart.
- The store was synchronized with localStorage using ngrx-store-localstorage to persist state across sessions.


##### CI / CD
This is the first project where I implemented Continuous Integration and Continuous Deployment.
Thanks to GitHub Actions, the workflow is automated as follows when a commit is pushed to the master branch:

1. Tests are executed
2. The application is built
3. A script on the remote server is triggered, which:
- Pulls the latest code
- Builds the application
- Restarts the web server

It feels quite magical to see this all happen seamlessly.











