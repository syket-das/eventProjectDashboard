import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import Header from '../Header';
import { useUserStore } from '../../store/userStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const setUser = useUserStore((state) => state.setUser);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      setUser();
    }
  }, [isAuthenticated]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (data?.token) {
        localStorage.setItem('token', data.token);
        setUser();
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Box
        m="20px"
        style={{
          textAlign: 'center',
        }}
      >
        <Header title="Event DASHBOARD" subtitle="Login to event dashboard" />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            '& > *': {
              maxWidth: '400px',
            },
          }}
        >
          <Card sx={{ maxWidth: 400, maxHeight: 350 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                image="https://source.unsplash.com/random/?university"
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => login(email, password)}
          >
            Login
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
