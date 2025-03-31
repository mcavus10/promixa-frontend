'use client';

import { useState } from 'react';
import AudioUpload from './AudioUpload';
import LanguageSelector from './LanguageSelector';
import TranscriptionResult from './TranscriptionResult';

interface TranscribeFormProps {
  fileType: 'audio' | 'video';
}

export default function TranscribeForm({ fileType }: TranscribeFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('en');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    // Reset result when a new file is selected
    setTranscriptionResult(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode);
  };

  const handleTranscribe = () => {
    if (!file) return;
    
    setIsTranscribing(true);
    
    // Mock transcription process with timeout
    setTimeout(() => {
      // Generate a realistic mock transcript based on file type and language
      const dummyText = generateMockTranscription(fileType, language, file.name);
      setTranscriptionResult(dummyText);
      setIsTranscribing(false);
    }, 3000);
  };

  const handleDownload = () => {
    if (!transcriptionResult) return;
    
    // Create a blob from the transcription text
    const blob = new Blob([transcriptionResult], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor to trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcription-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up
    URL.revokeObjectURL(url);
  };

  // Function to generate realistic mock transcription
  const generateMockTranscription = (type: string, lang: string, fileName: string): string => {
    // Base mock transcriptions by language
    const mockByLanguage: Record<string, string> = {
      'en': `This is a sample transcription of the ${type} file "${fileName}". The content appears to be about artificial intelligence and its applications in modern technology. The speaker discusses various aspects of machine learning models and their impact on society. There are also mentions of ethical considerations and future developments in the field.\n\nAt around 2:30, there's a section about neural networks and deep learning architectures. The speaker provides examples of successful implementations in different industries including healthcare, finance, and entertainment.\n\nTowards the end, there's a Q&A session where audience members ask about practical applications and potential concerns regarding AI systems. The speaker addresses these questions with detailed explanations and references to recent research papers.`,
      
      'es': `Esta es una transcripción de muestra del archivo de ${type === 'audio' ? 'audio' : 'video'} "${fileName}". El contenido parece tratar sobre la inteligencia artificial y sus aplicaciones en la tecnología moderna. El orador discute varios aspectos de los modelos de aprendizaje automático y su impacto en la sociedad. También se mencionan consideraciones éticas y desarrollos futuros en el campo.\n\nAlrededor del minuto 2:30, hay una sección sobre redes neuronales y arquitecturas de aprendizaje profundo. El orador proporciona ejemplos de implementaciones exitosas en diferentes industrias, incluidas la atención médica, las finanzas y el entretenimiento.\n\nHacia el final, hay una sesión de preguntas y respuestas donde los miembros de la audiencia preguntan sobre aplicaciones prácticas y posibles preocupaciones con respecto a los sistemas de IA. El orador responde a estas preguntas con explicaciones detalladas y referencias a trabajos de investigación recientes.`,
      
      'fr': `Ceci est une transcription d'exemple du fichier ${type} "${fileName}". Le contenu semble porter sur l'intelligence artificielle et ses applications dans la technologie moderne. L'orateur aborde divers aspects des modèles d'apprentissage automatique et leur impact sur la société. Il y a également des mentions de considérations éthiques et de développements futurs dans ce domaine.\n\nVers 2:30, il y a une section sur les réseaux de neurones et les architectures d'apprentissage profond. L'orateur fournit des exemples d'implémentations réussies dans différentes industries, notamment la santé, la finance et le divertissement.\n\nVers la fin, il y a une séance de questions-réponses où les membres de l'audience posent des questions sur les applications pratiques et les préoccupations potentielles concernant les systèmes d'IA. L'orateur répond à ces questions avec des explications détaillées et des références à des articles de recherche récents.`
    };
    
    // Return the corresponding mock or default to English
    return mockByLanguage[lang] || mockByLanguage['en'];
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {fileType === 'audio' ? 'Audio File' : 'Video File'} Upload
        </h3>
        <p className="text-sm text-gray-500">
          {fileType === 'audio' 
            ? 'Upload an audio recording to transcribe to text.' 
            : 'Upload a video file to extract the audio and transcribe to text.'}
        </p>
        
        <AudioUpload 
          fileType={fileType} 
          onFileSelect={handleFileSelect} 
        />
      </div>
      
      <div className="mb-8">
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </div>
      
      <div className="mb-8">
        <button 
          type="button"
          disabled={!file || isTranscribing}
          onClick={handleTranscribe}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500"
        >
          {isTranscribing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Transcribing...
            </>
          ) : (
            <>
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Start Transcription
            </>
          )}
        </button>
      </div>
      
      {transcriptionResult && (
        <TranscriptionResult 
          text={transcriptionResult} 
          onDownload={handleDownload} 
        />
      )}
    </div>
  );
}
