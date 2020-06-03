import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

function createWindow() {

    win = new BrowserWindow({ width: 800, height: 600 });

    if (serve) {

        win.webContents.openDevTools();

        require('electron-reload')(__dirname, {
            electron: require(path.join(__dirname, `/../../node_modules/electron`))
        });

        win.loadURL('http://localhost:4200');

    } else {

        win.loadURL(
            url.format({
                pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
                protocol: 'file:',
                slashes: true,
            })
        );
    }

    win.webContents.openDevTools();    // Dev ONLY

    win.on('closed', () => {
        win = null;
    });
}
