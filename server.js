const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize SQLite database
const db = new sqlite3.Database('./recipes.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeDatabase();
  }
});

// Initialize database schema
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      mood TEXT NOT NULL,
      prep_time TEXT,
      cook_time TEXT,
      servings INTEGER
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Recipes table created successfully.');
      seedDatabase();
    }
  });
}

// Seed database with sample recipes
function seedDatabase() {
  db.get("SELECT COUNT(*) as count FROM recipes", (err, row) => {
    if (err) {
      console.error('Error checking recipe count:', err.message);
      return;
    }
    
    if (row.count === 0) {
      console.log('Seeding database with sample recipes...');
      
      const recipes = [
        // Happy mood recipes
        {
          name: "Rainbow Veggie Pasta",
          description: "A colorful and vibrant pasta dish that's as cheerful as you are!",
          ingredients: "400g pasta, 1 bell pepper (red), 1 bell pepper (yellow), 1 zucchini, 1 cup cherry tomatoes, 2 cloves garlic, 3 tbsp olive oil, 1/4 cup basil, parmesan cheese, salt, pepper",
          instructions: "1. Cook pasta according to package directions. 2. Heat olive oil in a large pan. 3. Sauté garlic for 1 minute. 4. Add diced bell peppers and zucchini, cook for 5 minutes. 5. Add cherry tomatoes and cook until softened. 6. Toss with cooked pasta and fresh basil. 7. Serve with parmesan cheese.",
          mood: "happy",
          prep_time: "15 min",
          cook_time: "20 min",
          servings: 4
        },
        {
          name: "Sunshine Smoothie Bowl",
          description: "A bright and tropical smoothie bowl to brighten your day!",
          ingredients: "1 frozen banana, 1/2 cup mango chunks, 1/2 cup pineapple, 1/2 cup coconut milk, 1 tbsp honey, granola, fresh berries, coconut flakes",
          instructions: "1. Blend frozen banana, mango, pineapple, coconut milk, and honey until smooth. 2. Pour into a bowl. 3. Top with granola, fresh berries, and coconut flakes. 4. Enjoy immediately!",
          mood: "happy",
          prep_time: "10 min",
          cook_time: "0 min",
          servings: 1
        },
        
        // Comfort mood recipes
        {
          name: "Classic Mac and Cheese",
          description: "Creamy, cheesy comfort food that hugs you from the inside out.",
          ingredients: "400g macaroni, 4 tbsp butter, 4 tbsp flour, 2 cups milk, 2 cups cheddar cheese, 1/2 cup breadcrumbs, salt, pepper, paprika",
          instructions: "1. Cook macaroni according to package directions. 2. In a saucepan, melt butter and whisk in flour. 3. Gradually add milk, whisking constantly. 4. Add cheese and stir until melted. 5. Mix with cooked pasta. 6. Top with breadcrumbs and bake at 375°F for 20 minutes.",
          mood: "comfort",
          prep_time: "15 min",
          cook_time: "35 min",
          servings: 6
        },
        {
          name: "Chicken Noodle Soup",
          description: "A warm, soul-soothing soup perfect for when you need comfort.",
          ingredients: "2 chicken breasts, 8 cups chicken broth, 2 cups egg noodles, 2 carrots, 2 celery stalks, 1 onion, 2 cloves garlic, 1 bay leaf, thyme, salt, pepper",
          instructions: "1. Boil chicken breasts in broth for 20 minutes. 2. Remove chicken and shred. 3. Add diced vegetables to broth and simmer for 10 minutes. 4. Add noodles and cook for 8 minutes. 5. Return shredded chicken to pot. 6. Season with herbs, salt, and pepper.",
          mood: "comfort",
          prep_time: "20 min",
          cook_time: "40 min",
          servings: 6
        },
        
        // Energized mood recipes
        {
          name: "Power Protein Bowl",
          description: "A nutrient-packed bowl to fuel your active lifestyle!",
          ingredients: "1 cup quinoa, 1 grilled chicken breast, 1/2 avocado, 1 cup spinach, 1/4 cup chickpeas, 1/4 cup pumpkin seeds, 2 tbsp tahini, 1 tbsp lemon juice, olive oil",
          instructions: "1. Cook quinoa according to package directions. 2. Grill and slice chicken breast. 3. Arrange quinoa, spinach, and chickpeas in a bowl. 4. Top with sliced chicken and avocado. 5. Sprinkle with pumpkin seeds. 6. Drizzle with tahini mixed with lemon juice and olive oil.",
          mood: "energized",
          prep_time: "15 min",
          cook_time: "25 min",
          servings: 2
        },
        {
          name: "Green Energy Smoothie",
          description: "A refreshing green smoothie packed with vitamins and energy!",
          ingredients: "1 banana, 1 cup spinach, 1/2 avocado, 1 cup coconut water, 1 tbsp chia seeds, 1 tbsp almond butter, 1 tsp honey, ice cubes",
          instructions: "1. Add all ingredients to a blender. 2. Blend until smooth and creamy. 3. Add ice cubes and blend again. 4. Pour into a glass and enjoy immediately!",
          mood: "energized",
          prep_time: "5 min",
          cook_time: "0 min",
          servings: 1
        },
        
        // Stressed mood recipes
        {
          name: "Chamomile Tea Cookies",
          description: "Calming cookies infused with chamomile to help you relax.",
          ingredients: "2 cups flour, 1/2 cup butter, 1/2 cup sugar, 1 egg, 2 tbsp chamomile tea (ground), 1 tsp vanilla, 1/2 tsp baking powder, pinch of salt",
          instructions: "1. Cream butter and sugar. 2. Beat in egg and vanilla. 3. Mix dry ingredients separately. 4. Combine wet and dry ingredients. 5. Roll into balls and place on baking sheet. 6. Bake at 350°F for 12-15 minutes.",
          mood: "stressed",
          prep_time: "20 min",
          cook_time: "15 min",
          servings: 24
        },
        {
          name: "Lavender Honey Oatmeal",
          description: "A soothing bowl of oatmeal with calming lavender and honey.",
          ingredients: "1 cup rolled oats, 2 cups milk, 2 tbsp honey, 1 tsp dried lavender, 1/2 tsp vanilla, pinch of salt, sliced almonds, fresh berries",
          instructions: "1. Heat milk in a saucepan. 2. Add oats and cook for 5 minutes, stirring occasionally. 3. Stir in honey, lavender, vanilla, and salt. 4. Let steep for 2 minutes. 5. Serve topped with almonds and berries.",
          mood: "stressed",
          prep_time: "5 min",
          cook_time: "10 min",
          servings: 2
        },
        
        // Adventurous mood recipes
        {
          name: "Korean Beef Bulgogi Tacos",
          description: "A fusion of Korean and Mexican flavors for the adventurous eater!",
          ingredients: "1 lb beef sirloin, 1/4 cup soy sauce, 2 tbsp brown sugar, 2 tbsp sesame oil, 3 cloves garlic, 1 tsp ginger, 8 corn tortillas, kimchi, cilantro, lime wedges",
          instructions: "1. Marinate sliced beef in soy sauce, brown sugar, sesame oil, garlic, and ginger for 30 minutes. 2. Cook beef in a hot pan for 3-4 minutes. 3. Warm tortillas. 4. Fill tortillas with beef, kimchi, and cilantro. 5. Serve with lime wedges.",
          mood: "adventurous",
          prep_time: "40 min",
          cook_time: "10 min",
          servings: 4
        },
        {
          name: "Moroccan Spiced Chicken Tagine",
          description: "An exotic and aromatic dish that transports you to Morocco!",
          ingredients: "4 chicken thighs, 1 onion, 2 tsp cinnamon, 1 tsp cumin, 1 tsp ginger, 1/2 tsp turmeric, 1 cup dried apricots, 1 cup chicken broth, 2 tbsp olive oil, cilantro, almonds",
          instructions: "1. Heat olive oil in a tagine or heavy pot. 2. Brown chicken thighs on both sides. 3. Remove chicken, sauté onions until soft. 4. Add spices and cook for 1 minute. 5. Return chicken, add apricots and broth. 6. Simmer covered for 45 minutes. 7. Garnish with cilantro and almonds.",
          mood: "adventurous",
          prep_time: "20 min",
          cook_time: "60 min",
          servings: 4
        }
      ];
      
      const insertStmt = db.prepare(`
        INSERT INTO recipes (name, description, ingredients, instructions, mood, prep_time, cook_time, servings)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      recipes.forEach(recipe => {
        insertStmt.run([
          recipe.name,
          recipe.description,
          recipe.ingredients,
          recipe.instructions,
          recipe.mood,
          recipe.prep_time,
          recipe.cook_time,
          recipe.servings
        ]);
      });
      
      insertStmt.finalize();
      console.log('Database seeded successfully!');
    }
  });
}

// API Routes
app.get('/api/recipes/:mood', (req, res) => {
  const mood = req.params.mood;
  const excludeId = req.query.exclude ? parseInt(req.query.exclude) : null;
  
  let query = "SELECT * FROM recipes WHERE mood = ?";
  let params = [mood];
  
  if (excludeId) {
    query += " AND id != ?";
    params.push(excludeId);
  }
  
  query += " ORDER BY RANDOM() LIMIT 1";
  
  db.get(query, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'No recipe found for this mood' });
    }
  });
});

app.get('/api/moods', (req, res) => {
  db.all("SELECT DISTINCT mood FROM recipes", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows.map(row => row.mood));
  });
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
}); 