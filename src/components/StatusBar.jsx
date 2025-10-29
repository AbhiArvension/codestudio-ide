const StatusBar = ({ language, lines, cursorPosition }) => {
  return (
    <div className="bg-[#007acc] border-t border-[#005a9e] px-4 py-2 flex items-center justify-between text-white text-xs">
      <div className="flex items-center gap-6">
        {/* Language */}
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
          </svg>
          <span className="font-semibold capitalize">{language}</span>
        </div>

        {/* Line Count */}
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="4" y1="12" x2="20" y2="12"/>
            <line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
          <span>{lines} lines</span>
        </div>

        {/* Cursor Position */}
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M2 12h20"/>
          </svg>
          <span>Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* UTF-8 */}
        <span className="opacity-75">UTF-8</span>

        {/* Spaces */}
        <span className="opacity-75">Spaces: 2</span>

        {/* Status */}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
