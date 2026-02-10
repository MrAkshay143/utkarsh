import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSlides } from '../context/SlideContext';
import { UtkarshLogo } from '../constants';
import { SlideType } from '../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { slides, updateSlide, updateSlideContent, resetToDefault } = useSlides();
  const [selectedSlideId, setSelectedSlideId] = useState(1);
  const [saveMessage, setSaveMessage] = useState('');
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleFieldVisibility = (fieldKey: string) => {
    const currentHiddenFields = selectedSlide?.hiddenFields || {};
    const newHiddenFields = { ...currentHiddenFields, [fieldKey]: !currentHiddenFields[fieldKey] };
    updateSlide(selectedSlideId, { hiddenFields: newHiddenFields });
    showSaveMessage('Visibility updated!');
  };

  const isFieldVisible = (fieldKey: string) => {
    return !(selectedSlide?.hiddenFields?.[fieldKey]);
  };

  const EyeIcon = ({ fieldKey, isVisible }: { fieldKey: string; isVisible: boolean }) => (
    <button onClick={() => toggleFieldVisibility(fieldKey)} type="button" title={isVisible ? "Click to hide from public presentation" : "Click to show in public presentation"} style={{position:'absolute',right:'8px',top:'50%',transform:'translateY(-50%)',background:isVisible?'#10B981':'#EF4444',border:'none',cursor:'pointer',padding:'6px',borderRadius:'6px',color:'white',transition:'all 0.2s',boxShadow:'0 2px 4px rgba(0,0,0,0.1)'}} onMouseEnter={(e) => e.currentTarget.style.transform='translateY(-50%) scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform='translateY(-50%) scale(1)'}>
      <svg style={{width:'16px',height:'16px',display:'block'}} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        {isVisible ? (<><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>) : (<path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />)}
      </svg>
    </button>
  );

  // Check authentication
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    navigate('/admin');
  };

  const selectedSlide = slides.find(s => s.id === selectedSlideId);

  const showSaveMessage = (message: string) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleTitleChange = (value: string) => {
    updateSlide(selectedSlideId, { title: value });
    showSaveMessage('Title updated!');
  };

  const handleSubtitleChange = (value: string) => {
    updateSlide(selectedSlideId, { subtitle: value });
    showSaveMessage('Subtitle updated!');
  };

  const getSlideTypeName = (type: SlideType) => {
    const names: Record<SlideType, string> = {
      [SlideType.COVER]: 'Cover',
      [SlideType.TWO_COLUMN]: 'Two Column',
      [SlideType.PROCESS]: 'Process Flow',
      [SlideType.METRIC_CHART]: 'Metric Chart',
      [SlideType.TABLE_CHART]: 'Table Chart',
      [SlideType.BULLET_SUMMARY]: 'Bullet Summary',
      [SlideType.CONCLUSION]: 'Conclusion',
      [SlideType.DASHBOARD_TABLE]: 'Dashboard Table',
      [SlideType.TARGET_DASHBOARD]: 'Target Dashboard',
      [SlideType.ORG_CHART]: 'Organizational Chart'
    };
    return names[type] || 'Unknown';
  };

  const renderContentEditor = () => {
    if (!selectedSlide) return null;

    switch (selectedSlide.type) {
      case SlideType.COVER:
        return (
          <div className="space-y-6">
            <div style={{position:'relative'}}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Motto / Tagline</label>
              <textarea
                value={selectedSlide.content.moto || ''}
                onChange={(e) => {
                  updateSlideContent(selectedSlideId, 'moto', e.target.value);
                  showSaveMessage('Motto updated!');
                }}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-utkarsh-blue focus:border-transparent resize-none"
                rows={3}
              />
              <div style={{position:'absolute',right:'8px',top:'38px'}}><EyeIcon fieldKey="cover-moto" isVisible={isFieldVisible('cover-moto')} /></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bullets</label>
              {selectedSlide.content.bullets?.map((bullet: string, idx: number) => (
                <div key={idx} className="flex gap-2 mb-2" style={{position:'relative'}}>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => {
                      const newBullets = [...selectedSlide.content.bullets];
                      newBullets[idx] = e.target.value;
                      updateSlideContent(selectedSlideId, 'bullets', newBullets);
                      showSaveMessage('Bullet updated!');
                    }}
                    className="flex-1 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-utkarsh-blue"
                  />
                  <EyeIcon fieldKey={`cover-bullet-${idx}`} isVisible={isFieldVisible(`cover-bullet-${idx}`)} />
                </div>
              ))}
            </div>
          </div>
        );

      case SlideType.TWO_COLUMN:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
              <h4 className="font-bold text-gray-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                Left Column (Basic EC)
              </h4>
              <div className="space-y-3">
                <div style={{position:'relative'}}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
                  <input type="text" value={selectedSlide.content.left?.title || ''} 
                    onChange={(e) => { updateSlideContent(selectedSlideId, 'left.title', e.target.value); showSaveMessage('Updated!'); }}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm" />
                  <EyeIcon fieldKey="left-title" isVisible={isFieldVisible('left-title')} />
                </div>
                <div style={{position:'relative'}}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Tagline</label>
                  <input type="text" value={selectedSlide.content.left?.tagline || ''} 
                    onChange={(e) => { updateSlideContent(selectedSlideId, 'left.tagline', e.target.value); showSaveMessage('Updated!'); }}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm" />
                  <EyeIcon fieldKey="left-tagline" isVisible={isFieldVisible('left-tagline')} />
                </div>
                <div style={{position:'relative'}}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Highlight</label>
                  <input type="text" value={selectedSlide.content.left?.highlight || ''} 
                    onChange={(e) => { updateSlideContent(selectedSlideId, 'left.highlight', e.target.value); showSaveMessage('Updated!'); }}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm" />
                  <EyeIcon fieldKey="left-highlight" isVisible={isFieldVisible('left-highlight')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Features</label>
                  {selectedSlide.content.left?.features?.map((f: string, i: number) => (
                    <div key={i} style={{position:'relative',marginBottom:'4px'}}>
                      <input type="text" value={f} 
                        onChange={(e) => {
                          const newFeatures = [...selectedSlide.content.left.features];
                          newFeatures[i] = e.target.value;
                          updateSlideContent(selectedSlideId, 'left.features', newFeatures);
                          showSaveMessage('Updated!');
                        }}
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm" />
                      <EyeIcon fieldKey={`left-f${i}`} isVisible={isFieldVisible(`left-f${i}`)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="bg-blue-50 p-3 sm:p-4 rounded-xl">
              <h4 className="font-bold text-utkarsh-blue mb-4 flex items-center">
                <span className="w-3 h-3 bg-utkarsh-blue rounded-full mr-2"></span>
                Right Column (Full EC)
              </h4>
              <div className="space-y-3">
                <div style={{position:'relative'}}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
                  <input type="text" value={selectedSlide.content.right?.title || ''} 
                    onChange={(e) => { updateSlideContent(selectedSlideId, 'right.title', e.target.value); showSaveMessage('Updated!'); }}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm" />
                  <EyeIcon fieldKey="right-title" isVisible={isFieldVisible('right-title')} />
                </div>
                <div style={{position:'relative'}}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Tagline</label>
                  <input type="text" value={selectedSlide.content.right?.tagline || ''} 
                    onChange={(e) => { updateSlideContent(selectedSlideId, 'right.tagline', e.target.value); showSaveMessage('Updated!'); }}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm" />
                  <EyeIcon fieldKey="right-tagline" isVisible={isFieldVisible('right-tagline')} />
                </div>
                <div style={{position:'relative'}}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Highlight</label>
                  <input type="text" value={selectedSlide.content.right?.highlight || ''} 
                    onChange={(e) => { updateSlideContent(selectedSlideId, 'right.highlight', e.target.value); showSaveMessage('Updated!'); }}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm" />
                  <EyeIcon fieldKey="right-highlight" isVisible={isFieldVisible('right-highlight')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Features</label>
                  {selectedSlide.content.right?.features?.map((f: string, i: number) => (
                    <div key={i} style={{position:'relative',marginBottom:'4px'}}>
                      <input type="text" value={f} 
                        onChange={(e) => {
                          const newFeatures = [...selectedSlide.content.right.features];
                          newFeatures[i] = e.target.value;
                          updateSlideContent(selectedSlideId, 'right.features', newFeatures);
                          showSaveMessage('Updated!');
                        }}
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm" />
                      <EyeIcon fieldKey={`right-f${i}`} isVisible={isFieldVisible(`right-f${i}`)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case SlideType.PROCESS:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Process Steps</label>
              {selectedSlide.content.steps?.map((step: string, idx: number) => (
                <div key={idx} className="flex gap-2 mb-2 items-center" style={{position:'relative'}}>
                  <span className="bg-utkarsh-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                  <textarea value={step} 
                    onChange={(e) => {
                      const newSteps = [...selectedSlide.content.steps];
                      newSteps[idx] = e.target.value;
                      updateSlideContent(selectedSlideId, 'steps', newSteps);
                      showSaveMessage('Step updated!');
                    }}
                    className="flex-1 px-4 py-2 pr-10 border border-gray-300 rounded-lg resize-none" rows={2} />
                  <div style={{position:'absolute',right:'8px',top:'8px'}}><EyeIcon fieldKey={`step-${idx}`} isVisible={isFieldVisible(`step-${idx}`)} /></div>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Purpose Points</label>
              {selectedSlide.content.purpose?.map((p: string, idx: number) => (
                <div key={idx} style={{position:'relative',marginBottom:'8px'}}>
                  <input type="text" value={p} 
                    onChange={(e) => {
                      const newPurpose = [...selectedSlide.content.purpose];
                      newPurpose[idx] = e.target.value;
                      updateSlideContent(selectedSlideId, 'purpose', newPurpose);
                      showSaveMessage('Purpose updated!');
                    }}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg" />
                  <EyeIcon fieldKey={`purpose-${idx}`} isVisible={isFieldVisible(`purpose-${idx}`)} />
                </div>
              ))}
            </div>
          </div>
        );

      case SlideType.DASHBOARD_TABLE:
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
              <h4 className="font-bold text-yellow-800 mb-3 text-sm sm:text-base">Dashboard Metrics (Slide 4)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Quotation Issued</label>
                  <input type="number" value={selectedSlide.content.data?.quotationIssued || 0}
                    onChange={(e) => {
                      updateSlideContent(selectedSlideId, 'data.quotationIssued', parseInt(e.target.value) || 0);
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Quotation Confirmed</label>
                  <input type="number" value={selectedSlide.content.data?.quotationConfirm || 0}
                    onChange={(e) => {
                      updateSlideContent(selectedSlideId, 'data.quotationConfirm', parseInt(e.target.value) || 0);
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Order Received Sq Ft</label>
                  <input type="number" value={selectedSlide.content.data?.orderReceivedSq || 0}
                    onChange={(e) => {
                      updateSlideContent(selectedSlideId, 'data.orderReceivedSq', parseInt(e.target.value) || 0);
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Order Received Birds</label>
                  <input type="number" value={selectedSlide.content.data?.orderReceivedBirds || 0}
                    onChange={(e) => {
                      updateSlideContent(selectedSlideId, 'data.orderReceivedBirds', parseInt(e.target.value) || 0);
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">No. of Dispatch</label>
                  <input type="number" value={selectedSlide.content.data?.noOfDispatch || 0}
                    onChange={(e) => {
                      updateSlideContent(selectedSlideId, 'data.noOfDispatch', parseInt(e.target.value) || 0);
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Dispatch Sq Ft</label>
                  <input type="number" value={selectedSlide.content.data?.dispatchSqFt || 0}
                    onChange={(e) => {
                      updateSlideContent(selectedSlideId, 'data.dispatchSqFt', parseInt(e.target.value) || 0);
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Dispatch Birds</label>
                  <input type="number" value={selectedSlide.content.data?.dispatchBirds || 0}
                    onChange={(e) => {
                      updateSlideContent(selectedSlideId, 'data.dispatchBirds', parseInt(e.target.value) || 0);
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Installed (for chart)</label>
                  <input type="number" value={selectedSlide.content.chartData?.[2]?.value || 0}
                    onChange={(e) => {
                      const newChartData = [...(selectedSlide.content.chartData || [])];
                      if (newChartData[2]) {
                        newChartData[2] = { ...newChartData[2], value: parseInt(e.target.value) || 0 };
                        updateSlideContent(selectedSlideId, 'chartData', newChartData);
                      }
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Auto-Sync Info
              </h4>
              <p className="text-sm text-green-600">Metrics cards display values are automatically generated from the numbers above. Changes reflect instantly in the presentation.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-3 text-sm sm:text-base">Chart Data</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedSlide.content.chartData?.map((c: any, i: number) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-lg">
                    <label className="block text-xs text-gray-500 mb-1">{c.name}</label>
                    <input type="number" value={c.value}
                      onChange={(e) => {
                        const newChartData = [...selectedSlide.content.chartData];
                        newChartData[i] = { ...newChartData[i], value: parseInt(e.target.value) || 0 };
                        updateSlideContent(selectedSlideId, 'chartData', newChartData);
                        showSaveMessage('Updated!');
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case SlideType.TARGET_DASHBOARD:
        return (
          <div className="space-y-6">
            {selectedSlide.content.targets?.map((target: any, tIdx: number) => (
              <div key={tIdx} className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <h4 className="font-bold text-utkarsh-blue mb-3 text-sm sm:text-base">{target.period}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Order Receive Sq Ft</label>
                    <input type="number" value={target.orderReceiveSqFt || 0}
                      onChange={(e) => {
                        const newTargets = [...selectedSlide.content.targets];
                        newTargets[tIdx] = { ...newTargets[tIdx], orderReceiveSqFt: parseInt(e.target.value) || 0 };
                        updateSlideContent(selectedSlideId, 'targets', newTargets);
                        showSaveMessage('Updated!');
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Order Receive Birds</label>
                    <input type="number" value={target.orderReceiveBirds || 0}
                      onChange={(e) => {
                        const newTargets = [...selectedSlide.content.targets];
                        newTargets[tIdx] = { ...newTargets[tIdx], orderReceiveBirds: parseInt(e.target.value) || 0 };
                        updateSlideContent(selectedSlideId, 'targets', newTargets);
                        showSaveMessage('Updated!');
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Dispatch Sq Ft</label>
                    <input type="number" value={target.dispatchSqFt || 0}
                      onChange={(e) => {
                        const newTargets = [...selectedSlide.content.targets];
                        newTargets[tIdx] = { ...newTargets[tIdx], dispatchSqFt: parseInt(e.target.value) || 0 };
                        updateSlideContent(selectedSlideId, 'targets', newTargets);
                        showSaveMessage('Updated!');
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Dispatch Birds</label>
                    <input type="number" value={target.dispatchBirds || 0}
                      onChange={(e) => {
                        const newTargets = [...selectedSlide.content.targets];
                        newTargets[tIdx] = { ...newTargets[tIdx], dispatchBirds: parseInt(e.target.value) || 0 };
                        updateSlideContent(selectedSlideId, 'targets', newTargets);
                        showSaveMessage('Updated!');
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case SlideType.BULLET_SUMMARY:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-green-50 p-3 sm:p-4 rounded-xl">
              <h4 className="font-bold text-green-700 mb-3 text-sm sm:text-base">Achievements</h4>
              {selectedSlide.content.achievements?.map((a: string, i: number) => (
                <div key={i} style={{position:'relative',marginBottom:'8px'}}>
                  <textarea value={a}
                    onChange={(e) => {
                      const newAchievements = [...selectedSlide.content.achievements];
                      newAchievements[i] = e.target.value;
                      updateSlideContent(selectedSlideId, 'achievements', newAchievements);
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm resize-none" rows={2} />
                  <div style={{position:'absolute',right:'8px',top:'8px'}}><EyeIcon fieldKey={`ach-${i}`} isVisible={isFieldVisible(`ach-${i}`)} /></div>
                </div>
              ))}
            </div>
            <div className="bg-red-50 p-3 sm:p-4 rounded-xl">
              <h4 className="font-bold text-utkarsh-red mb-3 text-sm sm:text-base">Targets</h4>
              {selectedSlide.content.targets?.map((t: string, i: number) => (
                <div key={i} style={{position:'relative',marginBottom:'8px'}}>
                  <textarea value={t}
                    onChange={(e) => {
                      const newTargets = [...selectedSlide.content.targets];
                      newTargets[i] = e.target.value;
                      updateSlideContent(selectedSlideId, 'targets', newTargets);
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm resize-none" rows={2} />
                  <div style={{position:'absolute',right:'8px',top:'8px'}}><EyeIcon fieldKey={`tgt-${i}`} isVisible={isFieldVisible(`tgt-${i}`)} /></div>
                </div>
              ))}
            </div>
          </div>
        );

      case SlideType.ORG_CHART:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-utkarsh-blue mb-3">Organization Details</h4>
              <div className="space-y-4">
                <div style={{position:'relative'}}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Chart Title</label>
                  <input type="text" value={selectedSlide.content.title || ''}
                    onChange={(e) => {
                      updateSlideContent(selectedSlideId, 'title', e.target.value);
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg" />
                  <EyeIcon fieldKey="org-title" isVisible={isFieldVisible('org-title')} />
                </div>
                <div style={{position:'relative'}}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Top Box (Main Team Name)</label>
                  <input type="text" value={selectedSlide.content.topBox || ''}
                    onChange={(e) => {
                      updateSlideContent(selectedSlideId, 'topBox', e.target.value);
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg" />
                  <EyeIcon fieldKey="org-topbox" isVisible={isFieldVisible('org-topbox')} />
                </div>
                <div style={{position:'relative'}}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Footer Summary</label>
                  <input type="text" value={selectedSlide.content.footer || ''}
                    onChange={(e) => {
                      updateSlideContent(selectedSlideId, 'footer', e.target.value);
                      showSaveMessage('Updated!');
                    }}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg" />
                  <EyeIcon fieldKey="org-footer" isVisible={isFieldVisible('org-footer')} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-700 mb-3">Team Heads & Teams</h4>
              {selectedSlide.content.heads?.map((head: any, headIdx: number) => (
                <div key={headIdx} className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-bold text-utkarsh-blue">Head {headIdx + 1}</h5>
                  </div>
                  <div style={{position:'relative',marginBottom:'12px'}}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Head Name</label>
                    <input type="text" value={head.name || ''}
                      onChange={(e) => {
                        const newHeads = [...selectedSlide.content.heads];
                        newHeads[headIdx] = { ...newHeads[headIdx], name: e.target.value };
                        updateSlideContent(selectedSlideId, 'heads', newHeads);
                        showSaveMessage('Updated!');
                      }}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg" />
                    <EyeIcon fieldKey={`org-head${headIdx}-name`} isVisible={isFieldVisible(`org-head${headIdx}-name`)} />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-600">Teams under this Head</label>
                    {head.teams?.map((team: any, teamIdx: number) => (
                      <div key={teamIdx} className="bg-white border border-gray-300 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-utkarsh-blue text-white px-2 py-1 rounded text-xs font-bold">Team {teamIdx + 1}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div style={{position:'relative'}}>
                            <label className="block text-[10px] font-semibold text-gray-500 mb-1">Team Name</label>
                            <input type="text" value={team.name || ''}
                              onChange={(e) => {
                                const newHeads = [...selectedSlide.content.heads];
                                const newTeams = [...newHeads[headIdx].teams];
                                newTeams[teamIdx] = { ...newTeams[teamIdx], name: e.target.value };
                                newHeads[headIdx] = { ...newHeads[headIdx], teams: newTeams };
                                updateSlideContent(selectedSlideId, 'heads', newHeads);
                                showSaveMessage('Updated!');
                              }}
                              className="w-full px-2 py-1 pr-8 border border-gray-300 rounded text-sm" />
                            <div style={{position:'absolute',right:'4px',top:'20px'}}><EyeIcon fieldKey={`org-h${headIdx}t${teamIdx}-name`} isVisible={isFieldVisible(`org-h${headIdx}t${teamIdx}-name`)} /></div>
                          </div>
                          <div style={{position:'relative'}}>
                            <label className="block text-[10px] font-semibold text-gray-500 mb-1">Staff Count</label>
                            <input type="number" value={team.staff || 0}
                              onChange={(e) => {
                                const newHeads = [...selectedSlide.content.heads];
                                const newTeams = [...newHeads[headIdx].teams];
                                newTeams[teamIdx] = { ...newTeams[teamIdx], staff: parseInt(e.target.value) || 0 };
                                newHeads[headIdx] = { ...newHeads[headIdx], teams: newTeams };
                                updateSlideContent(selectedSlideId, 'heads', newHeads);
                                showSaveMessage('Updated!');
                              }}
                              className="w-full px-2 py-1 pr-8 border border-gray-300 rounded text-sm" />
                            <div style={{position:'absolute',right:'4px',top:'20px'}}><EyeIcon fieldKey={`org-h${headIdx}t${teamIdx}-staff`} isVisible={isFieldVisible(`org-h${headIdx}t${teamIdx}-staff`)} /></div>
                          </div>
                          <div style={{position:'relative'}}>
                            <label className="block text-[10px] font-semibold text-gray-500 mb-1">Farms/Month</label>
                            <input type="number" value={team.farms || 0}
                              onChange={(e) => {
                                const newHeads = [...selectedSlide.content.heads];
                                const newTeams = [...newHeads[headIdx].teams];
                                newTeams[teamIdx] = { ...newTeams[teamIdx], farms: parseInt(e.target.value) || 0 };
                                newHeads[headIdx] = { ...newHeads[headIdx], teams: newTeams };
                                updateSlideContent(selectedSlideId, 'heads', newHeads);
                                showSaveMessage('Updated!');
                              }}
                              className="w-full px-2 py-1 pr-8 border border-gray-300 rounded text-sm" />
                            <div style={{position:'absolute',right:'4px',top:'20px'}}><EyeIcon fieldKey={`org-h${headIdx}t${teamIdx}-farms`} isVisible={isFieldVisible(`org-h${headIdx}t${teamIdx}-farms`)} /></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case SlideType.CONCLUSION:
        return (
          <div className="space-y-4">
            <div style={{position:'relative'}}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Main Headline</label>
              <input type="text" value={selectedSlide.content.main || ''}
                onChange={(e) => { updateSlideContent(selectedSlideId, 'main', e.target.value); showSaveMessage('Updated!'); }}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-lg font-bold" />
              <EyeIcon fieldKey="conc-main" isVisible={isFieldVisible('conc-main')} />
            </div>
            <div style={{position:'relative'}}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sub Headline</label>
              <input type="text" value={selectedSlide.content.sub || ''}
                onChange={(e) => { updateSlideContent(selectedSlideId, 'sub', e.target.value); showSaveMessage('Updated!'); }}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg" />
              <EyeIcon fieldKey="conc-sub" isVisible={isFieldVisible('conc-sub')} />
            </div>
            <div style={{position:'relative'}}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Focus Statement</label>
              <input type="text" value={selectedSlide.content.focus || ''}
                onChange={(e) => { updateSlideContent(selectedSlideId, 'focus', e.target.value); showSaveMessage('Updated!'); }}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg" />
              <EyeIcon fieldKey="conc-focus" isVisible={isFieldVisible('conc-focus')} />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-500 text-center py-8">
            <p>No specific editor for this slide type.</p>
            <p className="text-sm mt-2">Edit the JSON directly if needed.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-2 sm:gap-4 w-full lg:w-auto justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <UtkarshLogo className="scale-50 sm:scale-75" />
                <div className="border-l border-gray-300 pl-2 sm:pl-4">
                  <h1 className="text-base sm:text-xl font-bold text-gray-800">Admin Dashboard</h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Manage Presentation Content</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full lg:w-auto">
              {saveMessage && (
                <span className="bg-green-100 text-green-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium animate-pulse">
                  {saveMessage}
                </span>
              )}
              <button onClick={() => { showSaveMessage('All changes saved!'); }}
                className="px-3 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2 shadow-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="hidden sm:inline">Save Changes</span>
                <span className="sm:hidden">Save</span>
              </button>
              <a href="/" target="_blank" className="px-3 sm:px-4 py-2 bg-utkarsh-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </a>
              <button onClick={() => setShowResetDialog(true)}
                className="px-3 sm:px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-xs sm:text-sm font-medium">
                <span className="hidden sm:inline">Reset Default</span>
                <span className="sm:hidden">Reset</span>
              </button>
              <button onClick={handleLogout}
                className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col lg:flex-row gap-4 sm:gap-8">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} className="lg:hidden fixed inset-0 bg-black/50 z-40" style={{top:0,left:0,right:0,bottom:0}}></div>
        )}
        
        {/* Sidebar - Slide List */}
        <div className={`${sidebarOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden'} lg:relative lg:block w-full max-w-xs lg:max-w-none lg:w-72 flex-shrink-0`}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden lg:sticky lg:top-8">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-bold text-gray-700">Slides</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {slides.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => { setSelectedSlideId(slide.id); setSidebarOpen(false); }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                    selectedSlideId === slide.id ? 'bg-utkarsh-blue/10 border-l-4 border-utkarsh-blue' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      selectedSlideId === slide.id ? 'bg-utkarsh-blue text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {slide.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{slide.title}</p>
                      <p className="text-xs text-gray-500">{getSlideTypeName(slide.type)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 min-w-0">
          {selectedSlide && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Slide Header */}
              <div className="bg-gradient-to-r from-utkarsh-red to-red-600 px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-white/80 text-xs sm:text-sm font-medium">Editing Slide {selectedSlide.id}</p>
                    <h2 className="text-xl sm:text-2xl font-bold text-white break-words">{selectedSlide.title}</h2>
                  </div>
                  <span className="bg-white/20 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                    {getSlideTypeName(selectedSlide.type)}
                  </span>
                </div>
              </div>

              {/* Editor Content */}
              <div className="p-4 sm:p-6">
                {/* Title & Subtitle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div style={{position:'relative'}}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Slide Title</label>
                    <input
                      type="text"
                      value={selectedSlide.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-utkarsh-blue focus:border-transparent font-bold"
                    />
                    <EyeIcon fieldKey="slide-title" isVisible={isFieldVisible('slide-title')} />
                  </div>
                  <div style={{position:'relative'}}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle (optional)</label>
                    <input
                      type="text"
                      value={selectedSlide.subtitle || ''}
                      onChange={(e) => handleSubtitleChange(e.target.value)}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-utkarsh-blue focus:border-transparent"
                      placeholder="Enter subtitle..."
                    />
                    <EyeIcon fieldKey="slide-subtitle" isVisible={isFieldVisible('slide-subtitle')} />
                  </div>
                </div>

                {/* Visibility Info Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-blue-800 font-medium mb-1">Field Visibility Control</p>
                    <p className="text-xs text-blue-700">Click the eye icons to control what appears in the <strong>public presentation</strong>. All data remains visible and editable here in the admin panel. <span className="inline-flex items-center gap-1 ml-1"><span className="inline-block w-3 h-3 rounded bg-green-500"></span> = Visible to public</span> <span className="inline-flex items-center gap-1 ml-2"><span className="inline-block w-3 h-3 rounded bg-red-500"></span> = Hidden from public</span></p>
                  </div>
                </div>

                {/* Slide-specific Content */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Slide Content</h3>
                  {renderContentEditor()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetDialog && (
        <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:9999}}>
          <div style={{background:'white',borderRadius:'8px',padding:'24px',maxWidth:'400px',width:'90%',boxShadow:'0 20px 25px -5px rgba(0,0,0,0.1)'}}>
            <h3 style={{fontSize:'18px',fontWeight:'bold',color:'#374151',marginBottom:'12px'}}>Confirm Reset</h3>
            <p style={{color:'#6B7280',marginBottom:'20px'}}>Are you sure you want to reset all slides to default data? This action cannot be undone.</p>
            <div style={{display:'flex',gap:'12px',justifyContent:'flex-end'}}>
              <button onClick={() => setShowResetDialog(false)} style={{padding:'8px 16px',background:'#F3F4F6',color:'#374151',border:'1px solid #D1D5DB',borderRadius:'6px',fontSize:'14px',fontWeight:'500',cursor:'pointer'}}>Cancel</button>
              <button onClick={() => { resetToDefault(); showSaveMessage('Reset complete!'); setShowResetDialog(false); }} style={{padding:'8px 16px',background:'#DC2626',color:'white',border:'none',borderRadius:'6px',fontSize:'14px',fontWeight:'500',cursor:'pointer'}}>Reset All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

