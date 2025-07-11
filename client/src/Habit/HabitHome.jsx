import { useEffect, useState } from "react";

import HabitCard from "./HabitCard";
import AddHabitCard from "./AddHabitCard";
import HabitTrack from "./HabitTrack";
import HabitColumn from "./HabitColumn";

import supabase from "../config/supabaseClients";
import { fetchHabits } from "../service/habitService";

function HabitHome() {
    const [habits, setHabits] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const fetchUser = async() => {
        const {data : { user }, error: userError} = await supabase.auth.getUser();
        if (userError) {
            setError(userError.message);
            return;
        }
        setUser(user);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        const loadHabits = async () => {
            try {
                const data = await fetchHabits(); // should return habits list
                setHabits(data);
                if(data.length === 0) {
                    setError("No habits found.");
                }
            } catch (err) {
                setError(err.message || "Failed to fetch habits.");
            }
        };

        loadHabits();
    }, []);

    return (
        <div className="p-4 space-y-4">
            {error && <div className="text-red-500">{error}</div>}

            {habits.length === 0 && !error && (
                <div className="text-gray-500">No habits found.</div>
            )}
            <h1 className="text-3xl font-satisfy font-bold poppins text-center mb-6">
            Track Habits 'ere
            </h1>

            {/* Use flex-column instead of grid */}
            <div className="flex flex-col space-y-2">
                {habits.map((habit) => (
                    <HabitColumn key={habit.id} habit={habit} />
                ))}
            </div>

            <AddHabitCard onHabitAdded={fetchHabits} userId={user ? user.id : null} />
        </div>

    );
}


//
//customised message
//traker
//design will be something like this
//
export default HabitHome;