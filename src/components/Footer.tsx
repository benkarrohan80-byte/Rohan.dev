import { Terminal, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const rohanEmail = 'rohantraders8421@gmail.com';
  const whatsappUrl = 'https://wa.me/918317246684?text=Hi%20Rohan!%20I%20would%20like%20to%20hire%20you%20to%20build%20a%20modern%20website%20for%20my%20business.';

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Column 1: Brand/Logo (Col 1-5) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight group" id="footer-logo-link">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-400 flex items-center justify-center text-white font-bold text-base shadow-md shadow-indigo-500/20 transition-all duration-300 group-hover:scale-105">
                {/* Sleek rotating glowing outline border on hover */}
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10 animate-spin-slow" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-5.5 h-5.5 group-hover:rotate-12 transition-transform duration-300" fill="none">
                  <path d="M38 28 V72 M38 28 H54 C62 28 68 33 68 41 C68 49 62 54 54 54 H38 M50 54 L66 70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M25 40 L19 50 L25 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M75 40 L81 50 L75 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span>
                Rohan<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">.dev</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Premium freelance web developer crafting fast, highly converting, responsive and SEO-optimized business websites on budget and on schedule.
            </p>
          </div>

          {/* Column 2: Quick Links (Col 6-8) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="hover:text-indigo-400 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-indigo-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-indigo-400 transition-colors">
                  My Live Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-indigo-400 transition-colors">
                  Competences
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-indigo-400 transition-colors">
                  Our Process Timeline
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Status (Col 9-12) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Direct Channels</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-indigo-400 flex-shrink-0" />
                <a href={`mailto:${rohanEmail}`} className="hover:text-indigo-400 transition-colors break-all">
                  {rohanEmail}
                </a>
              </li>
              <li className="space-y-1.5">
                <div className="flex items-center gap-2.5 text-slate-300 font-medium">
                  <Phone size={16} className="text-indigo-400 flex-shrink-0" />
                  <span>+91 83172 46684</span>
                </div>
                <div className="flex gap-3 pl-6 text-xs text-slate-500">
                  <a href="tel:+918317246684" className="hover:text-indigo-400 transition-colors">
                    Call Directly
                  </a>
                  <span>|</span>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                    WhatsApp Message
                  </a>
                </div>
              </li>
              <li className="pt-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-300">Open for New Business Inquiries</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar copyright & standard credit */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {currentYear} Rohan.dev. All Rights Reserved.</p>
          </div>
          <p className="flex items-center gap-1">
            <span>Designed & built to attract elite client leads. Hosted securely on GitHub Pages.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
