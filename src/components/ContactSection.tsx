import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, MessageSquare, Building, Download, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Full-time Mainframe / Software Role',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const copyContact = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const getMailtoHref = () => {
    const sub = encodeURIComponent(formData.subject || `Inquiry: ${formData.inquiryType} - from ${formData.name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Hello Chaitanya,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nInquiry Type: ${formData.inquiryType}\n\nMessage:\n${formData.message}\n`
    );
    return `mailto:mulagalachaitanya@gmail.com?subject=${sub}&body=${body}`;
  };

  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Chaitanya;Mulagala;;;
FN:Mulagala Chaitanya
ORG:Capgemini India
TITLE:Mainframe Developer
TEL;TYPE=CELL:+917989520785
EMAIL;TYPE=INTERNET:mulagalachaitanya@gmail.com
ADR;TYPE=HOME:;;Nellore;Andhra Pradesh;;India
NOTE:Mainframe Developer (COBOL, JCL, DB2, VSAM) & Software Engineer
END:VCARD`;

    const element = document.createElement('a');
    const file = new Blob([vCardData], { type: 'text/vcard' });
    element.href = URL.createObjectURL(file);
    element.download = 'Mulagala_Chaitanya.vcf';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-white/80 border-t border-slate-200/60 overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(#2563eb_0.75px,transparent_0.75px)] [background-size:26px_26px] opacity-[0.07]" />
        <div className="absolute -top-32 right-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Let's Connect & Collaborate
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Available for enterprise mainframe development opportunities, software engineering roles, and technical inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Profile Summary Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-7 shadow-2xs space-y-5">
              <div className="flex items-center gap-4">
                <img
                  src={personalInfo.photo}
                  alt="Mulagala Chaitanya"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-600/20 shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{personalInfo.name}</h3>
                  <p className="text-xs text-blue-600 font-semibold">{personalInfo.currentRole}</p>
                  <p className="text-xs text-slate-500">Client: {personalInfo.currentClient}</p>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Active for Direct Communication & Career Inquiries</span>
              </div>

              {/* Direct Info List */}
              <div className="space-y-3 text-xs sm:text-sm">
                {/* Email Card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-2xs transition-colors hover:border-blue-300"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-[11px] text-slate-400 font-mono">Email Address</div>
                      <a
                        href={personalInfo.socials.email}
                        className="font-semibold text-slate-900 hover:text-blue-600 transition truncate block"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyContact(personalInfo.email, 'email')}
                    className="p-2 text-slate-400 hover:text-blue-600 transition rounded-lg hover:bg-slate-50 shrink-0 cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </motion.button>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-2xs transition-colors hover:border-emerald-300"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-[11px] text-slate-400 font-mono">Phone / WhatsApp</div>
                      <a
                        href={personalInfo.socials.phone}
                        className="font-semibold text-slate-900 hover:text-emerald-600 transition font-mono truncate block"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyContact(personalInfo.phone, 'phone')}
                    className="p-2 text-slate-400 hover:text-emerald-600 transition rounded-lg hover:bg-slate-50 shrink-0 cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </motion.button>
                </motion.div>

                {/* Location Card */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">Location</div>
                    <div className="font-semibold text-slate-900">{personalInfo.location}</div>
                  </div>
                </div>
              </div>

              {/* Download vCard CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadVCard}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs transition border border-slate-200 shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span>Save Contact to Phone (vCard .vcf)</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-3xl p-7 sm:p-9 shadow-2xs relative"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Send a Direct Message
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">Response within 24h</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone / Mobile (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 transition"
                    >
                      <option value="Full-time Mainframe / Software Role">Full-time Mainframe / Software Role</option>
                      <option value="Contract / Consulting Opportunity">Contract / Consulting Opportunity</option>
                      <option value="Technical Collaboration">Technical Collaboration</option>
                      <option value="General Inquiries & Networking">General Inquiries & Networking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="e.g. Mainframe Developer Role / Project Discussion"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Message Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Describe your requirements, role specifications, or project details..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message Now</span>
                      </>
                    )}
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={getMailtoHref()}
                    className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm transition border border-slate-200 shadow-2xs flex items-center justify-center gap-1.5"
                    title="Send via default mail app"
                  >
                    <span>Open in Mail Client</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your message regarding <strong className="text-blue-600">"{formData.subject}"</strong> has been captured. I will get back to you promptly at <span className="font-mono text-blue-600">{formData.email}</span>.
                </p>

                <div className="pt-4 flex justify-center gap-3">
                  <a
                    href={getMailtoHref()}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Also send via Gmail / Outlook
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        inquiryType: 'Full-time Mainframe / Software Role',
                        subject: '',
                        message: ''
                      });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
