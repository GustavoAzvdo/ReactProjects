import { Box, Button, Card, CardContent, CircularProgress, Container, Divider, IconButton, InputAdornment, LinearProgress, Link as MuiLink, Stack, TextField, Typography } from '@mui/material'
import { TipsAndUpdatesRounded, AlternateEmailRounded, KeyRounded, Google, FaceRounded, AddCircleOutlineRounded } from '@mui/icons-material'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { app } from '../../firebase/firebase'
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
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const auth = getAuth(app);
    

    const strength = getPasswordStrength(password)

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.')
            setLoading(false)
            return
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(userCredential.user, { displayName: name })
            navigate('/home')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const isFormValid = name && email && password && confirmPassword && password === confirmPassword && strength >= 2

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh ' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '400px', height: '680px' }}>
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
                                <Typography variant='h4' sx={{ fontWeight: 600, pl: 1, }}> Sign In  </Typography>
                                <Box component='form' sx={{ alignItems: 'center', justifyContent: 'center', mt: 2 }} onSubmit={handleSignUp}>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        type='text'
                                        label='Digite seu nome'
                                        variant='outlined'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <FaceRounded />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <TextField
                                        sx={{ mt: 3 }}
                                        fullWidth
                                        size='small'
                                        type='email'
                                        label='E-mail'
                                        variant='outlined'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <AlternateEmailRounded />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <TextField
                                        sx={{ mt: 3 }}
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
                                    <Box sx={{ mt: 2 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(strength + 1) * 20}
                                            color={strengthColors[strength]}
                                            sx={{ height: 8, borderRadius: 5 }}
                                        />
                                        <Typography sx={{ mt: 1 }} color={strengthColors[strength]}>
                                            {strengthLabels[strength]}
                                        </Typography>
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
                                        sx={{ mt: 2 }}
                                        fullWidth
                                        type="submit"
                                        disabled={!isFormValid || loading}
                                        endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddCircleOutlineRounded />}
                                    >
                                        Criar Conta
                                    </Button>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant='h6'>Ou</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2 }}>
                                    <Button variant='outlined' endIcon={<Google />} sx={{ py: 1 }}>
                                        <Typography>Criar conta com o Google</Typography>
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                        <Container>
                            <Divider />
                        </Container>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                            <Typography>Já tem uma conta? <MuiLink component={RouterLink} to="/login" sx={{ textDecoration: 'none', cursor: 'pointer' }}>Faça login!</MuiLink> </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default SignIn