import { useState } from "react";
import supabase from "../config/supabaseClients";

function AddTodoModal({ onClose, onAdd }) {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      alert(userError.message);
      return;
    }

    const { error } = await supabase.from("todos").insert([
      {
        user_id: user.id,
        description,
        type,
        due_date: dueDate,
      },
    ]);

    if (error) {
      alert("Error adding todo: " + error.message);
    } else {
      onAdd(); // refresh todos
      onClose(); // close modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-blue-200 p-6 rounded-xl w-100 shadow-xl m-4 text-zinc-950">
        <h2 className="text-xl font-bold mb-4">Add New</h2>
        {/* Task Description */}
        <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
        <input
            required
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
        />
        </div>
        
        {/* Task Type Dropdown */}
        <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Task Type</label>
        <select 
            className="w-full p-2 border rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
        >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="finance">Finance</option>
        </select>
        </div>

        {/* Due Date */}
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
        <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded"
        />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodoModal;
