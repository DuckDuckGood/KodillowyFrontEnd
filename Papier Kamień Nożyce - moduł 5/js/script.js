{
    function fight(item) {
        const random = randomize();
        const items = ['stone', 'paper', 'scissors'];
        const randomizedItem = items[random];
        let response = 'Wybór Twojego rywala';
        response = response + getItem(randomizedItem) + getResult(item, randomizedItem);
    
        document.getElementById('response').innerHTML = response;
    }
    
    function randomize() {
        const random = Math.floor(Math.random() * 1000);
        return random % 3;
    }
    
    function getItem(item) {
        if (item === 'stone') {
            return '<i class="fa-regular fa-gem"></i>';
        }
        if (item === 'paper') {
            return '<i class="fa-solid fa-toilet-paper"></i>';
        }
        return '<i class="fa-solid fa-scissors"></i>';
    }
    
    function getResult(playerItem, jsItem) {
        if (playerItem === jsItem) {
            return 'Remis!';
        }
    
        if (
            (playerItem === 'scissors' && jsItem === 'stone')
            || (playerItem === 'stone' && jsItem === 'paper')
            || (playerItem === 'paper' && jsItem === 'scissors')
        ) {
            return 'Niestety, przegrywasz :(';
        }
        return 'Wygrywasz!';
    }
}