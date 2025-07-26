import { Box, Button, Card, CardContent, CircularProgress, Container, Divider, IconButton, InputAdornment, Link as MuiLink, Stack, TextField, Typography } from '@mui/material'
import { TipsAndUpdatesRounded, AlternateEmailRounded, Google, SendRounded } from '@mui/icons-material'
import {  Link as RouterLink } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, type User, onAuthStateChanged } from "firebase/auth";
import { app } from '../../firebase/firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Aviso from '../../components/Aviso/Aviso'

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const Login = () => {
    const [snackbar, setSnackbar] = useState<{ open: boolean, mensage: string, severity: "success" | "error" | "warning" | undefined, onClose: boolean }>({ open: false, mensage: '', severity: 'success', onClose: false })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth(app);
    const [ver, setVer] = useState<boolean>(false)
    const [, setUser] = useState<User | null>(null)


    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);


    const handleLogin = async (e: React.FormEvent) => {
        localStorage.setItem("showLoginBar", "true");
        await signOut(auth)
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("user", JSON.stringify(auth.currentUser))

            // Usuário autenticado, redireciona para home
            setTimeout(() => {
                setSnackbar({ open: true, mensage: 'Login efetuado!', severity: "success", onClose: true });
                navigate('/home');
            }, 2000);
        }
        catch (err: any) {
            setSnackbar({ open: true, mensage: 'Email ou senha inválidos!', severity: "error", onClose: true });

            setError('Email ou senha inválidos');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        await signOut(auth)
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

    useEffect(() => {
        if(auth.currentUser) {
            // signInWithEmailAndPassword(auth, email, password);
            navigate('/home')
        }
    },[])
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
                                <Stack direction='column' gap={1}>
                                    <Typography variant='h4' sx={{ fontWeight: 600, pl: 1, }}> Login  </Typography>
                                    <Box component='form' sx={{ alignItems: 'center', justifyContent: 'center', mt: 3 }} onSubmit={handleLogin}>
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
                                            type={ver ? 'text': 'password'}
                                            label='Senha'
                                            variant='outlined'
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={(_e) => setVer(!ver)}>
                                                            {ver ? (
                                                                <VisibilityOffRoundedIcon/>
                                                            ) : (
                                                                <VisibilityRoundedIcon/>
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <Box sx={{display: 'flex', justifyContent: 'end', mt: 1}}>
                                            <MuiLink component={RouterLink} to={'/recuperar-senha'} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                                <Typography color='primary'>Esqueci minha senha</Typography>
                                            </MuiLink>

                                        </Box>
                                        {loading && <ProgressBar />}

                                        <Button
                                            variant='contained'
                                            fullWidth
                                            sx={{ mt: 4 }}
                                            endIcon={loading ? '' : <SendRounded />}
                                            disabled={loading}
                                            onClick={handleLogin}
                                        >
                                            {loading ? <CircularProgress size={20} color="inherit" /> : 'Entrar'}
                                        </Button>

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
            <Aviso
                severity={snackbar.severity}
                open={snackbar.open}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                mensage={snackbar.mensage}
            />
        </>
    )
}

export default Login