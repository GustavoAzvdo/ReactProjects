import { useEffect, useRef, useState } from 'react';
import { Box, LinearProgress } from '@mui/material';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [show, setShow] = useState(false);

  const progressRef = useRef(() => {});
  useEffect(() => {
    // só ativa se o login tiver acabado de acontecer
    const loginFlag = localStorage.getItem("showLoginBar");
    if (loginFlag === "true") {
      setShow(true);
      localStorage.removeItem("showLoginBar");
    }
  }, []);

  useEffect(() => {
    progressRef.current = () => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) return 100;
        return prevProgress + 1;
      });
      setBuffer((prevBuffer) => {
        if (prevBuffer >= 100) return 100;
        return prevBuffer + 1 + Math.random() * 5;
      });
    };
  }, []);

  useEffect(() => {
    if (!show) return;

    const timer = setInterval(() => {
      progressRef.current();
    }, 15);

    const endTimer = setTimeout(() => {
      setShow(false);
    }, 3000); // barra desaparece depois de 3s

    return () => {
      clearInterval(timer);
      clearTimeout(endTimer);
    };
  }, [show]);

  if (!show) return null;

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color='primary' sx={{height: '8px'}}/>
    </Box>
  );
};

export default ProgressBar;
