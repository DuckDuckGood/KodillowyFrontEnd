const path = require('path');
const { app, BrowserWindow } = require('electron');

const main = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 500,
    height: 500,
  });

  mainWindow.loadFile(path.join('app', 'index.html'));
}

app.on('ready', main);
app.on('window-all-closed', () => app.quit());
