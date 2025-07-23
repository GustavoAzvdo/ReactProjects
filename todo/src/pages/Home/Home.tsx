import TextField from '@mui/material/TextField'
import { Autocomplete, Box, Button, Card, CardContent, Container, Divider, Grid, Stack, Typography } from '@mui/material'

//React Bits


import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
// components
import Navtab from '../../components/Navtab/Navtab'
import CardTarefa from '../../components/CardTarefa/CardTarefa';
import TitleTarefas from '../../components/TitleTarefas/TitleTarefas';
import Filtro from '../../components/Filtro/Filtro';
import TotalTarerfas from '../../components/TotalTarefas.tsx/TotalTarerfas';

//firebase
import { getAuth } from "firebase/auth";
import { app } from '../../firebase/firebase';
import { useState, useEffect } from 'react';

//itens do campo de data
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTasks } from '../../context/TasksContext';

//data pt-br
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

type Nivel = {
  id: number,
  msg: string
}

const nivel: Nivel[] = [
  { id: 1, msg: 'Baixa' },
  { id: 2, msg: 'Média' },
  { id: 3, msg: 'Alta' }
]

const Home = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState<Nivel | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false)
  const {addTask} = useTasks()

  
  const auth = getAuth(app);

const handleAddTask = async () => {
    const user = auth.currentUser;
    if (!user || !task || !priority) return;
    try {
      await addTask({
        task,
        priority: priority.msg,
        completed: false,
      });
      setTask('');

      setPriority(null);
      
    } catch (err) {
      // Trate o erro
      console.error(err);
    }
  };
  useEffect(() => {
    if (task.trim() !== '' && priority?.msg != undefined) {
      setIsValid(true)
    }
    else {
      setIsValid(false)
    }
  }, [task, priority])
  return (
    <>
      <Navtab />
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }} sx={{ my: 1 }}>
            <Box className='title' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
              <Stack direction='row'>
                <Typography variant='h3' sx={{ fontWeight: 400 }}>Adicione sua</Typography>

                <Typography variant='h3' color='primary' sx={{ fontWeight: 600, pl: 1, }}> Task  </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                  <TipsAndUpdatesRoundedIcon color='primary' sx={{ fontSize: '42px', }} />
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 8 }} sx={{}}>
            <Card elevation={3} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gap={2} gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#c5c5c5' }}>
                  <AssignmentRoundedIcon />  Adicionar Nova Tarefa
                </Typography>
               <Stack direction='row' spacing={2} sx={{ mb: 2, alignItems: 'center', my: 2 }}>

                  <Grid size={{ xs: 12, sm: 12, md: 5 }} sx={{ mb: 2 , pt: 1}}>
                    <TextField
                      fullWidth
                      label="Digite sua Task"
                      variant="outlined"
                      value={task}
                      onChange={e => setTask(e.target.value)}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 12, md: 3 }} sx={{ mb: 2, pt: 1 }}>
                    <Autocomplete
                      options={nivel}
                      value={priority}
                      onChange={(_, value) => {
                        if (typeof value === 'object' && value !== null && 'msg' in value) {
                          setPriority(value as Nivel);
                        } else {
                          setPriority(null);
                        }
                      }}
                      renderInput={(params) => <TextField {...params} label="Prioridade" variant="outlined" />}
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>

                          {option.msg}
                        </li>
                      )}
                      sx={{ width: '100%' }}

                      disablePortal
                      disableCloseOnSelect
                      getOptionLabel={(option) => typeof option === 'string' ? option : `${option.msg}`}
                      isOptionEqualToValue={(option, value) => option === value}

                      freeSolo
                      fullWidth
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys

                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <Box sx={{ width: '100%' }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker label="Escolha uma data" format='DD/MM/YYYY'/>
                        </DemoContainer>
                      </LocalizationProvider>

                    </Box>
                  </Grid>
                </Stack>
                <Grid size={{ xs: 12, sm: 12, md: 12 }} sx={{ mb: 2 }}>
                  <Button
                  disabled={!isValid}
                    variant="contained"
                    color="primary"
                    fullWidth
                    endIcon={<AddTaskRoundedIcon />}
                    onClick={handleAddTask}
                  >
                    Adicionar Task
                  </Button>
                </Grid>

              </CardContent>
            </Card>

          </Grid>
          {/* Componente de total de tarefas que vou passar via props */}
          <TotalTarerfas />
          {/*  */}

          <Filtro />
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Divider />
          </Grid>
          <TitleTarefas />
          <CardTarefa />
        </Grid>
      </Container>
    </>
  )
}

export default Home