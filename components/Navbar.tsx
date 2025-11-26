import React, { useState } from 'react';
import { Menu, X, ChevronDown, User, Activity, Home, Dumbbell } from 'lucide-react';
import { ExerciseType } from '../types';

interface NavbarProps {
  onNavigate: (page: string, subParam?: any) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);

  const handleNavClick = (page: string, subParam?: any) => {
    onNavigate(page, subParam);
    setIsMenuOpen(false); // Close mobile menu on click
    setIsTrainingOpen(false);
  };

  const navLinkClass = (page: string) => 
    `cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      currentPage === page 
        ? 'bg-primary text-white' 
        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
    }`;

  const mobileNavLinkClass = (page: string) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
       currentPage === page 
        ? 'bg-primary text-white' 
        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="flex-shrink-0 flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl text-slate-800 tracking-tight">CoreCare</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button 
              onClick={() => handleNavClick('home')} 
              className={navLinkClass('home')}
            >
              <div className="flex items-center gap-2">
                <Home size={18} /> 首頁
              </div>
            </button>

            <button 
              onClick={() => handleNavClick('profile')} 
              className={navLinkClass('profile')}
            >
              <div className="flex items-center gap-2">
                <User size={18} /> 個人
              </div>
            </button>

            {/* Training Dropdown (Desktop) */}
            <div className="relative group">
              <button 
                className={`${navLinkClass('training')} flex items-center gap-2`}
                onClick={() => setIsTrainingOpen(!isTrainingOpen)}
                onMouseEnter={() => setIsTrainingOpen(true)}
              >
                <Dumbbell size={18} /> 訓練 <ChevronDown size={16} />
              </button>
              
              {/* Dropdown Content */}
              <div 
                className={`absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-left ${isTrainingOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
                onMouseEnter={() => setIsTrainingOpen(true)}
                onMouseLeave={() => setIsTrainingOpen(false)}
              >
                <div className="py-1">
                  <button onClick={() => handleNavClick('training', ExerciseType.SQUAT)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    深蹲訓練
                  </button>
                  <button onClick={() => handleNavClick('training', ExerciseType.KETTLEBELL)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    壺鈴訓練
                  </button>
                  <button onClick={() => handleNavClick('training', ExerciseType.SEATED)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    坐姿訓練
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => handleNavClick('home')} className={`w-full text-left ${mobileNavLinkClass('home')}`}>
              首頁
            </button>
            <button onClick={() => handleNavClick('profile')} className={`w-full text-left ${mobileNavLinkClass('profile')}`}>
              個人
            </button>
            
            {/* Mobile Training Accordion */}
            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-gray-700">訓練項目</div>
              <button onClick={() => handleNavClick('training', ExerciseType.SQUAT)} className="block w-full text-left pl-6 pr-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                - 深蹲訓練
              </button>
              <button onClick={() => handleNavClick('training', ExerciseType.KETTLEBELL)} className="block w-full text-left pl-6 pr-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                - 壺鈴訓練
              </button>
              <button onClick={() => handleNavClick('training', ExerciseType.SEATED)} className="block w-full text-left pl-6 pr-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                - 坐姿訓練
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
