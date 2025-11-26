import React from 'react';
import { ExerciseType, TrainingLevel } from '../types';
import { EXERCISE_MAPPING } from '../constants';
import { PlayCircle, Award, Target, Info } from 'lucide-react';

interface TrainingProps {
  exerciseType: ExerciseType;
  recommendedLevel: TrainingLevel; // From user Profile
}

const Training: React.FC<TrainingProps> = ({ exerciseType, recommendedLevel = TrainingLevel.MIDDLE }) => {
  
  // Logic: Get the specific move name based on Type and Level
  const recommendedMove = EXERCISE_MAPPING[exerciseType][recommendedLevel];

  // Helper for colors
  const themeColor = 
    exerciseType === ExerciseType.SQUAT ? 'blue' : 
    exerciseType === ExerciseType.KETTLEBELL ? 'orange' : 'purple';
  
  const bgClass = 
    exerciseType === ExerciseType.SQUAT ? 'bg-blue-600' : 
    exerciseType === ExerciseType.KETTLEBELL ? 'bg-orange-600' : 'bg-purple-600';

  const textClass = 
    exerciseType === ExerciseType.SQUAT ? 'text-blue-600' : 
    exerciseType === ExerciseType.KETTLEBELL ? 'text-orange-600' : 'text-purple-600';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className={`${bgClass} rounded-2xl p-8 text-white shadow-lg mb-8 relative overflow-hidden`}>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-6 w-6 opacity-80" />
            <h2 className="text-sm font-bold uppercase tracking-wider opacity-80">今日訓練重點</h2>
          </div>
          <h1 className="text-4xl font-extrabold mb-4">{exerciseType}訓練</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            系統已根據您的歷史表現分析，為您客製化了最適合的訓練難度。
          </p>
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Recommendation Card (Main Focus) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Award className={`h-6 w-6 ${textClass}`} />
                推薦課程: <span className={`${textClass}`}>{recommendedMove}</span>
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white uppercase ${bgClass}`}>
                {recommendedLevel} Level
              </span>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-6 relative group cursor-pointer overflow-hidden">
                {/* Placeholder for Video/Image */}
                <img 
                  src={`https://picsum.photos/800/400?random=${exerciseType}`} 
                  alt={recommendedMove}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 p-4 rounded-full shadow-2xl group-hover:scale-110 transition-transform">
                    <PlayCircle className={`h-12 w-12 ${textClass}`} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-lg text-gray-700">訓練指南</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className={`mt-1 h-2 w-2 rounded-full ${bgClass}`}></span>
                    保持核心收緊，動作過程平穩。
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`mt-1 h-2 w-2 rounded-full ${bgClass}`}></span>
                    請依照影片指示，注意{exerciseType === ExerciseType.SQUAT ? '膝蓋' : '背部'}位置。
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`mt-1 h-2 w-2 rounded-full ${bgClass}`}></span>
                    建議組數: 3組 x 12次。
                  </li>
                </ul>
                
                <button className={`w-full mt-6 py-3 rounded-xl font-bold text-white shadow-md hover:opacity-90 transition-opacity ${bgClass}`}>
                  開始訓練
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Level Info / Logic Explanation */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info size={18} className="text-gray-400"/>
              等級說明
            </h4>
            <div className="space-y-4">
               {Object.entries(EXERCISE_MAPPING[exerciseType]).map(([lvl, name]) => (
                 <div 
                  key={lvl} 
                  className={`p-4 rounded-lg border transition-all ${lvl === recommendedLevel ? `border-${themeColor}-500 bg-${themeColor}-50 ring-1 ring-${themeColor}-200` : 'border-gray-200 opacity-60'}`}
                >
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-xs font-bold uppercase text-gray-500">{lvl}</span>
                     {lvl === recommendedLevel && <span className={`text-xs font-bold ${textClass}`}>當前推薦</span>}
                   </div>
                   <p className="font-bold text-gray-800">{name}</p>
                 </div>
               ))}
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-500 leading-relaxed">
              * 系統會根據您過去的「正確率」與「姿勢穩定度」自動調整推薦等級。如需手動調整，請諮詢教練。
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Training;
