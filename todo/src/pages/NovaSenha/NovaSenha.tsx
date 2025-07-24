import { Box, Button, Card, CardContent, CircularProgress, Container, Divider, IconButton, InputAdornment, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import { TipsAndUpdatesRounded, KeyRounded, AddCircleOutlineRounded } from '@mui/icons-material'
import { useEffect, useState } from 'react'

import { getAuth, type User, onAuthStateChanged } from "firebase/auth"
import { app } from '../../firebase/firebase'
import Aviso from '../../components/Aviso/Aviso'
const getPasswordStrength = (password: string): number => {
    let score = 0
    if (password.length >= 6) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return Math.min(score, 4) // 0 a 4
}

const strengthLabels = [
    'Muito fraca',
    'Fraca',
    'Normal',
    'Forte',
    'Muito forte'
]

const strengthColors: Array<'error' | 'warning' | 'info' | 'primary' | 'success'> = [
    'error',
    'warning',
    'info',
    'primary',
    'success'
]

const SignIn = () => {
    const [snackbar, setSnackbar] = useState<{ open: boolean, mensage: string, severity: "success" | "error" | "warning" | undefined, onClose: boolean }>({ open: false, mensage: '', severity: 'success', onClose: false })

    const [loading,] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error,] = useState('')

    const [, setUser] = useState<User | null>(null)

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const strength = getPasswordStrength(password)



    const isFormValid = password && confirmPassword && password === confirmPassword && strength >= 2

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh ' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '400px', height: '500px' }}>
                <Card elevation={5} sx={{ width: '100%', height: '100%', borderRadius: '15px' }}>
                    <CardContent>
                        <Box>
                            <Stack direction='row'>
                                <Typography variant='h5' color='primary' sx={{ fontWeight: 600, pl: 1, }}> Task  </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                                    <TipsAndUpdatesRounded color='primary' sx={{ fontSize: '20px', }} />
                                </Box>
                            </Stack>
                        </Box>
                        <Box sx={{ pt: 5 }}>
                            <Stack direction='column' gap={2}>
                                <Box>
                                    <Typography variant='h4' sx={{ fontWeight: 600, pl: 1, }}> Nova senha  </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, pl: 1 }}>Crie uma nova senha!</Typography>
                                </Box>
                                <Box sx={{ alignItems: 'center', justifyContent: 'center', mt: 2 }} >

                                    <TextField
                                        sx={{ mt: 2 }}
                                        fullWidth
                                        size='small'
                                        type='password'
                                        label='Senha'
                                        variant='outlined'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <KeyRounded />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <Box sx={{ mt: 3 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(strength + 1) * 20}
                                            color={strengthColors[strength]}
                                            sx={{ height: 8, borderRadius: 5 }}
                                        />
                                        <Box sx={{textAlign: 'end'}}>
                                            <Typography sx={{ mt: 1 }} color={strengthColors[strength]}>
                                                {strengthLabels[strength]}
                                            </Typography>

                                        </Box>
                                    </Box>
                                    <TextField
                                        sx={{ mt: 2 }}
                                        fullWidth
                                        size='small'
                                        type='password'
                                        label='Confirme a sua senha'
                                        variant='outlined'
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <KeyRounded />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    {error && (
                                        <Typography color="error" sx={{ mt: 1 }}>
                                            {error}
                                        </Typography>
                                    )}
                                    <Button
                                        variant='contained'
                                        sx={{ mt: 4 }}
                                        fullWidth
                                        type="submit"
                                        disabled={!isFormValid || loading}

                                        endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddCircleOutlineRounded />}
                                    >
                                        Criar nova senha
                                    </Button>
                                </Box>
                                {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant='h6'>Ou</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2 }}>
                                    <Button variant='outlined' endIcon={<Google />} sx={{ py: 1 }} onClick={handleGoogleSignIn}>
                                        <Typography>Criar conta com o Google</Typography>
                                    </Button>
                                </Box> */}
                            </Stack>
                        </Box>
                        <Container>
                            <Divider />
                        </Container>
                        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                            <Typography>Já tem uma conta? <MuiLink component={RouterLink} to="/login" sx={{ textDecoration: 'none', cursor: 'pointer' }}>Faça login!</MuiLink> </Typography>
                        </Box> */}
                    </CardContent>
                </Card>
            </Box>
            <Aviso
                severity={snackbar.severity}
                mensage={snackbar.mensage}
                open={snackbar.open}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </Box>
    )
}

export default SignIn