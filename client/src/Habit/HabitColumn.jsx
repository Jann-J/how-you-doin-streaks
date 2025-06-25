import { useEffect, useState } from 'react';
import HabitCard from './HabitCard';
import HabitTrack from './HabitTrack';
import { fetchTracker } from '../service/trackerService';

function HabitColumn({ habit }) {
    const [past7Days, setPast7Days] = useState([]);
    const [todayStatus, setTodayStatus] = useState(false);

    const loadTracker = async () => {
            try {
                const data = await fetchTracker(habit.id);
                const past7 = data.map(item => item.checkin_date);
                const today = data[0]?.checkin_date === new Date().toISOString().split('T')[0];
                setPast7Days(past7);
                setTodayStatus(today);
            } catch (err) {
                console.error(err.message || 'Failed to fetch tracker data.');
            }
    };

    //8 latest checkin dates
    useEffect(() => {

        loadTracker();
    }, [habit.id]);

    return (
        <div className="flex items-center space-x-4 h-10">
            <HabitCard habit={habit} />
            <HabitTrack
                habitId={habit.id}
                userId={habit.user_id}
                past7Days={past7Days}
                todayStatus={todayStatus}
                reloadTracker={loadTracker}
                habitColor={habit.habit_color}
            />
        </div>
    );
}

export default HabitColumn;
// This component is used to display a single habit along with its tracking status.
// It takes a `habit` prop which contains the habit details and its tracking status.