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

export const getFile = async getUrl => {
  let file;
  try {
    const [fileHandle] = await window.showOpenFilePicker();
    file = await fileHandle.getFile(fileOptions);
  } catch (error) {
    if (error) {
      return;
    }
  }
  const reader = new FileReader();
  reader.onload = () => {
      const dataUrl = reader.result;
      getUrl(dataUrl);
  };
  reader.readAsDataURL(file);
};  