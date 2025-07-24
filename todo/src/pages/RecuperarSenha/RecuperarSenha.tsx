import { Box, Button, Card, CardContent, Container, Divider, IconButton, InputAdornment, Link as MuiLink, Stack, TextField, Typography } from '@mui/material'
import { TipsAndUpdatesRounded, AlternateEmailRounded, SendRounded } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const RecuperarSenha = () => {
    const navigate = useNavigate()
    const handleCodigo = () => {
        navigate('/codigo')
    }
    return (
        <>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh ' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '400px', height: '540px' }}>
                    <Card elevation={5} sx={{ width: '100%', height: '100%', borderRadius: '15px' }}>
                        <CardContent>
                            <Box>
                                <Stack direction='row'>

                                    <Typography variant='h5' color='primary' sx={{ fontWeight: 600, pl: 1, }}> Taskz  </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                                        <TipsAndUpdatesRounded color='primary' sx={{ fontSize: '20px', }} />
                                    </Box>
                                </Stack>
                            </Box>
                            <Box sx={{ pt: 5 }}>
                                <Stack direction='column' gap={2}>
                                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                                        <Typography variant='h4' sx={{ fontWeight: 600, pl: 1, pb: 2 }}> Recuperar Senha  </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, pl: 1 }}> Não lembra sua senha? Insira o email que você cadastrou sua conta para poder recupera-lá!  </Typography>

                                    </Box>
                                    <Box component='form' sx={{ alignItems: 'center', justifyContent: 'center', mt: 5 }} >
                                        <TextField
                                            fullWidth

                                            size='small'
                                            type='email'
                                            label='E-mail'
                                            variant='outlined'
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton>
                                                            < AlternateEmailRounded />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />



                                        <Button
                                            variant='contained'
                                            fullWidth
                                            sx={{ mt: 3 }}
                                            endIcon={<SendRounded />}
                                            onClick={handleCodigo}
                                        >
                                            Enviar
                                        </Button>

                                    </Box>

                                </Stack>

                            </Box>
                            <Container>

                                <Divider sx={{ mt: 4 }} />
                            </Container>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>

                                <Typography >Voltar a tela de <MuiLink component={RouterLink} to="/login" sx={{ textDecoration: 'none', cursor: 'pointer' }}>Login</MuiLink> </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

        </>
    )
}

export default RecuperarSenha