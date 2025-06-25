import { useEffect, useState } from "react";
import supabase from "../config/supabaseClients";
import AddTodoModal from "./AddToDoModel";
import TodoCard from "./ToDoCard";


// Add Todo Card (placeholder)
function AddTodoCard({onClick}) {
  return (
    <div onClick={onClick} 
    className="bg-blue-400 p-4 rounded-4xl shadow-md flex items-center justify-center cursor-pointer hover:bg-blue-300 transition">
      <span className="text-xl font-bold">+ Add Todo</span>
    </div>
  );
}

function ToDoHabitHome() {
  const [toDos, setToDos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const maxVisible = 8; // Change as needed

  const fetchToDos = async () => {
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      setError(userError.message);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("date_created", { ascending: false });
    
    if (error) {
      setError(error.message);
    } else {
      setToDos(data);
      
      console.log(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchToDos();
  }, []);

  const sortedTodos = [...toDos].sort((a, b) => {
        if (!!a.completed_at === !!b.completed_at) return 0;
        return a.completed_at ? 1 : -1;
    });

  const visibleTodos = showAll ? sortedTodos : sortedTodos.slice(0, maxVisible);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-satisfy font-bold poppins text-center mb-6">
        To-do list
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading ? (
        <p className="text-center">Summoning the ancient scrolls of productivity…</p>
      ) : (
        <div className="grid grid-row-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4 gap-4">
          {visibleTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo}  fetch={fetchToDos}/>
          ))}

          {toDos.length > maxVisible && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="rounded-lg bg-cyan-400 text-white font-semibold px-4 py-2"
            >
              Show More...
            </button>
          )}

          <AddTodoCard onClick={() => setShowModal(true)}/>
        </div>
      )}

      {showModal && (
        <AddTodoModal
          onClose={() => setShowModal(false)}
          onAdd={fetchToDos}
        />
      )}
    </div>
  );
}

export default ToDoHabitHome;
