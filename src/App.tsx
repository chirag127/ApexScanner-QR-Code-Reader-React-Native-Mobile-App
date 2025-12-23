import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function App() {
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    function success(result: string) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err: any) {
      console.warn(err);
    }

    if (!scanResult) {
      scanner.render(success, error);
    }

    return () => {
      scanner.clear();
    };
  }, [scanResult]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-md mb-8">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          ApexScanner
        </h1>
        <p className="text-center text-gray-400 mt-2">QR Code Reader</p>
      </header>

      <main className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-6">
        {scanResult ? (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold mb-4">Scan Result</h2>
            <div className="w-full p-4 bg-gray-700 rounded-lg mb-4 break-words">
              <a
                href={scanResult}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {scanResult}
              </a>
            </div>
            <button
              onClick={() => setScanResult(null)}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
            >
              Scan Again
            </button>
          </div>
        ) : (
          <div id="reader" className="w-full"></div>
        )}
      </main>

      <footer className="mt-8 text-gray-500">
        <p>&copy; 2025 ApexScanner. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
