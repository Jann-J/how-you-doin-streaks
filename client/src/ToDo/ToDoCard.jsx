import supabase from "../config/supabaseClients";
import { FaHome, FaBriefcase, FaShoppingCart, FaHeartbeat, FaMoneyBillAlt } from 'react-icons/fa';

// Individual card
function TodoCard({ todo , fetch}) {
  const isComplete = !!todo.completed_at;

  const onComplete = async () => {
    const { error } = await supabase
      .from("todos")
      .update({ completed_at: new Date() })
      .eq("id", todo.id);
        console.log("todo", todo);
    if (error) {
      alert("Error completing todo: " + error.message);
    } else {
        fetch(); // refresh todos
    }
  }

  // Get appropriate icon based on task type
  const getTaskIcon = () => {
    const iconSize = 24;
    switch(todo.type) {
      case 'shopping':
        return <FaShoppingCart size={iconSize} />;
      case 'work':
        return <FaBriefcase size={iconSize} />;
      case 'health':
        return <FaHeartbeat size={iconSize} />;
      case 'finance':
        return <FaMoneyBillAlt size={iconSize} />;
      default: // personal
        return <FaHome size={iconSize} />;
    }
  };

  return (
    <div className={`bg-white p-4 rounded-xl shadow-md flex items-center gap-4 min-w-[250px] ${
      isComplete ? "opacity-80" : ""
    }`}>
      {/* Task type icon */}
      <div className={`text-zinc-950 ${isComplete ? "opacity-70" : ""}`}>
        {getTaskIcon()}
      </div>
      
      <div className="flex-1">
        <div className={`text-zinc-950 ${
          isComplete ? "line-through opacity-80" : ""
        }`}>
          {todo.description}
        </div>
        <div className={`text-sm ${
          isComplete ? "text-gray-400" : "text-gray-500"
        }`}>
          {isComplete
            ? `Completed: ${new Date(todo.completed_at).toLocaleDateString()}`
            : `Due: ${new Date(todo.due_date).toLocaleDateString()}`}
        </div>
      </div>
      
      {/* Completion indicator */}
      <div className="flex items-center justify-center ml-auto" style={{ height: '60%' }}>
        <div
          onClick={onComplete}
          className={`aspect-square rounded-full border-2 cursor-pointer transition-colors ${
            isComplete 
              ? "bg-green-200 border-green-400" 
              : "bg-zinc-100 border-zinc-400 hover:bg-zinc-200"
          }`}
          style={{ 
            width: '100%',
            maxWidth: '100%',
            height: '100%' 
          }}
        ></div>
      </div>
    </div>
  );
}

export default TodoCard;