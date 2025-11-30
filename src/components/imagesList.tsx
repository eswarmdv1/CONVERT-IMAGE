import { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Chip,
  Paper,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

interface Image {
  id: number;
  name: string;
  size: string;
  date: string;
  tags: string[];
  thumbnail: string;
}

const DUMMY_IMAGES: Image[] = [
  {
    id: 1,
    name: 'Sunset View',
    size: '2.4 MB',
    date: '2024-11-28',
    tags: ['nature', 'landscape'],
    thumbnail: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Mountain Peak',
    size: '3.1 MB',
    date: '2024-11-27',
    tags: ['nature', 'mountain'],
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Ocean Waves',
    size: '1.8 MB',
    date: '2024-11-26',
    tags: ['water', 'nature'],
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    name: 'Forest Path',
    size: '2.7 MB',
    date: '2024-11-25',
    tags: ['nature', 'forest'],
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop',
  },
  {
    id: 5,
    name: 'City Lights',
    size: '3.5 MB',
    date: '2024-11-24',
    tags: ['urban', 'night'],
    thumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=100&h=100&fit=crop',
  },
  {
    id: 6,
    name: 'Beach Sand',
    size: '2.2 MB',
    date: '2024-11-23',
    tags: ['beach', 'nature'],
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop',
  },
];

interface ImagesListProps {
  onImageSelect?: (image: Image) => void;
  selectedImageId?: number;
}

const ImagesList = ({ onImageSelect, selectedImageId }: ImagesListProps) => {
  const [images] = useState<Image[]>(DUMMY_IMAGES);

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

  return (
    <Paper
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#fafafa',
        userSelect: 'none',
      }}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
          Images Gallery
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {images.length} images
        </Typography>
      </Box>

      {/* Images List */}
      <List
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 0,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: '#555',
            },
          },
        }}
      >
        {images.map((image) => (
          <ListItem
            key={image.id}
            disablePadding
            sx={{
              backgroundColor: selectedImageId === image.id ? '#e3f2fd' : 'transparent',
              borderBottom: '1px solid #e0e0e0',
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ListItemButton
              onClick={() => onImageSelect?.(image)}
              sx={{
                py: 1.5,
                px: 2,
              }}
            >
              <ListItemAvatar sx={{ minWidth: 50 }}>
                <Avatar
                  src={image.thumbnail}
                  onContextMenu={handleContextMenu}
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#e0e0e0',
                    userSelect: 'none',
                  }}
                >
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {image.name}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography variant="caption" display="block" color="textSecondary">
                      {image.size} • {image.date}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                      {image.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{
                            height: '20px',
                            fontSize: '0.7rem',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ImagesList;