import supabase from "../config/supabaseClients";

//fetches habits of user
export const fetchHabits = async () => {
    const {
        data : { user }, 
        error : userError,
    } = await supabase.auth.getUser();

    if (userError){
        throw new Error(userError.message);
    }

    const {data : habits, error : habitError} = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .order('date_created', {ascending: false});

    if (habitError){
        throw new Error(habitError.message);
    }
    console.log(habit_tracker); //delete later
    return {user, habits};
}

//adds habit table
export const addHabit = async(habitData) => {
    return await supabase
        .from('habits')
        .insert([habitData]);
}


//updates color of habit (hex)
export const updateHabitColor = async (habitId, newColor) => {
    return await supabase
        .from('habits')
        .update({ habit_color : newColor })
        .eq('id', habitId);
}

//updates streak maintained by user
export const updateStreak = async (user_id) => {
    return await supabase
        .from('users')
        .update({streak : streak + 1})
        .eq('id', user_id);

}

//to unable a habit
const disableHabit = async (habitId) => {
    return await supabase
        .from('habits')
        .update({status : true})
        .eq('id', habitId);
}

//to delete a habit
const deleteHabit = async (habitId) => {
    return await supabase
        .from('habits')
        .delete()
        .eq('id', habitId);
}