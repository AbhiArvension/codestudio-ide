const Header = ({ language, onLanguageChange, onDownload, filename }) => {
  return (
    <div className="bg-gradient-to-r from-[#1e1e1e] to-[#252526] border-b border-[#3e3e3e] shadow-lg">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Section - Logo & Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {/* Code Icon */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                CodeStudio
              </h1>
              <p className="text-xs text-gray-400">Professional IDE</p>
            </div>
          </div>

          {/* File Name Display */}
          <div className="ml-4 pl-4 border-l border-gray-700">
            <div className="flex items-center gap-2 bg-[#2d2d2d] px-3 py-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
              </svg>
              <span className="text-sm font-medium text-gray-300">{filename}</span>
            </div>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-3 bg-[#2d2d2d] px-4 py-2.5 rounded-lg border border-[#3e3e3e] hover:border-[#007acc] transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <select
              id="language-select"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="javascript" className="bg-[#2d2d2d]">JavaScript</option>
              <option value="python" className="bg-[#2d2d2d]">Python</option>
            </select>
          </div>

          {/* Download Button */}
          <button
            onClick={onDownload}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
