
# PlayRVA

PlayRVA is an interactive app that provides information on sports facilities, leagues, and a community-driven blog section. It includes features like an interactive map, calendar, and more, designed to help users explore sports facilities and stay connected within the community.

## Key Features

- **Dashboard**: Displays a welcome message, an interactive calendar, and links to other features.
- **Explore Page**: An interactive map that shows details about various sports facilities and locations.
- **Leagues Page**: Provides information on leagues, with filters for sport, division, and age group.
- **Community Page**: A blog-like section that allows users to add posts, comment, and like others' posts.

## Technologies Used

- React
- Vite (for development and build tools)
- Sequelize (for database interaction)
- MySQL
- Font Awesome (for icons)
- Date-fns (for date manipulation)
- React Router (for routing)
- dotenv (for environment variables)

## Installation Instructions

1. Clone the repository:
   git clone https://github.com/michellegibbons15/capstoneproject-fe.git

2. Naviaget to the project directory
   cd capstoneproject-fe
   cd capstoneproject-fe (should be the folder within this repo)

3. Install dependencies - running this command will install the required dependencies into the package.json file
    npm install
 
4. Set up environment variables: Create a .env file in the root     
    directory and add necessary environment variables (e.g., API URLs, database credentials).

5. Run the development server:
    npm run dev

6. Visit the app in your browser: Open http://localhost:5173 in your browser.

**Usage Instructions**
- Login/Signup: Use the login/signup page to create or access your account.
- Dashboard: Interact with the calendar and navigate to different sections like Explore, Leagues, and Community.
- Explore Page: Use the interactive map to explore sports facilities and their details.
- Leagues Page: View all leagues and apply filters by sport, division, or age group.
- Community Page: Add your own posts or engage with others by commenting and liking posts.

**File Structure**
Here’s a general overview of the source folder structure where all the information is held:

src/
├── assets/          # Images
├── components/      # React components
├── pages/           # React pages (Dashboard, Explore, etc.)
├── routes/          # Routes
├── styles/          # Styles for each component/page
├── App.css/         # Global styling
├── App.jsx/         # Main app component, root of the app
├── index.css/       # Global styling
├── main.jsx/        # Entry point for the React app

