import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SlideData, SlideType } from '../types';

// Default slide data - the existing data
const DEFAULT_SLIDES: SlideData[] = [
  {
    id: 1,
    title: "UTKARSH",
    subtitle: "A SHALIMAR GROUP INITIATIVE",
    type: SlideType.COVER,
    content: {
      moto: "Empowering farmers with modern poultry equipment for sustainable and profitable farming practices",
      bullets: [
        "Pan-India business initiative",
        "Data-driven execution model",
        "Scalable EC business solutions"
      ]
    },
    prompt: "Abstract corporate growth, rising upward graphs, blue and white professional background, structured execution geometry"
  },
  {
    id: 2,
    title: "Business Offering",
    type: SlideType.TWO_COLUMN,
    content: {
      left: {
        title: "Basic EC",
        tagline: "Cost-Effective Entry",
        highlight: "Low Budget • Fast ROI",
        features: [
          "Optimized for lower capital expenditure",
          "Essential automation features",
          "Rapid deployment & setup",
          "Ideal for market penetration"
        ]
      },
      right: {
        title: "Full EC",
        tagline: "High-Performance Hub",
        highlight: "Max Production • Premium",
        features: [
          "Maximum bird density & output",
          "Advanced climate control ecosystem",
          "Superior FCR management",
          "Long-term commercial asset"
        ]
      }
    },
    prompt: "Abstract business segmentation, two distinct professional pathways merging or parallel, balance scales, corporate strategy"
  },
  {
    id: 3,
    title: "Sales Execution Flow",
    type: SlideType.PROCESS,
    content: {
      steps: [
        "Quotation Generated - Initial customer engagement with detailed proposal",
        "Order Confirmed - Customer commitment secured with advance payment",
        "Order Dispatched - Product delivery initiated with logistics coordination"
      ],
      purpose: [
        "Track conversion efficiency at each stage",
        "Ensure execution discipline and timeline adherence",
        "Monitor pipeline velocity and bottlenecks",
        "Optimize resource allocation across stages"
      ]
    },
    prompt: "Abstract process flow pipeline, industrial efficiency, three connected stages, conveyor belt concept corporate style"
  },
  {
    id: 4,
    title: "Last 6 Months Achievement",
    subtitle: "All India Performance Dashboard",
    type: SlideType.DASHBOARD_TABLE,
    content: {
      columns: [
        "Quotations",
        "Confirmed",
        "Order Sq Ft",
        "Order Birds",
        "Dispatched",
        "Dispatch Sq Ft",
        "Dispatch Birds"
      ],
      data: {
        quotationIssued: 1036,
        quotationConfirm: 124,
        orderReceivedSq: 650000,
        orderReceivedBirds: 812500,
        noOfDispatch: 23,
        dispatchSqFt: 169082,
        dispatchBirds: 215169
      },
      chartData: [
        { name: 'Confirm', value: 124, color: '#E31E24' },
        { name: 'Dispatched', value: 23, color: '#005CA9' },
        { name: 'Installed', value: 19, color: '#FFD100' }
      ],
      metrics: [
        { label: 'Quotation Issued', value: '1,036', icon: 'document' },
        { label: 'Orders Confirmed', value: '124', icon: 'check' },
        { label: 'Dispatched', value: '23', icon: 'truck' },
        { label: 'Installed', value: '19', icon: 'wrench' },
        { label: 'Order Sq Ft', value: '6,50,000', icon: 'area' },
        { label: 'Order Birds', value: '8,12,500', icon: 'birds' },
        { label: 'Dispatch Sq Ft', value: '1,69,082', icon: 'area' }
      ]
    },
    prompt: "Business dashboard analytics, professional data visualization, corporate performance metrics"
  },
  {
    id: 5,
    title: "Business Targets",
    subtitle: "3 Months & 1 Year Strategic Goals",
    type: SlideType.TARGET_DASHBOARD,
    content: {
      columns: [
        "Target Period",
        "Order Receive Sq Ft",
        "Order Receive in Birds",
        "Dispatch Sq Ft",
        "Dispatch Birds"
      ],
      targets: [
        {
          period: "Upcoming 3 Months",
          orderReceiveSqFt: 900000,
          orderReceiveBirds: 1125000,
          dispatchSqFt: 600000,
          dispatchBirds: 750000
        },
        {
          period: "Upcoming 1 Year",
          orderReceiveSqFt: 3600000,
          orderReceiveBirds: 4500000,
          dispatchSqFt: 2400000,
          dispatchBirds: 3000000
        }
      ],
      chartData: [
        { name: 'Order Sq Ft (3M)', value: 900, color: '#E31E24' },
        { name: 'Order Sq Ft (1Y)', value: 3600, color: '#E31E24' },
        { name: 'Dispatch Sq Ft (3M)', value: 600, color: '#005CA9' },
        { name: 'Dispatch Sq Ft (1Y)', value: 2400, color: '#005CA9' }
      ]
    },
    prompt: "Target visualization, growth projections, strategic planning dashboard"
  },
  {
    id: 6,
    title: "Achievement vs Target Summary",
    type: SlideType.BULLET_SUMMARY,
    content: {
      achievements: [
        "Strong demand validation: 1,036 quotations issued across regions",
        "Healthy conversion rate: 12% (124 confirmed premium orders)",
        "Execution milestone: 23 projects dispatched (169K sq ft coverage)",
        "Installation success: 19 farms fully operational & generating revenue",
        "Established pan-India logistics backbone for rapid delivery",
        "Zero-defect handover achieved in 95% of initial phases"
      ],
      targets: [
        "Scale operation to 3.6M sq ft order intake in upcoming year",
        "Achieve 300+ active installations by end of Q3 FY-25",
        "Reduce dispatch-to-installation cycle time by 20%",
        "Capture 15% market share in premium EC segment",
        "24x7 Customer Service helpline for troubleshooting & support",
        "Expand dealer network to 50+ key poultry hubs"
      ]
    },
    prompt: "Executive summary document concept, checkmarks, balanced scales, professional clean desk"
  },
  {
    id: 7,
    title: "Strategic Conclusion",
    type: SlideType.CONCLUSION,
    content: {
      main: "UTKARSH: From Planning to Execution",
      sub: "Data-Driven National Scaling Achieved",
      focus: "Focus: Efficiency & Acceleration"
    },
    prompt: "Sunrise corporate abstract, new horizon, chessboard strategy checkmate, confident professional conclusion"
  }
];

const STORAGE_KEY = 'utkarsh_slides_data';

interface SlideContextType {
  slides: SlideData[];
  updateSlide: (slideId: number, newData: Partial<SlideData>) => void;
  updateSlideContent: (slideId: number, contentPath: string, value: any) => void;
  resetToDefault: () => void;
}

const SlideContext = createContext<SlideContextType | undefined>(undefined);

// Helper function to format number with Indian commas (outside component for initial sync)
const formatIndianNumber = (num: number): string => {
  return num.toLocaleString('en-IN');
};

// Sync slide 6 achievements with data from slide 4 and 5 (outside component for initial sync)
const syncSlide6WithDataHelper = (allSlides: SlideData[]): SlideData[] => {
  const slide4 = allSlides.find(s => s.id === 4);
  const slide5 = allSlides.find(s => s.id === 5);
  const slide6 = allSlides.find(s => s.id === 6);
  
  if (!slide4 || !slide5 || !slide6) return allSlides;
  
  const data4 = slide4.content.data || {};
  const installed = slide4.content.chartData?.[2]?.value || 19;
  const target1Y = slide5.content.targets?.[1] || {};
  
  const conversionRate = data4.quotationIssued > 0 
    ? Math.round((data4.quotationConfirm / data4.quotationIssued) * 100) 
    : 12;
  const dispatchSqFtK = Math.round((data4.dispatchSqFt || 0) / 1000);
  const targetOrderSqFt1Y = ((target1Y.orderReceiveSqFt || 3600000) / 1000000).toFixed(1);
  
  const newAchievements = [
    `Strong demand validation: ${formatIndianNumber(data4.quotationIssued || 0)} quotations issued across regions`,
    `Healthy conversion rate: ${conversionRate}% (${formatIndianNumber(data4.quotationConfirm || 0)} confirmed premium orders)`,
    `Execution milestone: ${formatIndianNumber(data4.noOfDispatch || 0)} projects dispatched (${dispatchSqFtK}K sq ft coverage)`,
    `Installation success: ${formatIndianNumber(installed)} farms fully operational & generating revenue`,
    "Established pan-India logistics backbone for rapid delivery",
    "Zero-defect handover achieved in 95% of initial phases"
  ];
  
  const newTargets = [
    `Scale operation to ${targetOrderSqFt1Y}M sq ft order intake in upcoming year`,
    "Achieve 300+ active installations by end of Q3 FY-25",
    "Reduce dispatch-to-installation cycle time by 20%",
    "Capture 15% market share in premium EC segment",
    "24x7 Customer Service helpline for troubleshooting & support",
    "Expand dealer network to 50+ key poultry hubs"
  ];
  
  return allSlides.map(slide => {
    if (slide.id === 6) {
      return {
        ...slide,
        content: {
          ...slide.content,
          achievements: newAchievements,
          targets: newTargets
        }
      };
    }
    return slide;
  });
};

export const SlideProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [slides, setSlides] = useState<SlideData[]>(() => {
    // Initialize from localStorage or use defaults
    const stored = localStorage.getItem(STORAGE_KEY);
    let initialSlides = DEFAULT_SLIDES;
    if (stored) {
      try {
        initialSlides = JSON.parse(stored);
      } catch {
        initialSlides = DEFAULT_SLIDES;
      }
    }
    // Always sync slide 6 on initial load
    return syncSlide6WithDataHelper(initialSlides);
  });

  // Persist to localStorage whenever slides change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
  }, [slides]);

  // Auto-sync metrics display values from raw data for slide 4
  const syncSlide4Metrics = (content: any): any => {
    if (!content.data) return content;
    
    const data = content.data;
    const installedValue = content.chartData?.[2]?.value || 19;
    
    const newMetrics = [
      { label: 'Quotation Issued', value: formatIndianNumber(data.quotationIssued || 0), icon: 'document' },
      { label: 'Orders Confirmed', value: formatIndianNumber(data.quotationConfirm || 0), icon: 'check' },
      { label: 'Dispatched', value: formatIndianNumber(data.noOfDispatch || 0), icon: 'truck' },
      { label: 'Installed', value: formatIndianNumber(installedValue), icon: 'wrench' },
      { label: 'Order Sq Ft', value: formatIndianNumber(data.orderReceivedSq || 0), icon: 'area' },
      { label: 'Order Birds', value: formatIndianNumber(data.orderReceivedBirds || 0), icon: 'birds' },
      { label: 'Dispatch Sq Ft', value: formatIndianNumber(data.dispatchSqFt || 0), icon: 'area' }
    ];
    
    // Also sync chartData first two values from data
    const newChartData = [
      { name: 'Confirm', value: data.quotationConfirm || 0, color: '#E31E24' },
      { name: 'Dispatched', value: data.noOfDispatch || 0, color: '#005CA9' },
      { name: 'Installed', value: installedValue, color: '#FFD100' }
    ];
    
    return { ...content, metrics: newMetrics, chartData: newChartData };
  };

  const updateSlide = (slideId: number, newData: Partial<SlideData>) => {
    setSlides(prev => prev.map(slide => 
      slide.id === slideId ? { ...slide, ...newData } : slide
    ));
  };

  const updateSlideContent = (slideId: number, contentPath: string, value: any) => {
    setSlides(prev => prev.map(slide => {
      if (slide.id !== slideId) return slide;
      
      const newContent = { ...slide.content };
      const pathParts = contentPath.split('.');
      let current: any = newContent;
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        const key = pathParts[i];
        if (current[key] === undefined) {
          current[key] = {};
        }
        current[key] = { ...current[key] };
        current = current[key];
      }
      
      current[pathParts[pathParts.length - 1]] = value;
      
      // Auto-sync metrics for slide 4 when data changes
      if (slideId === 4 && (contentPath.startsWith('data.') || contentPath === 'chartData')) {
        const syncedContent = syncSlide4Metrics(newContent);
        return { ...slide, content: syncedContent };
      }
      
      return { ...slide, content: newContent };
    }));
    
    // After updating, sync slide 6 if slide 4 or 5 was modified
    if (slideId === 4 || slideId === 5) {
      setSlides(prev => syncSlide6WithDataHelper(prev));
    }
  };

  const resetToDefault = () => {
    const syncedDefaults = syncSlide6WithDataHelper(DEFAULT_SLIDES);
    setSlides(syncedDefaults);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <SlideContext.Provider value={{ slides, updateSlide, updateSlideContent, resetToDefault }}>
      {children}
    </SlideContext.Provider>
  );
};

export const useSlides = () => {
  const context = useContext(SlideContext);
  if (!context) {
    throw new Error('useSlides must be used within a SlideProvider');
  }
  return context;
};

export { DEFAULT_SLIDES };
