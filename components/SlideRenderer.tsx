import React from 'react';
import { SlideData, SlideType } from '../types';
import { SimpleBarChart, SimplePieChart, MetricCard, StepProcess, ComparisonTable, DashboardMetricCard, DashboardDataTable, TargetDashboardTable } from './SlideComponents';
import { UtkarshLogo } from '../constants';

interface Props {
  data: SlideData;
}

const SlideRenderer: React.FC<Props> = ({ data }) => {

  // Helper function to check if a field should be displayed
  const isFieldVisible = (fieldKey: string) => {
    return !data.hiddenFields?.[fieldKey];
  };

  // Layout Containers
  const renderContent = () => {
    switch (data.type) {
      case SlideType.COVER:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 z-10 relative">
            <div className="bg-white/80 p-16 rounded-2xl shadow-2xl backdrop-blur-md border-t-8 border-utkarsh-red max-w-4xl w-full relative">
               {/* Company Logo in top-right corner of the card */}
               <div className="absolute top-4 right-4 z-20">
                 <div className="bg-white/90 p-2 rounded-lg shadow-md border border-gray-200">
                   <img src="/image.png" alt="UTKARSH Logo" className="h-20 w-auto object-contain" />
                 </div>
               </div>
               <UtkarshLogo className="mb-10 scale-150" />
               <div className="w-32 h-1.5 bg-gradient-to-r from-utkarsh-red to-utkarsh-yellow mx-auto mb-10 rounded-full"></div>
               {isFieldVisible('cover-moto') && (
                 <h2 className="text-3xl md:text-4xl font-light text-gray-800 leading-tight">
                  <span className="font-bold block mb-2 text-utkarsh-blue">PROJECT UTKARSH</span>
                  "{data.content.moto}"
                 </h2>
               )}
               <div className="mt-12 flex flex-wrap justify-center gap-4">
                  {data.content.bullets.map((b: string, i: number) => (
                    isFieldVisible(`cover-bullet-${i}`) && (
                      <div key={i} className="flex items-center px-5 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold shadow-sm">
                          <span className="w-2 h-2 bg-utkarsh-blue rounded-full mr-3"></span>
                          {b}
                      </div>
                    )
                  ))}
               </div>
            </div>
          </div>
        );

      case SlideType.TWO_COLUMN:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-stretch">
            {/* Basic EC - Left */}
            <div className="bg-white/90 p-8 rounded-2xl shadow-xl border-t-8 border-gray-400 backdrop-blur-sm flex flex-col hover:shadow-2xl transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                   {isFieldVisible('left-title') && <h3 className="text-4xl font-extrabold text-gray-700 mb-1">{data.content.left.title}</h3>}
                   {isFieldVisible('left-tagline') && <p className="text-gray-500 font-medium">{data.content.left.tagline}</p>}
                </div>
                <div className="p-2 bg-gray-100 rounded-lg">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                 {data.content.left.features.map((feature: string, idx: number) => (
                    isFieldVisible(`left-f${idx}`) && (
                      <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    )
                 ))}
              </ul>

              {isFieldVisible('left-highlight') && (
                <div className="mt-auto bg-gray-100 p-4 rounded-xl text-center border border-gray-200">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Key Advantage</span>
                  <span className="text-lg font-bold text-gray-800">{data.content.left.highlight}</span>
                </div>
              )}
            </div>

            {/* Full EC - Right */}
            <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl border-t-8 border-utkarsh-blue backdrop-blur-sm flex flex-col hover:shadow-2xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-utkarsh-blue opacity-5 rounded-full -mr-10 -mt-10"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                   {isFieldVisible('right-title') && <h3 className="text-4xl font-extrabold text-utkarsh-blue mb-1">{data.content.right.title}</h3>}
                   {isFieldVisible('right-tagline') && <p className="text-blue-600 font-medium">{data.content.right.tagline}</p>}
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-8 h-8 text-utkarsh-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                 {data.content.right.features.map((feature: string, idx: number) => (
                    isFieldVisible(`right-f${idx}`) && (
                      <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-utkarsh-blue mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span className="text-gray-800 font-bold">{feature}</span>
                      </li>
                    )
                 ))}
              </ul>

              {isFieldVisible('right-highlight') && (
                <div className="mt-auto bg-blue-100 p-4 rounded-xl text-center border border-blue-200 relative z-10">
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-1">Key Advantage</span>
                  <span className="text-lg font-bold text-utkarsh-blue">{data.content.right.highlight}</span>
                </div>
              )}
            </div>
          </div>
        );

      case SlideType.PROCESS:
        return (
          <div className="flex flex-col h-full justify-center space-y-6">
             <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                    <div className="p-3 bg-blue-50 rounded-xl mr-4">
                        <svg className="w-8 h-8 text-utkarsh-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-extrabold text-gray-800 uppercase tracking-wide">Business Pipeline Objectives</h3>
                        <p className="text-xs text-gray-500 font-semibold tracking-widest mt-1">OPERATIONAL GOALS</p>
                    </div>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {data.content.purpose.map((p: string, i: number) => (
                        isFieldVisible(`purpose-${i}`) && (
                          <li key={i} className="flex items-start group">
                               <div className="mt-1 w-2 h-2 rounded-full bg-utkarsh-red mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                               <span className="text-gray-600 font-medium text-sm leading-relaxed">{p}</span>
                          </li>
                        )
                    ))}
                </ul>
             </div>
             
             {/* Process Steps */}
             <div className="flex-1 flex items-center">
                <StepProcess steps={data.content.steps} />
             </div>
          </div>
        );

      case SlideType.METRIC_CHART:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-center">
            <div className="lg:col-span-1 space-y-6">
               {data.content.metrics.map((m: any, i: number) => (
                   <MetricCard key={i} label={m.label} value={m.value} highlight={i === 0} trend={m.trend} />
               ))}
               {data.content.insight && (
                 <div className="bg-utkarsh-yellow/10 p-5 rounded-xl border border-utkarsh-yellow/50 text-gray-800 text-sm font-medium backdrop-blur-sm shadow-sm flex items-start">
                    <svg className="w-5 h-5 text-utkarsh-yellow mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-5a1 1 0 100 2 1 1 0 000-2z" />
                    </svg>
                    <span className="leading-relaxed">{data.content.insight}</span>
                 </div>
               )}
            </div>
            <div className="lg:col-span-2 bg-white/95 p-8 rounded-2xl shadow-xl h-96 flex flex-col backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Performance Trend</h4>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-utkarsh-blue"></span>
                        <span className="text-xs text-gray-500">Volume</span>
                    </div>
                </div>
                <div className="flex-1">
                    <SimpleBarChart data={data.content.chartData} colors={['#E31E24', '#005CA9', '#FFD100', '#E31E24', '#005CA9', '#FFD100']} />
                </div>
            </div>
          </div>
        );

      case SlideType.TABLE_CHART:
         return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
                <div className="bg-white/95 p-8 rounded-2xl shadow-xl backdrop-blur-sm h-96 flex flex-col">
                    <h4 className="text-sm font-bold text-gray-400 uppercase mb-6 tracking-wider">Data Table</h4>
                    <div className="flex-1 overflow-visible">
                        <ComparisonTable columns={data.content.columns} rows={data.content.rows} />
                    </div>
                </div>
                <div className="bg-white/95 p-8 rounded-2xl shadow-xl h-96 flex flex-col backdrop-blur-sm">
                    <h4 className="text-sm font-bold text-gray-400 uppercase mb-6 tracking-wider">Annualized Projection</h4>
                    <div className="flex-1">
                        <SimpleBarChart data={data.content.chartData} colors={['#E31E24', '#005CA9', '#FFD100']} />
                    </div>
                </div>
            </div>
         );

      case SlideType.DASHBOARD_TABLE:
        return (
          <div className="h-full flex flex-col gap-3">
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-7 gap-1">
              {data.content.metrics.map((m: any, i: number) => (
                <DashboardMetricCard key={i} label={m.label} value={m.value} icon={m.icon} index={i} />
              ))}
            </div>

            {/* Achievement Details Table - Full Width */}
            <div className="">
                <DashboardDataTable columns={data.content.columns} data={data.content.data} />
            </div>

            {/* Bottom Charts Grid */}
            <div className="flex-1 grid grid-cols-3 gap-3 min-h-0">
              {/* Quotation Status Chart */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 flex flex-col">
                <h4 className="text-sm font-bold text-gray-600 uppercase mb-2 tracking-wider flex items-center">
                  <svg className="w-4 h-4 mr-2 text-utkarsh-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  QUOTATION STATUS CHART
                </h4>
                <div className="flex-1 min-h-0">
                  <SimpleBarChart data={data.content.chartData} />
                </div>
              </div>

              {/* Order vs Dispatch Sq Ft */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 flex flex-col">
                <h4 className="text-sm font-bold text-gray-600 uppercase mb-2 tracking-wider flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z" />
                  </svg>
                  SQ FT: ORDER VS DISPATCH
                </h4>
                <div className="flex-1 min-h-0">
                  <SimplePieChart data={[
                    { name: 'Ordered', value: 650000 },
                    { name: 'Dispatched', value: 169082 }
                  ]} colors={['#059669', '#DC2626']} />
                </div>
              </div>

              {/* Birds: Order vs Dispatch */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 flex flex-col">
                <h4 className="text-sm font-bold text-gray-600 uppercase mb-2 tracking-wider flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  BIRDS: ORDER VS DISPATCH
                </h4>
                <div className="flex-1 min-h-0">
                  <SimpleBarChart data={[
                    { name: 'ORDER RECEIVE', value: 812500 },
                    { name: 'DISPATCHED', value: 215169 }
                  ]} colors={['#005CA9', '#FFD100']} />
                </div>
              </div>
            </div>
          </div>
        );

      case SlideType.TARGET_DASHBOARD:
        return (
          <div className="h-full flex flex-col gap-3">
            {/* Target Table */}
            <div className="">
              <TargetDashboardTable columns={data.content.columns} targets={data.content.targets} />
            </div>

            {/* Target Visualizations Grid */}
            <div className="flex-1 grid grid-cols-2 gap-3">
              {/* Sq Ft Targets Comparison */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3">
                <h4 className="text-sm font-bold text-gray-600 uppercase mb-2 tracking-wider flex items-center">
                  <svg className="w-4 h-4 mr-2 text-utkarsh-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  SQ FT TARGETS
                </h4>
                <div className="h-44">
                  <SimpleBarChart data={[
                    { name: '3M Order', value: 900000 },
                    { name: '3M Dispatch', value: 600000 },
                    { name: '1Y Order', value: 3600000 },
                    { name: '1Y Dispatch', value: 2400000 }
                  ]} colors={['#E31E24', '#005CA9', '#DC2626', '#2563EB']} />
                </div>
              </div>

              {/* Birds Targets Comparison */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3">
                <h4 className="text-sm font-bold text-gray-600 uppercase mb-2 tracking-wider flex items-center">
                  <svg className="w-4 h-4 mr-2 text-utkarsh-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  BIRDS TARGETS
                </h4>
                <div className="h-44">
                  <SimpleBarChart data={[
                    { name: '3M Order', value: 1125000 },
                    { name: '3M Dispatch', value: 750000 },
                    { name: '1Y Order', value: 4500000 },
                    { name: '1Y Dispatch', value: 3000000 }
                  ]} colors={['#7C3AED', '#059669', '#A855F7', '#10B981']} />
                </div>
              </div>
            </div>

            {/* Combined Comparison */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg border-2 border-utkarsh-blue/20 p-4">
              <h4 className="text-sm font-bold text-utkarsh-blue uppercase mb-3 tracking-wider flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                ORDER TO DISPATCH RATIO ANALYSIS
              </h4>
              <div className="grid grid-cols-4 gap-3 mt-2">
                <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                  <div className="text-xs text-gray-500 font-semibold mb-1">3M Sq Ft Gap</div>
                  <div className="text-lg font-bold text-orange-600">300K</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                  <div className="text-xs text-gray-500 font-semibold mb-1">1Y Sq Ft Gap</div>
                  <div className="text-lg font-bold text-red-600">1.2M</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                  <div className="text-xs text-gray-500 font-semibold mb-1">3M Birds Gap</div>
                  <div className="text-lg font-bold text-purple-600">375K</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                  <div className="text-xs text-gray-500 font-semibold mb-1">1Y Birds Gap</div>
                  <div className="text-lg font-bold text-blue-600">1.5M</div>
                </div>
              </div>
            </div>
          </div>
        );

      case SlideType.BULLET_SUMMARY:
          return (
            <div className="flex h-full gap-10 px-8 py-4 items-stretch">
                {/* ACHIEVEMENTS COLUMN */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mr-4 shadow-sm">
                             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">Key Achievements</h3>
                            <p className="text-sm font-semibold text-green-600 uppercase tracking-widest">Current Status</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                        {data.content.achievements.map((item: string, i: number) => (
                            isFieldVisible(`ach-${i}`) && (
                              <div key={i} className="bg-white p-4 rounded-xl shadow-md border border-green-100 flex items-start group hover:shadow-lg transition-all hover:-translate-y-0.5 relative overflow-hidden">
                                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>
                                  <div className="mt-1 mr-3 min-w-[20px] h-5 rounded-full bg-green-50 flex items-center justify-center text-xs font-bold text-green-600 border border-green-200">
                                      {i+1}
                                  </div>
                                  <p className="text-gray-700 font-medium leading-relaxed">
                                      {item.split(/(\d[\d,\.%]*)/).map((part, idx) => 
                                        /\d/.test(part) ? <span key={idx} className="font-bold text-gray-900">{part}</span> : part
                                      )}
                                  </p>
                              </div>
                            )
                        ))}
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 my-4"></div>

                {/* TARGETS COLUMN */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-xl bg-utkarsh-red/10 text-utkarsh-red flex items-center justify-center mr-4 shadow-sm">
                             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">Future Targets</h3>
                            <p className="text-sm font-semibold text-utkarsh-red uppercase tracking-widest">Growth Plan</p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        {data.content.targets.map((item: string, i: number) => (
                            isFieldVisible(`tgt-${i}`) && (
                              <div key={i} className="bg-white p-4 rounded-xl shadow-md border border-red-100 flex items-start group hover:shadow-lg transition-all hover:-translate-y-0.5 relative overflow-hidden">
                                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-utkarsh-red"></div>
                                  <div className="mt-1 mr-3 min-w-[20px] h-5 rounded-full bg-red-50 flex items-center justify-center text-xs font-bold text-utkarsh-red border border-red-200">
                                      {i+1}
                                  </div>
                                  <p className="text-gray-700 font-medium leading-relaxed">
                                      {item.split(/(\d[\d,\.%]*)/).map((part, idx) => 
                                        /\d/.test(part) ? <span key={idx} className="font-bold text-gray-900">{part}</span> : part
                                      )}
                                  </p>
                              </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
          );

      case SlideType.CONCLUSION:
          return (
            <div className="flex flex-col justify-center h-full text-center relative">
                {/* Main Content Card */}
                <div className="bg-white rounded-3xl shadow-xl max-w-6xl w-full mx-auto h-full flex flex-col relative overflow-hidden border-2 border-gray-200">
                    {/* Top Accent Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-utkarsh-red via-utkarsh-yellow to-utkarsh-red"></div>

                    {/* Subtle Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-10 right-10 w-40 h-40 bg-utkarsh-blue rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-32 h-32 bg-utkarsh-red rounded-full blur-3xl"></div>
                    </div>

                    {/* Content Container - Compact */}
                    <div className="relative z-10 flex-1 flex flex-col justify-evenly py-6 px-6 md:px-10">
                        {/* Hero Section */}
                        <div>
                            <div className="flex justify-center mb-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-utkarsh-blue/10 rounded-full blur-lg scale-110"></div>
                                    <img src="/image.png" alt="UTKARSH Logo" className="relative w-20 h-20 md:w-24 md:h-24 drop-shadow-lg" />
                                </div>
                            </div>

                            {isFieldVisible('conc-main') && (
                              <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight mb-2 text-gray-900">
                                  {data.content.main}
                              </h1>
                            )}

                            {isFieldVisible('conc-sub') && (
                              <p className="text-base md:text-lg text-gray-600 font-light italic max-w-3xl mx-auto">
                                  {data.content.sub}
                              </p>
                            )}
                        </div>

                        {/* Strategic Focus Section */}
                        {isFieldVisible('conc-focus') && (
                          <div>
                              <div className="bg-gradient-to-r from-utkarsh-blue/10 via-blue-50 to-utkarsh-blue/10 py-4 px-6 md:px-8 rounded-2xl border-2 border-utkarsh-blue/20 shadow-md mx-auto inline-block">
                                  <div className="flex items-center justify-center mb-2">
                                      <div className="w-2 h-2 bg-utkarsh-yellow rounded-full mr-2 animate-pulse"></div>
                                      <span className="text-xs uppercase tracking-wider text-utkarsh-blue font-bold">Next Strategic Focus</span>
                                  </div>
                                  <div className="text-xl md:text-2xl font-bold text-gray-900">
                                      {data.content.focus}
                                  </div>
                              </div>
                          </div>
                        )}

                        {/* Achievement Indicators */}
                        <div>
                            <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
                                <div className="group text-center">
                                    <div className="relative mb-2">
                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                                            <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xs md:text-sm font-bold text-green-700 uppercase tracking-wide mb-1">Execution</h3>
                                    <p className="text-xs text-gray-600 font-medium">Operational Excellence</p>
                                </div>

                                <div className="group text-center">
                                    <div className="relative mb-2">
                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-utkarsh-blue to-blue-700 rounded-full mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                                            <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xs md:text-sm font-bold text-utkarsh-blue uppercase tracking-wide mb-1">Scaling</h3>
                                    <p className="text-xs text-gray-600 font-medium">National Expansion</p>
                                </div>

                                <div className="group text-center">
                                    <div className="relative mb-2">
                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-utkarsh-yellow to-yellow-600 rounded-full mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                                            <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xs md:text-sm font-bold text-yellow-700 uppercase tracking-wide mb-1">Growth</h3>
                                    <p className="text-xs text-gray-600 font-medium">Sustainable Success</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Message */}
                        <div className="pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500 font-medium">
                                SHALIMAR GROUP • {new Date().getFullYear()} • Driving Agricultural Innovation
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          );

      default:
        return <div>Unknown Slide Type</div>;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50 flex flex-col font-sans">
       {/* Background Layer */}
       <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 opacity-50" />
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] z-0 pointer-events-none"></div>
       </div>

       {/* Slide Header */}
       {data.id !== 1 && data.id !== 7 && (
         <div className="relative z-20 px-10 py-4 flex justify-between items-end bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div>
                {isFieldVisible('slide-title') && <h1 className="text-4xl font-extrabold text-utkarsh-blue tracking-tight drop-shadow-sm">{data.title}</h1>}
                {isFieldVisible('slide-subtitle') && data.subtitle && <p className="text-utkarsh-red font-bold mt-1 text-lg tracking-wide uppercase">{data.subtitle}</p>}
            </div>
            <div className="opacity-100 scale-90 origin-bottom-right drop-shadow-md">
                 <UtkarshLogo />
            </div>
         </div>
       )}

       {/* Content Area */}
       <div className={`relative z-10 flex-1 overflow-hidden ${
         data.id === 4 || data.id === 5 ? 'p-6' : 'p-10 md:p-14'
       }`}>
          {renderContent()}
       </div>

       {/* Footer */}
       <div className="relative z-20 bg-gray-900 text-white py-3 px-10 flex justify-between items-center text-xs font-medium tracking-wider shadow-inner">
            <div className="flex items-center">
                <span className="w-2 h-2 bg-utkarsh-red rounded-full mr-2"></span>
                SHALIMAR GROUP &copy; {new Date().getFullYear()}
            </div>
            <div className="font-mono text-gray-400 bg-gray-800 px-3 py-1 rounded">SLIDE {data.id.toString().padStart(2, '0')}</div>
       </div>
    </div>
  );
};

export default SlideRenderer;
