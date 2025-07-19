import { Box, Grid, Typography } from '@mui/material'
import { useTasks } from '../../context/TasksContext';
const TitleTarefas = () => {
  const {tasks} = useTasks()

  const total = tasks.length

  return (
    <Grid size={{xs: 12, sm: 12, md: 12}}>
      <Box>
        <Typography variant='h5'>Tarefas({total})</Typography>
      </Box>
    </Grid>
  )
}
export default TitleTarefas