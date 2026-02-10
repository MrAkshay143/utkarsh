import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, LabelList, PieChart, Pie, Legend } from 'recharts';

interface ChartProps {
  data: any[];
  color?: string;
  colors?: string[];
}

export const SimplePieChart: React.FC<ChartProps> = ({ data, colors }) => {
  const chartColors = colors || ['#005CA9', '#E31E24', '#FFD100', '#059669', '#7C3AED'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="75%"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} stroke="none" />
            ))}
            <LabelList 
              dataKey="value" 
              position="outside" 
              fill="#374151" 
              fontSize={14} 
              fontWeight="bold"
              formatter={(value: number) => value.toLocaleString()}
            />
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
          <Legend verticalAlign="bottom" height={40} iconType="circle" iconSize={10} wrapperStyle={{ fontSize: '13px', fontWeight: '600' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const SimpleBarChart: React.FC<ChartProps> = ({ data, color = "#005CA9", colors }) => {
  const uniqueId = React.useId ? React.useId() : Math.random().toString(36).substr(2, 9);
  const barColors = colors || [color, '#E31E24', '#FFD100', '#005CA9', '#F3F4F6'];
  const gradientId = `gradient-${uniqueId.replace(/:/g, '')}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        data={data} 
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{fill: '#4b5563', fontSize: 11, fontWeight: 600}} 
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{fill: '#9ca3af', fontSize: 11}} 
        />
        <Tooltip 
          cursor={{fill: '#f3f4f6', opacity: 0.5}}
          contentStyle={{
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }} 
        />
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={1}/>
            <stop offset="100%" stopColor={color} stopOpacity={0.6}/>
          </linearGradient>
        </defs>
        <Bar dataKey="value" fill={`url(#${gradientId})`} radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} fillOpacity={0.9} />
          ))}
          <LabelList 
            dataKey="value" 
            position="top" 
            fill="#374151" 
            fontSize={12} 
            fontWeight="bold"
            formatter={(value: number) => value.toLocaleString()}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export const MetricCard: React.FC<{ label: string; value: string; highlight?: boolean; trend?: string }> = ({ label, value, highlight, trend }) => (
  <div className={`group relative p-6 rounded-xl border border-gray-100 shadow-lg bg-white/90 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden`}>
    <div className={`absolute top-0 left-0 w-1 h-full ${highlight ? 'bg-utkarsh-red' : 'bg-utkarsh-blue'}`}></div>
    <div className="relative z-10">
        <div className="flex justify-between items-start">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</div>
            {trend && (
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${highlight ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    {trend}
                </span>
            )}
        </div>
        <div className="text-4xl font-extrabold text-gray-800 mt-3 tracking-tight">{value}</div>
    </div>
    <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-5 ${highlight ? 'bg-red-500' : 'bg-blue-500'}`}></div>
  </div>
);

export const StepProcess: React.FC<{ steps: string[] }> = ({ steps }) => {
  const parseStep = (step: string) => {
    const parts = step.split(' - ');
    return {
      title: parts[0] || step,
      description: parts[1] || ''
    };
  };

  return (
    <div className="relative w-full py-8">
      {/* Connecting Line for Desktop */}
      <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-1 bg-gray-200 z-0 rounded-full"></div>
      
      <div className="flex flex-col md:flex-row gap-8 items-stretch justify-between relative z-10 px-4">
        {steps.map((step, idx) => {
          const { title, description } = parseStep(step);
          return (
            <div key={idx} className="flex-1 group">
               <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
                  {/* Decorative background number */}
                  <div className="absolute -right-4 -bottom-6 text-9xl font-black text-gray-50 opacity-[0.05] pointer-events-none select-none">
                    {idx + 1}
                  </div>
                  
                  {/* Top colored accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${idx % 2 === 0 ? 'bg-utkarsh-blue' : 'bg-utkarsh-red'}`}></div>

                  {/* Step Badge */}
                  <div className="flex justify-center mb-6">
                     <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-xl ring-4 ring-white ${idx % 2 === 0 ? 'bg-utkarsh-blue' : 'bg-utkarsh-red'}`}>
                        {idx + 1}
                     </div>
                  </div>

                  {/* Content */}
                  <div className="text-center relative z-10">
                    <h4 className="text-lg font-extrabold text-gray-800 mb-3 leading-tight uppercase tracking-tight">{title}</h4>
                    {description && (
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">{description}</p>
                    )}
                  </div>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ComparisonTable: React.FC<{ columns: string[]; rows: any[] }> = ({ columns, rows }) => (
  <div className="h-full flex flex-col">
    <div className="flex-1 overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-utkarsh-blue to-utkarsh-blue/80">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {rows.map((row, rIdx) => {
            const bulletColors = ['#E31E24', '#005CA9', '#FFD100'];
            return (
              <tr key={rIdx} className={`transition-colors hover:bg-utkarsh-blue/5 ${rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-800 border-l-4 border-utkarsh-red">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3 flex-shrink-0" 
                      style={{ backgroundColor: bulletColors[rIdx] }}
                    ></div>
                    {row.region}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-700 bg-gray-50/50">
                  {row.monthly}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-utkarsh-blue bg-blue-50/70 border-r-4 border-utkarsh-blue">
                  {row.annual}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="mt-3 text-center">
      <p className="text-xs text-gray-500 font-medium bg-gray-50 px-3 py-2 rounded-lg border">
        * All figures represent number of quotations
      </p>
    </div>
  </div>
);

// Icon components for dashboard
const getIcon = (iconType: string) => {
  const iconClass = "w-5 h-5";
  switch (iconType) {
    case 'document':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'check':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'truck':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      );
    case 'area':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
        </svg>
      );
    case 'birds':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
  }
};

export const DashboardMetricCard: React.FC<{ label: string; value: string; icon: string; index: number }> = ({ label, value, icon, index }) => {
  const colors = ['#E31E24', '#005CA9', '#FFD100', '#059669', '#7C3AED', '#DC2626'];
  const bgColors = ['bg-red-50', 'bg-blue-50', 'bg-yellow-50', 'bg-green-50', 'bg-purple-50', 'bg-red-50'];
  const borderColors = ['border-red-200', 'border-blue-200', 'border-yellow-200', 'border-green-200', 'border-purple-200', 'border-red-200'];
  const color = colors[index % colors.length];
  const bgColor = bgColors[index % bgColors.length];
  const borderColor = borderColors[index % borderColors.length];
  
  return (
    <div className={`${bgColor} p-3 rounded-xl border-2 ${borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform" style={{ backgroundColor: color }}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">{label}</div>
          <div className="p-1.5 rounded-lg bg-white shadow-sm" style={{ color }}>
            {getIcon(icon)}
          </div>
        </div>
        <div className="text-2xl font-black tracking-tight" style={{ color }}>{value}</div>
      </div>
    </div>
  );
};

export const DashboardDataTable: React.FC<{ columns: string[]; data: any }> = ({ columns, data }) => {
  const values = [
    data.quotationIssued,
    data.quotationConfirm,
    data.orderReceivedSq,
    data.orderReceivedBirds,
    data.noOfDispatch,
    data.dispatchSqFt,
    data.dispatchBirds
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-utkarsh-blue to-blue-600 px-4 py-2 flex items-center">
        <svg className="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-white font-bold text-sm uppercase tracking-wider">ACHIEVEMENT DETAILS</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b-2 border-utkarsh-blue/20">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-2 py-2 text-left text-[10px] font-extrabold text-gray-600 uppercase tracking-widest">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-blue-50/50 transition-colors">
              {values.map((val, idx) => (
                <td key={idx} className="px-2 py-2 whitespace-nowrap text-sm font-bold text-gray-800 border-b border-gray-100">
                  {val.toLocaleString()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const TargetDashboardTable: React.FC<{ columns: string[]; targets: any[] }> = ({ columns, targets }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-utkarsh-red to-red-600 px-4 py-2.5 flex items-center">
        <svg className="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        <h3 className="text-white font-bold text-sm uppercase tracking-wider">TARGET BREAKDOWN</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b-2 border-utkarsh-red/20">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-3 py-2 text-left text-[10px] font-extrabold text-gray-600 uppercase tracking-widest">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {targets.map((target, idx) => (
              <tr key={idx} className="hover:bg-red-50/50 transition-colors">
                <td className="px-3 py-2 whitespace-nowrap text-sm font-bold text-utkarsh-blue border-l-4 border-utkarsh-red">
                  {target.period}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm font-bold text-gray-800">
                  {target.orderReceiveSqFt.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-800">
                  {target.orderReceiveBirds.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-800">
                  {target.dispatchSqFt.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-800">
                  {target.dispatchBirds.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const OrganizationalChart: React.FC<{ data: any }> = ({ data }) => {
  const { title, topBox, heads, footer } = data;
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-2 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Title */}
      <h2 className="text-xl font-black text-utkarsh-blue mb-3 text-center tracking-tight">
        {title}
      </h2>
      
      {/* Top Level Box - Installation Team */}
      <div className="relative mb-6">
        <div className="bg-gradient-to-br from-utkarsh-red to-red-600 text-white px-8 py-2.5 rounded-lg shadow-lg border-2 border-white">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span className="text-base font-extrabold tracking-wide">{topBox}</span>
          </div>
        </div>
        {/* Vertical line down from top box */}
        <div className="absolute left-1/2 -bottom-6 w-0.5 h-6 bg-gradient-to-b from-utkarsh-blue to-blue-400 transform -translate-x-1/2"></div>
      </div>
      
      {/* Horizontal connector line */}
      <div className="relative w-full max-w-6xl mb-3">
        <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-utkarsh-blue to-transparent" style={{ left: '12.5%', right: '12.5%' }}></div>
        
        {/* Second Level - Installation Heads */}
        <div className="grid grid-cols-4 gap-3 relative">
          {heads.map((head: any, headIdx: number) => (
            <div key={headIdx} className="flex flex-col items-center relative">
              {/* Vertical line up to horizontal connector */}
              <div className="w-0.5 h-3 bg-gradient-to-b from-utkarsh-blue to-blue-400 mb-1"></div>
              
              {/* Head Box */}
              <div className="bg-gradient-to-br from-utkarsh-blue to-blue-600 text-white px-3 py-2 rounded-lg shadow-md border-2 border-white mb-3 w-full text-center relative z-10">
                <div className="flex items-center justify-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <span className="text-xs font-bold">{head.name}</span>
                </div>
              </div>
              
              {/* Vertical line from head to teams */}
              {head.teams.length > 0 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-400 to-transparent" 
                     style={{ top: 'calc(3px + 2.5rem + 0.75rem)', height: 'calc(100% - 3.5rem)' }}></div>
              )}
              
              {/* Teams under this head */}
              <div className="flex flex-col gap-1.5 w-full relative">
                {head.teams.map((team: any, teamIdx: number) => (
                  <div key={teamIdx} className="relative">
                    {/* Horizontal connector to team box */}
                    <div className="absolute left-0 top-1/2 w-4 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 transform -translate-y-1/2 -translate-x-4"></div>
                    
                    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-2 hover:shadow-lg transition-all hover:border-utkarsh-blue relative z-10">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <span className="text-[11px] font-extrabold text-utkarsh-blue">{team.name}</span>
                      </div>
                      <div className="text-[9px] space-y-0.5">
                        <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded">
                          <svg className="w-2.5 h-2.5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                          </svg>
                          <span className="font-bold text-gray-700">Staff: {team.staff}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-blue-50 px-1.5 py-0.5 rounded">
                          <svg className="w-2.5 h-2.5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                          </svg>
                          <span className="font-bold text-gray-700">Farms/Mo: {team.farms}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Summary */}
      <div className="mt-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg shadow-lg border-2 border-white">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          <span className="text-sm font-extrabold tracking-wide">{footer}</span>
        </div>
      </div>
    </div>
  );
};
