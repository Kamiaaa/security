import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="relative text-gray-200 py-16 px-5 md:px-20 mt-auto">
      {/* Background with dark overlay */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-blue-950/95 via-blue-900/90 to-blue-950/85"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"></div>
        
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* Company Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-900/40 rounded-lg blur-sm backdrop-blur-sm"></div>
              <div className="flex items-center space-x-3 relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-800/30 rounded-full blur-sm"></div>
                  <img 
                    src="/img/logo.png" 
                    alt="A1 Communications Logo"
                    className="h-14 w-auto rounded-lg relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl drop-shadow-md backdrop-blur-sm bg-black/20 rounded-xl p-4 font-poppins">
            A premier communications and CRM solutions provider dedicated to helping businesses grow through 
            innovative sales engines, AI voice assistants, and comprehensive customer relationship management 
            platforms. We empower organizations with cutting-edge technology for superior customer engagement.
          </p>

          {/* Newsletter Subscription */}
          <div className="pt-2">
            <h3 className="text-gray-100 text-lg font-semibold mb-4 flex items-center drop-shadow font-poppins">
              Stay Updated with Latest Features
              <span className="ml-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            </h3>
            <div className="flex max-w-md bg-blue-950/80 backdrop-blur-sm rounded-xl p-1 border border-blue-800/60 shadow-xl">
              <input
                type="email"
                placeholder="Enter your email for updates"
                className="px-4 py-3 w-full bg-blue-950/70 backdrop-blur-sm rounded-l-lg focus:outline-none text-gray-200 placeholder-gray-300 focus:ring-2 focus:ring-blue-500/50 border-none font-poppins"
              />
              <button className="bg-linear-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 font-poppins">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links - Top 4 */}
        <div className="space-y-6">
          <h3 className="text-gray-100 text-xl font-bold mb-2 relative inline-block drop-shadow font-poppins">
            Quick Links
            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-linear-to-r from-blue-400 to-transparent"></span>
          </h3>
          <ul className="space-y-3">
            {[
              { href: "/", label: "Home", key: "home" },
              { href: "/about", label: "About", key: "about" },
              { href: "/pricing", label: "Pricing", key: "pricing" },
              { href: "/contact", label: "Contact", key: "contact" },
            ].map((item) => (
              <li key={item.key}>
                <Link href={item.href}>
                  <span className="group text-gray-200 hover:text-white transition-all duration-300 flex items-center py-2 backdrop-blur-sm hover:bg-black/20 rounded-lg px-3 -mx-3">
                    <FaArrowRight className="w-3 h-3 text-blue-400 mr-3 transform group-hover:translate-x-1 transition-transform" />
                    <span className="relative font-poppins">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Links - Top 4 */}
        <div className="space-y-6">
          <h3 className="text-gray-100 text-xl font-bold mb-2 relative inline-block drop-shadow font-poppins">
            Our Services
            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-linear-to-r from-blue-400 to-transparent"></span>
          </h3>
          <ul className="space-y-3">
            {[
              { href: "/services#sales-engine", label: "Sales Engine", key: "sales-engine" },
              { href: "/services#ai-voice", label: "AI Voice Assistant", key: "ai-voice" },
              { href: "/services#crm", label: "All-in-one CRM", key: "crm" },
              { href: "/services#marketing", label: "Marketing Automation", key: "marketing" },
            ].map((item) => (
              <li key={item.key}>
                <Link href={item.href}>
                  <span className="group text-gray-200 hover:text-white transition-all duration-300 flex items-center py-2 backdrop-blur-sm hover:bg-black/20 rounded-lg px-3 -mx-3">
                    <FaArrowRight className="w-3 h-3 text-blue-400 mr-3 transform group-hover:translate-x-1 transition-transform" />
                    <span className="relative text-sm font-poppins">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info - Moved beside Services */}
        <div className="space-y-6">
          <h3 className="text-gray-100 text-xl font-bold mb-2 relative inline-block drop-shadow font-poppins">
            Contact Us
            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-linear-to-r from-blue-400 to-transparent"></span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 group cursor-pointer backdrop-blur-sm hover:bg-black/20 rounded-xl p-3 -m-3 transition-all duration-300">
              <div className="p-3 bg-blue-950/80 backdrop-blur-sm rounded-xl group-hover:bg-blue-800/40 transition-all duration-300 border border-blue-800/50 group-hover:border-blue-600/40 min-w-12">
                <FaMapMarkerAlt className="text-blue-300 text-lg" />
              </div>
              <div className="text-gray-200 leading-relaxed">
                <a href='https://maps.app.goo.gl/' target='_blank' rel="noopener noreferrer" className="group/link">
                  <p className="group-hover/link:text-blue-300 transition-colors drop-shadow font-poppins">123 Business Avenue, Tech Park</p>
                </a>
                <a href='https://maps.app.goo.gl/' target='_blank' rel="noopener noreferrer" className="group/link mt-2 block">
                  <p className="group-hover/link:text-blue-300 transition-colors drop-shadow text-sm font-poppins">City, State - 123456</p>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer backdrop-blur-sm hover:bg-black/20 rounded-xl p-3 -m-3 transition-all duration-300">
              <div className="p-3 bg-blue-950/80 backdrop-blur-sm rounded-xl group-hover:bg-blue-800/40 transition-all duration-300 border border-blue-800/50 group-hover:border-blue-600/40 min-w-12">
                <FaPhoneAlt className="text-blue-300 text-lg" />
              </div>
              <div>
                <p className="text-gray-200 group-hover:text-blue-300 transition-colors drop-shadow font-poppins">(555) 123-4567</p>
                <p className="text-blue-300 text-sm drop-shadow font-poppins">Business Hours: 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer backdrop-blur-sm hover:bg-black/20 rounded-xl p-3 -m-3 transition-all duration-300">
              <div className="p-3 bg-blue-950/80 backdrop-blur-sm rounded-xl group-hover:bg-blue-800/40 transition-all duration-300 border border-blue-800/50 group-hover:border-blue-600/40 min-w-12">
                <FaEnvelope className="text-blue-300 text-lg" />
              </div>
              <div>
                <p className="text-gray-200 group-hover:text-blue-300 transition-colors drop-shadow font-poppins">info@a1communications.com</p>
                <p className="text-blue-300 text-sm drop-shadow font-poppins">sales@a1communications.com</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="pt-4">
            <h3 className="text-gray-100 text-lg font-semibold mb-4 drop-shadow font-poppins">Connect With Us</h3>
            <div className="flex space-x-3">
              {[
                { 
                  icon: <FaFacebookF size={16} />, 
                  href: "#",
                  color: "hover:bg-blue-800/80",
                  key: "facebook"
                },
                { 
                  icon: <FaTwitter size={16} />, 
                  href: "#",
                  color: "hover:bg-blue-600/80",
                  key: "twitter"
                },
                { 
                  icon: <FaInstagram size={16} />, 
                  href: "#",
                  color: "hover:bg-blue-700/80",
                  key: "instagram"
                },
                { 
                  icon: <FaLinkedinIn size={16} />, 
                  href: "#",
                  color: "hover:bg-blue-800/80",
                  key: "linkedin"
                },
              ].map((social) => (
                <Link key={social.key} href={social.href} target="_blank" rel="noopener noreferrer">
                  <span className={`bg-blue-950/80 backdrop-blur-sm ${social.color} w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-blue-800/50 hover:border-transparent shadow-lg hover:shadow-xl`}>
                    {social.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 border-t border-blue-800/60 mt-12 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left backdrop-blur-sm bg-black/20 rounded-xl p-4 md:p-2">
            <p className="text-gray-200 text-sm drop-shadow font-poppins">
              &copy; {new Date().getFullYear()} AI Cloud Agent. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 backdrop-blur-sm bg-black/20 rounded-xl p-4 md:p-2">
            {[
              { href: "/privacy", label: "Privacy Policy", key: "privacy" },
              { href: "/terms", label: "Terms of Service", key: "terms" },
              { href: "/refund-policy", label: "Refund Policy", key: "refund" },
              { href: "/sitemap", label: "Sitemap", key: "sitemap" },
            ].map((item) => (
              <Link key={item.key} href={item.href} className="text-blue-300 hover:text-blue-200 transition-colors text-sm font-medium relative group drop-shadow font-poppins">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;