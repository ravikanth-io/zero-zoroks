import React, { useState } from 'react';
import { PROFILE } from '../constants';
import { LinkedinIcon, GithubIcon, InstagramIcon, SendIcon } from '../components/Icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for the field being edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let error = '';

    // Validate on blur for immediate feedback
    if (name === 'name') {
      if (!value.trim()) error = 'Identity required. Who goes there?';
    }

    if (name === 'email') {
      if (!value.trim()) {
        error = 'Uplink coordinates (email) required.';
      } else {
        // Stricter email regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          error = 'Invalid signal format. Please provide a valid email address (e.g., user@domain.com).';
        }
      }
    }

    if (name === 'message') {
      if (!value.trim()) error = 'Payload is empty. Please enter your transmission.';
    }

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Identity required. Who goes there?';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Uplink coordinates (email) required.';
      isValid = false;
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid signal format. Please provide a valid email address (e.g., user@domain.com).';
        isValid = false;
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Payload is empty. Please enter your transmission.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('submitting');

    // NOTE: For a real implementation, replace the URL below with your Formspree endpoint (e.g., https://formspree.io/f/your_form_id)
    // or use Netlify Forms by adding 'data-netlify="true"' to the form tag and removing this onSubmit handler if using static hosting.
    
    // Simulating network request for demo purposes
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      setStatus('error');
    }
  };

  // Helper for dynamic input classes
  const getInputClasses = (hasError: boolean) => `
    w-full 
    bg-white dark:bg-black/50 
    border 
    rounded-lg px-4 py-3 
    text-gray-900 dark:text-white 
    outline-none 
    transition-all duration-300 
    placeholder-gray-400
    hover:border-gray-400 dark:hover:border-gray-500
    ${hasError 
      ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
      : 'border-gray-300 dark:border-cyber-border focus:border-cyber-green focus:shadow-[0_0_15px_rgba(0,255,65,0.2)]'
    }
  `;

  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-in zoom-in duration-500">
        
        {/* Left Column: Contact Info & Socials */}
        <div className="text-center md:text-left space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Initialize <br/><span className="text-cyber-green">Handshake</span></h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              I'm actively seeking entry-level opportunities in SOC, Incident Response, or Security Engineering. 
              Connect with me to discuss how I can contribute to your team.
            </p>
          </div>

          <div className="flex justify-center md:justify-start space-x-6">
            <a href={`https://${PROFILE.github}`} target="_blank" rel="noreferrer" className="group p-4 bg-white dark:bg-cyber-gray border border-gray-200 dark:border-cyber-border rounded-xl hover:border-cyber-green transition-all duration-300">
              <GithubIcon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-cyber-green transition-colors" />
            </a>
            
            <a href={`https://${PROFILE.instagram}`} target="_blank" rel="noreferrer" className="group p-4 bg-white dark:bg-cyber-gray border border-gray-200 dark:border-cyber-border rounded-xl hover:border-cyber-green transition-all duration-300">
              <InstagramIcon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-cyber-green transition-colors" />
            </a>

            <a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noreferrer" className="group p-4 bg-white dark:bg-cyber-gray border border-gray-200 dark:border-cyber-border rounded-xl hover:border-cyber-green transition-all duration-300">
              <LinkedinIcon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-cyber-green transition-colors" />
            </a>
          </div>

          <div className="hidden md:block p-6 bg-cyber-green/5 rounded-xl border border-cyber-green/20">
             <div className="font-mono text-sm text-cyber-green mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></span>
                System Status
             </div>
             <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                Receiving transmissions... <br/>
                Response time: &lt; 24 hours
             </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-white/50 dark:bg-cyber-gray/30 border border-gray-200 dark:border-cyber-border p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-sm">
          {status === 'success' ? (
             <div className="h-[300px] flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-2">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Transmission Received</h3>
                <p className="text-gray-600 dark:text-gray-400">Thank you for your message. I will decrypt and respond shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-cyber-green hover:underline font-mono text-sm"
                >
                  Send another transmission
                </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-gray-700 dark:text-gray-300 mb-2">
                  $ define entity_name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses(!!errors.name)}
                  placeholder="Enter your designation or alias"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500 font-mono">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-mono text-gray-700 dark:text-gray-300 mb-2">
                  $ define return_address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses(!!errors.email)}
                  placeholder="secure_uplink@domain.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500 font-mono">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-mono text-gray-700 dark:text-gray-300 mb-2">
                  $ define payload
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${getInputClasses(!!errors.message)} resize-none`}
                  placeholder="Enter mission parameters or handshake request..."
                />
                {errors.message && <p className="mt-1 text-xs text-red-500 font-mono">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full group relative overflow-hidden bg-cyber-green text-black font-bold py-4 rounded-lg hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <SendIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>Execute Transmission</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;