import React, { useCallback, useState} from 'react';
import Cropper from 'react-easy-crop';
import type { CroppedAreaPixels } from '../types';
import { getCroppedImg } from '../utils/cropImage';
import Slider from '@mui/material/Slider';
import bg from '../assets/transparent-bg.jpg';

interface Props {
  image: string;
  onCancel: () => void;
  onCropComplete: (croppedImage: File) => void;
}

const ImageCropper: React.FC<Props> = ({ image, onCancel, onCropComplete}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);

  const onCropCompleteHandler = useCallback((_: unknown, croppedPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    if (!croppedAreaPixels) {
    console.log("Cropping area is not defined!");
    return;
  }
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    if (croppedImage) onCropComplete(croppedImage);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex flex-col justify-center items-center">
      <div className="relative w-[90vw] max-w-lg h-[60vh] shadow p-4" style={{ background: `url(${bg})` }}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteHandler}
        />
      </div>
      <div className="container w-[90vw] max-w-lg bg-black shadow p-4">
        <div className="mt-4 px-6">
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_, val) => setZoom(val as number)}
          />
        </div>
        <div className="flex justify-between mt-4 px-6">
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded z-50">
            Cancel
          </button>
          <button onClick={handleDone} className="bg-blue-600 text-white px-4 py-2 rounded z-50">
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
