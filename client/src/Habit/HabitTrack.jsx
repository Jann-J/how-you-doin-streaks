import { addDateHabitTracker, deleteHabitTracker } from "../service/trackerService";

function HabitTrack({ habitId, userId, past7Days, reloadTracker, habitColor }) {
    const today = new Date().toISOString().split('T')[0];

    // Generate past 7 days (oldest to newest, rightmost is today)
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
    });

    // Check if a date is checked in
    const isChecked = (date) => past7Days.includes(date);

    const handleToggleDate = async (date) => {
        try {
            if (isChecked(date)) {
                await deleteHabitTracker(habitId, date);
            } else {
                await addDateHabitTracker(habitId, date, userId);
            }
            if (reloadTracker) reloadTracker();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex items-center">
            {days.map((date, idx) => (
                <div
                    key={date}
                    className={`w-7 h-7 rounded-md border cursor-pointer flex items-center justify-center mx-1 transition
                        ${date === today ? "ml-4 border-2 border-indigo-400" : ""}
                    `}
                    style={{
                        backgroundColor: isChecked(date) ? (habitColor || "#3B82F6") : "#fff",
                        borderColor: isChecked(date) ? (habitColor || "#3B82F6") : "#d1d5db",
                        boxShadow: date === today && isChecked(date) ? "0 0 0 2px #06b6d4" : undefined,
                    }}
                    onClick={() => handleToggleDate(date)}
                    title={date === today ? "Today" : date}
                >
                    {isChecked(date) && (
                        <span className="block w-2 h-2 rounded-full bg-white"></span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default HabitTrack;