import React, { useState } from 'react';
import { PROJECTS, PROFILE } from '../constants';
import { ExternalLinkIcon, GithubIcon, TerminalIcon } from '../components/Icons';
import { Project } from '../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="
        group flex flex-col
        bg-white dark:bg-cyber-gray 
        border border-gray-200 dark:border-cyber-border 
        rounded-xl overflow-hidden 
        transition-all duration-300 ease-out
        hover:shadow-xl
        hover:border-cyber-green
        h-full
        animate-in fade-in zoom-in duration-500
      " 
    >
      <div className="h-48 overflow-hidden relative flex-shrink-0">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10 duration-300"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out" 
        />
        <div className="absolute top-2 right-2 z-20 bg-black/70 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-cyber-green border border-cyber-green/30">
           ID: {project.id.toString().padStart(3, '0')}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyber-green transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Detailed Description with nested expansion animation */}
        <div 
           className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[600px] mb-6' : 'max-h-0'}`}
        >
           <div className={`
             transform transition-all duration-500 ease-out
             ${isExpanded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
             text-gray-800 dark:text-gray-200 text-sm font-mono leading-relaxed 
             border-l-4 border-cyber-green pl-5 bg-gray-50 dark:bg-black/40 p-5 rounded-r-xl shadow-inner
           `}>
             {project.details}
           </div>
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-cyber-green text-xs font-mono font-bold hover:text-green-400 mb-6 self-start flex items-center uppercase tracking-wider group transition-colors"
        >
          <span className={`mr-2 inline-block transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
            {isExpanded ? '[-]' : '[+]'}
          </span>
          <span className="relative">
            {isExpanded ? 'Read Less' : 'Read More'}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-green transition-all duration-300 group-hover:w-full"></span>
          </span>
        </button>
        
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-gray-100 dark:bg-black/30 border border-gray-200 dark:border-cyber-border rounded text-xs font-mono text-gray-600 dark:text-gray-400 hover:border-cyber-green/50 transition-colors">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-cyber-border/50">
           <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
           >
            <GithubIcon className="w-4 h-4 mr-2" /> 
            Code
           </a>
           <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-semibold text-cyber-green hover:brightness-110 transition-all"
           >
            Live Demo
            <ExternalLinkIcon className="ml-2 w-4 h-4" />
           </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Machine Learning', 'SIEM', 'Blue Teaming', 'Pentesting', 'Cryptography', 'Generative AI'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tags.some(tag => tag.includes(filter) || (filter === 'Generative AI' && tag.includes('Gen'))));

  return (
    <div className="w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-cyber-green">#</span> Projects & Labs
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Practical implementation of security concepts through home labs and development.
            </p>
          </div>
          <a href={`https://${PROFILE.github}`} target="_blank" rel="noreferrer" className="hidden md:flex items-center px-6 py-2 bg-gray-100 dark:bg-cyber-gray text-gray-900 dark:text-white rounded-full hover:bg-cyber-green hover:text-black transition-all font-mono text-sm mt-4 md:mt-0 border border-gray-200 dark:border-cyber-border shadow-sm">
            <GithubIcon className="mr-2 w-4 h-4" />
            github.com/rk-cyber
          </a>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-12 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center mr-4 text-gray-500 dark:text-gray-400 font-mono text-sm">
                <TerminalIcon className="w-4 h-4 mr-2" /> Filter:
            </div>
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`
                        px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-300 border
                        ${filter === cat 
                            ? 'bg-cyber-green text-black border-cyber-green shadow-[0_0_10px_rgba(0,255,65,0.3)]' 
                            : 'bg-white dark:bg-cyber-gray text-gray-600 dark:text-gray-400 border-gray-200 dark:border-cyber-border hover:border-cyber-green hover:text-cyber-green'
                        }
                    `}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start min-h-[400px]">
          {filteredProjects.length > 0 ? (
             filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
             ))
          ) : (
             <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
                <TerminalIcon className="w-12 h-12 mb-4 opacity-50" />
                <p className="font-mono text-lg">No projects found for filter: "{filter}"</p>
             </div>
          )}
        </div>
        
        {/* Mobile Github Link */}
        <div className="mt-12 text-center md:hidden">
            <a href={`https://${PROFILE.github}`} target="_blank" rel="noreferrer" className="inline-flex items-center text-cyber-green hover:underline">
            View more on GitHub <ExternalLinkIcon className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;