import MainApp from "./mainApp.js";
fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
        
        new MainApp(json)
    
    });