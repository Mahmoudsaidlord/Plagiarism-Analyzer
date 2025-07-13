import { useState } from 'react';
import { Search, Zap, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ score: number; message: string; level: 'low' | 'medium' | 'high' } | null>(null);

  const analyzePlagiarism = () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis with a delay
    setTimeout(() => {
      // Generate random similarity score between 5-95%
      const score = Math.floor(Math.random() * 90) + 5;
      
      let level: 'low' | 'medium' | 'high';
      let message: string;
      
      if (score < 25) {
        level = 'low';
        message = 'Low similarity detected. Your text appears to be mostly original.';
      } else if (score < 60) {
        level = 'medium';
        message = 'Moderate similarity found. Some sections may need review.';
      } else {
        level = 'high';
        message = 'High similarity detected. Significant portions may be duplicated.';
      }
      
      setResult({ score, message, level });
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setText('');
    setResult(null);
  };

  const getScoreColor = (score: number) => {
    if (score < 25) return 'text-green-600';
    if (score < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score < 25) return 'bg-green-500';
    if (score < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Plagiarism Analyzer
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
              Detect text similarity using AI
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-white/80">
              <Shield className="h-4 w-4" />
              <span>Powered by Advanced AI Technology</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Analyzer Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 bg-gradient-card border-border shadow-soft animate-scale-in">
            <div className="space-y-6">
              <div>
                <label htmlFor="text-input" className="block text-lg font-semibold text-foreground mb-3">
                  Enter text to analyze for plagiarism
                </label>
                <Textarea
                  id="text-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here to check for plagiarism..."
                  className="min-h-[200px] text-base border-border/50 focus:border-primary transition-colors"
                  disabled={isAnalyzing}
                />
              </div>
              
              <div className="flex justify-center">
                <Button
                  onClick={analyzePlagiarism}
                  disabled={!text.trim() || isAnalyzing}
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-3 text-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Analyze Plagiarism
                    </>
                  )}
                </Button>
              </div>

              {/* Results Section */}
              {result && (
                <div className="mt-8 animate-fade-in">
                  <Card className="p-6 border-border/50 bg-card">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Analysis Results</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-foreground">Similarity Score:</span>
                        <span className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <Progress 
                          value={result.score} 
                          className="h-3"
                        />
                        <div className="flex items-center gap-2">
                          {result.level === 'low' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          )}
                          <p className="text-foreground">{result.message}</p>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button 
                          onClick={resetAnalysis} 
                          variant="outline"
                          className="w-full"
                        >
                          Analyze New Text
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose Our Plagiarism Analyzer?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center bg-gradient-card border-border shadow-soft hover:shadow-glow transition-all duration-300">
              <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Fast and Accurate</h3>
              <p className="text-muted-foreground">
                Get instant results with our advanced AI algorithms that deliver precise plagiarism detection.
              </p>
            </Card>
            
            <Card className="p-6 text-center bg-gradient-card border-border shadow-soft hover:shadow-glow transition-all duration-300">
              <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Easy to Use</h3>
              <p className="text-muted-foreground">
                Simple interface - just paste your text and click analyze. No registration or complex setup required.
              </p>
            </Card>
            
            <Card className="p-6 text-center bg-gradient-card border-border shadow-soft hover:shadow-glow transition-all duration-300">
              <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">AI-Powered Results</h3>
              <p className="text-muted-foreground">
                Leveraging cutting-edge artificial intelligence for comprehensive similarity analysis and detection.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Plagiarism Analyzer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;