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

Desktop interface:
- Add: Ability to change desktop background from **ContextMenu**

Desktop applications:
- Add: embedded browser (probably with iframe)
- Add: [DOOM](https://js-dos.com/DOOM/)
- Add: [PACMAN](https://github.com/daleharvey/pacman)
- Add: [SUPER MARIO](https://github.com/meth-meth-method/super-mario)

Terminal:
- Add: Scroll to the bottom of the component **onCommandExecute**
- ~~Add: fastfetch~~
- ~~Add: insert last used command using arrow up / down~~