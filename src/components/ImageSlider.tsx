import { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface ImageSliderProps {
  onZoomChange?: (value: number) => void;
  onOpacityChange?: (value: number) => void;
}

export default function ImageSlider({ onZoomChange, onOpacityChange }: ImageSliderProps) {
  const [zoom, setZoom] = useState<number>(100);
  const [opacity, setOpacity] = useState<number>(100);

  const handleZoomChange = (_event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setZoom(value);
    onZoomChange?.(value);
  };

  const handleOpacityChange = (_event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setOpacity(value);
    onOpacityChange?.(value);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Zoom
          </Typography>
          <Typography variant="body2" color="primary">
            {zoom}%
          </Typography>
        </Box>
        <Slider
          value={zoom}
          onChange={handleZoomChange}
          min={10}
          max={200}
          step={10}
          marks
          valueLabelDisplay="auto"
          sx={{
            '& .MuiSlider-thumb': {
              backgroundColor: '#1976d2',
            },
          }}
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Opacity
          </Typography>
          <Typography variant="body2" color="primary">
            {opacity}%
          </Typography>
        </Box>
        <Slider
          value={opacity}
          onChange={handleOpacityChange}
          min={0}
          max={100}
          step={5}
          marks
          valueLabelDisplay="auto"
          sx={{
            '& .MuiSlider-thumb': {
              backgroundColor: '#1976d2',
            },
          }}
        />
      </Box>
    </Paper>
  );
}
