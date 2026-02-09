import React from 'react';
import { SlideData, SlideType } from './types';

// Using the prompt attached logic, we recreate the visual identity of the logo purely in code for reliability
// if the image asset isn't physically available in the build pipeline.
export const UtkarshLogo = ({ className = "h-16" }: { className?: string }) => (
  <div className={`flex flex-col items-center select-none ${className}`}>
     {/* Abstract representation of the logo if image fails, otherwise use the image provided in real app */}
     <div className="flex items-center justify-center font-extrabold tracking-tighter text-utkarsh-red">
        <span className="text-4xl md:text-5xl">UTKARSH</span>
     </div>
     <div className="text-[0.6rem] md:text-xs font-semibold text-utkarsh-blue tracking-widest uppercase mt-1">
        A SHALIMAR GROUP INITIATIVE
     </div>
  </div>
);

export const SLIDES: SlideData[] = [
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