import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Camera as CameraIcon, Square, Play, Pause } from 'lucide-react';
import { ElephantIcon } from '@/components/ElephantIcon';

const Camera = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please ensure you have granted camera permissions.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageUrl);
        
        // Simulate prediction process
        setIsPredicting(true);
        setTimeout(() => {
          setIsPredicting(false);
          navigate('/predictions', { state: { imageUrl } });
        }, 2000);
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </Button>
          <div className="flex items-center gap-3">
            <ElephantIcon size={32} className="text-safari-orange" />
            <h1 className="text-3xl font-bold text-foreground">Camera Mode</h1>
          </div>
        </div>

        {/* Camera Interface */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Camera View */}
          <div className="lg:col-span-2">
            <Card className="card-floating overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  
                  {!isStreaming && !capturedImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/80 backdrop-blur-sm">
                      <div className="text-center space-y-4">
                        <CameraIcon className="w-16 h-16 mx-auto text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground">Camera not active</p>
                      </div>
                    </div>
                  )}

                  {capturedImage && (
                    <div className="absolute inset-0">
                      <img 
                        src={capturedImage} 
                        alt="Captured" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {isPredicting && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <ElephantIcon size={48} className="mx-auto text-white animate-gentle-bounce" />
                        <p className="text-white font-medium">Analyzing elephant...</p>
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant={isStreaming ? "default" : "secondary"}
                      className={isStreaming ? "bg-green-500" : ""}
                    >
                      {isStreaming ? "🔴 Live" : "⚫ Offline"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Camera Controls */}
            <div className="flex justify-center gap-4 mt-6">
              {!isStreaming ? (
                <Button
                  onClick={startCamera}
                  className="btn-safari gap-2"
                  size="lg"
                >
                  <Play className="w-5 h-5" />
                  Start Camera
                </Button>
              ) : (
                <>
                  <Button
                    onClick={capturePhoto}
                    className="btn-elephant gap-2"
                    size="lg"
                    disabled={isPredicting}
                  >
                    <Square className="w-5 h-5" />
                    {isPredicting ? 'Analyzing...' : 'Capture & Predict'}
                  </Button>
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    size="lg"
                    className="gap-2"
                  >
                    <Pause className="w-5 h-5" />
                    Stop Camera
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="card-floating">
              <CardHeader>
                <CardTitle className="text-safari-brown">How to Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-safari-orange text-white text-sm flex items-center justify-center font-medium">1</div>
                    <p className="text-sm text-muted-foreground">Click "Start Camera" to activate your device camera</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-safari-orange text-white text-sm flex items-center justify-center font-medium">2</div>
                    <p className="text-sm text-muted-foreground">Position the elephant in the frame</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-safari-orange text-white text-sm flex items-center justify-center font-medium">3</div>
                    <p className="text-sm text-muted-foreground">Click "Capture & Predict" to analyze</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-floating">
              <CardHeader>
                <CardTitle className="text-safari-brown">Tips for Best Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-safari-orange">•</span>
                    Ensure good lighting conditions
                  </li>
                  <li className="flex gap-2">
                    <span className="text-safari-orange">•</span>
                    Keep the elephant centered in frame
                  </li>
                  <li className="flex gap-2">
                    <span className="text-safari-orange">•</span>
                    Avoid motion blur by holding steady
                  </li>
                  <li className="flex gap-2">
                    <span className="text-safari-orange">•</span>
                    Full body shots work best for age prediction
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;