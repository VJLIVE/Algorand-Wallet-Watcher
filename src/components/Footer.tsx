import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">AW</div>
          <div className="text-sm">
            <div className="font-semibold text-gray-800">Algorand Wallet Watcher</div>
            <div className="text-xs text-gray-500">Non-custodial · Privacy-first</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/VJLIVE/Algorand-Wallet-Watcher"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            aria-label="View source on GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.96 3.22 9.16 7.69 10.64.56.1.77-.24.77-.54 0-.27-.01-1-.02-1.96-3.13.68-3.79-1.51-3.79-1.51-.51-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.71 2.6 1.22 3.24.93.1-.72.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.54 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.4.11-2.91 0 0 .95-.3 3.11 1.15a10.8 10.8 0 0 1 2.83-.38c.96 0 1.93.13 2.83.38 2.16-1.45 3.11-1.15 3.11-1.15.61 1.51.23 2.63.11 2.91.72.78 1.16 1.78 1.16 3 0 4.3-2.64 5.25-5.16 5.53.4.35.75 1.03.75 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.21.65.78.54C19.03 20.9 22.25 16.7 22.25 11.75 22.25 5.48 17.27.5 12 .5z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href="https://developer.algorand.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            aria-label="Algorand developer docs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 14.5h-2V11h2v5.5zm0-7.5h-2V7h2v2z" />
            </svg>
            <span className="hidden sm:inline">Docs</span>
          </a>

          <a
            href="mailto:hello@algorandwalletwatcher.example"
            className="text-gray-600 hover:text-gray-800 text-sm"
            aria-label="Contact via email"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-3 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Algorand Wallet Watcher — Built with ❤️
        </div>
      </div>
    </footer>
  );
};

export default Footer;
