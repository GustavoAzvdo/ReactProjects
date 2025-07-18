//Componentes
import { Box, Button, Card, CardContent, Grid, Typography, TextField, Autocomplete, Stack, FormControl, Radio, RadioGroup, FormControlLabel, Checkbox, FormGroup } from '@mui/material'

//iCONES
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

//Itens do camppo de data
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Check, CheckBox } from '@mui/icons-material';

type Nivel = {
    emoji: string,
    msg: string
}

const nivel: Nivel[] = [
    { emoji: '😎', msg: 'Suave' },
    { emoji: '😐', msg: 'Normal' },
    { emoji: '🤯', msg: 'Urgente' }
]

const Filtro = () => {
    return (
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Card elevation={3} sx={{ mb: 3 }}>
                <CardContent>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6" color='' gap={2} gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#c5c5c5' }}>
                            <FilterListRoundedIcon /> Filtro
                        </Typography>

                        <Box>
                            <Button startIcon={<CloseRoundedIcon />}>
                                Limpar
                            </Button>
                        </Box>
                    </Box>
                    <Stack direction='row' gap={2}>
                        <Grid size={{ xs: 12, sm: 12, md: 2 }}>
                            <Autocomplete
                                options={nivel}
                                renderInput={(params) => <TextField {...params} label="Prioridade" variant="outlined" />}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>

                                        {option.emoji} - {option.msg}
                                    </li>
                                )}
                                sx={{ width: '100%', pt: '8px' }}
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
                        <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Escolha uma data" />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 3 }} sx={{ display: 'flex' , alignItems:'center'}}>
                            <Box  >
                                <FormGroup>

                                    <FormControlLabel control={<Checkbox defaultChecked/>} label='Mostrar todos'/>
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