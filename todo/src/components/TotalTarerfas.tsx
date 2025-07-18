import { Card, Grid, Paper, Typography } from '@mui/material'
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';

const TotalTarerfas = () => {
    return (
        <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ alignItems: 'center', mt: 1}}>
            <Card elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gap={2} gutterBottom sx={{display: 'flex',alignItems: 'center', color: '#c5c5c5'}}>
                    <TaskRoundedIcon/> Tarefas
                </Typography>
                <Grid container spacing={2} textAlign="center" sx={{ my: 2 }}>
                    <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                        <Typography variant="h6" color="info">
                            {/* 0 Tasks Pendentes */} 0
                        </Typography>
                        <Typography variant="body2">Total</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                        <Typography variant="h6" color="warning">
                            {/* 0 Tasks Pendentes */} 0
                        </Typography>
                        <Typography variant="body2">Pendentes</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                        <Typography variant="h6" color="success">
                            {/* 0 Tasks Pendentes */} 0
                        </Typography>
                        <Typography variant="body2">Concluidas</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 3 }}>
                        <Typography variant="h6" color="error">
                            {/* 0 Tasks Pendentes */} 0
                        </Typography>
                        <Typography variant="body2">Urgentes</Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default TotalTarerfas