import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  ButtonGroup,
  Tooltip,
  Slider,
  Card,
  CardContent,
  Chip,
  Fab,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface PreviewImage {
  id: number;
  name: string;
  size: string;
  date: string;
  tags: string[];
  url: string;
}

interface ImagesPreviewProps {
  selectedImage?: PreviewImage;
}

const DEFAULT_IMAGE: PreviewImage = {
  id: 1,
  name: 'Sunset View',
  size: '2.4 MB',
  date: '2024-11-28',
  tags: ['nature', 'landscape'],
  url: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800&h=600&fit=crop',
};

const ImagesPreview = ({ selectedImage }: ImagesPreviewProps) => {
  const image = selectedImage || DEFAULT_IMAGE;
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleRotateLeft = () => setRotation((prev) => (prev - 90) % 360);
  const handleRotateRight = () => setRotation((prev) => (prev + 90) % 360);
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${image.name}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Disable right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Disable keyboard shortcuts (Ctrl+S, Ctrl+D, etc.)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      (e.ctrlKey && (e.key === 's' || e.key === 'd')) ||
      (e.metaKey && (e.key === 's' || e.key === 'd'))
    ) {
      e.preventDefault();
    }
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        console.log(`Uploading ${file.name}`);
        // Implement upload logic here
      }
    };
    input.click();
  };

  return (
    <Paper
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#fafafa',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
          {image.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {image.size} • {image.date}
        </Typography>
      </Box>

      {/* Image Preview Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          overflow: 'auto',
          p: 2,
          minHeight: 0,
          userSelect: 'none',
        }}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <img
            src={image.url}
            alt={image.name}
            onContextMenu={handleContextMenu}
            draggable={false}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease',
              userSelect: 'none',
            }}
          />
        </Box>
      </Box>

      {/* Controls Section */}
      <Card
        sx={{
          m: 0,
          borderRadius: 0,
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <CardContent sx={{ p: 2 }}>
          {/* Tags */}
          {image.tags && image.tags.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" display="block" sx={{ mb: 1, fontWeight: 600 }}>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {image.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{ height: '24px' }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Zoom Control */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Zoom
              </Typography>
              <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 600 }}>
                {zoom}%
              </Typography>
            </Box>
            <Slider
              value={zoom}
              onChange={(_, value) => setZoom(value as number)}
              min={50}
              max={200}
              step={10}
              marks={[
                { value: 50, label: '50%' },
                { value: 100, label: '100%' },
                { value: 200, label: '200%' },
              ]}
              sx={{ mb: 2 }}
            />
          </Box>

          {/* Rotation and Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <ButtonGroup size="small" variant="outlined" sx={{ mb: 1 }}>
              <Tooltip title="Rotate Left">
                <Button onClick={handleRotateLeft}>
                  <RotateLeftIcon sx={{ fontSize: '1rem' }} />
                </Button>
              </Tooltip>
              <Tooltip title="Rotate Right">
                <Button onClick={handleRotateRight}>
                  <RotateRightIcon sx={{ fontSize: '1rem' }} />
                </Button>
              </Tooltip>
            </ButtonGroup>
            <Button
              size="small"
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{ ml: 'auto' }}
            >
              Download
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Floating Upload Button */}
      <Tooltip title="Upload Image">
        <Fab
          color="primary"
          aria-label="upload"
          onClick={handleUpload}
          sx={{
            position: 'fixed',
            bottom: { xs: 32, sm: 40, md: 48 },
            right: { xs: 16, sm: 24, md: 32 },
            zIndex: 900,
          }}
        >
          <CloudUploadIcon />
        </Fab>
      </Tooltip>
    </Paper>
  );
};

export default ImagesPreview;