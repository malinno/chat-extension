interface RequestMessage {
    action: string;
  }
  
  interface ResponseMessage {
    text: string;
  }
  
  chrome.runtime.onMessage.addListener((request: RequestMessage, _sender, sendResponse: (response: ResponseMessage) => void) => {
    console.log('Received message:', request);  // Debug thông điệp nhận được
    if (request.action === 'getPageText') {
      const pageText = document.body.innerText;
      console.log('Page text:', pageText);  // Debug văn bản từ trang web
      sendResponse({ text: pageText });
    }
    return true;  // Giữ kết nối mở
  });
  