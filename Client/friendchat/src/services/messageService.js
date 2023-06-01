import socket from './socket';

export const sendMessage = msg => {
    socket.volatile.emit("chat_message", msg);
}

export const getMessage = callback => {
    socket.on("chat_message", msg => {
        callback(msg);
    })
}

const fileOptions = {
  types: [
    {
      description: "Images",
      accept: { "image/*": [".png", ".gif", ".jpeg", ".jpg"] },
    },
    ],
    excludeAcceptAllOption: true,
    multiple: false
};

export const getFile = async () => {
  let file;
  try {
    const [fileHandle] = await window.showOpenFilePicker();
    file = await fileHandle.getFile(fileOptions);
    
  } catch (error) {
    if (error) {
      return;
    }
  }
  return file;
};  

export const reader = file => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    
    fileReader.onerror = err => reject(err);
    fileReader.readAsDataURL(file);
  })
}

// file.type = "image/jpeg"