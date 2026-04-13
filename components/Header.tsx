'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, Command, Cpu, Brain, Shield, Code, Settings, 
  Github, Building, TrendingUp, Briefcase, FileText, FlaskConical, Film, 
  Tv, PlaySquare, Book, Music, Trophy, Flag, Globe, BookOpen 
} from 'lucide-react';

const iconClass = "w-4 h-4";

const categoryGroups = [
  {
    label: 'Tech',
    categories: [
      { id: 'ai', label: 'AI & ML', icon: <Cpu className={iconClass} /> },
      { id: 'llm', label: 'LLMs & GenAI', icon: <Brain className={iconClass} /> },
      { id: 'cyber', label: 'Cybersecurity', icon: <Shield className={iconClass} /> },
      { id: 'webdev', label: 'Web Dev', icon: <Code className={iconClass} /> },
      { id: 'devops', label: 'DevOps', icon: <Settings className={iconClass} /> },
      { id: 'repos', label: 'GitHub Repos', icon: <Github className={iconClass} /> },
    ],
  },
  {
    label: 'Business',
    categories: [
      { id: 'companies', label: 'Companies', icon: <Building className={iconClass} /> },
      { id: 'business', label: 'Markets', icon: <TrendingUp className={iconClass} /> },
      { id: 'jobs', label: 'Jobs', icon: <Briefcase className={iconClass} /> },
    ],
  },
  {
    label: 'Research',
    categories: [
      { id: 'research', label: 'Papers', icon: <FileText className={iconClass} /> },
      { id: 'science', label: 'Science', icon: <FlaskConical className={iconClass} /> },
    ],
  },
  {
    label: 'Entertainment',
    categories: [
      { id: 'movies', label: 'Movies', icon: <Film className={iconClass} /> },
      { id: 'series', label: 'TV Series', icon: <Tv className={iconClass} /> },
      { id: 'anime', label: 'Anime', icon: <PlaySquare className={iconClass} /> },
      { id: 'comics', label: 'Comics', icon: <Book className={iconClass} /> },
      { id: 'music', label: 'Music', icon: <Music className={iconClass} /> },
    ],
  },
  {
    label: 'Sports',
    categories: [
      { id: 'sports', label: 'Sports', icon: <Trophy className={iconClass} /> },
      { id: 'racing', label: 'Racing', icon: <Flag className={iconClass} /> },
    ],
  },
  {
    label: 'India',
    categories: [
      { id: 'general', label: 'World', icon: <Globe className={iconClass} /> },
      { id: 'upsc', label: 'UPSC', icon: <BookOpen className={iconClass} /> },
    ],
  },
];

// Flat list for easy access
const allCategories = categoryGroups.flatMap(g => g.categories);

interface HeaderProps {
  currentCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Header({ currentCategory, onCategoryChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mega menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDesktopMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const currentCat = allCategories.find(c => c.id === currentCategory);

  return (
    <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-xl border-b border-border-default shadow-nav">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <div className="flex items-center space-x-3 shrink-0 cursor-pointer group">
            <div className="w-9 h-9 bg-text-primary rounded-lg flex items-center justify-center shadow-sm group-hover:bg-accent transition-colors duration-400">
              <span className="font-display font-bold text-primary text-xl leading-none translate-y-[1px]">Ae</span>
            </div>
            <h1 className="text-2xl font-display text-text-primary tracking-tighter">
              Aetheris.
            </h1>
          </div>

          {/* Desktop Navigation - Mega Menu Toggle */}
          <div ref={menuRef} className="hidden md:flex items-center flex-1 justify-end">
            <button
              onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
              className="flex items-center px-4 py-2 rounded-xl bg-surface hover:bg-border-default transition-all duration-200 border border-border-default shadow-sm"
            >
              <span className="text-sm font-semibold text-text-primary mr-2">
                {currentCat?.label || 'Explore Topics'}
              </span>
              <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-300 ${desktopMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Mega Menu */}
            {desktopMenuOpen && (
              <div className="absolute top-16 right-0 w-[600px] bg-secondary border border-border-default shadow-2xl rounded-2xl p-6 grid grid-cols-3 gap-6 animate-fade-in origin-top">
                {categoryGroups.map((group) => (
                  <div key={group.label} className="space-y-3">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider px-2">
                      {group.label}
                    </h3>
                    <div className="flex flex-col space-y-1">
                      {group.categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onCategoryChange(cat.id);
                            setDesktopMenuOpen(false);
                          }}
                          className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                            currentCategory === cat.id
                              ? 'bg-gradient-to-r from-accent/10 to-transparent text-accent'
                              : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                          }`}
                        >
                          <span className={`${currentCategory === cat.id ? 'text-accent' : 'text-text-muted group-hover:text-text-primary'} mr-3 transition-colors duration-200`}>
                            {cat.icon}
                          </span>
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: Current Category + Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {currentCat && (
              <span className="flex items-center text-xs font-medium text-accent bg-accent-light px-2.5 py-1 rounded-lg gap-1.5">
                {currentCat.icon} {currentCat.label}
              </span>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-surface transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-text-secondary" />
              ) : (
                <Menu className="w-5 h-5 text-text-secondary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Grouped */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 animate-slide-down max-h-[70vh] overflow-y-auto">
            {categoryGroups.map((group) => (
              <div key={group.label} className="mb-3">
                <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest px-3 mb-1">
                  {group.label}
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {group.categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onCategoryChange(cat.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                        currentCategory === cat.id
                          ? 'bg-accent text-white shadow-sm'
                          : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                      }`}
                    >
                      <span className="mr-1.5">{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
