import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import AppRoutes from './routes/AppRoutes';
import { TasksProvider } from './context/TasksContext';

const App = () => {
 
  return (
  
      <TasksProvider>
        <AppRoutes />
      </TasksProvider>
   
  )
}

export default App
