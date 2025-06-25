import supabase from "../config/supabaseClients";

//fetches habit tracker data of user for past 7 days and today
//returns habit tracker data of user
export const fetchTracker = async (habitId) => {
    const { data, error} = await supabase
        .from('habit_checkins')
        .select('*')
        .eq('habit_id', habitId)
        .order('checkin_date', {ascending: false})
        .limit(8);
        console.log(data);
        if (error){
            throw new Error(error.message);
        }
        return data;
}


//updates habit tracker data when a habit is completed today or before today
export const addDateHabitTracker = async (habitId, newDate, userId) => {
    const { error } = await supabase
        .from('habit_checkins')
        .insert([{
            habit_id: habitId,
            checkin_date: newDate,
            user_id: userId,
        }], { upsert: true, onConflict: 'habit_id,checkin_date,user_id' }); // upsert prevents duplicates
    if (error && error.code !== '23505') { // 23505 is unique violation
        throw new Error(error.message);
    }
};

//acts like toggle onClick
//if date is already present, it will remove the date from habit tracker
export const deleteHabitTracker = async (habitId, newDate) => {
    const {data, error} = await supabase
        .from('habit_checkins')
        .delete()
        .eq('habit_id', habitId)
        .eq('checkin_date', newDate);

    if (error){
        throw new Error(error.message);
    }
}