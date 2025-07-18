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

                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 12, md: 3 }} sx={{ mb: 2 }}>
                    <Autocomplete
                      options={nivel}
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
                    <Button variant="contained" color="primary" fullWidth endIcon={<AddTaskRoundedIcon/>}>
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