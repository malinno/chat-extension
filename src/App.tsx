import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);

  // Gửi yêu cầu đến content script để lấy văn bản từ trang web
  useEffect(() => {
    if (chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ action: 'getPageText' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Message failed:", chrome.runtime.lastError);
        } else {
          console.log('Received response:', response);  // Debug phản hồi nhận được
          if (response && response.text) {
            setQuery(response.text);
          } else {
            console.warn("Không thể lấy văn bản từ trang web.");
          }
        }
      });
    } else {
      console.warn("chrome.runtime không tồn tại. Đảm bảo rằng bạn đang chạy extension trong môi trường Chrome.");
    }
  }, []);
  
  // Hàm xử lý tìm kiếm
  const handleSearch = async () => {
    setResults([`${query}`, ...results]);
    setQuery(""); // Xóa ô input sau khi gửi
  };

  return (
    <div className="relative flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Chat</h1>

        {/* Phần hiển thị kết quả tìm kiếm */}
        <div>
          {results.map((result, index) => (
            <div key={index} className="p-4 mb-4 border border-gray-200 rounded-lg shadow-sm">
              {result}
            </div>
          ))}
        </div>
      </div>

      {/* Cụm input và button cố định dưới cùng */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white flex items-center space-x-2 border-t border-gray-200">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your query..."
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
