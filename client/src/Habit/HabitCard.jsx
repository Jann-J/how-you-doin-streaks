import { useState } from "react";
import { updateHabitColor } from "../service/habitService";

const COLOR_OPTIONS = ["#3B82F6", "#F472B6", "#FBBF24", "#EF4444", "#10B981"]; // blue, pink, yellow, red, green

function HabitCard({ habit }) {
    const [showColors, setShowColors] = useState(false);

    const handleColorChange = async (newColor) => {
        await updateHabitColor(habit.id, newColor);
        setShowColors(false);
        // Optionally trigger a re-fetch or state update
    };

    return (
        <div className="relative flex items-center bg-white rounded-full px-4 py-2 shadow-sm w-50">
            {/* Colored Circle */}
            <div
                className="w-4 h-4 rounded-full mr-3 cursor-pointer"
                style={{ backgroundColor: habit.habit_color}}
                onClick={() => setShowColors((prev) => !prev)}
            ></div>

            {/* Habit Name */}
            <div className="text-sm font-medium text-gray-800">{habit.habit_name}</div>

            {/* Color Picker */}
            {showColors && (
                <div className="absolute top-10 left-2 bg-white p-2 rounded-md shadow flex gap-2 z-10">
                    {COLOR_OPTIONS.map((color) => (
                        <div
                            key={color}
                            className="w-4 h-4 rounded-full cursor-pointer border"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color)}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HabitCard;
