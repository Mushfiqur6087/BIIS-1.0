const socket = io();
console.log("hello");
socket.on('message', (messageArray) => {
    console.log(messageArray);
    appendMessageToChat(messageArray);
    saveMessageToLocalStorage(messageArray);
  });

  function appendMessageToChat(messageArray)
  {
    messageArray.forEach((message) => {
              const div = document.createElement('div');
              div.className = 'w3-container';
              const header = document.createElement('h7');
              header.textContent = message.DATE;
        
              const messageParagraph = document.createElement('p');
              messageParagraph.textContent = message.OPERATON_TYPE+' '+ message.DETAILS + ' ' + message.TABLE;
              div.appendChild(header);
              div.appendChild(messageParagraph);         
              // Append the div to the DOM or a container where you want to display messages
              const messageContainer = document.getElementById('message-container'); // Replace with your actual container ID
              if (messageContainer) {
                messageContainer.appendChild(div);
              }
            });
  }


  function saveMessageToLocalStorage(message) {
    const storedMessages = JSON.parse(sessionStorage.getItem('chatMessages')) || [];
    storedMessages.push(message);
    sessionStorage.setItem('chatMessages', JSON.stringify(storedMessages));
  }
  
  window.addEventListener('load', () => {
    // Retrieve messages from local storage
    const storedMessages = JSON.parse(sessionStorage.getItem('chatMessages')) || [];
   // console.log(storedMessages[0]);
   storedMessages.forEach(function(message) {
    appendMessageToChat(message);
  });

  });
  