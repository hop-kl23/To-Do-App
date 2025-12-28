function saveEventsToStorage(month, year) {
    const data = [];
    const cells = document.querySelectorAll('.date-cell');

    cells.forEach((cell) => {
        const day = cell.dataset.day;
        const events = cell.querySelectorAll('p');
        events.forEach(event => {
            data.push({ day: day, text: event.innerText });
        });
    });

    const storageKey = `events-${month}-${year}`;
    localStorage.setItem(storageKey, JSON.stringify(data));
}

function loadEventsFromStorage(month, year) {
    const storageKey = `events-${month}-${year}`;
    const savedData = localStorage.getItem(storageKey);
    
    if (!savedData) return;

    const data = JSON.parse(savedData);
    data.forEach(item => {
        // Find cell by data-day attribute
        const targetCell = document.querySelector(`.date-cell[data-day="${item.day}"]`);
        if (targetCell) {
            const event = document.createElement('p');
            event.innerText = item.text;
            event.style.fontSize = '10px';
            targetCell.appendChild(event);
        }
    });
}
