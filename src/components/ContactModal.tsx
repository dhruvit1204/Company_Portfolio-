import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Sparkles, Mail, Phone, ExternalLink } from 'lucide-react';
import { COMPANY } from '../data/company';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ContactModal: React.FC<Props> = ({ isOpen, onClose, preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: preselectedService || 'Custom Web Development',
    budget: '$5k - $15k',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }

    if (!formData.message.trim()) {
      setErrorMsg('Please provide a brief note on your project goals.');
      return;
    }

    setStatus('submitting');
    // Simulated smooth network request
    setTimeout(() => {
      setStatus('success');
    }, 900);
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      company: '',
      service: 'Custom Web Development',
      budget: '$5k - $15k',
      message: '',
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl bg-cyprus-deep text-sand rounded-2xl border border-white/10 shadow-2xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Accent Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 id="contact-modal-title" className="text-lg font-bold font-display text-white">
                Start Your Project
              </h3>
              <p className="text-xs text-sand-muted">Exception IT Solutions Engineering Consultation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-sand-muted hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white font-display">Inquiry Received</h4>
              <p className="text-sm text-sand-muted max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-medium">{formData.name}</span>! Our engineering team has received your project briefing and will follow up at <span className="text-accent underline">{formData.email}</span> within 24 business hours.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-accent text-cyprus font-semibold text-sm hover:bg-amber-300 transition-colors"
                >
                  Close & Return
                </button>
                <a
                  href={`mailto:${COMPANY.email}?subject=Project%20Inquiry%20from%20Portfolio&body=Hi%20Exception%20IT%20team,%0A%0AProject:%20${encodeURIComponent(formData.service)}%0ABudget:%20${encodeURIComponent(formData.budget)}%0A%0A${encodeURIComponent(formData.message)}`}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white/10 text-white font-medium text-sm hover:bg-white/15 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Send Direct Email
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {errorMsg && (
                <div className="p-3 text-xs bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-sand-muted uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-cyprus border border-white/15 text-white placeholder-sand-muted/50 text-sm focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-sand-muted uppercase tracking-wider mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-cyprus border border-white/15 text-white placeholder-sand-muted/50 text-sm focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-sand-muted uppercase tracking-wider mb-1.5">
                    Capability / Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-cyprus border border-white/15 text-white text-sm focus:border-accent focus:outline-none transition-colors"
                  >
                    <option value="Custom Web Development">Custom Web Development</option>
                    <option value="AI / ML Solutions">AI / ML Solutions</option>
                    <option value="Cloud & Deployment">Cloud & Deployment</option>
                    <option value="Cybersecurity Solutions">Cybersecurity Solutions</option>
                    <option value="Interactive Experience Design">Interactive Experience Design</option>
                    <option value="Performance & SEO Strategy">Performance & SEO Strategy</option>
                    <option value="Enterprise Architecture">Enterprise Architecture</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-sand-muted uppercase tracking-wider mb-1.5">
                    Target Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-cyprus border border-white/15 text-white text-sm focus:border-accent focus:outline-none transition-colors"
                  >
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                    <option value="$15,000 - $35,000">$15,000 - $35,000</option>
                    <option value="$35,000+">$35,000+ (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-sand-muted uppercase tracking-wider mb-1.5">
                  Project Scope & Goals *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline your timeline, current architecture, or key challenges you're solving..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-cyprus border border-white/15 text-white placeholder-sand-muted/50 text-sm focus:border-accent focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-sand-muted flex flex-wrap items-center gap-1.5">
                  <span>Direct Line:</span>
                  <a href={`tel:${COMPANY.phones[0].raw}`} className="text-sand font-mono hover:text-accent">
                    {COMPANY.phones[0].display}
                  </a>
                  <span className="text-white/20">/</span>
                  <a href={`tel:${COMPANY.phones[1].raw}`} className="text-sand font-mono hover:text-accent">
                    {COMPANY.phones[1].display}
                  </a>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-white/15 text-sand-muted hover:text-white text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-sand text-cyprus font-semibold text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Request
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="p-4 bg-cyprus/90 border-t border-white/10 flex items-center justify-between text-xs text-sand-muted">
          <span>Official Exception IT Inbound Portal</span>
          <a
            href={COMPANY.mainWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-accent hover:underline"
          >
            Visit Main Site <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
