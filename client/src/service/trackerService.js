import supabase from "../config/supabaseClients";

//fetches habit tracker data of user for past 7 days and today
//returns habit tracker data of user
export const fetchTracker = async (habitId) => {
    const { data, error} = await supabase
        .from('habit_checkins')
        .select('*')
        .eq('habit_id', habitId)
        .order('date', {ascending: false})
        .limit(8);

        if (error){
            throw new Error(error.message);
        }
        return data;
}


//updates habit tracker data when a habit is completed today or before today
export const addDateHabitTracker = async (habitId, newDate, user) => {
    const {data, user} = await supabase
        .from('habit_checkins')
        .insert([{
            habit_id : habitId,
            checkin_date : newDate,
            user_id : user.id,
        }])
}