import { Card, Grid, Typography } from '@mui/material'
import TaskRoundedIcon from '@mui/icons-material/TaskRounded'
import { useTasks } from '../../context/TasksContext';

const TotalTarerfas = () => {
    const { tasks } = useTasks();

  const total = tasks.length;
  const pendentes = tasks.filter(t => !t.completed).length;
  const concluidas = tasks.filter(t => t.completed).length;
  const urgentes = tasks.filter(t => t.priority === 'Urgente').length;


    return (
        <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ alignItems: 'center', mt: 1 }}>
            <Card elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gap={2} gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#c5c5c5' }}>
                    <TaskRoundedIcon /> Tarefas
                </Typography>
                <Grid container spacing={2} textAlign="center" sx={{ my: 2 }}>
                    <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                        <Typography variant="h6" color="info">{total}</Typography>
                        <Typography variant="body2">Total</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                        <Typography variant="h6" color="warning">{pendentes}</Typography>
                        <Typography variant="body2">Pendentes</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                        <Typography variant="h6" color="success">{concluidas}</Typography>
                        <Typography variant="body2">Concluídas</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                        <Typography variant="h6" color="error">{urgentes}</Typography>
                        <Typography variant="body2">Urgentes</Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default TotalTarerfas
