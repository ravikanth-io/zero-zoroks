import React from 'react';
import { SKILLS, PROFILE } from '../constants';
import { TerminalIcon, ActivityIcon } from '../components/Icons';

const About = () => {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Intro / Philosophy Section */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-in slide-in-from-left duration-700">
               <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  The <span className="text-cyber-green">Philosophy</span> of Security
               </h2>
               <div className="prose dark:prose-invert text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
                  <p>
                     Security is often viewed as a barrier—a wall to keep people out. I view it as a filter, a way to ensure that only the signal gets through while the noise (and the threat) is discarded.
                  </p>
                  <p>
                     My journey began with a simple question: <em>"How does this break?"</em> This curiosity led me from dismantling simple script-kiddie tools to architecting robust monitoring solutions using <strong>ELK</strong> and <strong>Wazuh</strong>.
                  </p>
                  <p>
                     Currently, I am obsessively focused on the intersection of <strong>Artificial Intelligence</strong> and <strong>Cybersecurity</strong>. The future isn't just about securing code; it's about securing the cognition of the machines we rely on.
                  </p>
               </div>
               
               <div className="mt-8 flex gap-4">
                  <div className="p-4 bg-gray-100 dark:bg-cyber-gray rounded-lg border-l-4 border-cyber-green">
                     <p className="text-sm font-mono text-gray-800 dark:text-gray-200">
                        "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards - and even then I have my doubts."
                     </p>
                  </div>
               </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-in slide-in-from-right duration-700">
               <div className="relative w-full max-w-md aspect-square">
                  <div className="absolute inset-0 bg-cyber-green/20 rounded-full blur-3xl animate-pulse"></div>
                  <img 
                     src="https://picsum.photos/600/600?grayscale&blur=2" 
                     alt="Philosophy Abstract" 
                     className="relative rounded-2xl shadow-2xl border border-gray-200 dark:border-cyber-border object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-black p-4 rounded-lg shadow-xl border border-cyber-green">
                     <div className="flex items-center gap-2 text-cyber-green font-bold font-mono">
                        <TerminalIcon className="w-5 h-5" />
                        <span>STATUS: LEARNING</span>
                     </div>
                  </div>
               </div>
            </div>
        </div>

        {/* Skills Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-cyber-green">#</span> Technical Arsenal
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            A comprehensive list of tools, languages, and frameworks I leverage to secure systems and analyze threats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill, idx) => (
            <div 
              key={idx} 
              className="group bg-white dark:bg-cyber-gray border border-gray-200 dark:border-cyber-border p-8 rounded-xl hover:border-cyber-green transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(0,255,65,0.15)] hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                 <div className="w-12 h-12 bg-cream dark:bg-black rounded-lg border border-gray-200 dark:border-cyber-border flex items-center justify-center text-cyber-green shadow-sm group-hover:scale-110 transition-transform">
                   {skill.icon}
                 </div>
                 <ActivityIcon className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-cyber-green transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-cyber-border/50 pb-2 group-hover:text-cyber-green transition-colors">{skill.category}</h3>
              <ul className="space-y-3">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 dark:text-gray-300 font-mono text-sm group-hover:translate-x-1 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                    <span className="w-1.5 h-1.5 bg-cyber-green rounded-full mr-3 shadow-[0_0_5px_rgba(0,255,65,0.5)]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;