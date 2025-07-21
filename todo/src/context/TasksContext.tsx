import { createContext, useContext, useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase";

type Task = {
  id?: string;
  task: string;
  priority: string;
  emoji?: string;
  completed: boolean;
  createdAt: any;
  uid: string;
};

type TasksContextType = {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Omit<Task, "id" | "createdAt" | "uid">) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
  updateTask: (id: string, completed: boolean) => Promise<void>;

};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, () => {
      fetchTasks();
    });
    return () => unsubscribe();
  }, []);
  const fetchTasks = async () => {
    setLoading(true);
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }
    const db = getFirestore(app);
    const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const userTasks = querySnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt && typeof data.createdAt.toDate === "function" ? data.createdAt.toDate() : null,
      } as Task;
    });
    setTasks(userTasks);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
    // Você pode adicionar um listener para mudanças no auth se quiser
  }, []);

  const addTask = async (taskData: Omit<Task, "id" | "createdAt" | "uid">) => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) return;
    const db = getFirestore(app);
    await addDoc(collection(db, "tasks"), {
      ...taskData,
      uid: user.uid,
      createdAt: new Date(),
    });
    await fetchTasks();
  };

  const deleteTask = async (id: string) => {
    const db = getFirestore(app);
    await deleteDoc(doc(db, "tasks", id));
    await fetchTasks();
  };

  const updateTask = async (id: string, completed: boolean) => {
    const db = getFirestore(app);
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, { completed });
    fetchTasks();
  }
  return (
    <TasksContext.Provider value={{ tasks, loading, addTask, deleteTask, fetchTasks, updateTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
};