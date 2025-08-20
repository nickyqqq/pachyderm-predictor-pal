import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Camera, Image as ImageIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PredictionResult {
  species: { class: string; confidence: number; probabilities: Array<{ class: string; probability: number }> };
  gender: { class: string; confidence: number; probabilities: Array<{ class: string; probability: number }> };
  age: { class: string; confidence: number; probabilities: Array<{ class: string; probability: number }> };
}

const Predictions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUrl } = location.state || {};
  
  // Mock prediction results - replace with actual API calls
  const [predictions] = useState<PredictionResult>({
    species: {
      class: 'African Bush Elephant',
      confidence: 92.3,
      probabilities: [
        { class: 'African Bush Elephant', probability: 92.3 },
        { class: 'Asian Elephant', probability: 5.2 },
        { class: 'African Forest Elephant', probability: 2.5 }
      ]
    },
    gender: {
      class: 'Female',
      confidence: 78.6,
      probabilities: [
        { class: 'Female', probability: 78.6 },
        { class: 'Male', probability: 21.4 }
      ]
    },
    age: {
      class: 'Adult',
      confidence: 88.9,
      probabilities: [
        { class: 'Adult', probability: 88.9 },
        { class: 'Juvenile', probability: 8.2 },
        { class: 'Calf', probability: 2.9 }
      ]
    }
  });

  const speciesInfo = {
    'African Bush Elephant': `The African bush elephant is the largest living terrestrial animal and the largest of the three extant elephant species. Adults typically weigh 4-7 tons and can reach heights of up to 4 meters. They are characterized by their large ears, wrinkled gray skin, and long tusks. These magnificent creatures play a crucial role in their ecosystem as keystone species, helping to maintain the biodiversity of African savannas through their feeding and movement patterns.`
  };

  if (!imageUrl) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
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
          <h1 className="text-3xl font-bold text-foreground">Prediction Results</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image Preview */}
          <div className="lg:col-span-1">
            <Card className="card-floating overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={imageUrl}
                    alt="Uploaded elephant"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      Analyzed Image
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => navigate('/camera')}
              className="w-full mt-4 btn-safari gap-2"
              size="lg"
            >
              <Camera className="w-5 h-5" />
              Try Camera Mode
            </Button>
          </div>

          {/* Predictions */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {/* Species Prediction */}
              <Card className="card-prediction">
                <CardHeader>
                  <CardTitle className="text-xl text-safari-brown">Species Classification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-foreground">
                      {predictions.species.class}
                    </span>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {predictions.species.confidence}% confident
                    </Badge>
                  </div>
                  <Progress value={predictions.species.confidence} className="h-2" />
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-3 text-safari-brown">Confidence Distribution</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={predictions.species.probabilities}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="class" 
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Confidence']}
                          labelStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Bar dataKey="probability" fill="hsl(var(--safari-orange))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Gender & Age Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Gender Prediction */}
                <Card className="card-prediction">
                  <CardHeader>
                    <CardTitle className="text-safari-brown">Gender</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold">{predictions.gender.class}</span>
                      <Badge variant="outline">{predictions.gender.confidence}%</Badge>
                    </div>
                    <Progress value={predictions.gender.confidence} className="h-2" />
                    
                    <ResponsiveContainer width="100%" height={150}>
                      <BarChart data={predictions.gender.probabilities}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="class" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Confidence']} />
                        <Bar dataKey="probability" fill="hsl(var(--savanna-green))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Age Prediction */}
                <Card className="card-prediction">
                  <CardHeader>
                    <CardTitle className="text-safari-brown">Age Group</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold">{predictions.age.class}</span>
                      <Badge variant="outline">{predictions.age.confidence}%</Badge>
                    </div>
                    <Progress value={predictions.age.confidence} className="h-2" />
                    
                    <ResponsiveContainer width="100%" height={150}>
                      <BarChart data={predictions.age.probabilities}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="class" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Confidence']} />
                        <Bar dataKey="probability" fill="hsl(var(--elephant-gray))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Species Information */}
              <Card className="card-floating">
                <CardHeader>
                  <CardTitle className="text-safari-brown">About {predictions.species.class}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {speciesInfo[predictions.species.class as keyof typeof speciesInfo]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;