import { useState } from 'react';
import { Box } from '@mui/material';
import ImagesList from '../components/imagesList';
import ImagesPreview from '../components/ImagesPreview';

interface Image {
  id: number;
  name: string;
  size: string;
  date: string;
  tags: string[];
  thumbnail: string;
  url: string;
}

type ImageWithoutUrl = Omit<Image, 'url'>;

const ImagesListPreview = () => {
  const [selectedImage, setSelectedImage] = useState<Image | undefined>(undefined);

  const handleImageSelect = (image: ImageWithoutUrl) => {
    const imageUrls: { [key: string]: string } = {
      'Sunset View': 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800&h=600&fit=crop',
      'Mountain Peak': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'Ocean Waves': 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
      'Forest Path': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'City Lights': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
      'Beach Sand': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    };

    const imageWithUrl: Image = {
      ...image,
      url: imageUrls[image.name] || 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800&h=600&fit=crop',
    };
    setSelectedImage(imageWithUrl);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        gap: 0,
      }}
    >
      {/* Images List Section */}
      <Box
        sx={{
          width: '500px',
          flexShrink: 0,
          overflow: 'hidden',
          borderRight: '1px solid #e0e0e0',
        }}
      >
        <ImagesList onImageSelect={handleImageSelect} selectedImageId={selectedImage?.id} />
      </Box>

      {/* Images Preview Section - Takes remaining space */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        <ImagesPreview selectedImage={selectedImage} />
      </Box>
    </Box>
  );
};

export default ImagesListPreview;