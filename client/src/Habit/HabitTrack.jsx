import { addDateHabitTracker, deleteHabitTracker } from "../service/trackerService";

function HabitTrack({ past7Days, todayStatus }) {
    // This component is used to display the tracking status of a habit.
    return (
        <div className="flex items-center space-x-1">
            {past7Days.map((status, idx) => (
                <div key={idx} className={`w-6 h-6 rounded-md ${status ? 'bg-blue-500' : 'bg-white border'}`}></div>
            ))}

            <div className={`w-6 h-6 rounded-md ${todayStatus ? 'bg-cyan-500' : 'bg-white border'}`}></div>

            {[...Array(7)].map((_, idx) => (
                <div key={idx} className="w-6 h-6 rounded-md bg-gray-100"></div>
            ))}
        </div>
    );
}

export default HabitTrack;