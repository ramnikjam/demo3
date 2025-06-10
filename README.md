# 🍽️ Mood Recipe - Recipe Recommendations Based on Your Mood

A simple and beautiful web application that recommends recipes based on your current mood! Whether you're feeling happy, stressed, energized, or adventurous, this app will suggest the perfect recipe to match your state of mind.

## ✨ Features

- **5 Different Moods**: Happy, Comfort, Energized, Stressed, and Adventurous
- **Random Recipe Selection**: Get a different recipe each time for the same mood
- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Detailed Recipe Information**: Includes ingredients, instructions, prep time, cook time, and servings
- **Simple Navigation**: Easy to use interface with intuitive controls
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: SQLite3
- **Frontend**: HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript
- **Icons**: Font Awesome

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## 🚀 Installation & Setup

1. **Clone or download the project files**
   ```bash
   # If you're in the project directory, you're all set!
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically create and seed the SQLite database on first run

## 🎯 How to Use

1. **Select Your Mood**: Choose from one of the five mood buttons on the homepage
2. **View Recipe**: A recipe matching your mood will be displayed with full details
3. **Try Another Recipe**: Click "Try Another Recipe" to get a different recipe for the same mood
4. **Change Mood**: Click "Choose Different Mood" to go back and select a different mood

## 🍳 Available Moods & Recipe Types

- **😊 Happy**: Bright, colorful, and cheerful recipes (Rainbow Veggie Pasta, Sunshine Smoothie Bowl)
- **🤗 Comfort**: Warm, cozy, and soul-soothing recipes (Mac and Cheese, Chicken Noodle Soup)
- **⚡ Energized**: Nutritious, power-packed recipes (Protein Bowl, Green Energy Smoothie)
- **😰 Stressed**: Calming, relaxing recipes (Chamomile Tea Cookies, Lavender Honey Oatmeal)
- **🌟 Adventurous**: Bold, exotic, and fusion recipes (Korean Beef Bulgogi Tacos, Moroccan Chicken Tagine)

## 🎨 Demo

### Screenshots
The app features a beautiful, modern interface with:
- **Mood Selection**: Interactive mood buttons with emojis and gradients
- **Recipe Display**: Clean, organized recipe cards with all details
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Live Demo
Once running locally, you can:
- Test all 5 different moods
- Experience smooth animations and transitions
- Try the "Request New Recipe" functionality
- See the beautiful gradient themes for each mood

## 📁 Project Structure

```
mood-recipe-app/
├── server.js              # Express server and API routes
├── package.json           # Dependencies and scripts
├── recipes.db            # SQLite database (auto-created)
├── README.md             # This file
└── public/               # Frontend files
    ├── index.html        # Main HTML page
    └── script.js         # Frontend JavaScript
```

## 🔧 API Endpoints

- `GET /api/recipes/:mood` - Get a random recipe for a specific mood
- `GET /api/recipes/:mood?exclude=:id` - Get a random recipe excluding a specific ID
- `GET /api/moods` - Get all available moods

## 🎨 Customization

### Adding New Recipes

You can add new recipes by modifying the `recipes` array in `server.js`. Each recipe should have:
- `name`: Recipe name
- `description`: Brief description
- `ingredients`: Comma-separated list of ingredients
- `instructions`: Step-by-step instructions (numbered)
- `mood`: One of the available moods
- `prep_time`: Preparation time
- `cook_time`: Cooking time
- `servings`: Number of servings

### Adding New Moods

1. Add recipes with the new mood in `server.js`
2. Add a new mood button in `index.html`
3. Add corresponding gradient colors in `script.js`

## 🐛 Troubleshooting

- **Database Issues**: Delete `recipes.db` and restart the server to recreate the database
- **Port Already in Use**: Change the PORT in `server.js` or kill the process using port 3000
- **Missing Dependencies**: Run `npm install` to ensure all dependencies are installed

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**: Add new features, fix bugs, or improve documentation
4. **Test your changes**: Make sure everything works properly
5. **Commit your changes**: `git commit -m "Add your descriptive commit message"`
6. **Push to your branch**: `git push origin feature/your-feature-name`
7. **Create a Pull Request**: Submit your changes for review

### Contribution Ideas
- Add more recipes for existing moods
- Create new mood categories
- Improve the UI/UX design
- Add user favorites functionality
- Implement recipe ratings
- Add dietary restriction filters

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Tailwind CSS** for the beautiful styling framework
- **Font Awesome** for the amazing icons
- **Express.js** for the robust backend framework
- **SQLite** for the lightweight database solution

---

**Enjoy cooking with your mood! 🍽️❤️** 