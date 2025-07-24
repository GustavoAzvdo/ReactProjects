import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import { TipsAndUpdatesRounded, SendRounded } from '@mui/icons-material'

import { useRef, useState } from 'react';


const Codigo = () => {
    const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (/^\d?$/.test(value)) {
            const novoCodigo = [...codigo];
            novoCodigo[index] = value;
            setCodigo(novoCodigo);

            if (value && index < 5) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };
    return (
        <>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh ' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '400px', height: '540px' }}>
                    <Card elevation={5} sx={{ width: '100%', height: '100%', borderRadius: '15px' }}>
                        <CardContent >
                            <Box>
                                <Stack direction='row'>

                                    <Typography variant='h5' color='primary' sx={{ fontWeight: 600, pl: 1, }}> Taskz  </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                                        <TipsAndUpdatesRounded color='primary' sx={{ fontSize: '20px', }} />
                                    </Box>
                                </Stack>
                            </Box>
                            <Box sx={{ pt: 8 }}>
                                <Stack direction='column' gap={2}>
                                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                                        <Typography variant='h4' sx={{ fontWeight: 600, pl: 1, pb: 2 }}> Código  </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, pl: 1 }}>Insira o código de 6 dígitos que foi enviado para o seu e-mail teste@gmail.com para continuar.
                                        </Typography>

                                    </Box>
                                    <Box display="flex" gap={1} sx={{my: 2 }}>
                                        {codigo.map((val, i) => (
                                            <TextField
                                                key={i}
                                                value={val}
                                                onChange={(e) => handleChange(i, e.target.value)}
                                                inputProps={{
                                                    maxLength: 1,
                                                    style: { textAlign: "center", fontSize: "1rem", width: "2rem" },
                                                }}
                                                inputRef={(el) => (inputsRef.current[i] = el)}
                                            />
                                        ))}
                                    </Box>
                                    <Button
                                        variant='contained'
                                        fullWidth
                                        sx={{ mt: 3 }}
                                        endIcon={<SendRounded />}
                                        disabled
                                    >
                                       Confirmar
                                    </Button>

                                </Stack>

                            </Box>
                            {/* <Container>

                                <Divider sx={{ mt: 4 }} />
                            </Container>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>

                                <Typography >Voltar a tela de <MuiLink component={RouterLink} to="/login" sx={{ textDecoration: 'none', cursor: 'pointer' }}>Login</MuiLink> </Typography>
                            </Box> */}
                        </CardContent>
                    </Card>
                </Box>
            </Box>

        </>
    )
}

export default Codigo