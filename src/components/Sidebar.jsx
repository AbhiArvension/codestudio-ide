const Sidebar = ({ language, code }) => {
  // Calculate code statistics
  const lines = code.split('\n').length;
  const characters = code.length;
  const words = code.trim().split(/\s+/).filter(w => w.length > 0).length;

  const languageInfo = {
    javascript: {
      color: 'from-yellow-400 to-yellow-600',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="2"/>
          <path d="M16 16.5c0 1.5-1.5 2-3 2s-3-.5-3-2"/>
          <path d="M8 12h8"/>
        </svg>
      ),
    },
    python: {
      color: 'from-blue-400 to-blue-600',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M8 8h8v8H8z"/>
        </svg>
      ),
    },
  };

  const currentLang = languageInfo[language];

  return (
    <div className="bg-[#252526] border-r border-[#3e3e3e] w-64 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-[#3e3e3e]">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          File Explorer
        </h2>
      </div>

      {/* Current File Info */}
      <div className="p-4 space-y-4">
        {/* Language Badge */}
        <div className="bg-[#1e1e1e] rounded-lg p-3 border border-[#3e3e3e]">
          <div className="flex items-center gap-2 mb-2">
            <div className={`bg-gradient-to-r ${currentLang.color} p-1.5 rounded`}>
              {currentLang.icon}
            </div>
            <div>
              <p className="text-xs text-gray-400">Language</p>
              <p className="text-sm font-semibold text-white capitalize">{language}</p>
            </div>
          </div>
        </div>

        {/* Code Statistics */}
        <div className="bg-[#1e1e1e] rounded-lg p-3 border border-[#3e3e3e] space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Statistics
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Lines</span>
              <span className="text-sm font-semibold text-blue-400">{lines}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Words</span>
              <span className="text-sm font-semibold text-purple-400">{words}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Characters</span>
              <span className="text-sm font-semibold text-green-400">{characters}</span>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-[#1e1e1e] rounded-lg p-3 border border-[#3e3e3e]">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Features
          </h3>
          <div className="space-y-2">
            {[
              { icon: '📝', text: 'Syntax Highlighting' },
              { icon: '📁', text: 'Code Folding' },
              { icon: '🎨', text: 'Dark Theme' },
              { icon: '⚡', text: 'Auto Complete' },
              { icon: '🔍', text: 'Search & Replace' },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                <span>{feature.icon}</span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg p-3 border border-blue-500/30">
          <div className="flex items-start gap-2">
            <span className="text-lg">💡</span>
            <div>
              <h3 className="text-xs font-semibold text-blue-400 mb-1">Tip</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Click the arrows in the editor gutter to fold/unfold code sections!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
