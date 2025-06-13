import { useState, useRef } from 'react';

export default function App() {
  const [file, setFile] = useState(null);
  const [edition, setEdition] = useState('bedrock');
  const [version, setVersion] = useState('1.21.60');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileClick = () => {
    if (edition === 'java') return;
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (edition === 'java') return;
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (uploadedFile) => {
    if (!uploadedFile.name.endsWith('.zip')) {
      alert('Please upload a .zip file.');
      return;
    }

    setFile(uploadedFile);
    setProcessing(true);
    simulateProcessing();
  };

  const simulateProcessing = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const bedrockVersions = [
    '1.21.60',
    '1.21.50',
    '1.21.0',
    '1.20.60',
    '1.20.1',
    '1.19',
    '1.18',
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Conditional classes for light/dark mode
  const bgColorClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColorClass = darkMode ? 'text-gray-200' : 'text-gray-800';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-300';
  const inputBgClass = darkMode ? 'bg-gray-700' : 'bg-white';
  const footerBgClass = darkMode ? 'bg-gray-800' : 'bg-white';

  return (
    <div className={`min-h-screen flex flex-col ${bgColorClass} ${textColorClass} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${cardBgClass} shadow-sm`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-green-600">Minecraft Mapper</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-green-600">Home</a>
              <a href="#" className="text-gray-600 hover:text-green-600">About</a>
            </nav>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-12 relative">
        {/* Edition Selector - Outside of the overlay */}
        <section className="mb-8 z-30 relative">
          <div className="flex justify-center">
            <div className="inline-flex rounded-md shadow-sm bg-gray-100 dark:bg-gray-800 p-1">
              <button
                type="button"
                onClick={() => setEdition('bedrock')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md focus:outline-none ${
                  edition === 'bedrock'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Bedrock Edition
              </button>
              <button
                type="button"
                onClick={() => setEdition('java')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md focus:outline-none ${
                  edition === 'java'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Java Edition
              </button>
            </div>
          </div>
        </section>

        {/* Upload + Map Sections */}
        <section className="relative z-10">
          {/* Upload Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Upload Your World</h2>
            <div
              onClick={handleFileClick}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                edition === 'java'
                  ? 'opacity-50'
                  : `${borderClass} hover:border-green-500`
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".zip"
                className="hidden"
              />
              {file ? (
                <p className={`${textColorClass}`}>Uploaded: {file.name}</p>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-12 h-12 mx-auto text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Click to upload or drag and drop your Minecraft world (.zip)</p>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">Supported format: .zip</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <label htmlFor="version" className={`${textColorClass} self-center`}>
                Minecraft Version:
              </label>
              <select
                id="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                disabled={edition === 'java'}
                className={`${
                  edition === 'java' ? 'opacity-50' : ''
                } border ${borderClass} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  inputBgClass
                }`}
              >
                {bedrockVersions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Processing Indicator */}
          {processing && (
            <section className="mb-12">
              <h2 className="text-xl font-medium mb-4 text-center">Processing your world...</h2>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-center mt-2 text-gray-600 dark:text-gray-400">{progress}% complete</p>
            </section>
          )}

          {/* Map Display Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Your World Map</h2>
            <div className={`bg-gray-100 dark:bg-gray-700 ${borderClass} rounded-lg overflow-hidden aspect-video relative`}>
              {processing ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 bg-opacity-75">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                </div>
              ) : file ? (
                <img
                  src="https://placehold.co/1200x600/e0f3e4/2d7a2b?text=Map+Preview"
                  alt="World Map Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No map data yet
                </div>
              )}
            </div>

            {file && (
              <div className="mt-6 flex justify-center gap-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  Download Map
                </button>
                <button
                  onClick={() => {
                    setFile(null);
                    setProcessing(false);
                    setProgress(0);
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Re-upload World
                </button>
              </div>
            )}
          </section>
        </section>

        {/* Overlay Message Only (does not block toggle UI) */}
        {edition === 'java' && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <span className="text-2xl font-semibold text-red-500 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 px-6 py-3 rounded shadow-lg">
              Java edition coming soon
            </span>
          </div>
        )}

        {/* Dark semi-transparent overlay behind message */}
        {edition === 'java' && (
          <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-10"></div>
        )}
      </main>

      {/* Footer */}
      <footer className={`${footerBgClass} shadow-inner py-6`}>
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 Minecraft Mapper. Not official Minecraft software.</p>
          <p className="mt-1 text-xs">
            This website uses the open-source Cubiomes library (MIT License).
          </p>
        </div>
      </footer>
    </div>
  );
}