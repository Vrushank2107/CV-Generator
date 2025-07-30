import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  {
    icon: '🎨',
    title: 'Beautiful Templates',
    desc: 'Choose from modern, professional CV templates designed to impress.'
  },
  {
    icon: '⚡',
    title: 'Fast & Easy',
    desc: 'Build your CV in minutes with our step-by-step builder.'
  },
  {
    icon: '💡',
    title: 'Expert Tips',
    desc: 'Get expert suggestions and sample phrases for every section.'
  },
  {
    icon: '📄',
    title: 'PDF Download',
    desc: 'Export your CV as a beautiful, ready-to-send PDF.'
  },
];

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => (
  <div className="min-h-screen overflow-auto bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 flex flex-col min-h-screen">
    <div className="flex-grow flex flex-col items-center justify-center">
  <div className="max-w-xl w-full bg-white/90 rounded-3xl shadow-2xl p-6 mx-auto flex flex-col items-center border-2 border-blue-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 text-center drop-shadow-lg">The Best CV Maker Online</h1>
        <p className="text-lg md:text-2xl text-blue-900 mb-8 text-center font-medium">Fast. Easy. Effective.<br/>Create a CV that stands out and gets you hired.</p>
        <button
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition mb-8"
          onClick={onStart}
        >
          Create new CV
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4 bg-blue-50 rounded-xl p-4 border border-blue-100 shadow">
              <span className="text-3xl">{f.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-blue-700 mb-1">{f.title}</h3>
                <p className="text-blue-900 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage; 