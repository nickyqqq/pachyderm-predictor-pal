import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, Image as ImageIcon, Brain, Zap } from 'lucide-react';
import { ElephantIcon } from '@/components/ElephantIcon';
import elephantHero from '@/assets/elephant-hero.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);
        setIsProcessing(true);
        
        // Simulate processing time
        setTimeout(() => {
          setIsProcessing(false);
          navigate('/predictions', { state: { imageUrl } });
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  }, [navigate]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={elephantHero}
            alt="Majestic elephant in golden hour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        
        <div className="relative z-10 px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex justify-center mb-6">
              <ElephantIcon size={80} className="text-safari-orange animate-float" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Elephant
              <span className="block text-safari-orange">Predictor</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Advanced AI-powered species, gender, and age classification for elephants using deep learning models
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                <Brain className="w-4 h-4 mr-2" />
                Deep Learning
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Real-time Analysis
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                <ImageIcon className="w-4 h-4 mr-2" />
                High Accuracy
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/camera')}
                size="lg"
                className="btn-safari text-lg px-8 py-4 gap-3"
              >
                <Camera className="w-6 h-6" />
                Use Camera
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 gap-3 bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Upload className="w-6 h-6" />
                Upload Image
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Started with Your Elephant Image
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload an image or use your camera to get instant predictions about elephant species, gender, and age group
            </p>
          </div>

          {/* Upload Zone */}
          <Card 
            className={`upload-zone p-12 text-center transition-all duration-300 ${
              isDragging ? 'scale-105 border-safari-orange' : ''
            } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
          >
            <CardContent className="space-y-6">
              {isProcessing ? (
                <div className="space-y-4">
                  <ElephantIcon size={64} className="mx-auto text-safari-orange animate-gentle-bounce" />
                  <p className="text-xl font-medium text-foreground">Processing your image...</p>
                  <p className="text-muted-foreground">Our AI is analyzing the elephant</p>
                </div>
              ) : uploadedImage ? (
                <div className="space-y-4">
                  <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden">
                    <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xl font-medium text-foreground">Image uploaded successfully!</p>
                  <p className="text-muted-foreground">Redirecting to predictions...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <Upload className="w-16 h-16 mx-auto text-safari-orange" />
                  <div>
                    <p className="text-xl font-medium text-foreground mb-2">
                      Drop your elephant image here
                    </p>
                    <p className="text-muted-foreground">
                      or click to browse files • PNG, JPG up to 10MB
                    </p>
                  </div>
                  
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => document.getElementById('file-input')?.click()}
                      className="btn-safari gap-2"
                      size="lg"
                    >
                      <Upload className="w-5 h-5" />
                      Choose File
                    </Button>
                    <Button
                      onClick={() => navigate('/camera')}
                      variant="outline"
                      size="lg"
                      className="gap-2"
                    >
                      <Camera className="w-5 h-5" />
                      Use Camera Instead
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="card-floating text-center">
              <CardHeader>
                <ElephantIcon size={48} className="mx-auto text-safari-orange mb-4" />
                <CardTitle className="text-safari-brown">Species Classification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Identify between African Bush, African Forest, and Asian elephant species with high accuracy
                </p>
              </CardContent>
            </Card>

            <Card className="card-floating text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-savanna-green/20 flex items-center justify-center">
                  <span className="text-2xl">⚧</span>
                </div>
                <CardTitle className="text-safari-brown">Gender Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Determine male or female based on physical characteristics and morphological features
                </p>
              </CardContent>
            </Card>

            <Card className="card-floating text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-elephant-gray-light/20 flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <CardTitle className="text-safari-brown">Age Estimation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Classify age groups from calf to adult based on size, features, and body proportions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
