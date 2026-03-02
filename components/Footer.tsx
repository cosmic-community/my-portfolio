import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white font-bold text-sm">
                MP
              </span>
              <span className="text-lg font-bold">My Portfolio</span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed">
              Building modern web experiences with passion and precision.
              Always learning, always creating.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-dark-400 mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-dark-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-dark-300 hover:text-white transition-colors text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-dark-300 hover:text-white transition-colors text-sm">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-dark-300 hover:text-white transition-colors text-sm">
                  Experience
                </Link>
              </li>
            </ul>
          </div>

          {/* Built With */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-dark-400 mb-4">
              Built With
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors text-sm"
                >
                  Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors text-sm"
                >
                  Cosmic
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-white transition-colors text-sm"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-800">
          <p className="text-center text-dark-500 text-sm">
            © {currentYear} My Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}