import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FiX } from 'react-icons/fi'; // Importing X icon from react-icons

export default function AddRecipe() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('/images/default-recipe-image.png');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const router = useRouter();

    // Validation schema for form
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required').max(100, 'Title cannot exceed 100 characters'),
        prepTime: Yup.object().shape({
            value: Yup.string()
                .required('Preparation time is required')
                .matches(/^\d+(-\d+)?$/, 'Preparation time must be a number or a range (e.g., "15" or "15-20")'),
            unit: Yup.string().oneOf(['mins', 'hours'], 'Invalid time unit').required('Unit is required'),
        }),
        cookTime: Yup.object().shape({
            value: Yup.string()
                .required('Cook time is required')
                .matches(/^\d+(-\d+)?$/, 'Cook time must be a number or a range (e.g., "30" or "30-40")'),
            unit: Yup.string().oneOf(['mins', 'hours'], 'Invalid time unit').required('Unit is required'),
        }),
        servings: Yup.string().required('Servings are required'),
        categories: Yup.array().of(Yup.string().required('Category is required')),
        ingredients: Yup.array().of(
            Yup.object().shape({
                item: Yup.string().required('Item is required'),
                quantity: Yup.string().required('Quantity is required'),
                measurement: Yup.string(),
                notes: Yup.string(),
            })
        ),
        instructions: Yup.array().of(Yup.string().required('Instruction step is required')).min(1, 'At least one instruction is required'),
        nutritionFacts: Yup.object().shape({
            calories: Yup.string()
                .test('is-valid', 'Calories must be a number, "n/a", or empty', value =>
                    value === '' || value.toLowerCase() === 'n/a' || !isNaN(Number(value))
                ),
            fat: Yup.string()
                .test('is-valid', 'Fat must be a number, "n/a", or empty', value =>
                    value === '' || value.toLowerCase() === 'n/a' || !isNaN(Number(value))
                ),
            carbohydrates: Yup.string()
                .test('is-valid', 'Carbohydrates must be a number, "n/a", or empty', value =>
                    value === '' || value.toLowerCase() === 'n/a' || !isNaN(Number(value))
                ),
            protein: Yup.string()
                .test('is-valid', 'Protein must be a number, "n/a", or empty', value =>
                    value === '' || value.toLowerCase() === 'n/a' || !isNaN(Number(value))
                ),
            sugar: Yup.string()
                .test('is-valid', 'Sugar must be a number, "n/a", or empty', value =>
                    value === '' || value.toLowerCase() === 'n/a' || !isNaN(Number(value))
                ),
        }),
    });

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            ingredients: [{ item: '', quantity: '', measurement: '', notes: '' }],
            instructions: [''],
            nutritionFacts: { calories: '', fat: '', carbohydrates: '', protein: '', sugar: '' },
            categories: [],
            tags: [],
        },
    });

    // Handle image change and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleAddCategory = () => {
        if (newCategory.trim() && !categories.includes(newCategory.trim())) {
            setCategories([...categories, newCategory.trim()]);
            setNewCategory('');
        }
    };

    const handleRemoveCategory = (categoryToRemove) => {
        setCategories(categories.filter(category => category !== categoryToRemove));
    };

    const onSubmit = (data) => {
        let imageUrl = '/images/default-recipe-image.png'; // Default image URL if no image is uploaded

        if (image) {
            imageUrl = image; // Use the Base64 string for the image
        }

        // Ensure correct format for prepTime and cookTime
        const prepTime = {
            value: data.prepTime.value || 'N/A',
            unit: data.prepTime.unit || '',
        };
        const cookTime = {
            value: data.cookTime.value || 'N/A',
            unit: data.cookTime.unit || '',
        };

        // Generate a unique ID for the new recipe
        const newRecipeId = Date.now().toString(); // Convert to string to match format

        const newRecipe = {
            ...data,
            id: newRecipeId, // Use the generated ID
            image: imageUrl,
            tags,
            categories,
            prepTime, // Include formatted prepTime
            cookTime, // Include formatted cookTime
            nutrition_facts: data.nutritionFacts || {} // Ensure that nutritionFacts is included and defaults to an empty object
        };

        // Save the new recipe to localStorage
        if (typeof window !== "undefined") { // Ensure this is only run in the browser
            const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];

            try {
                localStorage.setItem('recipes', JSON.stringify([...savedRecipes, newRecipe]));
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    console.error('LocalStorage limit exceeded. Please clear some data.');
                    alert('Failed to save recipe: localStorage limit exceeded.');
                    return;
                }
            }
        }

        // Clear form after submission
        reset();
        setImage(null);
        setImagePreview('/images/default-recipe-image.png');
        setTags([]);
        setCategories([]);
        setNewTag('');
        setNewCategory('');

        // Redirect to MyRecipes page
        setTimeout(() => {
            router.push('/myRecipes');
        }, 100); // Delay to ensure localStorage updates before redirecting
    };

    return (
        <div className="wrapper flex flex-col min-h-screen">
            <Navbar />
            <div className="main-content flex-1 max-w-2xl mx-auto p-6 text-[#696969]">
                <h1 className="text-3xl font-bold mb-6 text-center">Add a New Recipe</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title Input */}
                    <div className="mb-4">
                        <label className="block font-semibold">Title:</label>
                        <input
                            type="text"
                            {...register('title')}
                            className={`mt-2 p-2 border rounded w-full ${errors.title ? 'border-red-500' : ''}`}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Image Input */}
                    <div className="mb-4">
                        <label className="block font-semibold">Image:</label>
                        <div className="w-full h-40 overflow-hidden rounded-lg flex items-center justify-center">
                            <img
                                src={imagePreview}
                                alt="Recipe Pic"
                                className="object-cover h-full w-full rounded-lg"
                            />
                        </div>
                        <button type="button" className="p-2 bg-[#F29BAA] text-white rounded hover:bg-[#D17384] mt-4 block mx-auto">
                            <label htmlFor="file-upload" className="cursor-pointer">
                                Change Recipe Image
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </button>
                    </div>

                    {/* Prep Time and Cook Time Inputs */}
                    <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0 md:space-x-4">
                        {/* Prep Time Input */}
                        <div className="flex-1">
                            <label className="block font-semibold">Prep Time:</label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    {...register('prepTime.value')}
                                    placeholder="e.g., 8-10"
                                    className={`mt-2 p-2 border rounded w-1/2 ${errors.prepTime?.value ? 'border-red-500' : ''}`}
                                />
                                <select
                                    {...register('prepTime.unit')}
                                    className={`mt-2 p-2 border rounded w-1/2 ${errors.prepTime?.unit ? 'border-red-500' : ''}`}
                                >
                                    <option value="mins">mins</option>
                                    <option value="hours">hours</option>
                                </select>
                            </div>
                            {errors.prepTime && <p className="text-red-500 text-sm">{errors.prepTime.value?.message || errors.prepTime.unit?.message}</p>}
                        </div>

                        {/* Cook Time Input */}
                        <div className="flex-1">
                            <label className="block font-semibold">Cook Time:</label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    {...register('cookTime.value')}
                                    placeholder="e.g., 30-40"
                                    className={`mt-2 p-2 border rounded w-1/2 ${errors.cookTime?.value ? 'border-red-500' : ''}`}
                                />
                                <select
                                    {...register('cookTime.unit')}
                                    className={`mt-2 p-2 border rounded w-1/2 ${errors.cookTime?.unit ? 'border-red-500' : ''}`}
                                >
                                    <option value="mins">mins</option>
                                    <option value="hours">hours</option>
                                </select>
                            </div>
                            {errors.cookTime && <p className="text-red-500 text-sm">{errors.cookTime.value?.message || errors.cookTime.unit?.message}</p>}
                        </div>
                    </div>

                    {/* Servings Input */}
                    <div className="mb-4 flex justify-center">
                        <div className="w-full max-w-xs">
                            <label className="block font-semibold mb-2 text-lg text-center">Servings:</label>
                            <div className="flex items-center justify-center">
                                <div className="relative w-32">
                                    <input
                                        type="text"
                                        {...register('servings')}
                                        placeholder="e.g., 4"
                                        className={`w-full p-2 border rounded ${errors.servings ? 'border-red-500' : 'border-gray-300'} focus:ring-primary focus:border-primary`}
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">servings</span>
                                </div>
                            </div>
                            {errors.servings && (
                                <p className="text-red-500 text-xs mt-1 text-center">{errors.servings.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Categories Input */}
                    <div className="mb-4 flex justify-center">
                        <div className="w-full md:w-3/4">
                            <label className="block font-semibold mb-2 text-lg">Categories:</label>
                            <div className="space-y-2">
                                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                    {categories.map((category, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-1 border border-gray-200 rounded-md bg-[#F3BFC4] shadow-sm"
                                        >
                                            <input
                                                type="text"
                                                value={category}
                                                onChange={(e) => {
                                                    const newCategories = [...categories];
                                                    newCategories[index] = e.target.value;
                                                    setCategories(newCategories);
                                                }}
                                                placeholder="Category"
                                                className="p-1 bg-transparent w-full text-sm focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveCategory(category)}
                                                className="ml-1 p-1 bg-gray-100 text-gray-600 rounded-full hover:bg-red-200 hover:text-red-600 transition-colors"
                                                title="Remove Category"
                                            >
                                                <FiX className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center mt-2">
                                    <input
                                        type="text"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        className="p-2 border rounded w-full text-sm"
                                        placeholder="Enter a category"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddCategory}
                                        className="ml-2 p-1 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-colors text-xs"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tags Input */}
                    <div className="mb-4 flex justify-center">
                        <div className="w-full md:w-3/4">
                            <label className="block font-semibold mb-2 text-lg">Tags:</label>
                            <div className="space-y-2">
                                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                    {tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-1 border border-gray-200 rounded-md bg-[#F3BFC4] shadow-sm"
                                        >
                                            <input
                                                type="text"
                                                value={tag}
                                                onChange={(e) => {
                                                    const newTags = [...tags];
                                                    newTags[index] = e.target.value;
                                                    setTags(newTags);
                                                }}
                                                placeholder="Tag"
                                                className="p-1 bg-transparent w-full text-sm focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="ml-1 p-1 bg-gray-100 text-gray-600 rounded-full hover:bg-red-200 hover:text-red-600 transition-colors"
                                                title="Remove Tag"
                                            >
                                                <FiX className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center mt-2">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        className="p-2 border rounded w-full text-sm"
                                        placeholder="Enter a tag"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="ml-2 p-1 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-colors text-xs"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ingredients Input */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2 text-lg">Ingredients:</label>
                        <Controller
                            name="ingredients"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <div className="space-y-4">
                                    {value.map((ingredient, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr_auto] gap-4 p-4 border rounded mb-2 items-center"
                                        >
                                            <input
                                                type="text"
                                                value={ingredient.item}
                                                onChange={(e) => {
                                                    const newIngredients = [...value];
                                                    newIngredients[index].item = e.target.value;
                                                    onChange(newIngredients);
                                                }}
                                                placeholder="Item"
                                                className="p-2 border rounded w-full"
                                            />
                                            <input
                                                type="text"
                                                value={ingredient.quantity}
                                                onChange={(e) => {
                                                    const newIngredients = [...value];
                                                    newIngredients[index].quantity = e.target.value;
                                                    onChange(newIngredients);
                                                }}
                                                placeholder="Quantity"
                                                className="p-2 border rounded w-full"
                                            />
                                            <input
                                                type="text"
                                                value={ingredient.measurement}
                                                onChange={(e) => {
                                                    const newIngredients = [...value];
                                                    newIngredients[index].measurement = e.target.value;
                                                    onChange(newIngredients);
                                                }}
                                                placeholder="Measurement"
                                                className="p-2 border rounded w-full"
                                            />
                                            <input
                                                type="text"
                                                value={ingredient.notes}
                                                onChange={(e) => {
                                                    const newIngredients = [...value];
                                                    newIngredients[index].notes = e.target.value;
                                                    onChange(newIngredients);
                                                }}
                                                placeholder="Notes"
                                                className="p-2 border rounded w-full"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newIngredients = value.filter((_, i) => i !== index);
                                                    onChange(newIngredients);
                                                }}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                                                title="Remove Ingredient"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onChange([
                                                ...value,
                                                { item: '', quantity: '', measurement: '', notes: '' },
                                            ])
                                        }
                                        className="p-2 bg-primary text-background font-semibold rounded hover:bg-primary-dark transition-colors mt-2 w-full md:w-auto"
                                    >
                                        Add Ingredient
                                    </button>
                                </div>
                            )}
                        />
                        {errors.ingredients && (
                            <p className="text-red-500 text-sm">{errors.ingredients.message}</p>
                        )}
                    </div>

                    {/* Instructions Input */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2 text-lg">Instructions:</label>
                        <Controller
                            name="instructions"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <div className="space-y-4">
                                    {value.map((instruction, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-1 md:grid-cols-[3fr_auto] gap-4 p-4 border rounded mb-2 items-center"
                                        >
                                            <textarea
                                                value={instruction}
                                                onChange={(e) => {
                                                    const newInstructions = [...value];
                                                    newInstructions[index] = e.target.value;
                                                    onChange(newInstructions);
                                                }}
                                                placeholder={`Step ${index + 1}`}
                                                className="p-2 border rounded w-full"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newInstructions = value.filter((_, i) => i !== index);
                                                    onChange(newInstructions);
                                                }}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                                                title="Remove Instruction"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => onChange([...value, ''])}
                                        className="p-2 bg-primary text-background font-semibold rounded hover:bg-primary-dark transition-colors mt-2 w-full md:w-auto"
                                    >
                                        Add Instruction
                                    </button>
                                </div>
                            )}
                        />
                        {errors.instructions && <p className="text-red-500 text-sm">{errors.instructions.message}</p>}
                    </div>

                    {/* Nutrition Facts Input */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2 text-lg">Nutrition Facts:</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Calories Input */}
                            <div className="flex items-center space-x-2">
                                <label className="w-32 text-sm font-medium">Calories:</label>
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        {...register('nutritionFacts.calories')}
                                        placeholder="e.g., 200"
                                        className={`w-full p-2 border rounded ${errors.nutritionFacts?.calories ? 'border-red-500' : 'border-gray-300'} focus:ring-primary focus:border-primary`}
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">(kcal)</span>
                                </div>
                                {errors.nutritionFacts?.calories && (
                                    <p className="text-red-500 text-xs mt-1">{errors.nutritionFacts.calories.message}</p>
                                )}
                            </div>

                            {/* Total Fat Input */}
                            <div className="flex items-center space-x-2">
                                <label className="w-32 text-sm font-medium">Total Fat:</label>
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        {...register('nutritionFacts.fat')}
                                        placeholder="e.g., 10"
                                        className={`w-full p-2 border rounded ${errors.nutritionFacts?.fat ? 'border-red-500' : 'border-gray-300'} focus:ring-primary focus:border-primary`}
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">(g)</span>
                                </div>
                                {errors.nutritionFacts?.fat && (
                                    <p className="text-red-500 text-xs mt-1">{errors.nutritionFacts.fat.message}</p>
                                )}
                            </div>

                            {/* Total Carbohydrates Input */}
                            <div className="flex items-center space-x-2">
                                <label className="w-32 text-sm font-medium">Total Carbs:</label>
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        {...register('nutritionFacts.carbohydrates')}
                                        placeholder="e.g., 30"
                                        className={`w-full p-2 border rounded ${errors.nutritionFacts?.carbohydrates ? 'border-red-500' : 'border-gray-300'} focus:ring-primary focus:border-primary`}
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">(g)</span>
                                </div>
                                {errors.nutritionFacts?.carbohydrates && (
                                    <p className="text-red-500 text-xs mt-1">{errors.nutritionFacts.carbohydrates.message}</p>
                                )}
                            </div>

                            {/* Protein Input */}
                            <div className="flex items-center space-x-2">
                                <label className="w-32 text-sm font-medium">Protein:</label>
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        {...register('nutritionFacts.protein')}
                                        placeholder="e.g., 5"
                                        className={`w-full p-2 border rounded ${errors.nutritionFacts?.protein ? 'border-red-500' : 'border-gray-300'} focus:ring-primary focus:border-primary`}
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">(g)</span>
                                </div>
                                {errors.nutritionFacts?.protein && (
                                    <p className="text-red-500 text-xs mt-1">{errors.nutritionFacts.protein.message}</p>
                                )}
                            </div>

                            {/* Sugars Input */}
                            <div className="flex items-center space-x-2">
                                <label className="w-32 text-sm font-medium">Sugars:</label>
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        {...register('nutritionFacts.sugar')}
                                        placeholder="e.g., 15"
                                        className={`w-full p-2 border rounded ${errors.nutritionFacts?.sugar ? 'border-red-500' : 'border-gray-300'} focus:ring-primary focus:border-primary`}
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">(g)</span>
                                </div>
                                {errors.nutritionFacts?.sugar && (
                                    <p className="text-red-500 text-xs mt-1">{errors.nutritionFacts.sugar.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="p-2 bg-primary text-background font-semibold rounded hover:bg-primary-dark transition-colors mt-4 w-full"
                    >
                        Submit Recipe
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
