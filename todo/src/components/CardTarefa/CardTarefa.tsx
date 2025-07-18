import { Grid, Stack, Card, CardContent, Box, Checkbox, Typography, IconButton, Chip } from '@mui/material'
import {DeleteRounded} from '@mui/icons-material'

const CardTarefa = () => {
    return (
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Stack direction='column'>
                <Card
                    elevation={1}
                    // sx={{
                    //     opacity: task.completed ? 0.7 : 1,
                    //     transition: "opacity 0.2s",
                    // }}
                >
                    <CardContent>
                         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Checkbox defaultChecked color="primary" />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="body1"
                        // sx={{
                        //   textDecoration: task.completed ? "line-through" : "none",
                        //   fontWeight: task.type === "urgente" ? "bold" : "normal",
                        // }}
                      >
                        Tarefa 01
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Adicionada em: 18/07/2025 às 15:01
                        {/* {task.date.toLocaleDateString("pt-BR")} às{" "}
                        {task.date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} */}
                      </Typography>
                    </Box>
                           
                            {/* Chip q mostra o tipo de urgencia da tarefa */}
                    {/* <Chip
                        label={taskTypeLabels[task.type]}
                        color={taskTypeColors[task.type]}
                        size="small"
                        variant={task.completed ? "outlined" : "filled"}
                      /> */}
                    <Chip
                        label='Normal'
                        size='small'
                    />
                    <IconButton color="error" size="small">
                      <DeleteRounded />
                    </IconButton>
                  </Box>
                    </CardContent>
                </Card>
            </Stack>
        </Grid>
    )
}

export default CardTarefa