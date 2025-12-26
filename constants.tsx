import React from 'react';
import { Project, Certification, Skill } from './types';
import { TerminalIcon, ShieldIcon, CrosshairIcon, CpuIcon, CloudIcon, DatabaseIcon, CodeIcon } from './components/Icons';

export const PROFILE = {
  name: "Ravikanth K S",
  role: "Cybersecurity & AI Researcher",
  location: "Bengaluru, India",
  email: "ravikanth.sec@example.com",
  github: "github.com/ravikanth-ks",
  linkedin: "linkedin.com/in/ravikanth-ks",
  instagram: "instagram.com/ravikanth_sec",
  bio: "an MCA scholar at AMC Engineering College, Bengaluru, who believes security is the ultimate form of sophistication. I architect the convergence of Cybersecurity and AI, crafting defenses so elegant, they leave adversaries heartbroken and systems untouched."
};

export const SKILLS: Skill[] = [
  {
    category: "Security Operations",
    items: ["Network Forensics", "SIEM (Wazuh, Splunk)", "Linux Hardening", "OWASP Top 10"],
    icon: <ShieldIcon />
  },
  {
    category: "AI & Automation",
    items: ["Python for Security", "TensorFlow/PyTorch", "LLM Security", "Adversarial Machine Learning"],
    icon: <CpuIcon />
  },
  {
    category: "Offensive Security",
    items: ["Burp Suite", "Metasploit", "Nmap Scripting", "CTF (HackTheBox)"],
    icon: <CrosshairIcon />
  },
  {
    category: "Cloud & DevSecOps",
    items: ["AWS IAM", "Docker Security", "Kubernetes (K8s)", "CI/CD Security"],
    icon: <CloudIcon />
  },
  {
    category: "Programming & Scripting",
    items: ["Python", "C++", "Bash / Shell", "SQL", "JavaScript"],
    icon: <CodeIcon />
  },
  {
    category: "Forensics & Analysis",
    items: ["Autopsy", "Wireshark", "Volatility", "Malware Analysis"],
    icon: <DatabaseIcon />
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI-Powered Phishing Detector",
    description: "Developed a Machine Learning model to classify malicious URLs and emails with 96% accuracy.",
    details: "Leveraged Python and Scikit-learn to train a Random Forest classifier on a dataset of over 50,000 URLs. Extracted lexical features (URL length, special characters, domain age) to detect phishing attempts in real-time. Integrated the model into a browser extension for active protection.",
    tags: ["Machine Learning", "Python", "Cyber Security"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/600/400?random=20"
  },
  {
    id: 2,
    title: "Virtual SOC Lab & ELK Stack",
    description: "Architected a virtualized Security Operations Center to simulate and analyze advanced persistent threats.",
    details: "Configured a comprehensive home lab using VirtualBox with Wazuh for EDR and the ELK Stack (Elasticsearch, Logstash, Kibana) for log aggregation. Executed simulated attacks including Hydra brute-forcing and SQL injections against vulnerable targets to practice incident response workflows.",
    tags: ["SIEM", "Wazuh", "Blue Teaming"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/600/400?random=2"
  },
  {
    id: 3,
    title: "Secure Portfolio with Gemini AI",
    description: "Built a modern, dark-mode portfolio featuring a custom-prompted AI assistant.",
    details: "Developed a responsive Single Page Application using React and TypeScript. Implemented strict Content Security Policy (CSP) headers and integrated the Google Gemini API to create 'WhiteRabbit', a persona-based chatbot that answers questions about my resume and skills.",
    tags: ["React", "Generative AI", "WebSec"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/600/400?random=1"
  },
  {
    id: 4,
    title: "Steganography Suite",
    description: "A Python-based CLI tool to hide encrypted text messages inside PNG images using Least Significant Bit (LSB) encoding.",
    details: "Implemented advanced LSB algorithms coupled with AES encryption to ensure hidden data remains secure even if extracted. Built for CTF challenges and secure communication demos.",
    tags: ["Cryptography", "Python", "Privacy"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/600/400?random=4"
  },
  {
    id: 5,
    title: "Automated Recon Script",
    description: "Bash shell script for automating initial reconnaissance phases in penetration testing.",
    details: "Chains together Nmap, Gobuster, and Nikto to perform port scanning, directory enumeration, and vulnerability scanning in one command. Outputs a formatted HTML report.",
    tags: ["Bash", "Pentesting", "Automation"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/600/400?random=5"
  },
  {
    id: 6,
    title: "Keystroke Dynamics Auth",
    description: "Biometric authentication system utilizing typing patterns.",
    details: "Trained a Neural Network to recognize users based on flight time (key release to key press) and dwell time (key press duration). Achieved 92% accuracy in distinguishing legitimate users from imposters.",
    tags: ["AI", "Biometrics", "Security"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/600/400?random=6"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    name: "Master of Computer Applications (Pursuing)",
    issuer: "AMC Engineering College",
    date: "2023 - Present",
    badgeUrl: "https://picsum.photos/100/100?random=15",
    verifyUrl: "#"
  },
  {
    id: 2,
    name: "Google Cybersecurity Certificate",
    issuer: "Google",
    date: "2023",
    badgeUrl: "https://picsum.photos/100/100?random=10",
    verifyUrl: "#"
  },
  {
    id: 3,
    name: "AI for Everyone",
    issuer: "DeepLearning.AI",
    date: "2023",
    badgeUrl: "https://picsum.photos/100/100?random=12",
    verifyUrl: "#"
  },
  {
    id: 4,
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2023",
    badgeUrl: "https://picsum.photos/100/100?random=16",
    verifyUrl: "#"
  },
  {
    id: 5,
    name: "Junior Penetration Tester",
    issuer: "TryHackMe",
    date: "2023",
    badgeUrl: "https://picsum.photos/100/100?random=17",
    verifyUrl: "#"
  },
  {
    id: 6,
    name: "Python for Data Science",
    issuer: "IBM",
    date: "2022",
    badgeUrl: "https://picsum.photos/100/100?random=18",
    verifyUrl: "#"
  }
];

export const PAYMENT_METHODS = [
  {
    id: 1,
    name: "Freelance Security",
    description: "Vulnerability assessments and secure code review services.",
    qrValue: "upi://pay?pa=ravikanth.work@example.com",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "Zero-Day Research",
    description: "Fund my independent research into undisclosed hardware exploits.",
    qrValue: "upi://pay?pa=ravikanth.research@example.com",
    color: "from-red-600 to-orange-600"
  },
  {
    id: 3,
    name: "Buy Me a Coffee",
    description: "Fuel my late-night coding and CTF sessions.",
    qrValue: "upi://pay?pa=ravikanth.coffee@example.com",
    color: "from-purple-500 to-pink-500"
  }
];