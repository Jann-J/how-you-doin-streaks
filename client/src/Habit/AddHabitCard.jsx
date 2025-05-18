import { useState } from "react";
import { addHabit } from "../service/habitService";

function AddHabitCard({ userId, onHabitAdded }) {
    const [isOpen, setIsOpen] = useState(false);
    const [habitName, setHabitName] = useState("");
    const [color, setColor] = useState("#cb6ce6"); // default purple
    const [habitType, setHabitType] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!habitName.trim()) return;

        const newHabit = {
            user_id: userId,
            habit_name: habitName,
            habit_color: color,
            habit_type:  habitType,
            created_at: new Date().toISOString(),
        };

        const { error } = await addHabit(newHabit);

        if (error) {
            setError("Failed to add habit.");
        } else {
            setHabitName("");
            setColor("#cb6ce6");
            setHabitType("");
            setIsOpen(false);
            setError(null);
            onHabitAdded(); // Call the function to refresh the habit list
        }
    };

    if (!isOpen) {
        return (
            <div
                className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm w-fit cursor-pointer hover:bg-gray-100"
                onClick={() => setIsOpen(true)}
            >
                <div className="w-4 h-4 rounded-full mr-3 bg-purple-500"></div>
                <div className="text-sm font-medium text-gray-600">Add Habit</div>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm w-fit space-x-3"
        >
            {/* Color Picker */}
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-4 h-4 text-black rounded-full border-none cursor-pointer"
            />

            {/* Name input */}
            <input
                type="text"
                placeholder="Habit name"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                className="text-sm px-2 py-1 text-black outline-none bg-transparent placeholder-gray-400"
                required
            />

            <input
                type="text"
                placeholder="Habit type"
                value={habitType}
                onChange={(e) => setHabitType(e.target.value)}
                className="text-sm text-black px-2 py-1 outline-none bg-transparent placeholder-gray-400"
            />

            {/* Buttons */}
            <button
                type="submit"
                className="text-sm text-white bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded-full"
            >
                Save
            </button>
            <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
            >
                Cancel
            </button>

            {error && <p className="text-red-500 text-xs">{error}</p>}
        </form>
    );
}

export default AddHabitCard;
