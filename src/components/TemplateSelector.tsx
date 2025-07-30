import React, { useState } from 'react';
import picture from './picture.png';

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  bg: string;
  preview: string;
  colorVariants: { color: string; bg: string }[];
}

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string, colorStyle?: { color: string; bg: string }) => void;
  onBack: () => void;
}

// MiniPreview component for template cards
const MiniPreview: React.FC<{ style: { color: string; bg: string } }> = ({ style }) => (
  <div className="rounded-xl shadow border p-3 w-full h-40 flex flex-col justify-between" style={{ background: `linear-gradient(135deg, ${style.bg} 60%, #fff 100%)`, borderColor: style.color }}>
    <div className="flex items-center gap-2 mb-2">
      <img src={picture} alt="Profile" className="w-8 h-8 rounded-full border-2" style={{ borderColor: style.color }} />
      <div>
        <div className="font-bold text-sm" style={{ color: style.color }}>Jane Doe</div>
        <div className="text-xs text-gray-600">jane@email.com</div>
      </div>
    </div>
    <div className="text-xs mb-1" style={{ color: style.color }}>Objective</div>
    <div className="text-xs text-gray-700 mb-1">Creative developer with a passion for design.</div>
    <div className="flex flex-wrap gap-1">
      <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: style.bg, color: style.color }}>React</span>
      <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: style.bg, color: style.color }}>Figma</span>
    </div>
  </div>
);

  const templates: Template[] = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean, modern design perfect for tech professionals',
    color: '#2563eb',
    bg: '#e0e7ff',
    preview: '',
    colorVariants: [
      { color: '#2563eb', bg: '#e0e7ff' },
      { color: '#16a34a', bg: '#dcfce7' },
      { color: '#be185d', bg: '#fce7f3' },
      { color: '#d97706', bg: '#fff7ed' },
      { color: '#059669', bg: '#d1fae5' },
    ],
    },
    {
      id: 'classic',
      name: 'Classic Business',
      description: 'Traditional format ideal for corporate roles',
      color: '#34383c',
    bg: '#f3f4f6',
    preview: '',
    colorVariants: [
      { color: '#34383c', bg: '#f3f4f6' },
      { color: '#8b5a3c', bg: '#f3e8e1' },
      { color: '#2d5aa0', bg: '#e0e7ff' },
      { color: '#b45309', bg: '#ffedd5' },
      { color: '#065f46', bg: '#dbeafe' },
    ],
    },
  ];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate, onBack }) => {
  const [selectedColors, setSelectedColors] = useState<{ [id: string]: { color: string; bg: string } }>(
    Object.fromEntries(templates.map(t => [t.id, t.colorVariants[0]]))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-50 font-semibold flex items-center gap-2"
            >
              <span className="mr-2 text-lg">←</span>
              Back to Home
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CV</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">CVMaker Pro</span>
            </div>
            <div></div>
          </div>
        </div>
      </header>

      {/* Template Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect CV Template
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select from our professionally designed templates. Each template is ATS-friendly 
            and optimized to help you stand out to employers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col gap-4"
            >
              {/* Mini live preview */}
              <MiniPreview style={selectedColors[template.id]} />
              {/* Color swatches */}
              <div className="flex gap-2 justify-center mt-2">
                {template.colorVariants.map((variant, idx) => (
                  <button
                    key={idx}
                    className={`w-6 h-6 rounded-full border-2 ${selectedColors[template.id].color === variant.color ? 'border-blue-600' : 'border-gray-200'}`}
                    style={{ background: variant.color }}
                    onClick={() => setSelectedColors((prev) => ({ ...prev, [template.id]: variant }))}
                    aria-label={`Choose color ${variant.color}`}
                  />
                ))}
              </div>
              {/* Template Info */}
              <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
                <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {template.description}
                </p>
                  </div>
                  <button
                  onClick={() => onSelectTemplate(template.id, selectedColors[template.id])}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm mt-2"
                  >
                    Use Template
                  </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Choose Our Templates?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl">🤖</span>
                </div>
                <h4 className="font-semibold mb-2">ATS-Friendly</h4>
                <p className="text-sm text-gray-600">
                  All templates are optimized to pass Applicant Tracking Systems used by employers.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl">✨</span>
                </div>
                <h4 className="font-semibold mb-2">Professional Design</h4>
                <p className="text-sm text-gray-600">
                  Created by design experts to make the best first impression.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-xl">🎨</span>
                </div>
                <h4 className="font-semibold mb-2">Customizable</h4>
                <p className="text-sm text-gray-600">
                  Easy to customize colors, fonts, and layout to match your style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
