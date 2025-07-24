import { Grid, Stack, Card, CardContent, Box, Checkbox, Typography, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { DeleteRounded } from '@mui/icons-material'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from '../../firebase/firebase';
import { useTasks } from '../../context/TasksContext';
import Aviso from '../Aviso/Aviso';
import dayjs from 'dayjs'

const TaskColor: Record<string, "error" | "primary" | "success"> = {
  alta: "error",
  media: "primary",
  baixa: "success",
};


interface CardTarefaProps {
  filterPriority?: { msg: string };
  filterDate?: dayjs.Dayjs;
  showAll: boolean
}

const CardTarefa = ({ filterPriority, filterDate, showAll }: CardTarefaProps) => {
  const [snackbar, setSnackbar] = useState<{open: boolean, mensage: string, severity: "success" | "error" | "warning" | undefined, onClose: boolean}>({open: false, mensage: '', severity: 'success', onClose: false})
  const [task, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const { tasks,deleteTask, updateTask } = useTasks()



  const filteredTasks = showAll
    ? tasks
    : tasks.filter(task => {
        const priorityMatch = filterPriority ? task.priority === filterPriority.msg : true;
        const dateMatch = filterDate ? task.dateTask === filterDate.format('DD-MM-YYYY') : true;
        return priorityMatch && dateMatch;
      });

  const fetchTasks = async () => {
    try {
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
      const userTasks = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt && typeof data.createdAt.toDate === 'function'
            ? data.createdAt.toDate()
            : null
        };
      });
      setTasks(userTasks);
    } catch (err) {
      setError('Erro ao buscar tarefas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [task]);

  const handleToggleTask = async (taskId: string, currentValue: boolean) => {
    updateTask(taskId, !currentValue);
  }

  const handleDeleteClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setOpenDialog(true);
    fetchTasks()
  };

  const handleConfirmDelete = async () => {
    if (!selectedTaskId) return;
    try {

      await deleteTask(selectedTaskId)
      setSnackbar({ open: true, mensage: 'Tarefa apagada com sucesso!', severity: "success" , onClose: true});
      setOpenDialog(false);
      setSelectedTaskId(null);
      fetchTasks();
    } catch (err) {
      setSnackbar({ open: true, mensage: 'Erro ao apagar a tarefa!', severity: "error", onClose: false });
      setOpenDialog(false);
      setSelectedTaskId(null);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTaskId(null);
  };



  if (loading) return <Typography sx={{ mt: 2 }}>Carregando tarefas...</Typography>;
  if (error) return <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>;

  return (
    <>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Stack direction='column'>
          {filteredTasks.length === 0 ? (
            <Typography sx={{ mb: 1, textAlign: 'center', color: '#aaa' }}>
              Nenhuma tarefa adicionada
            </Typography>
          ) : (
            filteredTasks.map(task => (
              <Card key={task.id}
                elevation={2}
                sx={{
                  mb: 2,
                  opacity: task.completed ? 0.7 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Checkbox checked={task.completed} color="primary" onChange={() => handleToggleTask(task.id, task.completed)} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          textDecoration: task.completed ? "line-through" : "none",

                        }}
                      >
                        {task.task}
                      </Typography>
                      {task.createdAt && (
                        <Box>

                          <Typography variant="body2" color="text.secondary">
                            Adicionada em: {task.createdAt.toLocaleDateString("pt-BR")} às{" "}
                            {task.createdAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Para: {dayjs(task.dateTask, 'DD-MM-YYYY').format('DD/MM/YYYY')}

                          </Typography>
                        </Box>

                      )}
                    </Box>
                    <Chip
                      color={TaskColor[task.priority.toLowerCase()] || 'default'}
                      label={task.priority || 'Normal'}
                      size='small'
                      variant={task.completed ? 'outlined' : 'filled'}
                    />
                    <IconButton color="error" size="small" onClick={() => handleDeleteClick(task.id)}>
                      <DeleteRounded />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Apagar tarefa</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza que deseja apagar esta tarefa?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">Apagar</Button>
        </DialogActions>
      </Dialog>
 
      {/* Snackbar */}
      <Aviso
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        open={snackbar.open}
        mensage={snackbar.mensage}
      />
      
    </>
  )
}

export default CardTarefa