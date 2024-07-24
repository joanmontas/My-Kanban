# My-Kanban
My-Kanban is a Kanban board app made with Kanban principles.
Build in a Bottoms-Up-Approach.
https://my-kanban-ddb8c.web.app/

### NOTE: Include Config.js
Config.js should be included.
```.hmtl
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: <>,
        authDomain: <>,
        databaseURL: <>,
        projectId: <>,
        storageBucket: <>,
        messagingSenderId: <>,
        appId: <>,
        measurementId: <>
    };
```
Database security configuration 

### My-Kanban's Kanban Board

| Column             | Description                                    |
|--------------------|------------------------------------------------|
|TODO                | Choose a style to be applied across the site. |
|                    | Customize items functionality for better back-end interaction |
|                    | Create features page explain functionality so far.|
|                    | replace logout button with drop down |
|                    | Add about page |
|                    | Make functions that rely on db async, and use await when calling them |
|                    | Automatically save cards upon add|
|                    | Add visual cue upon add|
|                    | Disable buttons when not valid: Example can't load unsaved kanban|
|                    | Solidify naming convetion|
|                    | Add cloud function to delete anonymous user after given data|
|                    | Setup Storage for image|
|                    | Fixe BUg: Navbar accordion not expanding|
| In Progress        | |
| Accomplished       | Break down board into 3 categories             |
|                    | Items can be interchanged in different columns.|
|                    | Redesign the location of current 'DRAG ITEM'.   |
|                    | Create a '+' button to add TODO cards.          |
|                    | Items should have accordion-like features.|
|                    | Create form inside each accordion.       |
|                    | Add save button|
|                    | Place a delete button or check box in each accordion|
|                    | Add buttons to each column and make their js function. |
|                    | Research event, then handle for creation and being to another column.|
|                    | Reuse navbar across pages |
|                    | Initialize back end|
|                    | Compartamentalize apps|
|                    | Althought not necessary, hide the firebaseConfiguration via config.js|
|                    | Add drag touch screen capabilities|
|                    | Add function to the dynamically added accordion   |
|                    | Connect Front and Back-end (Dummy only)   |
|                    | Research unique id: https://stackoverflow.com/questions/28822054/firebase-how-to-generate-a-unique-numeric-id-for-key| experience.|
|                    | Add metadata to each card.|
|                    | Gather data from db on ready and display.|
|                    | Delete card from the database using unique meta data ID. |
|                    | Fix accordion's arrow upon dataSave. |
|                    | Upon dragging to other column, update db.   |
|                    | Implement authentication. |
|                    | Refactor Imports|
|                    | Authentication Based Path|
|                    | Research non-pop-up authentication             |
|                    | Login Page With Google and Email+Pass          |
|                    | Edit db security |
|                    | Pad navbar |
|                    | Board page should have side bar where new features will be added|
|                    | Board sidebar should be dynamically added|
|                    | Research modals, in order to modify side bar (or stick with same pattern, if so research events)|
|                    | Setup Firebase Function|
|                    | Upon user creation add a settings or "profile" in db.|
|                    | Upon user creation, first kanban should be created|
|                    | Hide board. Upon login show board|
|                    | create saveBoardData  |
|                    | create deleteBoardData  |
|                    | Update loadBoard function to reflect save and delete board data|
|                    | save and deleteCardData should pull data from the correct     board path|
|                    | Create a clear board function|
|                    | Change title of which board I am looking at upon loadCardData|
|                    | Update swap card data to reflect new location format|
|                    | Fixed delete current kanban bug|
|                    | Add anonymous authentication |
|                    | Upon user creation, first kanban should be created With more helpful details|
|                    | Add user settings|
|                    | Fixed load un-saved kanban bug|
|                    | Refactor Board and Kanban <li>'s inner-html|
|                    | Add Date to the form and add its DB functionality|






## License
Licensed under the GNU General Public License v3.0. See ./LICENSE for detail.
