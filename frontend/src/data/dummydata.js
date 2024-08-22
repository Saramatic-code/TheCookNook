// src/data/dummydata.js

const recipes = [
    {
        id: 1,
        title: "Acorn & Chayote Ratatouille",
        image: "/images/acorn_chayote_ratatouille.jpg",
        prep_time: "15 mins",
        cook_time: "15 mins",
        servings: 6,
        categories: ["Vegetarian", "30 Minutes or Less", "Dinner"],
        ingredients: [
            { item: "Acorn squash", quantity: "1 cup", notes: "cubed", price: 1.5, currency: "USD" },
            { item: "Chayote squash", quantity: "2", notes: "diced", price: 2.0, currency: "USD" },
            { item: "Anaheim peppers", quantity: "2", notes: "about ½ cup, diced", price: 0.75, currency: "USD" },
            { item: "Garlic", quantity: "2 cloves", notes: "diced", price: 0.5, currency: "USD" },
            { item: "Green plantain", quantity: "1 medium", notes: "sliced", price: 0.8, currency: "USD" },
            { item: "Onion", quantity: "1 cup", notes: "chopped", price: 0.5, currency: "USD" },
            { item: "Olive oil", quantity: "2 Tbsp", price: 0.3, currency: "USD" },
            { item: "Salt", quantity: "1 tsp", price: 0.05, currency: "USD" },
            { item: "Orange juice", quantity: "1 cup", price: 0.6, currency: "USD" },
            { item: "Cumin seed", quantity: "1 tsp", price: 0.1, currency: "USD" },
            { item: "Oregano", quantity: "1 tsp", notes: "ground", price: 0.1, currency: "USD" },
            { item: "Black pepper", quantity: "1 tsp", price: 0.1, currency: "USD" }
        ],
        instructions: [
            "Warm the olive oil in a large Dutch oven.",
            "Add the onion and cook until translucent.",
            "Add each of the vegetables at 2-minute intervals starting with the green plantains, then acorn squash, chayote, Anaheim chili, and red pepper. Stir well.",
            "Season with garlic, oregano, cumin, black pepper, and salt.",
            "Moisten the mixture with the orange juice.",
            "Simmer for 5 minutes until tender. Serve."
        ],
        nutrition_facts: {
            calories: "Not specified",
            fat: "Not specified",
            carbohydrates: "Not specified",
            protein: "Not specified"
        },
        tags: ["vegetarian", "quick", "dinner"],
        total_cost: { amount: 7.3, currency: "USD" },
    },
    {
        id: 2,
        title: "Grilled Lemon Herb Chicken",
        image: "/images/grilled_lemon_herb_chicken.jpg",
        prep_time: "20 mins",
        cook_time: "15 mins",
        servings: 4,
        categories: ["Poultry", "Gluten-Free", "Dinner"],
        ingredients: [
            { item: "Chicken breasts", quantity: "4", notes: "boneless, skinless", price: 8.0, currency: "USD" },
            { item: "Olive oil", quantity: "2 Tbsp", price: 0.3, currency: "USD" },
            { item: "Lemon juice", quantity: "1/4 cup", price: 0.5, currency: "USD" },
            { item: "Garlic", quantity: "3 cloves", notes: "minced", price: 0.75, currency: "USD" },
            { item: "Thyme", quantity: "1 tsp", price: 0.1, currency: "USD" },
            { item: "Rosemary", quantity: "1 tsp", notes: "fresh, chopped", price: 0.2, currency: "USD" },
            { item: "Salt", quantity: "1/2 tsp", price: 0.05, currency: "USD" },
            { item: "Black pepper", quantity: "1/2 tsp", price: 0.05, currency: "USD" }
        ],
        instructions: [
            "In a bowl, mix olive oil, lemon juice, garlic, thyme, rosemary, salt, and black pepper.",
            "Add chicken breasts and marinate for at least 15 minutes.",
            "Preheat grill to medium-high heat.",
            "Grill the chicken for 6-7 minutes per side or until fully cooked.",
            "Serve with a side of vegetables or salad."
        ],
        nutrition_facts: {
            calories: "Not specified",
            fat: "Not specified",
            carbohydrates: "Not specified",
            protein: "Not specified"
        },
        tags: ["poultry", "gluten-free", "dinner"],
        total_cost: { amount: 9.95, currency: "USD" },
    },
    {
        id: 3,
        title: "Shrimp Scampi",
        image: "/images/shrimp_scampi.jpg",
        prep_time: "10 mins",
        cook_time: "10 mins",
        servings: 4,
        categories: ["Seafood", "Italian", "Dinner"],
        ingredients: [
            { item: "Shrimp", quantity: "1 lb", notes: "peeled and deveined", price: 12.0, currency: "USD" },
            { item: "Butter", quantity: "4 Tbsp", price: 0.6, currency: "USD" },
            { item: "Garlic", quantity: "4 cloves", notes: "minced", price: 1.0, currency: "USD" },
            { item: "Lemon juice", quantity: "1/4 cup", price: 0.5, currency: "USD" },
            { item: "White wine", quantity: "1/4 cup", price: 1.5, currency: "USD" },
            { item: "Parsley", quantity: "2 Tbsp", notes: "chopped", price: 0.2, currency: "USD" },
            { item: "Salt", quantity: "1/2 tsp", price: 0.05, currency: "USD" },
            { item: "Black pepper", quantity: "1/2 tsp", price: 0.05, currency: "USD" }
        ],
        instructions: [
            "In a large skillet, melt butter over medium heat.",
            "Add garlic and cook until fragrant.",
            "Add shrimp and cook until pink, about 2-3 minutes per side.",
            "Stir in lemon juice and white wine, cook for another 2 minutes.",
            "Season with salt, black pepper, and parsley.",
            "Serve over pasta or with crusty bread."
        ],
        nutrition_facts: {
            calories: "Not specified",
            fat: "Not specified",
            carbohydrates: "Not specified",
            protein: "Not specified"
        },
        tags: ["seafood", "italian", "dinner"],
        total_cost: { amount: 15.9, currency: "USD" },
    },
    {
        id: 4,
        title: "Beef Stir-Fry with Vegetables",
        image: "/images/beef_stir_fry.jpg",
        prep_time: "15 mins",
        cook_time: "15 mins",
        servings: 4,
        categories: ["Beef", "Asian", "Dinner"],
        ingredients: [
            { item: "Beef sirloin", quantity: "1 lb", notes: "thinly sliced", price: 10.0, currency: "USD" },
            { item: "Broccoli", quantity: "2 cups", notes: "florets", price: 2.0, currency: "USD" },
            { item: "Carrots", quantity: "2", notes: "julienned", price: 0.7, currency: "USD" },
            { item: "Bell pepper", quantity: "1", notes: "sliced", price: 0.75, currency: "USD" },
            { item: "Soy sauce", quantity: "3 Tbsp", price: 0.4, currency: "USD" },
            { item: "Ginger", quantity: "1 tsp", notes: "grated", price: 0.2, currency: "USD" },
            { item: "Garlic", quantity: "2 cloves", notes: "minced", price: 0.5, currency: "USD" },
            { item: "Olive oil", quantity: "2 Tbsp", price: 0.3, currency: "USD" },
            { item: "Cornstarch", quantity: "1 Tbsp", price: 0.1, currency: "USD" },
            { item: "Water", quantity: "1/4 cup", price: 0.0, currency: "USD" }
        ],
        instructions: [
            "In a bowl, mix soy sauce, ginger, garlic, and cornstarch.",
            "Heat olive oil in a large skillet over medium-high heat.",
            "Add beef slices and cook until browned, about 2-3 minutes.",
            "Remove beef and set aside.",
            "Add broccoli, carrots, and bell pepper to the skillet and stir-fry for 5-6 minutes.",
            "Return beef to the skillet, add water, and stir until sauce thickens.",
            "Serve over rice or noodles."
        ],
        nutrition_facts: {
            calories: "Not specified",
            fat: "Not specified",
            carbohydrates: "Not specified",
            protein: "Not specified"
        },
        tags: ["beef", "asian", "dinner"],
        total_cost: { amount: 14.95, currency: "USD" },
    },
    {
        id: 5,
        title: "Spaghetti Carbonara",
        image: "/images/spaghetti_carbonara.jpg",
        prep_time: "10 mins",
        cook_time: "15 mins",
        servings: 4,
        categories: ["Pasta", "Italian", "Dinner"],
        ingredients: [
            { item: "Spaghetti", quantity: "12 oz", price: 1.5, currency: "USD" },
            { item: "Bacon", quantity: "6 slices", notes: "chopped", price: 2.5, currency: "USD" },
            { item: "Eggs", quantity: "3", notes: "large", price: 0.6, currency: "USD" },
            { item: "Parmesan cheese", quantity: "1/2 cup", notes: "grated", price: 2.0, currency: "USD" },
            { item: "Black pepper", quantity: "1/2 tsp", price: 0.05, currency: "USD" },
            { item: "Salt", quantity: "1/4 tsp", price: 0.05, currency: "USD" }
        ],
        instructions: [
            "Cook spaghetti according to package instructions. Reserve 1 cup of pasta water.",
            "In a skillet, cook bacon over medium heat until crispy.",
            "In a bowl, whisk together eggs, Parmesan cheese, and black pepper.",
            "Drain spaghetti and return to the pot. Quickly stir in the egg mixture, adding reserved pasta water as needed to create a creamy sauce.",
            "Add crispy bacon and mix well. Serve immediately."
        ],
        nutrition_facts: {
            calories: "Not specified",
            fat: "Not specified",
            carbohydrates: "Not specified",
            protein: "Not specified"
        },
        tags: ["pasta", "italian", "dinner"],
        total_cost: { amount: 6.7, currency: "USD" },
    },
    {
        id: 6,
        title: "Mango Avocado Salsa",
        image: "/images/mango_avocado_salsa.jpg",
        prep_time: "10 mins",
        cook_time: "0 mins",
        servings: 4,
        categories: ["Vegan", "Gluten-Free", "Snack"],
        ingredients: [
            { item: "Mango", quantity: "1", notes: "peeled and diced", price: 1.5, currency: "USD" },
            { item: "Avocado", quantity: "1", notes: "peeled and diced", price: 1.5, currency: "USD" },
            { item: "Red onion", quantity: "1/4 cup", notes: "finely chopped", price: 0.3, currency: "USD" },
            { item: "Cilantro", quantity: "1/4 cup", notes: "chopped", price: 0.5, currency: "USD" },
            { item: "Lime juice", quantity: "2 Tbsp", price: 0.3, currency: "USD" },
            { item: "Salt", quantity: "1/2 tsp", price: 0.05, currency: "USD" },
            { item: "Jalapeno", quantity: "1", notes: "seeded and diced", price: 0.5, currency: "USD" }
        ],
        instructions: [
            "In a bowl, combine the mango, avocado, red onion, cilantro, lime juice, salt, and jalapeno.",
            "Gently toss to combine.",
            "Serve immediately with chips or as a topping for tacos."
        ],
        nutrition_facts: {
            calories: "Not specified",
            fat: "Not specified",
            carbohydrates: "Not specified",
            protein: "Not specified"
        },
        tags: ["vegan", "gluten-free", "snack"],
        total_cost: { amount: 4.65, currency: "USD" },
    },
    {
        id: 7,
        title: "Classic Beef Chili",
        image: "/images/classic_beef_chili.jpg",
        prep_time: "20 mins",
        cook_time: "1 hour",
        servings: 6,
        categories: ["Beef", "Spicy", "Dinner"],
        ingredients: [
            { item: "Ground beef", quantity: "1 lb", price: 5.0, currency: "USD" },
            { item: "Onion", quantity: "1", notes: "chopped", price: 0.5, currency: "USD" },
            { item: "Garlic", quantity: "3 cloves", notes: "minced", price: 0.75, currency: "USD" },
            { item: "Tomato sauce", quantity: "15 oz", price: 1.0, currency: "USD" },
            { item: "Kidney beans", quantity: "1 can", notes: "drained and rinsed", price: 1.0, currency: "USD" },
            { item: "Chili powder", quantity: "2 Tbsp", price: 0.2, currency: "USD" },
            { item: "Cumin", quantity: "1 tsp", price: 0.1, currency: "USD" },
            { item: "Salt", quantity: "1 tsp", price: 0.05, currency: "USD" },
            { item: "Black pepper", quantity: "1/2 tsp", price: 0.05, currency: "USD" },
            { item: "Olive oil", quantity: "1 Tbsp", price: 0.15, currency: "USD" },
            { item: "Water", quantity: "1 cup", price: 0.0, currency: "USD" }
        ],
        instructions: [
            "Heat olive oil in a large pot over medium heat. Add onion and garlic, and sauté until softened.",
            "Add ground beef and cook until browned.",
            "Stir in tomato sauce, kidney beans, chili powder, cumin, salt, black pepper, and water.",
            "Bring to a boil, then reduce heat and simmer for 1 hour, stirring occasionally.",
            "Serve hot with your favorite toppings."
        ],
        nutrition_facts: {
            calories: "Not specified",
            fat: "Not specified",
            carbohydrates: "Not specified",
            protein: "Not specified"
        },
        tags: ["beef", "spicy", "dinner"],
        total_cost: { amount: 8.85, currency: "USD" },
    }
];

export default recipes;
