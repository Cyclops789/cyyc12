# TODO: 
**[CORE]** MouseSelectionEvent:
- ~~Fix: switch between directions~~
- ~~Fix: dont fire the selection when the user is pressing on a window (**X1**)~~
- ~~Add: desktop icons selection~~
- **X** ~~Fix: do not fire MouseSelectionEvent over a DesktopIcon~~ (the library doesnt support that atm)

**[CORE]** Windows:
- ~~Add: fullscreen button~~
- ~~Add: minimize button~~
- ~~Add: motion effect when minimizing / closing a window~~
- ~~Fix: windows size when you reopen them~~ 95% (need to save the initial position and size in the localStorage)
- ~~Fix: z-index (update when clicking on a window, probably using **X1**)~~
- ~~Fix: limit width resizing when it reaches the tab text~~
- Fix: windows pos / size should be saved after onDragStop / onResizeStop

**[CORE]** Desktop:
- ~~Add: task bar~~
- ~~Add: Start menu~~
- Add: Context menu [50%] (working on file uploads)
- ~~Fix: add scale animation when you close / minimize window though TaskBar~~
- ~~Add: active windwos / opened windows (Using **X1**)~~
- ~~Fix: DesktopHandler should use full screen size~~

**[CORE]** Desktop Icons:
- ~~Add: OnHover display a background (with low opacity) and a border~~

**[CORE]** References:
- ~~X1: add / use active windows state~~

**[CORE]** Desktop:
- ~~Add: a boot image that displayes before [ starting / stopping ] status~~
- ~~Fix: restart button should display shutdown component > boot image > bootup component then desktop~~

Desktop interface:
- ~~Add: Ability to change desktop background from **ContextMenu**~~ [80%] (need to add more canvas backgrounds)

Desktop applications:
- ~~Add: embedded browser (probably with iframe)~~
- Add: [DOOM](https://js-dos.com/DOOM/)
- ~~Add: [PACMAN](https://github.com/daleharvey/pacman)~~
- Add: [SUPER MARIO](https://github.com/meth-meth-method/super-mario)
- Add: allow sorting with file names [Desc / Asc]

Terminal:
- ~~Add: Scroll to the bottom of the component **onCommandExecute**~~
- ~~Add: fastfetch~~
- ~~Add: insert last used command using arrow up / down~~

Folder:
- ~~Add: content to public/static folders~~
- ~~Add: show the static generated browse files in folder components~~ (~~It should fetch the text files for monaco editor and display videos / audios~~)
- ~~Add: Show file content in a window component based on mime type [image / video / text]~~
- ~~Fix: zIndex for webamp container~~

**[CORE]**:
- ~~Add: dynamic import for window children~~
- Fix: Split [ Editor | Image | Video | PDFViewer ] so each file can be on its draggable window