//Componentes
import { Box, Button, Card, CardContent, Grid, Typography, TextField, Autocomplete, Stack, FormControlLabel, Checkbox, FormGroup } from '@mui/material'

//iCONES
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

//Itens do camppo de data
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

type FiltroProps = {
    priority: Nivel | null;
    setPriority: (value: Nivel | null) => void;
    date: dayjs.Dayjs | null;
    setDate: (value: dayjs.Dayjs | null) => void;
    showAll: boolean;
    setShowAll: (value: boolean) => void
};

const Filtro = ({ priority, setPriority, date, setDate, showAll, setShowAll }: FiltroProps) => {


    
    
    return (
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Card elevation={3} sx={{ mb: 3 }}>
                <CardContent>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6" color='' gap={2} gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#c5c5c5' }}>
                            <FilterListRoundedIcon /> Filtro
                        </Typography>

                        <Box>
                            <Button startIcon={<CloseRoundedIcon />} onClick={() => {setPriority(null); setDate(null); }}>
                                Limpar
                            </Button>
                        </Box>
                    </Box>
                    <Stack direction={{ xs: 'column',sm: 'column', md: 'row' }}  gap={2}>
                        <Grid size={{ xs: 12, sm: 12, md: 2 }}>
                            <Autocomplete
                                options={nivel}
                                value={priority}
                                onChange={(_, value) => {
                                    if (typeof value === 'object' || value === null) {
                                        setPriority(value as Nivel | null);
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} label="Prioridade" variant="outlined" />}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.id}>

                                        {option.msg}
                                    </li>
                                )}
                                sx={{ width: '100%', pt: 1 }}

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
                        <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker 
                                        label="Escolha uma data" 
                                        value={date}
                                        onChange={setDate}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box  >
                                <FormGroup>
                                    <FormControlLabel control={
                                        <Checkbox 
                                            checked={showAll}
                                            onChange={e => setShowAll(e.target.checked)}
                                        />
                                    } 
                                    label='Mostrar todas as tarefas' />
                                </FormGroup>
                            </Box>
                        </Grid>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Filtro