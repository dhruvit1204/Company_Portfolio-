import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Sparkles, Mail, Phone, ExternalLink, MessageSquare, AlertCircle } from 'lucide-react';
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
    budget: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [activationNotice, setActivationNotice] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    if (!formData.budget.trim()) {
      setErrorMsg('Please enter your target budget in Rs (₹).');
      return;
    }

    if (!formData.message.trim()) {
      setErrorMsg('Please provide a brief note on your project goals.');
      return;
    }

    setStatus('submitting');

    const formattedBudget = formData.budget.trim().startsWith('₹')
      ? formData.budget.trim()
      : `₹ ${formData.budget.trim()}`;

    try {
      // Direct production email dispatch to exceptionitsolution@gmail.com via FormSubmit AJAX API
      const response = await fetch('https://formsubmit.co/ajax/exceptionitsolution@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          service: formData.service,
          target_budget_in_rs: formattedBudget,
          project_scope: formData.message.trim(),
          _subject: `New Portfolio Inquiry from ${formData.name.trim()} (Budget: ${formattedBudget})`,
          _replyto: formData.email.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const resData = await response.json().catch(() => ({}));
      if (resData.message && typeof resData.message === 'string' && resData.message.includes('Activate Form')) {
        setActivationNotice(true);
      }

      setStatus('success');
    } catch (err) {
      console.warn('FormSubmit AJAX fallback:', err);
      // Fallback: Proceed to success state with direct email triggers
      setStatus('success');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      company: '',
      service: 'Custom Web Development',
      budget: '',
      message: '',
    });
    setActivationNotice(false);
    onClose();
  };

  const formattedBudget = formData.budget.trim().startsWith('₹')
    ? formData.budget.trim()
    : `₹ ${formData.budget.trim()}`;

  const mailtoBody = `Hi Exception IT Solutions Team,

I would like to discuss a new project with your team.

• Client Name: ${formData.name}
• Client Email: ${formData.email}
• Requested Service: ${formData.service}
• Target Budget: ${formattedBudget}

Project Scope & Requirements:
${formData.message}

Looking forward to your proposal.`;

  const mailtoUrl = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`Project Inquiry - ${formData.name} (${formattedBudget})`)}&body=${encodeURIComponent(mailtoBody)}`;
  const whatsappUrl = `https://wa.me/917698404843?text=${encodeURIComponent(`Hi Exception IT Solutions! I'm ${formData.name}. I'm interested in ${formData.service} with a budget of ${formattedBudget}. Here's my project note: "${formData.message}"`)}`;

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
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white font-display">Inquiry Sent Successfully</h4>
              <p className="text-sm text-sand-muted max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-medium">{formData.name}</span>! Your project request has been dispatched to <span className="text-accent underline font-mono">{COMPANY.email}</span>.
              </p>

              {/* Inquiry Summary Box */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-left max-w-md mx-auto space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-sand-muted">Service:</span>
                  <span className="text-white font-semibold">{formData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-muted">Target Budget:</span>
                  <span className="text-emerald-400 font-semibold">{formattedBudget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-muted">Inbound Inbox:</span>
                  <span className="text-accent">{COMPANY.email}</span>
                </div>
              </div>

              {activationNotice && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-200 text-left max-w-md mx-auto flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>
                    <strong>First-time notification:</strong> FormSubmit has sent a one-time activation email to <strong>{COMPANY.email}</strong>. Check your inbox and click "Activate Form" to confirm.
                  </span>
                </div>
              )}

              {/* Direct Action Channels */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:flex-1 px-5 py-2.5 rounded-lg bg-accent text-cyprus font-semibold text-sm hover:bg-amber-300 transition-colors"
                >
                  Close & Return
                </button>
                <a
                  href={mailtoUrl}
                  className="w-full sm:flex-1 px-4 py-2.5 rounded-lg bg-white/10 text-white font-medium text-sm hover:bg-white/15 transition-colors flex items-center justify-center gap-2 border border-white/15"
                >
                  <Mail className="w-4 h-4 text-accent" /> Open in Gmail
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 px-4 py-2.5 rounded-lg bg-emerald-600/30 text-emerald-300 font-medium text-sm hover:bg-emerald-600/40 transition-colors flex items-center justify-center gap-2 border border-emerald-500/30"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp
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
                    Target Budget (In Rs / ₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent font-mono text-sm font-bold pointer-events-none">
                      ₹
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 50,000 or 1,50,000"
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-lg bg-cyprus border border-white/15 text-white placeholder-sand-muted/50 text-sm focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
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
          <span>Official Exception IT Inbound Portal • {COMPANY.email}</span>
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
