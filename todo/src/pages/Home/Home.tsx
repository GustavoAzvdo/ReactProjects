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
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from '../../firebase/firebase';
import { useState } from 'react';

type Nivel = {
  emoji: string,
  msg: string
}

const nivel: Nivel[] = [
  { emoji: '😎', msg: 'Suave' },
  { emoji: '😐', msg: 'Normal' },
  { emoji: '🤯', msg: 'Urgente' }
]

const Home = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState<Nivel | null>(null);

  const db = getFirestore(app);
  const auth = getAuth(app);

  const handleAddTask = async () => {
    const user = auth.currentUser;
    if (!user || !task || !priority) return;
    try {
      await addDoc(collection(db, "tasks"), {
        uid: user.uid,
        task,
        priority: priority.msg,
        emoji: priority.emoji,
        completed: false,
        createdAt: new Date()
      });
      setTask('');
      setPriority(null);
      // Atualize a lista de tarefas se necessário
    } catch (err) {
      // Trate o erro
      console.error(err);
    }
  };
  return (
    <>
      <Navtab />
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
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

                  <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Digite sua Task"
                      variant="outlined"
                      value={task}
                      onChange={e => setTask(e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 12, md: 3 }} sx={{ mb: 2 }}>
                    <Autocomplete
                      options={nivel}
                      value={priority ?? undefined}
                      onChange={(_, value) => {
                        if (typeof value === 'object' && value !== null && 'emoji' in value && 'msg' in value) {
                          setPriority(value as Nivel);
                        } else {
                          setPriority(null);
                        }
                      }}
                      renderInput={(params) => <TextField {...params} label="Prioridade" variant="outlined" />}
                      renderOption={(props, option) => (
                        <li {...props}>

                          {option.emoji} - {option.msg}
                        </li>
                      )}
                      sx={{ width: '100%' }}
                      disableClearable
                      disablePortal
                      disableCloseOnSelect
                      getOptionLabel={(option) => typeof option === 'string' ? option : `${option.emoji} - ${option.msg}`}
                      isOptionEqualToValue={(option, value) => option === value}

                      freeSolo
                      fullWidth
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ mb: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      endIcon={<AddTaskRoundedIcon />}
                      onClick={handleAddTask}
                    >
                      Adicionar Task
                    </Button>
                  </Grid>
                </Stack>

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