import { Box, Button, Card, CardContent, CircularProgress, Container, Divider, IconButton, InputAdornment, Link as MuiLink, Stack, TextField, Typography } from '@mui/material'
import { TipsAndUpdatesRounded, AlternateEmailRounded, KeyRounded, Google, SendRounded } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../../firebase/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
           await signInWithEmailAndPassword(auth, email, password);
            // Usuário autenticado, redireciona para home
            navigate('/home');
        } catch (err: any) {
            setError('Email ou senha inválidos');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        const provider = new GoogleAuthProvider();
         provider.setCustomParameters({ prompt: 'select_account' });
        try {
            await signInWithPopup(auth, provider);
            navigate('/home');
        } catch (err: any) {
            setError('Erro ao autenticar com o Google');
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh ' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '400px', height: '540px' }}>
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
                                <Typography variant='h4' sx={{ fontWeight: 600, pl: 1, }}> Login  </Typography>
                                <Box component='form' sx={{ alignItems: 'center', justifyContent: 'center', mt: 4 }} onSubmit={handleLogin}>
                                    <TextField
                                        fullWidth
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
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
                                    <TextField
                                        sx={{ mt: 3 }}
                                        fullWidth
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        size='small'
                                        type='password'
                                        label='Senha'
                                        variant='outlined'
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        < KeyRounded />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <RouterLink to="/home" style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant='contained'
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            endIcon={<SendRounded />}
                                            disabled={loading}
                                        >
                                            {loading ? <CircularProgress size={20} color="inherit" /> : 'Entrar'}
                                        </Button>
                                    </RouterLink>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant='h6'>Ou</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2 }}>
                                    <Button variant='outlined' endIcon={<Google />} sx={{ py: 1 }} onClick={handleGoogleLogin}>
                                        <Typography>Entrar com o Google</Typography>
                                    </Button>
                                </Box>
                            </Stack>

                        </Box>
                        <Container>

                            <Divider sx={{ mt: 2 }} />
                        </Container>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                            {/* <Typography >Não tem uma conta? <Link sx={{ textDecoration: 'none', cursor: 'pointer' }}>Crie uma!</Link> </Typography> */}
                            <Typography >Não tem uma conta? <MuiLink component={RouterLink} to="/signin" sx={{ textDecoration: 'none', cursor: 'pointer' }}>Crie uma!</MuiLink> </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default Login