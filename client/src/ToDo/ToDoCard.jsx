import { useState } from 'react';
import supabase from '../config/supabaseClients';
import { FaHome, FaBriefcase, FaShoppingCart, FaHeartbeat, FaMoneyBillAlt, FaCheck } from 'react-icons/fa';

function TodoCard({ todo, fetch }) {
  const isComplete = !!todo.completed_at;
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  const onComplete = async () => {
    if (isComplete) return; // Disable if already completed
    
    const { error } = await supabase
      .from("todos")
      .update({ completed_at: new Date() })
      .eq("id", todo.id);

    if (error) {
      alert("Error completing todo: " + error.message);
    } else {
      fetch();
      setShowTypeMenu(false);
    }
  };

  const changeType = async (newType) => {
    if (isComplete) return; // Disable if completed
    
    const { error } = await supabase
      .from("todos")
      .update({ type: newType })
      .eq("id", todo.id);

    if (error) {
      alert("Error changing task type: " + error.message);
    } else {
      fetch();
      setShowTypeMenu(false);
    }
  };

  const taskTypes = [
    { type: 'personal', icon: <FaHome size={20} />, label: 'Personal' },
    { type: 'work', icon: <FaBriefcase size={20} />, label: 'Work' },
    { type: 'shopping', icon: <FaShoppingCart size={20} />, label: 'Shopping' },
    { type: 'health', icon: <FaHeartbeat size={20} />, label: 'Health' },
    { type: 'finance', icon: <FaMoneyBillAlt size={20} />, label: 'Finance' }
  ];

  const currentType = taskTypes.find(t => t.type === todo.type) || taskTypes[0];

  return (
    <div className={`bg-white p-4 rounded-4xl shadow-md flex items-center gap-4 min-w-[250px] ${
      isComplete ? "opacity-80" : ""
    }`}>
      {/* Task type icon - becomes static when completed */}
      <div className="relative">
        {isComplete ? (
          <div className="text-zinc-950 opacity-70">
            {currentType.icon}
          </div>
        ) : (
          <>
            <div 
              className="text-zinc-950 cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => setShowTypeMenu(!showTypeMenu)}
            >
              {currentType.icon}
            </div>
            {showTypeMenu && (
              <div className="absolute left-0 mt-2 w-40 text-zinc-950 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                {taskTypes.map((taskType) => (
                  <div
                    key={taskType.type}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2"
                    onClick={() => changeType(taskType.type)}
                  >
                    {taskType.icon}
                    <span>{taskType.label}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
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
      
      {/* Completion indicator - stays green but becomes static when completed */}
      <div className="flex items-center justify-center ml-auto" style={{ height: '60%' }}>
        <div
          onClick={onComplete}
          className={`aspect-square rounded-full border-2 ${
            isComplete 
              ? "bg-green-300 border-green-500" 
              : "bg-zinc-100 border-zinc-400 cursor-pointer hover:bg-zinc-200"
          } transition-colors`}
          style={{ 
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isComplete && <FaCheck className="text-white" size={14} />}
        </div>
      </div>
    </div>
  );
}

export default TodoCard;