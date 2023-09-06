const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 900
    })

    win.loadFile('components/index.html')
}

app.whenReady().then(() => {
    createWindow()
})