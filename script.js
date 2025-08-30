// Add JavaScript code for your web site here and call it from index.html.
let themeButton = document.getElementById("theme-button");

// Step 2: Write the callback function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  console.log("dark mode button click");
};

// Step 3: Register a 'click' event listener for the theme button, and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener('click', toggleDarkMode);

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.
let rsvpbutton = document.getElementById("rsvp-button");

// Step 2: Write the callback function
const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false; //keep track of whether there's an error

  let rsvpForm = document.getElementById("rsvp-form");
  let rsvpInputs = rsvpForm.elements;
  
  let person = {
    name: rsvpInputs[0].value,
    email: rsvpInputs[1].value,
    phone: rsvpInputs[2].value
  };
  // TODO: Loop through all inputs
  for (let i = 0; i < rsvpInputs.length; i=i+1) 
  {
    let input = rsvpInputs[i];  //set the variable to loop through the inputs
    // TODO: Inside loop, validate the value of each input
    if (input.value.length < 2) 
    {
      input.classList.add('error');
      containsErrors = true; 
    }
    else 
    {
      input.classList.remove('error');
    }
  }
  //if no errors call addParticipant 

  //error messages
  if (!containsErrors)
  {
    addParticipant(person);
    toggleModal(person);
    for (let i = 0; i < rsvpInputs.length; i++)
    {
      rsvpInputs[i].value = "";
    }
  }
  else {
    console.log("Fill out the form correctly.");
  }
};

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
rsvpbutton.addEventListener('click',validateForm);

/*** Form Handling ***/

// Step 1: Add your query for the submit RSVP button here
const addParticipant = (person) => {
  // Step 2: Write your code to manipulate the DOM here
  let newText = document.createElement("p");  //new p tags
  newText.classList.add("rsvp-para");
  newText.textContent = `Name: ${person.name}, Email: ${person.email}, Phone: ${person.phone}`;

  let rsvpParticipantsDiv = document.querySelector(".rsvp-participants");
  rsvpParticipantsDiv.appendChild(newText);
};


/*** Animations ***/
/*** Success Modal***/
/*** Modal ***
  Purpose:
  - Use this starter code to add a pop-up modal to your website.
***/

const toggleModal = (person) => {
  let modal = document.getElementById("success-modal");
  let modalMessage = document.getElementById("modal-message");

  modal.style.display = "flex";
  modalMessage.textContent = `Thank you, ${person.name} for RSVP-ing. Can't wait to see you there!`;
    
  let intervalID = setInterval(animateImage, 500);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalID);
  },  5000);
};

//animation 
let rotateFactor = 0;
let modalImage = document.getElementById("modal-image");

const animateImage = () => {
  rotateFactor = (rotateFactor === 0) ? -10 : 0;
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

let closeModalButton = document.getElementById("close-modal-button");

const closeModal = () => {
  let modal = document.getElementById("success-modal");
  modal.style.display = "none";
};

closeModalButton.addEventListener('click', closeModal);