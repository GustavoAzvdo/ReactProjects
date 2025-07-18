import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import TextField from '@mui/material/TextField'
import { Autocomplete, Box, Button, Card, CardContent, Checkbox, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'

// icones
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
// components
import TotalTarerfas from './components/TotalTarerfas';
import Filtro from './components/Filtro';

type Nivel = {
  emoji: string,
  msg: string
}

const nivel: Nivel[] = [
  { emoji: '😎', msg: 'Suave' },
  { emoji: '😐', msg: 'Normal' },
  { emoji: '🤯', msg: 'Urgente' }
]

function App() {

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <>
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
                <Typography variant="h6"  gap={2} gutterBottom sx={{display:'flex', alignItems: 'center', color: '#c5c5c5' }}>
                  <AssignmentRoundedIcon />  Adicionar Nova Tarefa
                </Typography>
                <Stack direction='row' spacing={2} sx={{ mb: 2,alignItems: 'center', my: 2 }}>

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
                      renderInput={(params) => <TextField {...params} label="Prioridade"  variant="outlined" />}
                      renderOption={(props, option, { selected }) => (
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
                  <Grid size={{ xs: 12, sm: 12, md: 3 }} sx={{ mb: 2 }}>
                    <Button variant="contained" color="primary" fullWidth>
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
        </Grid>
      </Container>
    </>
  )
}

export default App
