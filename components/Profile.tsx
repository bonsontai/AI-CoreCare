import React, { useState, useMemo } from 'react';
    import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
    import { UserProfileData, ExerciseType, RadarStats, TrainingSession } from '../types';
    import { Filter, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
    
    interface ProfileProps {
      userData: UserProfileData;
    }
    
    const Profile: React.FC<ProfileProps> = ({ userData }) => {
      const [filterType, setFilterType] = useState<ExerciseType | 'ALL'>('ALL');
    
      // Filter sessions based on selection
      const filteredSessions = useMemo(() => {
        if (filterType === 'ALL') return userData.sessions;
        return userData.sessions.filter(s => s.type === filterType);
      }, [filterType, userData.sessions]);
    
      // Calculate Radar Chart Data dynamically
      const chartData: RadarStats[] = useMemo(() => {
        let totalSessions = filteredSessions.length;
        if (totalSessions === 0) totalSessions = 1; // Prevent divide by zero
    
        const totalCorrect = filteredSessions.reduce((acc, curr) => acc + curr.correctCount, 0);
        const totalErrors = filteredSessions.reduce((acc, curr) => acc + curr.errorCount, 0);
        const totalMoves = totalCorrect + totalErrors || 1;
    
        const accuracy = Math.round((totalCorrect / totalMoves) * 100);
        // Mastery: Mock logic (e.g., ratio of 'Excellent' results)
        const excellentCount = filteredSessions.filter(s => s.result === 'Excellent').length;
        const mastery = Math.round((excellentCount / totalSessions) * 100);
        // Consistency: Mock logic (e.g., inversely proportional to error variance, just hardcoded random for mock)
        const consistency = totalSessions > 0 ? 85 : 0; 
        // Commitment: Mock logic (e.g. sessions per week)
        const commitment = totalSessions > 0 ? 90 : 0;
    
        return [
          { subject: '姿勢準確度 (Accuracy)', A: accuracy, fullMark: 100 },
          { subject: '等級掌握度 (Mastery)', A: mastery, fullMark: 100 },
          { subject: '穩定性分數 (Consistency)', A: consistency, fullMark: 100 },
          { subject: '總體投入度 (Commitment)', A: commitment, fullMark: 100 },
        ];
      }, [filteredSessions]);
    
      // Calculate totals for summary cards
      const summaryStats = useMemo(() => {
        const stats = {
          squatError: 0, squatCorrect: 0,
          kettleError: 0, kettleCorrect: 0,
          seatedError: 0, seatedCorrect: 0
        };
        
        userData.sessions.forEach(s => {
          if (s.type === ExerciseType.SQUAT) {
            stats.squatError += s.errorCount;
            stats.squatCorrect += s.correctCount;
          } else if (s.type === ExerciseType.KETTLEBELL) {
            stats.kettleError += s.errorCount;
            stats.kettleCorrect += s.correctCount;
          } else if (s.type === ExerciseType.SEATED) {
            stats.seatedError += s.errorCount;
            stats.seatedCorrect += s.correctCount;
          }
        });
        return stats;
      }, [userData.sessions]);
    
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">個人訓練數據</h2>
              <p className="text-slate-500 mt-1">歡迎回來，{userData.name}</p>
            </div>
            
            {/* Filter Dropdown */}
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <Filter className="text-slate-400" size={20} />
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as ExerciseType | 'ALL')}
                className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md border"
              >
                <option value="ALL">所有數據</option>
                <option value={ExerciseType.SQUAT}>深蹲 (Squat)</option>
                <option value={ExerciseType.KETTLEBELL}>壺鈴 (Kettlebell)</option>
                <option value={ExerciseType.SEATED}>坐姿 (Seated)</option>
              </select>
            </div>
          </div>
    
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Radar Chart */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
              <h3 className="text-xl font-bold text-slate-700 mb-4 w-full text-center">綜合能力分析</h3>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false}/>
                    <Radar
                      name="My Stats"
                      dataKey="A"
                      stroke="#2563eb"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center text-sm text-slate-500">
                <p>根據您 {filterType === 'ALL' ? '所有' : filterType} 訓練紀錄分析</p>
              </div>
            </div>
    
            {/* Right: Stats Summary */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Squat Card */}
               <div className={`bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500 ${(filterType !== 'ALL' && filterType !== ExerciseType.SQUAT) ? 'opacity-50' : ''}`}>
                 <div className="flex justify-between items-start mb-2">
                   <h4 className="font-bold text-lg">深蹲數據</h4>
                   <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">SQUAT</span>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-1"><CheckCircle size={14} className="text-green-500"/> 正確次數</span>
                      <span className="font-bold">{summaryStats.squatCorrect}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-1"><AlertCircle size={14} className="text-red-500"/> 錯誤次數</span>
                      <span className="font-bold">{summaryStats.squatError}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 mt-2">
                        <p className="text-xs text-slate-400">系統建議:</p>
                        <p className="text-sm text-slate-700 italic">"注意膝蓋不要內夾，重心放腳跟。"</p>
                    </div>
                 </div>
               </div>
    
               {/* Kettlebell Card */}
               <div className={`bg-white p-5 rounded-xl shadow-sm border-l-4 border-orange-500 ${(filterType !== 'ALL' && filterType !== ExerciseType.KETTLEBELL) ? 'opacity-50' : ''}`}>
                 <div className="flex justify-between items-start mb-2">
                   <h4 className="font-bold text-lg">壺鈴數據</h4>
                   <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-1 rounded">KETTLEBELL</span>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-1"><CheckCircle size={14} className="text-green-500"/> 正確次數</span>
                      <span className="font-bold">{summaryStats.kettleCorrect}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-1"><AlertCircle size={14} className="text-red-500"/> 錯誤次數</span>
                      <span className="font-bold">{summaryStats.kettleError}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 mt-2">
                        <p className="text-xs text-slate-400">系統建議:</p>
                        <p className="text-sm text-slate-700 italic">"擺盪時利用髖部發力，非手臂。"</p>
                    </div>
                 </div>
               </div>
    
               {/* Seated Card */}
               <div className={`bg-white p-5 rounded-xl shadow-sm border-l-4 border-purple-500 ${(filterType !== 'ALL' && filterType !== ExerciseType.SEATED) ? 'opacity-50' : ''}`}>
                 <div className="flex justify-between items-start mb-2">
                   <h4 className="font-bold text-lg">坐姿數據</h4>
                   <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded">SEATED</span>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-1"><CheckCircle size={14} className="text-green-500"/> 正確次數</span>
                      <span className="font-bold">{summaryStats.seatedCorrect}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-1"><AlertCircle size={14} className="text-red-500"/> 錯誤次數</span>
                      <span className="font-bold">{summaryStats.seatedError}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100 mt-2">
                        <p className="text-xs text-slate-400">系統建議:</p>
                        <p className="text-sm text-slate-700 italic">"保持背部挺直，避免長時間駝背。"</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
    
          {/* Detailed History Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-slate-800">近期訓練紀錄</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時間</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">項目/姿勢</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">結果</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">數據 (正/誤)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI 建議</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{session.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{session.type}</div>
                          <span className="mx-2 text-gray-300">|</span>
                          <div className="text-sm text-gray-500">{session.pose}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${session.result === 'Excellent' ? 'bg-green-100 text-green-800' : 
                            session.result === 'Good' ? 'bg-blue-100 text-blue-800' :
                            session.result === 'Fair' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {session.result}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         <span className="text-green-600 font-bold">{session.correctCount}</span> / <span className="text-red-500 font-bold">{session.errorCount}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        <div className="flex items-center gap-1">
                          <Lightbulb size={14} className="text-yellow-500 flex-shrink-0"/>
                          {session.suggestion}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredSessions.length === 0 && (
                      <tr>
                          <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                              沒有找到相關數據
                          </td>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };
    
    export default Profile;
    