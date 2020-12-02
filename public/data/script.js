getData();

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    data.forEach(item => {
        const container = document.querySelector('.container');

        const card = document.createElement('div');
            card.setAttribute('class', 'card');
        const mood = document.createElement('div');
            mood.setAttribute('class', 'card-mood');
        const date = document.createElement('div'); 
            date.setAttribute('class', 'card-date')
        const img = document.createElement('img');
            img.setAttribute('class', 'card-img');

        console.log(card)
        
        container.append(card)
        card.append(mood, date, img);

        const dateString = new Date(item.timestamp).toLocaleString();

        mood.textContent = `Mood: ${item.mood}`;
        date.textContent = dateString;
        img.src = item.image
    });
}