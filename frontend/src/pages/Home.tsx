import  { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { BASE_API_URL } from "../constants/api";
import ButtonLoader from "../components/ButtonLoader";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);


  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${BASE_API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res?.data?.data);
    } catch (err: any) {
      setError("Failed to fetch todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      await axios.post(
        `${BASE_API_URL}/todos`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      fetchTodos();
    } catch {
      setError("Add todo failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    setSelectedTodoId(id);

    try {
      setDeleteLoader(true);
      await axios.delete(`${BASE_API_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch {
      setError("Delete failed or access denied");
    } finally {
      setDeleteLoader(false);
      setSelectedTodoId(null);
    }
  };

  const handleUpdate = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      await axios.put(
        `${BASE_API_URL}/todos/${id}`,
        { title: editTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      setEditTitle("");
      setError("");
      fetchTodos();
    } catch {
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-start gap-4 mb-6">
        <p className="text-lg font-medium">{user.name}</p>
        <button
          onClick={logout}
          className=" w-16 flex items-center justify-center px-4 py-2 text-white text-sm bg-blue-600 rounded cursor-pointer "
        >
          Logout
        </button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Todo App</h1>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div className="flex mb-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo"
          className="border p-2 flex-grow rounded mr-2"
        />
        <button
          onClick={handleAdd}
          className="w-16 flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          {loading ? <ButtonLoader /> : "Add"}
        </button>
      </div>
      <ul>
        {todos && todos.length > 0 ? (
          todos.map((todo: any) => (
            <li
              key={todo._id}
              className="flex justify-between items-center border-b py-2"
            >
              {editingId === todo._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border px-2 py-1 rounded mr-2"
                  />
                  <button
                    onClick={() => handleUpdate(todo._id)}
                    className="w-16 bg-blue-600 flex items-center justify-center px-2 py-1 rounded text-white mr-2 cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="w-16 bg-red-500  flex items-center justify-center px-2 py-1 rounded text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{todo.title}</span>
                  <div>
                    <button
                      onClick={() => {
                        setEditingId(todo._id);
                        setEditTitle(todo.title);
                      }}
                      className="px-2 py-1 bg-blue-600 rounded text-white mr-2 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="px-2 py-1 bg-red-500 rounded text-white  cursor-pointer"
                    >
                      {deleteLoader && selectedTodoId === todo._id ? (
                        <ButtonLoader />
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <li className="text-center">No Todos Found , Try To Add Todo</li>
        )}
      </ul>
    </div>
  );
};

export default Home;
