const datesGrid = document.getElementById('dates-grid');
const monthYearLabel = document.getElementById('month-year');
let date = new Date();
const addEventBox = document.getElementById("addEvent");
let selectedDay;

function renderCalendar() {
  datesGrid.innerHTML = ""; 
  const month = date.getMonth();
  const year = date.getFullYear();

  monthYearLabel.innerText = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 1. Add empty slots (Spacers)
  for (let i = 0; i < firstDay; i++) {
    datesGrid.innerHTML += `<div></div>`;
  }

  // 2. Add the actual days with data-day attribute
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "today" : "";
    // ADDED data-day="${i}" HERE:
    datesGrid.innerHTML += `<div class="date-cell ${isToday}" data-day="${i}">${i}</div>`;
  }

  // 3. IMPORTANT: Load events every time we render a new month
  loadEventsFromStorage(month, year);
}

renderCalendar();

// Placeholder logic
addEventBox.setAttribute('placeholder', `Add event on ${new Date().getDate()} ${monthYearLabel.innerText}`);

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

prevBtn.addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

datesGrid.addEventListener('click', (e) => {
  if (e.target.classList.contains('date-cell')) {
    selectedDay = e.target.getAttribute('data-day'); // Use the data-day attribute
    document.querySelectorAll('.date-cell').forEach(cell => cell.classList.remove('selected'));
    e.target.classList.add('selected');
    addEventBox.setAttribute('placeholder', `Add event on ${selectedDay} ${monthYearLabel.innerText}`);
  }
});

const addEventBtn = document.getElementById("addEventBtn");

addEventBtn.addEventListener('click', function() {
  const selectedCells = document.querySelectorAll('.selected');
  if (addEventBox.value.trim() === "") return;
  
  selectedCells.forEach(cell => {
    let event = document.createElement('p');
    event.innerText = addEventBox.value;
    event.style.fontSize = '10px';
    event.style.margin = '0';
    cell.appendChild(event);
  });

  // Pass current month and year to the save function
  saveEventsToStorage(date.getMonth(), date.getFullYear());
  addEventBox.value = '';
});

let navShown = false;
const navBtn = document.getElementById("navBtn");
const nav = document.getElementById("navbar");

navBtn.addEventListener('click', function() {
  navShown = !navShown;
  if (navShown) {
    nav.style.transform = "translateX(0px)";
  } 
  else {
    nav.style.transform = "translateX(-100vw)";
  }
});