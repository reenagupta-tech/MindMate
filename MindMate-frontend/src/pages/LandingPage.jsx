import React, { useState, useEffect } from 'react';
import {
  Brain,
  BookOpen,
  BarChart3,
  MessageCircle,
  Shield,
  Heart,
  TrendingUp,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.observe-fade').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: 'Smart Journaling',
      description:
        'AI-powered insights help you understand your emotional patterns and track your mental wellness journey.',
      color: 'bg-blue-500',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description:
        'Visualize your progress with detailed charts and personalized reports to monitor your mental health trends.',
      color: 'bg-green-500',
    },
    {
      icon: MessageCircle,
      title: 'Context-Aware AI Support',
      description:
        'Personalized mental wellness guidance powered by your journal insights.',
      color: 'bg-purple-500',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description:
        'Your data is encrypted and secure. We prioritize your privacy with industry-leading security measures.',
      color: 'bg-orange-500',
    },
  ];

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MindMate
              </span>
            </div>

           

            <div className="hidden md:flex space-x-4">
                <Link to ="/login">
              <button className="px-4 py-2 text-sm font-medium hover:text-purple-400 transition-colors">
                Sign In
              </button>
              </Link>
              <Link to ="/signup">
              <button className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
                Get Started
              </button>
              </Link>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" onClick={handleNavClick} className="block px-3 py-2 hover:text-purple-400 transition-colors">Features</a>
              <a href="#about" onClick={handleNavClick} className="block px-3 py-2 hover:text-purple-400 transition-colors">About</a>
              <a href="#testimonials" onClick={handleNavClick} className="block px-3 py-2 hover:text-purple-400 transition-colors">Testimonials</a>
              <a href="#pricing" onClick={handleNavClick} className="block px-3 py-2 hover:text-purple-400 transition-colors">Pricing</a>
              <div className="pt-4 pb-2 border-t border-slate-700/50">
              <Link to ="/login">
                <button className="block w-full text-left px-3 py-2 hover:text-purple-400 transition-colors">Sign In</button>
                </Link>
                <Link to ="/signup">
                <button className="block w-full text-left px-3 py-2 mt-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all">
                  Get Started
                </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-12  px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Your AI-Powered
            <br />
            Mental Wellness
            <br />
            Companion
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Transform your mental health journey with intelligent journaling, personalized insights, 
            and 24/7 AI support designed to help you thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Your Journey
              <ArrowRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Powerful Features for Your Wellness
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Everything you need to understand, track, and improve your mental health journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              id={`feature-${index}`}
              className={`observe-fade group p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 ${
                isVisible[`feature-${index}`] ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

       <section id="preview" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Your Personal Wellness Dashboard
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Get a comprehensive view of your mental health journey with intuitive analytics and insights
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 overflow-hidden">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <BookOpen className="h-8 w-8 text-blue-400" />
                    <span className="text-2xl font-bold text-white">15</span>
                  </div>
                  <p className="text-slate-300">Journal Entries</p>
                  <p className="text-sm text-emerald-400">↗ Keep it up!</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <Heart className="h-8 w-8 text-purple-400" />
                    <span className="text-2xl font-bold text-white">7 days</span>
                  </div>
                  <p className="text-slate-300">Current Streak</p>
                  <p className="text-sm text-emerald-400">↗ Amazing!</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="h-8 w-8 text-emerald-400" />
                    <span className="text-2xl font-bold text-white">HAPPY</span>
                  </div>
                  <p className="text-slate-300">Mood Score</p>
                  <p className="text-sm text-emerald-400">↗ Trending up</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-400/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">New Entry</h3>
                      <p className="text-sm text-slate-300">Write in your journal</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Chat with AI</h3>
                      <p className="text-sm text-slate-300">Get support and insights</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl p-6 border border-emerald-400/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">View Analytics</h3>
                      <p className="text-sm text-slate-300">Track your progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl p-12 border border-purple-400/30">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Transform Your Mental Health?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already started their journey to better mental wellness with MindMate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to ="/signup">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started Free
                <ArrowRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>
             
            </div>
          </div>
        </div>
      </section>

     
      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-700/50 bg-slate-900">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
    
    {/* Left Section */}
    <div className="text-center md:text-left">
      <h1 className="text-2xl font-bold text-white">MindMate</h1>
      <p className="text-slate-400 mt-2">
        A product by{" "}
        <a
          href="https://www.linkedin.com/in/avneetkaur025"
          className="text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Avneet Kaur
        </a>
      </p>
      <div className="flex justify-center md:justify-start space-x-4 text-xl text-blue-400 mt-3">
        <a
          href="https://www.linkedin.com/in/avneetkaur025"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/AvneetX25"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
      </div>
    </div>

    {/* Right Section */}
    <div className="text-center md:text-right max-w-md">
      <h2 className="text-white font-semibold text-lg">
        Built with care for your peace of mind.
      </h2>
      <p className="mt-2 text-sm text-gray-400">
        Your intelligent mental health companion — track your moods, reflect, and grow with AI-powered insights.
      </p>
      <p className="mt-1 text-sm text-gray-400">© 2025 MindMate. All rights reserved.</p>
    </div>
    
  </div>
</footer>
    </div>
  );
};

export default LandingPage;
