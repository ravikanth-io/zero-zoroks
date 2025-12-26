import React from 'react';
import { CERTIFICATIONS } from '../constants';
import { BookIcon } from '../components/Icons';

const Certifications = () => {
  return (
    <div className="w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
             <span className="text-cyber-green">#</span> Credentials & Education
           </h2>
           <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
             Formal recognition of my technical capabilities and commitment to continuous learning in the cybersecurity domain.
           </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <div 
               key={cert.id} 
               className="relative group bg-white dark:bg-cyber-gray border border-gray-200 dark:border-cyber-border rounded-xl p-6 hover:border-cyber-green transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in zoom-in"
               style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-cream-100 dark:bg-black rounded-lg border border-gray-200 dark:border-cyber-border group-hover:border-cyber-green/50 transition-colors">
                   <img src={cert.badgeUrl} alt={cert.name} className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-cyber-green transition-colors">{cert.name}</h4>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">{cert.issuer}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-black/50 px-2 py-1 rounded border border-gray-200 dark:border-white/10">
                      {cert.date}
                    </span>
                    {cert.verifyUrl !== '#' && (
                        <a href={cert.verifyUrl} className="text-xs text-cyber-green hover:underline">Verify</a>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-cyber-green rounded-full shadow-[0_0_8px_rgba(0,255,65,0.8)] animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Continuous Learning / Books / Badges Section */}
        <div className="mt-20 border-t border-gray-200 dark:border-cyber-border/50 pt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <BookIcon className="w-6 h-6 mr-3 text-cyber-green" />
                Continuous Learning & Badges
            </h3>
            <div className="bg-white/50 dark:bg-cyber-gray/30 border border-gray-200 dark:border-cyber-border rounded-xl p-8">
                <div className="flex flex-wrap gap-4">
                    {['TryHackMe Top 2%', '30+ Rooms Solved', 'Python 5-Star (HackerRank)', 'Advent of Cyber 2023', 'OWASP Top 10 Competency'].map((badge, i) => (
                        <span key={i} className="px-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-cyber-border rounded-full text-sm font-mono text-gray-700 dark:text-gray-300 hover:text-cyber-green hover:border-cyber-green transition-colors cursor-default">
                            {badge}
                        </span>
                    ))}
                </div>
                <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    Currently studying for: <strong>CompTIA Security+ (SY0-701)</strong> and <strong>AWS Certified Cloud Practitioner</strong>.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Certifications;