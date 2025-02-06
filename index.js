import MainApp from "./mainApp";
fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
        
        new MainApp(json)
    
    });