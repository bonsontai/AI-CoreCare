import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Training from './components/Training';
import { MOCK_USER_PROFILE } from './constants';
import { ExerciseType, TrainingLevel } from './types';

function App() {
  // Simple Router State
  const [currentPage, setCurrentPage] = useState('home');
  // Parameter for sub-pages (e.g., Training Type)
  const [currentSubParam, setCurrentSubParam] = useState<any>(null);

  const handleNavigate = (page: string, subParam?: any) => {
    setCurrentPage(page);
    if (subParam) {
      setCurrentSubParam(subParam);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onStart={() => handleNavigate('profile')} />;
      
      case 'profile':
        return <Profile userData={MOCK_USER_PROFILE} />;
      
      case 'training':
        // Determine the specific training type
        const type = currentSubParam as ExerciseType || ExerciseType.SQUAT;
        // Determine the recommended level from the Mock DB (User Profile)
        // Fallback to MIDDLE if not found
        const level = MOCK_USER_PROFILE.recommendations[type] || TrainingLevel.MIDDLE;
        
        return <Training exerciseType={type} recommendedLevel={level} />;
      
      default:
        return <Home onStart={() => handleNavigate('profile')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="fade-in">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
