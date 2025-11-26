import React from 'react';
import { ArrowRight, Activity, ShieldCheck, TrendingUp } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="inline-block p-4 rounded-full bg-white shadow-xl mb-4 animate-bounce">
          <Activity className="h-12 w-12 text-primary" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          歡迎來到 <span className="text-primary">CoreCare</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          您的專屬智能運動教練。透過數據分析與個人化建議，精準提升您的訓練品質，預防運動傷害，打造強健體魄。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-primary">
            <ShieldCheck className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">姿勢矯正</h3>
            <p className="text-slate-500">即時監測深蹲、壺鈴與坐姿，提供準確的錯誤修正建議。</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-accent">
            <TrendingUp className="h-8 w-8 text-accent mb-4" />
            <h3 className="font-bold text-lg mb-2">數據追蹤</h3>
            <p className="text-slate-500">詳細記錄每次訓練的正確率與進步幅度，可視化您的成長。</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-indigo-500">
            <Activity className="h-8 w-8 text-indigo-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">分級訓練</h3>
            <p className="text-slate-500">根據您的表現自動推薦 Lower, Middle, Upper 不同強度的訓練。</p>
          </div>
        </div>

        <div className="mt-12">
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-primary font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-blue-700 shadow-lg hover:-translate-y-1"
          >
            開始您的旅程
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
