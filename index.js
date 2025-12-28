const box = document.getElementsByClassName("to-doBox");
const addBtn = document.getElementById("addBtn");
const textBox = document.getElementById("addText");

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const labels = document.querySelectorAll('label');
const removeBtn = document.querySelectorAll('button.task-dlte');
const taskList = document.getElementById("taskList");

addBtn.onclick = function(){
    const newlistItem = document.createElement("li");
    const newCheck = document.createElement("input");
    const taskLabel = document.createElement("label");
    const taskgrp = document.createElement("div");
    const removeBtn = document.createElement("button");
    const icon = document.createElement("i");
      if (textBox.value !== "") {
        icon.classList.add("fa-solid", "fa-x");
        icon.style.color = "grey";
        
        removeBtn.classList.add("task-dlte");
        removeBtn.setAttribute("data-target", newlistItem);
        //removeBtn.value = icon;
        
        newCheck.type = "checkbox";
        taskLabel.setAttribute("for", newCheck);
        taskLabel.innerText = textBox.value;
        newCheck.classList.add("task");
        newCheck.style.borderRadius = "20px";
        taskLabel.classList.add("labels");
        
        taskList.appendChild(newlistItem);
        taskgrp.appendChild(newCheck);
        taskgrp.appendChild(taskLabel);
        newlistItem.appendChild(taskgrp);
        newlistItem.appendChild(removeBtn);
        removeBtn.appendChild(icon);
      } else {
          textBox.style.border = "2px solid red";
      }
      
      
      
  
}

taskList.addEventListener('click', function(event) {
    // 2. Check if the thing clicked was actually our delete button
    if (event.target.classList.contains('task-dlte')) {
        
        // 3. Find the parent of the button and remove it
        // This removes the parent AND the button inside it
        const parentToDelete = event.target.parentElement;
        parentToDelete.remove();
        
        console.log("Dynamically created element removed!");
    }
});

let navShown = false;
const navBtn = document.getElementById("navBtn");
const nav = document.getElementById("navbar");

navBtn.addEventListener('click', function() {
    navShown = !navShown;
    if (navShown) {
        nav.style.transform = "translateX(-200px)";
    }
    else {
        nav.style.transform = "translateX(-500px)";
    }
});

if (window.matchMedia("(min-width: 1024px)").matches) {
    navBtn.addEventListener('click', function() {
        navShown = !navShown;
        if (navShown) {
            nav.style.transform = "translateX(0px)";
        }
        else {
            nav.style.transform = "translateX(-1500px)";
        }
    });
}
  
