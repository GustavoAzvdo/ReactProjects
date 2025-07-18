import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const TitleTarefas = () => {
  return (
    <Grid size={{xs: 12, sm: 12, md: 12}}>
        <Box>
            <Typography variant='h5'>Tarefas(0)</Typography>
        </Box>
    </Grid>
  )
}

export default TitleTarefas