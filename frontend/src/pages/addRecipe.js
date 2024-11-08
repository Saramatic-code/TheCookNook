// src/pages/addRecipes.py
import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';  // Importing X icon from react-icons
import api from '../api/axios';



export default function AddRecipe() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('/images/default-recipe-image.png');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const router = useRouter();
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => ({
            file,
            url: URL.createObjectURL(file),
        }));

        // Apply a soft limit to 200 images but avoid displaying it to users
        if (images.length + newImages.length > 200) {
            setImages(prevImages => [
                ...prevImages.slice(0, 200 - prevImages.length),
                ...newImages.slice(0, 200 - prevImages.length)
            ]);
        } else {
            setImages([...images, ...newImages]);
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    // Validation schema for form
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required').max(100, 'Title cannot exceed 100 characters'),
        prep_time: Yup.object().shape({
            value: Yup.string()
                .required('Preparation time is required')
                .matches(/^\d+(-\d+)?$/, 'Preparation time must be a number or a range (e.g., "15" or "15-20")'),
            unit: Yup.string().oneOf(['mins', 'hours'], 'Invalid time unit').required('Unit is required'),
        }),
        cook_time: Yup.object().shape({
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
        nutrition_facts: Yup.object().shape({
            calories: Yup.string().test('is-valid', 'Calories must be a number, "n/a", or empty', value => value === '' || value.toLowerCase() === 'n/a' || !isNaN(Number(value))),
            fat: Yup.string().test('is-valid', 'Fat must be a number, "n/a", or empty', value => value === '' || value.toLowerCase() === 'n/a' || !isNaN(Number(value))),
            carbohydrates: Yup.string().test('is-valid', 'Carbohydrates must be a number, "n/a", or empty', value => value === '' || value.toLowerCase() === 'n/a' || !isNaN(Number(value))),
            protein: Yup.string().test('is-valid', 'Protein must be a number, "n/a", or empty', value => value === '' || value.toLowerCase() === 'n/a' || !isNaN(Number(value))),
            sugar: Yup.string().test('is-valid', 'Sugar must be a number, "n/a", or empty', value => value === '' || value.toLowerCase() === 'n/a' || !isNaN(Number(value))),
        }),
        images: Yup.array()
            .of(Yup.string().url('Each image must be a valid URL'))
            .max(200, 'You can upload up to 200 images only'),
        notes: Yup.string().max(1000, 'Notes cannot exceed 1000 characters'),  // Add character limit for notes
    });

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            ingredients: [{ item: '', quantity: '', measurement: '', notes: '' }],
            instructions: [''], // Ensure this is initialized as an array
            nutrition_facts: { calories: '', fat: '', carbohydrates: '', protein: '', sugar: '' },
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

    const ingredientRefs = useRef([]); // Define ingredientRefs here

    // Function to handle key press for adding ingredients
    const handleIngredientKeyPress = (e, index, onChange, value) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default action (submitting the form)
            // Add a new empty ingredient entry
            const newIngredients = [...value, { item: '', quantity: '', measurement: '', notes: '' }];
            onChange(newIngredients);
        }
    };

    const handleIngredientNotesKeyPress = (e, index, onChange, value) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default line break

            // Create a new ingredient entry
            const newIngredients = [...value, { item: '', quantity: '', measurement: '', notes: '' }];
            onChange(newIngredients); // Update the state with the new ingredient list

            // Focus on the item input of the next ingredient
            const nextIndex = index + 1;
            if (ingredientRefs.current[nextIndex]) {
                ingredientRefs.current[nextIndex].focus();
            }
        }
    };

    // Function to handle key press for adding instructions
    const handleInstructionKeyPress = (e, index, onChange, value) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default action (submitting the form)

            // Check if value is an array before spreading it
            if (Array.isArray(value)) {
                const newInstructions = [...value, '']; // Create a new empty instruction entry
                onChange(newInstructions); // Update the state with the new instructions

                // Set focus to the new textarea after a brief delay
                setTimeout(() => {
                    const nextInstruction = document.querySelector(`textarea[data-index="${index + 1}"]`);
                    if (nextInstruction) nextInstruction.focus(); // Focus on the next instruction input
                }, 0);
            }
        }
    };


    // Function to handle key press for adding a new category
    const handleCategoryKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (newCategory.trim() && !categories.includes(newCategory.trim())) {
                setCategories([...categories, newCategory.trim()]);
                setNewCategory('');
            }
        }
    };

    // Function to handle key press for adding a new tag
    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (newTag.trim() && !tags.includes(newTag.trim())) {
                setTags([...tags, newTag.trim()]);
                setNewTag('');
            }
        }
    };


    const onSubmit = (data) => {
        let imageUrl = '/images/default-recipe-image.png'; // Default image URL if no image is uploaded

        if (image) {
            imageUrl = image;  // Use the Base64 string for the image
        }

        // Ensure correct format for prepTime and cookTime
        const prep_time = {
            value: data.prep_time.value || 'N/A',
            unit: data.prep_time.unit || '',
        };
        const cook_time = {
            value: data.cook_time.value || 'N/A',
            unit: data.cook_time.unit || '',
        };

        const newRecipe = {
            ...data,
            image: imageUrl,
            tags,
            categories,
            prep_time,
            cook_time,
            sugar,
            nutrition_facts: data.nutrition_facts || {}
        };

        // Post the recipe to the backend API
        api.post('/recipes', newRecipe)
            .then(() => {
                // Clear form after submission
                reset();
                setImage(null);
                setImagePreview('/images/default-recipe-image.png');
                setTags([]);
                setCategories([]);
                setNewTag('');
                setNewCategory('');

                // Redirect to the recipes page
                router.push('/myRecipes');
            })
            .catch((error) => {
                console.error('Error adding recipe:', error);
            });
    };


    return (
        <div className="wrapper flex flex-col min-h-screen">
            <Navbar />
            <div className="main-content flex-1 max-w-3xl mx-auto p-6">
                <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                    <h1 className="text-3xl font-bold mb-6 text-center text-[#696969]">Add a New Recipe</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Title Input */}
                        <div className="space-y-6">
                            {/* Title Input */}
                            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <label className="block font-semibold text-[#696969]">Title:</label>
                                <input
                                    type="text"
                                    {...register('title')}
                                    className={`mt-2 p-2 border rounded w-full ${errors.title ? 'border-red-500' : ''}`}
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>

                            {/* Image Input */}
                            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                                <label className="block font-semibold">Image:</label>
                                <div className="w-full h-40 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
                                    <Image
                                        src={imagePreview}
                                        alt="Recipe Pic"
                                        className="object-cover h-full w-full rounded-lg"
                                        width={300}
                                        height={200}
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
                            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                                <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                                    {/* Prep Time Input */}
                                    <div className="flex-1">
                                        <label className="block font-semibold">Prep Time:</label>
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                {...register('prep_time.value')}
                                                placeholder="e.g., 8-10"
                                                className={`mt-2 p-2 border rounded w-1/2 ${errors.prep_time?.value ? 'border-red-500' : ''}`}
                                            />
                                            <select
                                                {...register('prep_time.unit')}
                                                className={`mt-2 p-2 border rounded w-1/2 ${errors.prep_time?.unit ? 'border-red-500' : ''}`}
                                            >
                                                <option value="mins">mins</option>
                                                <option value="hours">hours</option>
                                            </select>
                                        </div>
                                        {errors.prep_time && <p className="text-red-500 text-sm">{errors.prep_time.value?.message || errors.prep_time.unit?.message}</p>}
                                    </div>

                                    {/* Cook Time Input */}
                                    <div className="flex-1">
                                        <label className="block font-semibold">Cook Time:</label>
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                {...register('cook_time.value')}
                                                placeholder="e.g., 30-40"
                                                className={`mt-2 p-2 border rounded w-1/2 ${errors.cook_time?.value ? 'border-red-500' : ''}`}
                                            />
                                            <select
                                                {...register('cook_time.unit')}
                                                className={`mt-2 p-2 border rounded w-1/2 ${errors.cook_time?.unit ? 'border-red-500' : ''}`}
                                            >
                                                <option value="mins">mins</option>
                                                <option value="hours">hours</option>
                                            </select>
                                        </div>
                                        {errors.cook_time && <p className="text-red-500 text-sm">{errors.cook_time.value?.message || errors.cook_time.unit?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Servings Input */}
                            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                                <label className="block font-semibold">Servings:</label>
                                <input
                                    type="text"
                                    {...register('servings')}
                                    className={`mt-2 p-2 border rounded w-full ${errors.servings ? 'border-red-500' : ''}`}
                                />
                                {errors.servings && <p className="text-red-500 text-sm">{errors.servings.message}</p>}
                            </div>

                            {/* Categories Input */}
                            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                                <label className="block font-semibold">Categories:</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {categories.map((category, index) => (
                                        <div key={index} className="flex items-center bg-primary-light text-primary-dark px-2 py-1 rounded">
                                            {category}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveCategory(category)}
                                                className="ml-1 text-xs text-red-500"
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault(); // Prevent the default form submission
                                                const categoriesToAdd = newCategory.split(',').map(cat => cat.trim()).filter(cat => cat); // Split by comma, trim, and filter out empty values
                                                setCategories((prevCategories) => [...prevCategories, ...categoriesToAdd]);
                                                setNewCategory(''); // Clear the input
                                            }
                                        }}
                                        placeholder="Enter a category (separate with commas)"
                                        className="p-2 border rounded w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddCategory}
                                        className="ml-2 p-1 bg-primary text-white rounded hover:bg-primary-dark"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                            {/* Tags Input */}
                            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                                <label className="block font-semibold">Tags:</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {tags.map((tag, index) => (
                                        <div key={index} className="flex items-center bg-primary-light text-primary-dark px-2 py-1 rounded">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="ml-1 text-xs text-red-500"
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault(); // Prevent the default form submission
                                                const tagsToAdd = newTag.split(',').map(tag => tag.trim()).filter(tag => tag); // Split by comma, trim, and filter out empty values
                                                setTags((prevTags) => [...prevTags, ...tagsToAdd]);
                                                setNewTag(''); // Clear the input
                                            }
                                        }}
                                        placeholder="Enter a tag (separate with commas)"
                                        className="p-2 border rounded w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="ml-2 p-1 bg-primary text-white rounded hover:bg-primary-dark"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>


                        {/* Ingredients Input */}
                        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                            <label className="block font-semibold">Ingredients:</label>
                            <Controller
                                name="ingredients"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <div className="space-y-4 mt-2">
                                        {value.map((ingredient, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr_auto] gap-4 p-4 border border-gray-200 rounded-lg items-center bg-gray-100"
                                            >
                                                {/* Ingredient Item */}
                                                <div>
                                                    <label className="block text-sm font-semibold mb-1">Ingredient</label>
                                                    <input
                                                        type="text"
                                                        value={ingredient.item}
                                                        onChange={(e) => {
                                                            const newIngredients = [...value];
                                                            newIngredients[index].item = e.target.value;
                                                            onChange(newIngredients);
                                                        }}
                                                        onKeyDown={(e) => handleIngredientKeyPress(e, index, onChange, value)}
                                                        placeholder="Item"
                                                        className="p-2 border rounded w-full"
                                                    />
                                                </div>

                                                {/* Quantity */}
                                                <div>
                                                    <label className="block text-sm font-semibold mb-1">Quantity</label>
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
                                                </div>

                                                {/* Measurement */}
                                                <div>
                                                    <label className="block text-sm font-semibold mb-1">Measurement</label>
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
                                                </div>

                                                {/* Notes */}
                                                <div>
                                                    <label className="block text-sm font-semibold mb-1">Notes</label>
                                                    <input
                                                        type="text"
                                                        value={ingredient.notes}
                                                        onChange={(e) => {
                                                            const newIngredients = [...value];
                                                            newIngredients[index].notes = e.target.value;
                                                            onChange(newIngredients);
                                                        }}
                                                        onKeyDown={(e) => handleIngredientNotesKeyPress(e, index, onChange, value)}
                                                        placeholder="Notes"
                                                        className="p-2 border rounded w-full"
                                                    />
                                                </div>

                                                {/* Remove Ingredient Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newIngredients = value.filter((_, i) => i !== index);
                                                        onChange(newIngredients);
                                                    }}
                                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                                                    title="Remove Ingredient"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => onChange([...value, { item: '', quantity: '', measurement: '', notes: '' }])}
                                            className="p-2 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-colors mt-2 w-full md:w-auto"
                                        >
                                            Add Ingredient
                                        </button>
                                    </div>
                                )}
                            />
                            {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients.message}</p>}
                        </div>


                        {/* Instructions Input */}
                        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                            <label className="block font-semibold">Instructions:</label>
                            <Controller
                                name="instructions"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <div className="space-y-4 mt-2">
                                        {value.map((instruction, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-1 md:grid-cols-[3fr_auto] gap-4 p-4 border border-gray-200 rounded-lg items-center bg-gray-100"
                                            >
                                                <textarea
                                                    data-index={index} // Use data-index for focus handling
                                                    value={instruction}
                                                    onChange={(e) => {
                                                        const newInstructions = [...value];
                                                        newInstructions[index] = e.target.value; // Update the specific instruction
                                                        onChange(newInstructions); // Call onChange to update the state
                                                    }}
                                                    onKeyDown={(e) => handleInstructionKeyPress(e, index, onChange, value)} // Handle Enter key press
                                                    placeholder={`Step ${index + 1}`}
                                                    className="p-2 border rounded w-full"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newInstructions = value.filter((_, i) => i !== index);
                                                        onChange(newInstructions); // Remove instruction on click
                                                    }}
                                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                                                    title="Remove Instruction"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => onChange([...value, ''])} // Add empty instruction
                                            className="p-2 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-colors mt-2 w-full md:w-auto"
                                        >
                                            Add Instruction
                                        </button>
                                    </div>
                                )}
                            />
                            {errors.instructions && <p className="text-red-500 text-sm">{errors.instructions.message}</p>}
                        </div>


                        {/* Notes Input */}
                        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                            <label className="block font-semibold">Notes:</label>
                            <Controller
                                name="notes"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        placeholder="Add any additional notes here..."
                                        className="p-2 border rounded w-full"
                                    />
                                )}
                            />
                            {errors.notes && <p className="text-red-500 text-sm">{errors.notes.message}</p>}
                        </div>

                        {/* Nutrition Facts Input */}
                        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-[#696969]">
                            <label className="block font-semibold">Nutrition Facts:</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">

                                {/* Calories Input */}
                                <div className="flex items-center space-x-2">
                                    <label className="w-32 text-sm font-medium">Calories:</label>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            {...register('nutrition_facts.calories')}
                                            placeholder="e.g., 200"
                                            className={`w-full p-2 border rounded ${errors.nutrition_facts?.calories ? 'border-red-500' : 'border-gray-300'} focus:ring-primary focus:border-primary`}
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">(kcal)</span>
                                    </div>
                                    {errors.nutrition_facts?.calories && <p className="text-red-500 text-xs mt-1">{errors.nutrition_facts.calories.message}</p>}
                                </div>

                                {/* Total Fat Input */}
                                <div className="flex items-center space-x-2">
                                    <label className="w-32 text-sm font-medium">Total Fat:</label>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            {...register('nutrition_facts.fat')}
                                            placeholder="e.g., 10"
                                            className={`w-full p-2 border rounded ${errors.nutrition_facts?.fat ? 'border-red-500' : 'border-gray-300'} focus:ring-primary focus:border-primary`}
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">(g)</span>
                                    </div>
                                    {errors.nutrition_facts?.fat && <p className="text-red-500 text-xs mt-1">{errors.nutrition_facts.fat.message}</p>}
                                </div>

                                {/* Total Carbohydrates Input */}
                                <div className="flex items-center space-x-2">
                                    <label className="w-32 text-sm font-medium">Total Carbs:</label>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            {...register('nutrition_facts.carbohydrates')}
                                            placeholder="e.g., 30"
                                            className={`w-full p-2 border rounded ${errors.nutrition_facts?.carbohydrates ? 'border-red-500' : 'border-gray-300'} focus:ring-primary focus:border-primary`}
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">(g)</span>
                                    </div>
                                    {errors.nutrition_facts?.carbohydrates && <p className="text-red-500 text-xs mt-1">{errors.nutrition_facts.carbohydrates.message}</p>}
                                </div>

                                {/* Protein Input */}
                                <div className="flex items-center space-x-2">
                                    <label className="w-32 text-sm font-medium">Protein:</label>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            {...register('nutrition_facts.protein')}
                                            placeholder="e.g., 5"
                                            className={`w-full p-2 border rounded ${errors.nutrition_facts?.protein ? 'border-red-500' : 'border-gray-300'} focus:ring-primary focus:border-primary`}
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">(g)</span>
                                    </div>
                                    {errors.nutrition_facts?.protein && <p className="text-red-500 text-xs mt-1">{errors.nutrition_facts.protein.message}</p>}
                                </div>

                                {/* Sugars Input */}
                                <div className="flex items-center space-x-2">
                                    <label className="w-32 text-sm font-medium">Sugars:</label>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            {...register('nutrition_facts.sugar')}
                                            placeholder="e.g., 15"
                                            className={`w-full p-2 border rounded ${errors.nutrition_facts?.sugar ? 'border-red-500' : 'border-gray-300'} focus:ring-primary focus:border-primary`}
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">(g)</span>
                                    </div>
                                    {errors.nutrition_facts?.sugar && <p className="text-red-500 text-xs mt-1">{errors.nutrition_facts.sugar.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="p-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors mt-6 w-1/2"
                            >
                                Submit Recipe
                            </button>
                        </div>

                        {/* Display carousel if there are uploaded images */}
                        <div className="mb-6">
                            <label className="block font-semibold mb-2 text-[#696969]">Upload Images:</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="p-2 border rounded w-full mb-4 text-[#696969]"
                            />

                            {images.length > 0 && (
                                <div className="carousel-container mt-6">
                                    <div className="carousel-images flex overflow-x-scroll space-x-4 p-2text-[#696969] ">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative w-40 h-40">
                                                <Image
                                                    src={image.url}
                                                    alt={`Uploaded Image ${index + 1}`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}