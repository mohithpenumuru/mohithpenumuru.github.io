import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 flex items-center gap-1.5">
          &copy; {new Date().getFullYear()} Mohith Penumuru. Crafted with
          <Heart size={12} className="text-accent" />
        </p>

        <div className="flex items-center gap-5">
          {[
            { icon: Linkedin, href: 'https://www.linkedin.com/in/mohith-penumuru-3b9793205/', label: 'LinkedIn' },
            { icon: Github, href: 'https://github.com/mohithpenumuru', label: 'GitHub' },
            { icon: Mail, href: 'mailto:mohithpenumuru1@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="text-gray-600 hover:text-accent transition-colors duration-300"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
