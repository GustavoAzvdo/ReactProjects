import { Box, Grid, Typography } from '@mui/material'
import { useTasks } from '../../context/TasksContext';
import dayjs from 'dayjs'

type Nivel = {
  id: number,
  msg: string
}

type TitleTarefasProps = {
  filterPriority: Nivel | null
  filterDate: dayjs.Dayjs | null
  showAll: boolean 
}
const TitleTarefas = ({filterPriority, filterDate, showAll}: TitleTarefasProps) => {
  const {tasks} = useTasks()

    const filteredTasks = showAll
    ? tasks
    : tasks.filter(task => {
        const priorityMatch = filterPriority ? task.priority === filterPriority.msg : true
        const dateMatch = filterDate ? task.dateTask === filterDate.format('DD-MM-YYYY') : true
        return priorityMatch && dateMatch
      })  

  const total = filteredTasks.length

  return (
    <Grid size={{xs: 12, sm: 12, md: 12}}>
      <Box>
        <Typography variant='h5'>Tarefas({total})</Typography>
      </Box>
    </Grid>
  )
}
export default TitleTarefas