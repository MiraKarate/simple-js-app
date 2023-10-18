
# Simple JavaScript App (Pokédex)

## Description 

This is a small web application build with HTML, CSS, and JavaScript that loads
data from an external API and enables the viewing of data points in detail.

The application allows users to browse and search for Pokemon. The users are able to view a list of Pokémon and see more details on demand.  
Below are the technical requirements and a brief overview of the project structure.

## Key Features
+ Load data from an external source (API)
+ View a list of items
+ On user action (e.g., by clicking on a list item), view details for that item

<img width="1512" alt="Bildschirm­foto 2023-03-30 um 14 23 43" src="https://user-images.githubusercontent.com/124045048/228835766-ead3cd5f-3156-486d-8d1a-3820d50166f9.png">
<img width="1437" alt="Bildschirm­foto 2023-03-30 um 14 24 26" src="https://user-images.githubusercontent.com/124045048/228837192-e611a441-4f7f-483e-9562-0f1dfec1fb6a.png">
<img width="969" alt="Bildschirm­foto 2023-03-30 um 14 24 45" src="https://user-images.githubusercontent.com/124045048/228836704-4a9b6500-52f8-4ae5-a654-0fa407fbb054.png">


## Technical Requirements
Before running or deploying this web application, make sure you have the following prerequisites installed on your system:

**1. Web Browser:** You'll need a modern web browser (e.g., Chrome, Firefox, Edge) to view and interact with the web application.

**2. Node.js:** The application uses Node.js to manage dependencies and run development scripts. Make sure you have Node.js installed on your machine.

**3. Package Manager (npm or yarn):** You'll need a package manager like npm or yarn to install project dependencies.  


## Project Structure  
  
The project is structured as follows:  

**dist:** This directory contains the production-ready files for the web application. It includes optimized JavaScript and CSS files, as well as images.

**img:** This directory stores images used in the application. For example, the pokeball.png image is used as an icon.

**src:** This directory contains the source code for the web application.

**css:** The CSS files for styling the application. The styles.css file contains the styles used in the project.

**js:** The JavaScript files for adding functionality to the web application. The scripts.js file is the main script file, and it depends on fetch.umd.js for making network requests and promise-polyfill.js for Promise support.

**.eslintrc.js:** This is the configuration file for ESLint, a code linter for JavaScript. It enforces code style and conventions.  

    
## Getting Started  
  
To run the project locally, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/pokemon-web-app.git


2. Navigate to the project directory:

```bash
cd pokemon-web-app


3. Install project dependencies:

```bash
npm install

  
4. Start the development server:

```bash
npm start

  
5. Open your web browser and go to http://localhost:3000 to access the application.

6. Explore the application and make any necessary customizations or enhancements to suit your needs.
