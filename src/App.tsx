import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import LandingPage from './components/LandingPage.tsx';
import TemplateSelector from './components/TemplateSelector.tsx';

const steps = [
  { label: 'Personal Info', icon: '👤' },
  { label: 'Education', icon: '🎓' },
  { label: 'Skills', icon: '🧠' },
  { label: 'Projects', icon: '🧪' },
  { label: 'Experience', icon: '🏢' },
  { label: 'Certifications', icon: '📜' },
  { label: 'Achievements', icon: '🏆' },
  { label: 'Languages', icon: '🗣️' },
  { label: 'Hobbies', icon: '👥' },
  { label: 'References', icon: '📌' },
];

const sectionIcons = [
  '👤', // Personal Info
  '🎓', // Education
  '🧠', // Skills
  '🧪', // Projects
  '🏢', // Experience
  '📜', // Certifications
  '🏆', // Achievements
  '🗣️', // Languages
  '👥', // Hobbies
  '📌', // References
];

type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  address: string;
  photo: string;
  summary: string;
};

type Education = {
  degree: string;
  college: string;
  location: string;
  start: string;
  end: string;
  cgpa: string;
};

type Skills = {
  technical: string[];
  tools: string[];
  soft: string[];
};

type Project = {
  title: string;
  description: string;
  technologies: string[];
  techInput: string;
  github: string;
  demo: string;
};

type Experience = {
  jobTitle: string;
  company: string;
  location: string;
  from: string;
  to: string;
  responsibilities: string[];
  respInput: string;
};

type Certification = {
  title: string;
  platform: string;
  date: string;
  link: string;
};

type Achievement = {
  title: string;
  description: string;
  year: string;
};

type Language = {
  name: string;
  proficiency: string;
};

type Hobby = string;

type ErrorState = {
  [key: string]: string;
};

type Reference = {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  relation: string;
};

const initialPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  portfolio: '',
  address: '',
  photo: '',
  summary: '',
};

const initialEducation: Education[] = [
  { degree: '', college: '', location: '', start: '', end: '', cgpa: '' },
];

const initialSkills: Skills = {
  technical: [],
  tools: [],
  soft: [],
};

const initialProjects: Project[] = [
  { title: '', description: '', technologies: [], techInput: '', github: '', demo: '' },
];

const initialExperience: Experience[] = [
  { jobTitle: '', company: '', location: '', from: '', to: '', responsibilities: [], respInput: '' },
];

const initialCertifications: Certification[] = [
  { title: '', platform: '', date: '', link: '' },
];

const initialAchievements: Achievement[] = [
  { title: '', description: '', year: '' },
];

const initialLanguages: Language[] = [
  { name: '', proficiency: '' },
];

const initialReferences: Reference[] = [
  { name: '', jobTitle: '', email: '', phone: '', relation: '' },
];

const createPDFStyles = (template: string, colors: { color: string; bg: string }) =>
  StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
      backgroundColor: template === 'dark' ? '#1e293b' : 'white',
    },
    container: {
      flexDirection: 'row',
    },
    sidebar: {
      width: 180,
      backgroundColor: colors.bg,
      padding: 20,
    },
    mainContent: {
      flex: 1,
      padding: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
      alignSelf: 'center',
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.color,
      marginBottom: 5,
      textAlign: 'center',
    },
    contact: {
      fontSize: 10,
      color: '#4b5563',
      textAlign: 'center',
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 6,
      color: colors.color,
    },
    bullet: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    bulletPoint: {
      marginRight: 5,
      fontSize: 10,
      color: colors.color,
    },
    bulletText: {
      fontSize: 10,
      color: '#4b5563',
      flex: 1,
      flexWrap: 'wrap',
    },
    tag: {
      backgroundColor: colors.bg,
      color: colors.color,
      fontSize: 9,
      paddingHorizontal: 4,
      paddingVertical: 2,
      marginRight: 4,
      marginBottom: 4,
      borderRadius: 3,
    },
  });


// Update the CVDocument component
const CVDocument = ({ 
  personalInfo, 
  education, 
  skills, 
  projects, 
  experience, 
  certifications, 
  achievements, 
  languages,
  references,
  template,
  colors
}) => {
  const styles = createPDFStyles(template, colors);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            {personalInfo.photo && (
              <Image
                src={personalInfo.photo}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            <Text style={styles.contact}>{personalInfo.email}</Text>
            <Text style={styles.contact}>{personalInfo.phone}</Text>
            <Text style={styles.contact}>{personalInfo.address}</Text>

            {/* Skills Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {skills.technical.map((skill, index) => (
                  <Text key={index} style={styles.tag}>{skill}</Text>
                ))}
              </View>
            </View>

            {/* Languages Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {languages.map((lang, index) => (
                <View key={index} style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>
                    {lang.name} - {lang.proficiency}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Projects Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((project, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={{ ...styles.bulletText, fontWeight: 'bold' }}>{project.title}</Text>
                  <Text style={styles.bulletText}>{project.description}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {project.technologies.map((tech, techIndex) => (
                      <Text key={techIndex} style={styles.tag}>{tech}</Text>
                    ))}
                  </View>
                  {project.github && (
                    <Text style={{ ...styles.bulletText, color: 'blue' }}>
                      GitHub: {project.github}
                    </Text>
                  )}
                  {project.demo && (
                    <Text style={{ ...styles.bulletText, color: 'blue' }}>
                      Demo: {project.demo}
                    </Text>
                  )}
                </View>
              ))}
            </View>

            {/* Experience Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={{ ...styles.bulletText, fontWeight: 'bold' }}>{exp.jobTitle}</Text>
                  <Text style={styles.bulletText}>{exp.company} | {exp.location}</Text>
                  <Text style={{ ...styles.bulletText, fontStyle: 'italic' }}>{exp.from} - {exp.to}</Text>
                  {exp.responsibilities.map((resp, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.bulletText}>{resp}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {/* Education Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={{ ...styles.bulletText, fontWeight: 'bold' }}>{edu.degree}</Text>
                  <Text style={styles.bulletText}>{edu.college}, {edu.location}</Text>
                  <Text style={styles.bulletText}>{edu.start} - {edu.end} | CGPA: {edu.cgpa}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};


function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'templates' | 'builder'>('landing');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [selectedTemplateStyle, setSelectedTemplateStyle] = useState<{ color: string; bg: string }>({ color: '#2563eb', bg: '#e0e7ff' });
  const [currentStep, setCurrentStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skills>(initialSkills);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [errors, setErrors] = useState<ErrorState>({});
  const [skillInput, setSkillInput] = useState<{ technical: string; tools: string; soft: string }>({ technical: '', tools: '', soft: '' });
  const [hobbyInput, setHobbyInput] = useState('');

  // Personal Info Handlers ...
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'photo' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target) {
          setPersonalInfo((prev) => ({ ...prev, photo: ev.target!.result as string }));
        }
      };
      reader.readAsDataURL(files[0]);
    } else {
      setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new window.Image();
        img.onload = () => {
          // Create a canvas to resize the image if needed
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const size = 150; // desired size

          // Fix: Ensure ctx is not null before using
          if (!ctx) {
            setPersonalInfo(prev => ({
              ...prev,
              photo: reader.result as string
            }));
            return;
          }
          canvas.width = size;
          canvas.height = size;
          
          // Draw the image maintaining aspect ratio
          const scale = Math.max(size / img.width, size / img.height);
          const x = (size - img.width * scale) / 2;
          const y = (size - img.height * scale) / 2;
          
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, size, size);
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          
          setPersonalInfo(prev => ({
            ...prev,
            photo: canvas.toDataURL('image/jpeg')
          }));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
  const validatePersonal = () => {
    const newErrors: ErrorState = {};
    if (!personalInfo.fullName) newErrors.fullName = 'Full Name is required';
    if (!personalInfo.email) newErrors.email = 'Email is required';
    if (!personalInfo.phone) newErrors.phone = 'Phone Number is required';
    if (!personalInfo.linkedin) newErrors.linkedin = 'LinkedIn is required';
    if (!personalInfo.address) newErrors.address = 'Address is required';
    if (!personalInfo.summary) newErrors.summary = 'Summary is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Education Handlers
  const handleEducationChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducation((prev) =>
      prev.map((ed, i) => (i === idx ? { ...ed, [name]: value } : ed))
    );
  };
  const addEducation = () => setEducation((prev) => [...prev, { degree: '', college: '', location: '', start: '', end: '', cgpa: '' }]);
  const removeEducation = (idx: number) => setEducation((prev) => prev.filter((_, i) => i !== idx));
  const validateEducation = () => {
    const newErrors: ErrorState = {};
    education.forEach((ed, idx) => {
      if (!ed.degree) newErrors[`degree${idx}`] = 'Degree is required';
      if (!ed.college) newErrors[`college${idx}`] = 'College is required';
      if (!ed.location) newErrors[`location${idx}`] = 'Location is required';
      if (!ed.start) newErrors[`start${idx}`] = 'Start Year is required';
      if (!ed.end) newErrors[`end${idx}`] = 'End Year is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Skills Handlers
  const handleSkillInputChange = (type: keyof Skills, value: string) => {
    setSkillInput((prev) => ({ ...prev, [type]: value }));
  };
  const handleSkillAdd = (type: keyof Skills, e: React.FormEvent) => {
    e.preventDefault();
    const value = skillInput[type].trim();
    if (value && !skills[type].includes(value)) {
      setSkills((prev) => ({ ...prev, [type]: [...prev[type], value] }));
      setSkillInput((prev) => ({ ...prev, [type]: '' }));
    }
  };
  const handleSkillRemove = (type: keyof Skills, idx: number) => {
    setSkills((prev) => ({ ...prev, [type]: prev[type].filter((_, i) => i !== idx) }));
  };
  const validateSkills = () => {
    const newErrors: ErrorState = {};
    if (!skills.technical.length) newErrors.technical = 'At least one technical skill is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Projects Handlers
  const handleProjectChange = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjects((prev) => prev.map((p, i) => (i === idx ? { ...p, [name]: value } : p)));
  };
  const handleProjectTechInput = (idx: number, value: string) => {
    setProjects((prev) => prev.map((p, i) => (i === idx ? { ...p, techInput: value } : p)));
  };
  const handleProjectAddTech = (idx: number, e: React.FormEvent) => {
    e.preventDefault();
    const tech = projects[idx].techInput.trim();
    if (tech && !projects[idx].technologies.includes(tech)) {
      setProjects((prev) => prev.map((p, i) =>
        i === idx ? { ...p, technologies: [...p.technologies, tech], techInput: '' } : p
      ));
    }
  };
  const handleProjectRemoveTech = (idx: number, techIdx: number) => {
    setProjects((prev) => prev.map((p, i) =>
      i === idx ? { ...p, technologies: p.technologies.filter((_, t) => t !== techIdx) } : p
    ));
  };
  const addProject = () => setProjects((prev) => [...prev, { title: '', description: '', technologies: [], techInput: '', github: '', demo: '' }]);
  const removeProject = (idx: number) => setProjects((prev) => prev.filter((_, i) => i !== idx));
  const validateProjects = () => {
    const newErrors: ErrorState = {};
    projects.forEach((p, idx) => {
      if (!p.title) newErrors[`title${idx}`] = 'Project title is required';
      if (!p.description) newErrors[`description${idx}`] = 'Description is required';
      if (!p.technologies.length) newErrors[`technologies${idx}`] = 'At least one technology is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Experience Handlers
  const handleExperienceChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExperience((prev) => prev.map((exp, i) => (i === idx ? { ...exp, [name]: value } : exp)));
  };
  const handleExperienceRespInput = (idx: number, value: string) => {
    setExperience((prev) => prev.map((exp, i) => (i === idx ? { ...exp, respInput: value } : exp)));
  };
  const handleExperienceAddResp = (idx: number, e: React.FormEvent) => {
    e.preventDefault();
    const resp = experience[idx].respInput.trim();
    if (resp) {
      setExperience((prev) => prev.map((exp, i) =>
        i === idx ? { ...exp, responsibilities: [...exp.responsibilities, resp], respInput: '' } : exp
      ));
    }
  };
  const handleExperienceRemoveResp = (idx: number, respIdx: number) => {
    setExperience((prev) => prev.map((exp, i) =>
      i === idx ? { ...exp, responsibilities: exp.responsibilities.filter((_, r) => r !== respIdx) } : exp
    ));
  };
  const addExperience = () => setExperience((prev) => [...prev, { jobTitle: '', company: '', location: '', from: '', to: '', responsibilities: [], respInput: '' }]);
  const removeExperience = (idx: number) => setExperience((prev) => prev.filter((_, i) => i !== idx));
  const validateExperience = () => {
    const newErrors: ErrorState = {};
    experience.forEach((exp, idx) => {
      if (!exp.jobTitle) newErrors[`jobTitle${idx}`] = 'Job Title is required';
      if (!exp.company) newErrors[`company${idx}`] = 'Company is required';
      if (!exp.location) newErrors[`location${idx}`] = 'Location is required';
      if (!exp.from) newErrors[`from${idx}`] = 'From (start) is required';
      if (!exp.to) newErrors[`to${idx}`] = 'To (end) is required';
      if (!exp.responsibilities.length) newErrors[`responsibilities${idx}`] = 'At least one responsibility is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Certifications Handlers
  const handleCertificationChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCertifications((prev) => prev.map((c, i) => (i === idx ? { ...c, [name]: value } : c)));
  };
  const addCertification = () => setCertifications((prev) => [...prev, { title: '', platform: '', date: '', link: '' }]);
  const removeCertification = (idx: number) => setCertifications((prev) => prev.filter((_, i) => i !== idx));
  const validateCertifications = () => {
    const newErrors: ErrorState = {};
    certifications.forEach((c, idx) => {
      if (!c.title) newErrors[`certTitle${idx}`] = 'Certificate title is required';
      if (!c.platform) newErrors[`certPlatform${idx}`] = 'Platform/Institute is required';
      if (!c.date) newErrors[`certDate${idx}`] = 'Date is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Achievements Handlers
  const handleAchievementChange = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAchievements((prev) => prev.map((a, i) => (i === idx ? { ...a, [name]: value } : a)));
  };
  const addAchievement = () => setAchievements((prev) => [...prev, { title: '', description: '', year: '' }]);
  const removeAchievement = (idx: number) => setAchievements((prev) => prev.filter((_, i) => i !== idx));
  const validateAchievements = () => {
    const newErrors: ErrorState = {};
    achievements.forEach((a, idx) => {
      if (!a.title) newErrors[`achTitle${idx}`] = 'Achievement title is required';
      if (!a.description) newErrors[`achDesc${idx}`] = 'Description is required';
      if (!a.year) newErrors[`achYear${idx}`] = 'Year is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Languages Handlers
  const handleLanguageChange = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLanguages((prev) => prev.map((l, i) => (i === idx ? { ...l, [name]: value } : l)));
  };
  const addLanguage = () => setLanguages((prev) => [...prev, { name: '', proficiency: '' }]);
  const removeLanguage = (idx: number) => setLanguages((prev) => prev.filter((_, i) => i !== idx));
  const validateLanguages = () => {
    const newErrors: ErrorState = {};
    languages.forEach((l, idx) => {
      if (!l.name) newErrors[`langName${idx}`] = 'Language name is required';
      if (!l.proficiency) newErrors[`langProf${idx}`] = 'Proficiency is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hobbies Handlers
  const handleHobbyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHobbyInput(e.target.value);
  };
  const handleHobbyAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const value = hobbyInput.trim();
    if (value && !hobbies.includes(value)) {
      setHobbies((prev) => [...prev, value]);
      setHobbyInput('');
    }
  };
  const handleHobbyRemove = (idx: number) => {
    setHobbies((prev) => prev.filter((_, i) => i !== idx));
  };
  const validateHobbies = () => {
    const newErrors: ErrorState = {};
    if (!hobbies.length) newErrors.hobbies = 'At least one hobby/interest is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // References Handlers
  const handleReferenceChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReferences((prev) => prev.map((r, i) => (i === idx ? { ...r, [name]: value } : r)));
  };
  const addReference = () => setReferences((prev) => [...prev, { name: '', jobTitle: '', email: '', phone: '', relation: '' }]);
  const removeReference = (idx: number) => setReferences((prev) => prev.filter((_, i) => i !== idx));
  // No required validation for references (optional step)

  const handleNext = () => {
    if (currentStep === 0) {
      if (validatePersonal()) setCurrentStep((s) => s + 1);
    } else if (currentStep === 1) {
      if (validateEducation()) setCurrentStep((s) => s + 1);
    } else if (currentStep === 2) {
      if (validateSkills()) setCurrentStep((s) => s + 1);
    } else if (currentStep === 3) {
      if (validateProjects()) setCurrentStep((s) => s + 1);
    } else if (currentStep === 4) {
      if (validateExperience()) setCurrentStep((s) => s + 1);
    } else if (currentStep === 5) {
      if (validateCertifications()) setCurrentStep((s) => s + 1);
    } else if (currentStep === 6) {
      if (validateAchievements()) setCurrentStep((s) => s + 1);
    } else if (currentStep === 7) {
      if (validateLanguages()) setCurrentStep((s) => s + 1);
    } else if (currentStep === 8) {
      if (validateHobbies()) setCurrentStep((s) => s + 1);
    } else if (currentStep === 9) {
      // No required validation for references (optional step)
      setCurrentStep((s) => s + 1);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };
  const handleBack = () => setCurrentStep((s) => Math.max(0, s - 1));

  // Progress bar for mobile
  const progressPercent = Math.min((currentStep / steps.length) * 100, 100);

  // Handler to insert expert suggestion text into the correct field
  const handleInsertSuggestion = (section: string, text: string) => {
    if (section === 'summary') {
      setPersonalInfo((prev) => ({ ...prev, summary: text }));
    } else if (section === 'experience') {
      setExperience((prev) => prev.map((exp, idx) => idx === 0 ? { ...exp, responsibilities: [...exp.responsibilities, text] } : exp));
    } else if (section === 'skills') {
      setSkills((prev) => ({ ...prev, technical: [...prev.technical, text] }));
    }
  };

  const renderPersonalForm = () => (
    <form className="grid grid-cols-1 gap-5" autoComplete="off">
      <div>
        <label className="block font-medium text-blue-700">Full Name *</label>
        <input name="fullName" value={personalInfo.fullName} onChange={handlePersonalChange} className="input" placeholder="e.g. John Doe" />
        {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-blue-700">Email *</label>
          <input name="email" value={personalInfo.email} onChange={handlePersonalChange} className="input" placeholder="e.g. john@email.com" />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>
        <div>
          <label className="block font-medium text-blue-700">Phone Number *</label>
          <input name="phone" value={personalInfo.phone} onChange={handlePersonalChange} className="input" placeholder="e.g. +91 1234567890" />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-blue-700">LinkedIn *</label>
          <input name="linkedin" value={personalInfo.linkedin} onChange={handlePersonalChange} className="input" placeholder="LinkedIn URL" />
          {errors.linkedin && <span className="text-red-500 text-sm">{errors.linkedin}</span>}
        </div>
        <div>
          <label className="block font-medium text-blue-700">GitHub</label>
          <input name="github" value={personalInfo.github} onChange={handlePersonalChange} className="input" placeholder="GitHub URL (optional)" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-blue-700">Portfolio</label>
          <input name="portfolio" value={personalInfo.portfolio} onChange={handlePersonalChange} className="input" placeholder="Portfolio URL (optional)" />
        </div>
        <div>
          <label className="block font-medium text-blue-700">Address *</label>
          <input name="address" value={personalInfo.address} onChange={handlePersonalChange} className="input" placeholder="City, Country" />
          {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
        </div>
      </div>
      <div>
        <label className="block font-medium text-blue-700">Profile Photo</label>
        <input name="photo" type="file" accept="image/*" onChange={handlePhotoUpload} className="input" />
        {personalInfo.photo && <img src={personalInfo.photo} alt="Profile" className="mt-2 w-20 h-20 rounded-full object-cover border-2 border-blue-300" />}
      </div>
      <div>
        <label className="block font-medium text-blue-700">Objective / Summary *</label>
        <textarea name="summary" value={personalInfo.summary} onChange={handlePersonalChange} className="input h-24" placeholder="Brief summary about yourself" />
        {errors.summary && <span className="text-red-500 text-sm">{errors.summary}</span>}
      </div>
    </form>
  );

  const renderEducationForm = () => (
    <div className="flex flex-col gap-6">
      {education.map((ed, idx) => (
        <div key={idx} className="bg-blue-50 rounded-xl p-5 border border-blue-200 relative">
          {education.length > 1 && (
            <button type="button" onClick={() => removeEducation(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl">&times;</button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-blue-700">Degree *</label>
              <input name="degree" value={ed.degree} onChange={(e) => handleEducationChange(idx, e)} className="input" placeholder="e.g. B.Tech in Computer Science" />
              {errors[`degree${idx}`] && <span className="text-red-500 text-sm">{errors[`degree${idx}`]}</span>}
            </div>
            <div>
              <label className="block font-medium text-blue-700">University/College *</label>
              <input name="college" value={ed.college} onChange={(e) => handleEducationChange(idx, e)} className="input" placeholder="e.g. IIT Bombay" />
              {errors[`college${idx}`] && <span className="text-red-500 text-sm">{errors[`college${idx}`]}</span>}
            </div>
            <div>
              <label className="block font-medium text-blue-700">Location *</label>
              <input name="location" value={ed.location} onChange={(e) => handleEducationChange(idx, e)} className="input" placeholder="e.g. Mumbai, India" />
              {errors[`location${idx}`] && <span className="text-red-500 text-sm">{errors[`location${idx}`]}</span>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-medium text-blue-700">Start Year *</label>
                <input name="start" value={ed.start} onChange={(e) => handleEducationChange(idx, e)} className="input" placeholder="e.g. 2020" />
                {errors[`start${idx}`] && <span className="text-red-500 text-sm">{errors[`start${idx}`]}</span>}
              </div>
              <div>
                <label className="block font-medium text-blue-700">End Year *</label>
                <input name="end" value={ed.end} onChange={(e) => handleEducationChange(idx, e)} className="input" placeholder="e.g. 2024" />
                {errors[`end${idx}`] && <span className="text-red-500 text-sm">{errors[`end${idx}`]}</span>}
              </div>
            </div>
            <div>
              <label className="block font-medium text-blue-700">CGPA / Percentage</label>
              <input name="cgpa" value={ed.cgpa} onChange={(e) => handleEducationChange(idx, e)} className="input" placeholder="e.g. 8.5 / 85% (optional)" />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addEducation} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 w-fit self-end">+ Add Education</button>
    </div>
  );

  const renderSkillsForm = () => (
    <div className="flex flex-col gap-8">
      <div>
        <label className="block font-bold text-blue-700 mb-2">Technical Skills *</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.technical.map((skill, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
              {skill}
              <button type="button" onClick={() => handleSkillRemove('technical', idx)} className="ml-1 text-blue-500 hover:text-red-500">&times;</button>
            </span>
          ))}
        </div>
        <form className="flex gap-2" onSubmit={(e) => handleSkillAdd('technical', e)}>
          <input
            className="input flex-1"
            placeholder="Add a technical skill (e.g. Python)"
            value={skillInput.technical}
            onChange={(e) => handleSkillInputChange('technical', e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">Add</button>
        </form>
        {errors.technical && <span className="text-red-500 text-sm">{errors.technical}</span>}
      </div>
      <div>
        <label className="block font-bold text-blue-700 mb-2">Tools</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.tools.map((tool, idx) => (
            <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
              {tool}
              <button type="button" onClick={() => handleSkillRemove('tools', idx)} className="ml-1 text-blue-500 hover:text-red-500">&times;</button>
            </span>
          ))}
        </div>
        <form className="flex gap-2" onSubmit={(e) => handleSkillAdd('tools', e)}>
          <input
            className="input flex-1"
            placeholder="Add a tool (e.g. VS Code)"
            value={skillInput.tools}
            onChange={(e) => handleSkillInputChange('tools', e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">Add</button>
        </form>
      </div>
      <div>
        <label className="block font-bold text-blue-700 mb-2">Soft Skills</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.soft.map((soft, idx) => (
            <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
              {soft}
              <button type="button" onClick={() => handleSkillRemove('soft', idx)} className="ml-1 text-blue-500 hover:text-red-500">&times;</button>
            </span>
          ))}
        </div>
        <form className="flex gap-2" onSubmit={(e) => handleSkillAdd('soft', e)}>
          <input
            className="input flex-1"
            placeholder="Add a soft skill (e.g. Communication)"
            value={skillInput.soft}
            onChange={(e) => handleSkillInputChange('soft', e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">Add</button>
        </form>
      </div>
    </div>
  );

  const renderProjectsForm = () => (
    <div className="flex flex-col gap-8">
      {projects.map((p, idx) => (
        <div key={idx} className="bg-blue-50 rounded-xl p-5 border border-blue-200 relative">
          {projects.length > 1 && (
            <button type="button" onClick={() => removeProject(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl">&times;</button>
          )}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block font-medium text-blue-700">Project Title *</label>
              <input name="title" value={p.title} onChange={(e) => handleProjectChange(idx, e)} className="input" placeholder="e.g. Portfolio Website" />
              {errors[`title${idx}`] && <span className="text-red-500 text-sm">{errors[`title${idx}`]}</span>}
            </div>
            <div>
              <label className="block font-medium text-blue-700">Description *</label>
              <textarea name="description" value={p.description} onChange={(e) => handleProjectChange(idx, e)} className="input h-20" placeholder="2–3 lines about the project" />
              {errors[`description${idx}`] && <span className="text-red-500 text-sm">{errors[`description${idx}`]}</span>}
            </div>
            <div>
              <label className="block font-medium text-blue-700">Technologies Used *</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {p.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
                    {tech}
                    <button type="button" onClick={() => handleProjectRemoveTech(idx, tIdx)} className="ml-1 text-blue-500 hover:text-red-500">&times;</button>
                  </span>
                ))}
              </div>
              <form className="flex gap-2" onSubmit={(e) => handleProjectAddTech(idx, e)}>
                <input
                  className="input flex-1"
                  placeholder="Add a technology (e.g. React)"
                  value={p.techInput}
                  onChange={(e) => handleProjectTechInput(idx, e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">Add</button>
              </form>
            </div>
            <div>
              <label className="block font-medium text-blue-700">GitHub Repository</label>
              <input name="github" value={p.github} onChange={(e) => handleProjectChange(idx, e)} className="input" placeholder="GitHub URL (optional)" />
            </div>
            <div>
              <label className="block font-medium text-blue-700">Live Demo</label>
              <input name="demo" value={p.demo} onChange={(e) => handleProjectChange(idx, e)} className="input" placeholder="Live Demo URL (optional)" />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addProject} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 w-fit self-end">+ Add Project</button>
    </div>
  );

  const renderExperienceForm = () => (
    <div className="flex flex-col gap-8">
      {experience.map((exp, idx) => (
        <div key={idx} className="bg-blue-50 rounded-xl p-5 border border-blue-200 relative">
          {experience.length > 1 && (
            <button type="button" onClick={() => removeExperience(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl">&times;</button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-blue-700">Job Title *</label>
              <input name="jobTitle" value={exp.jobTitle} onChange={(e) => handleExperienceChange(idx, e)} className="input" placeholder="e.g. Software Engineer" />
              {errors[`jobTitle${idx}`] && <span className="text-red-500 text-sm">{errors[`jobTitle${idx}`]}</span>}
            </div>
            <div>
              <label className="block font-medium text-blue-700">Company Name *</label>
              <input name="company" value={exp.company} onChange={(e) => handleExperienceChange(idx, e)} className="input" placeholder="e.g. Google" />
              {errors[`company${idx}`] && <span className="text-red-500 text-sm">{errors[`company${idx}`]}</span>}
            </div>
            <div>
              <label className="block font-medium text-blue-700">Location *</label>
              <input name="location" value={exp.location} onChange={(e) => handleExperienceChange(idx, e)} className="input" placeholder="e.g. Bangalore, India" />
              {errors[`location${idx}`] && <span className="text-red-500 text-sm">{errors[`location${idx}`]}</span>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-medium text-blue-700">From *</label>
                <input name="from" value={exp.from} onChange={(e) => handleExperienceChange(idx, e)} className="input" placeholder="e.g. Jan 2023" />
                {errors[`from${idx}`] && <span className="text-red-500 text-sm">{errors[`from${idx}`]}</span>}
              </div>
              <div>
                <label className="block font-medium text-blue-700">To *</label>
                <input name="to" value={exp.to} onChange={(e) => handleExperienceChange(idx, e)} className="input" placeholder="e.g. June 2023" />
                {errors[`to${idx}`] && <span className="text-red-500 text-sm">{errors[`to${idx}`]}</span>}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium text-blue-700">Key Responsibilities *</label>
              <ul className="flex flex-wrap gap-2 mb-2">
                {exp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
                    {resp}
                    <button type="button" onClick={() => handleExperienceRemoveResp(idx, rIdx)} className="ml-1 text-blue-500 hover:text-red-500">&times;</button>
                  </li>
                ))}
              </ul>
              <form className="flex gap-2" onSubmit={(e) => handleExperienceAddResp(idx, e)}>
                <input
                  className="input flex-1"
                  placeholder="Add a responsibility (e.g. Built REST APIs)"
                  value={exp.respInput}
                  onChange={(e) => handleExperienceRespInput(idx, e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">Add</button>
              </form>
              {errors[`responsibilities${idx}`] && <span className="text-red-500 text-sm">{errors[`responsibilities${idx}`]}</span>}
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addExperience} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 w-fit self-end">+ Add Experience</button>
    </div>
  );

  const renderCertificationsForm = () => (
    <div className="flex flex-col gap-8">
      {certifications.map((c, idx) => (
        <div key={idx} className="bg-blue-50 rounded-xl p-5 border border-blue-200 relative">
          {certifications.length > 1 && (
            <button type="button" onClick={() => removeCertification(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl">&times;</button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-blue-700">Certificate Title *</label>
              <input name="title" value={c.title} onChange={(e) => handleCertificationChange(idx, e)} className="input" placeholder="e.g. AWS Certified Developer" />
              {errors[`certTitle${idx}`] && <span className="text-red-500 text-sm">{errors[`certTitle${idx}`]}</span>}
            </div>
            <div>
              <label className="block font-medium text-blue-700">Platform / Institute *</label>
              <input name="platform" value={c.platform} onChange={(e) => handleCertificationChange(idx, e)} className="input" placeholder="e.g. Coursera, Udemy" />
              {errors[`certPlatform${idx}`] && <span className="text-red-500 text-sm">{errors[`certPlatform${idx}`]}</span>}
            </div>
            <div>
              <label className="block font-medium text-blue-700">Date of Completion *</label>
              <input name="date" value={c.date} onChange={(e) => handleCertificationChange(idx, e)} className="input" placeholder="e.g. June 2024" />
              {errors[`certDate${idx}`] && <span className="text-red-500 text-sm">{errors[`certDate${idx}`]}</span>}
            </div>
            <div>
              <label className="block font-medium text-blue-700">Certificate Link</label>
              <input name="link" value={c.link} onChange={(e) => handleCertificationChange(idx, e)} className="input" placeholder="Certificate URL (optional)" />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addCertification} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 w-fit self-end">+ Add Certification</button>
    </div>
  );

  const renderAchievementsForm = () => (
    <div className="flex flex-col gap-8">
      {achievements.map((a, idx) => (
        <div key={idx} className="bg-blue-50 rounded-xl p-5 border border-blue-200 relative">
          {achievements.length > 1 && (
            <button type="button" onClick={() => removeAchievement(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl">&times;</button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-blue-700">Title of Achievement *</label>
              <input name="title" value={a.title} onChange={(e) => handleAchievementChange(idx, e)} className="input" placeholder="e.g. Hackathon Winner" />
              {errors[`achTitle${idx}`] && <span className="text-red-500 text-sm">{errors[`achTitle${idx}`]}</span>}
            </div>
            <div>
              <label className="block font-medium text-blue-700">Year *</label>
              <input name="year" value={a.year} onChange={(e) => handleAchievementChange(idx, e)} className="input" placeholder="e.g. 2024" />
              {errors[`achYear${idx}`] && <span className="text-red-500 text-sm">{errors[`achYear${idx}`]}</span>}
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium text-blue-700">Description *</label>
              <textarea name="description" value={a.description} onChange={(e) => handleAchievementChange(idx, e)} className="input h-20" placeholder="Describe the achievement" />
              {errors[`achDesc${idx}`] && <span className="text-red-500 text-sm">{errors[`achDesc${idx}`]}</span>}
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addAchievement} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 w-fit self-end">+ Add Achievement</button>
    </div>
  );

  const renderLanguagesForm = () => (
    <div className="flex flex-col gap-8">
      {languages.map((l, idx) => (
        <div key={idx} className="bg-blue-50 rounded-xl p-5 border border-blue-200 relative">
          {languages.length > 1 && (
            <button type="button" onClick={() => removeLanguage(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl">&times;</button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-blue-700">Language Name *</label>
              <input name="name" value={l.name} onChange={(e) => handleLanguageChange(idx, e)} className="input" placeholder="e.g. English" />
              {errors[`langName${idx}`] && <span className="text-red-500 text-sm">{errors[`langName${idx}`]}</span>}
            </div>
            <div>
              <label className="block font-medium text-blue-700">Proficiency *</label>
              <select name="proficiency" value={l.proficiency} onChange={(e) => handleLanguageChange(idx, e)} className="input">
                <option value="">Select proficiency</option>
                <option value="Fluent">Fluent</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
              {errors[`langProf${idx}`] && <span className="text-red-500 text-sm">{errors[`langProf${idx}`]}</span>}
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addLanguage} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 w-fit self-end">+ Add Language</button>
    </div>
  );

  const renderHobbiesForm = () => (
    <div className="flex flex-col gap-8">
      <div>
        <label className="block font-bold text-blue-700 mb-2">Hobbies / Interests *</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {hobbies.map((hobby, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
              {hobby}
              <button type="button" onClick={() => handleHobbyRemove(idx)} className="ml-1 text-blue-500 hover:text-red-500">&times;</button>
            </span>
          ))}
        </div>
        <form className="flex gap-2" onSubmit={handleHobbyAdd}>
          <input
            className="input flex-1"
            placeholder="Add a hobby or interest (e.g. Reading)"
            value={hobbyInput}
            onChange={handleHobbyInputChange}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">Add</button>
        </form>
        {errors.hobbies && <span className="text-red-500 text-sm">{errors.hobbies}</span>}
      </div>
    </div>
  );

  const renderReferencesForm = () => (
    <div className="flex flex-col gap-8">
      {references.map((r, idx) => (
        <div key={idx} className="bg-blue-50 rounded-xl p-5 border border-blue-200 relative">
          {references.length > 1 && (
            <button type="button" onClick={() => removeReference(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl">&times;</button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-blue-700">Name</label>
              <input name="name" value={r.name} onChange={(e) => handleReferenceChange(idx, e)} className="input" placeholder="e.g. Jane Smith" />
            </div>
            <div>
              <label className="block font-medium text-blue-700">Job Title</label>
              <input name="jobTitle" value={r.jobTitle} onChange={(e) => handleReferenceChange(idx, e)} className="input" placeholder="e.g. Senior Manager" />
            </div>
            <div>
              <label className="block font-medium text-blue-700">Email</label>
              <input name="email" value={r.email} onChange={(e) => handleReferenceChange(idx, e)} className="input" placeholder="e.g. jane@email.com" />
            </div>
            <div>
              <label className="block font-medium text-blue-700">Phone Number</label>
              <input name="phone" value={r.phone} onChange={(e) => handleReferenceChange(idx, e)} className="input" placeholder="e.g. +91 9876543210" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium text-blue-700">Relation to you</label>
              <input name="relation" value={r.relation} onChange={(e) => handleReferenceChange(idx, e)} className="input" placeholder="e.g. Former Supervisor" />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addReference} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 w-fit self-end">+ Add Reference</button>
    </div>
  );

  // Define template styles
const templateStyles: { [key: string]: { color: string; bg: string } } = {
  modern: { color: '#2563eb', bg: '#e0e7ff' },
  classic: { color: '#1e293b', bg: '#f1f5f9' }
};
  const templateStyle = templateStyles[selectedTemplate] || templateStyles['modern'];

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage onStart={() => setCurrentView('templates')} />
      )}
      {currentView === 'templates' && (
        <TemplateSelector
          onSelectTemplate={(templateId, colorStyle) => {
            setSelectedTemplate(templateId);
            setSelectedTemplateStyle(colorStyle || { color: '#2563eb', bg: '#e0e7ff' });
            setCurrentView('builder');
          }}
          onBack={() => setCurrentView('landing')}
        />
      )}
      {currentView === 'builder' && (
        <div className="relative min-h-screen bg-blue-50 flex flex-col md:flex-row overflow-hidden justify-center items-center px-2 sm:px-4">
          {/* Sidebar Stepper (hidden on mobile) */}
          <aside className="hidden md:flex w-64 bg-white shadow-xl p-6 flex-col gap-4 border-r border-blue-200 h-full min-h-[80vh] rounded-2xl mt-10 mb-10 mr-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">CV Builder</h2>
            <nav className="flex flex-col gap-3">
              {steps.map((step, idx) => (
                <button
                  key={step.label}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium text-left ${
                    idx === currentStep
                      ? 'bg-blue-100 text-blue-700 shadow'
                      : 'text-gray-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setCurrentStep(idx)}
                >
                  <span className="text-xl">{step.icon}</span>
                  {step.label}
                </button>
              ))}
            </nav>
          </aside>
          {/* Main content area: form only */}
          <div className="flex flex-col w-full z-10 justify-center items-center min-h-[80vh] md:min-h-[90vh]">
            <div className="flex-1 w-full max-w-lg md:max-w-2xl bg-white rounded-2xl shadow-2xl p-4 md:p-8 border-2 border-blue-100 mt-8 md:mt-16">
              {/* Back to Templates button, only on Personal Info step */}
              {currentStep === 0 && (
                <div className="flex w-full mb-6">
                  <button
                    className="bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-50 font-semibold flex items-center gap-2 w-full max-w-xs md:max-w-none md:w-auto"
                    onClick={() => setCurrentView('templates')}
                  >
                    <span className="text-lg">←</span> Back to Templates
                  </button>
                </div>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 md:mb-6 flex items-center gap-2">
                {currentStep < steps.length
                  ? (<><span>{steps[currentStep].icon}</span> {steps[currentStep].label}</>)
                  : 'Review & Download'}
              </h1>
              {/* Step Content */}
              {currentStep === 0 && renderPersonalForm()}
              {currentStep === 1 && renderEducationForm()}
              {currentStep === 2 && renderSkillsForm()}
              {currentStep === 3 && renderProjectsForm()}
              {currentStep === 4 && renderExperienceForm()}
              {currentStep === 5 && renderCertificationsForm()}
              {currentStep === 6 && renderAchievementsForm()}
              {currentStep === 7 && renderLanguagesForm()}
              {currentStep === 8 && renderHobbiesForm()}
              {currentStep === 9 && renderReferencesForm()}
              {currentStep > 9 && <div className="text-gray-500 text-lg">Review your information and download your CV as a PDF below.</div>}
              {/* Navigation Buttons */}
              <div className="flex flex-col md:flex-row justify-between mt-8 gap-3 md:gap-0">
                <button
                  className="w-full md:w-auto px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 disabled:opacity-50"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Back
                </button>
                {currentStep <= steps.length - 1 && (
                  <button
                    className="w-full md:w-auto px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow disabled:opacity-50"
                    onClick={handleNext}
                    disabled={currentStep > steps.length - 1}
                  >
                    Next
                  </button>
                )}
              </div>
{currentStep > 9 && (
  <div className="mt-8 flex flex-col items-center">
    <PDFDownloadLink
      document={
        <CVDocument
          personalInfo={personalInfo}
          education={education}
          skills={skills}
          projects={projects}
          experience={experience}
          certifications={certifications}
          achievements={achievements}
          languages={languages}
          references={references}
          template={selectedTemplate}
          colors={selectedTemplateStyle}
        />
      }
      fileName={`${personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`}
      className="w-full md:w-auto px-8 py-3 bg-blue-700 text-white rounded-lg font-bold shadow-lg hover:bg-blue-800 transition text-lg text-center"
    >
      {({ loading }) => (
        loading ? 'Generating PDF...' : 'Download CV as PDF'
      )}
    </PDFDownloadLink>
  </div>
)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

// Tailwind input style
// Add this to your index.css for beautiful input fields:
// .input { @apply w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition; background: #f8fafc; }
