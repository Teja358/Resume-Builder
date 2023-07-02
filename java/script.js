var experienceCount = 1;
var educationCount = 1;
const skillSet = new Set(); //add one copy if we add duplicates
var fileName = "";

function previewImg(event) {
  console.log("previewImg(event) <<");
  console.log(typeof event);
  var imagePreview = document.getElementById("image-preview");

  if (event.target.files[0]) {
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    imagePreview.style.display = "block";
    imagePreview.onload = function () {
      URL.revokeObjectURL(imagePreview.src); //free memory
    };
  }
  console.log("previewImage(event) >>");
}

function addSkill() {

  if (document.querySelector("#skill-input").value.length == 0) {
    alert("Please Enter a Skill");
  } else {
    var skillValue = document.querySelector("#skill-input").value;
    if (skillSet.has(skillValue)) {
      alert("Skill already exists");
      return;
    }
    skillSet.add(skillValue);

    document.querySelector("#skills").innerHTML += `
          <div class="skill mt-1">
          <span id="skillname">${skillValue}</span>
          <button class="btn btn-outline-danger delete">
          <i class="fa-solid fa-trash-can"></i>
          </button>
          </div>`;

    document.querySelector("#skill-input").value = "";
    var current_tasks = document.querySelectorAll(".delete");
    console.log(typeof current_tasks);
    for (var i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        skillSet.delete(this.parentNode.querySelector("#skillname").innerText); //remove skill from set
        this.parentNode.remove();
      };
    }
  }
  console.log(skillSet);
}

function addworkExperience() {
  console.log("addworkExperience() <<");

  let newNode = document.createElement("textarea");
  newNode.classList.add("form-control", "we-field", "mt-1");
  newNode.setAttribute("rows", 3);
  newNode.setAttribute("id", "experience -"+ ++experienceCount);
  newNode.setAttribute("placeholder","Enter work/project experience ="+experienceCount);

  let experienceDiv = document.getElementById("experience-div");
  let experienceAddbuttonDiv = document.getElementById("we-btns-div");
  let we_del_btn = document.getElementById("we-del-btn");

  experienceDiv.insertBefore(newNode, experienceAddbuttonDiv);
  console.log("addworkExperience() >>");
}

function removeworkExperience() {
  console.log("removeworkExperience() << "+experienceCount);
  let latestExperience = document.getElementById("experience -"+experienceCount);
  latestExperience.remove();

  --experienceCount;
  console.log("removeworkExperience() >> ");
}

function addEducation() {
  console.log("addEducation() <<");

  let newNode = document.createElement("textarea");
  newNode.classList.add("form-control", "ed-field", "mt-1");
  newNode.setAttribute("rows", 3);
  newNode.setAttribute("id", "education -"+ ++educationCount);
  newNode.setAttribute("placeholder","Enter education details ="+ educationCount);

  let educationDiv = document.getElementById("education-div");
  let educationAddbuttonDiv = document.getElementById("ed-btns-div");
  let ed_del_btn = document.getElementById("ed-del-btn");

  educationDiv.insertBefore(newNode, educationAddbuttonDiv);
  console.log("addEducation() >>");
}

function removeEducation(){
  console.log("removeEducation() <<"+educationCount);
  let latestExperience = document.getElementById("education -"+ educationCount);
  latestExperience.remove();

  --educationCount;
  console.log("removeworkExperience() >> ");
  console.log("removeEducation() >>");
}

function startOver(){
  console.log("startOver() <<");
  window.location.reload();
  console.log("startOver() >>");
}

function generateResume() {
  console.log("generateResume() <<");
  
  let fullName = document.getElementById("full-name").value;
  let fullNameTemplate = document.getElementById("full-name-template");
  fullNameTemplate.innerHTML = fullName;
  fileName = fullName;

  let dob = document.getElementById("dob").value;
  let dobTemplate = document.getElementById("dob-template");
  dobTemplate.innerHTML = dob;

  let address = document.getElementById("address").value;
  let addressTemplate = document.getElementById("address-template");
  addressTemplate.innerHTML = address;

  let email = document.getElementById("email").value;
  let emailTemplate = document.getElementById("email-template");
  emailTemplate.innerHTML = email;

  let phone = document.getElementById("phone").value;
  let phoneTemplate = document.getElementById("phone-template");
  phoneTemplate.innerHTML = phone;

  let linkedin = document.getElementById("linkedin").value;
  let linkedinTemplate = document.getElementById("linkedin-template");
  linkedinTemplate.innerHTML = linkedin;

  let github = document.getElementById("github").value;
  let githubTemplate = document.getElementById("github-template");
  githubTemplate.innerHTML = github;

  let objective = document.getElementById("objective").value;
  let objectiveTemplate = document.getElementById("objective-template");
  objectiveTemplate.innerHTML = objective;

  //   Skills Template
  let skillSetString = "";
  for (let skill of skillSet) {
    skillSetString += `<span class="badge rounded-pill bg-secondary skill-pill">${skill}</span>`;
  }
  let skillsTemplate = document.getElementById("skill-template-div");
  skillsTemplate.innerHTML = skillSetString;

  // Work experience
  let experiences = document.getElementsByClassName("we-field");
  let experiencesListString = "";
  for (let experience of experiences){
    experiencesListString+= `<li>${experience.value}</li>`
  }

  let experiencesTemplate = document.getElementById("we-template");
  experiencesTemplate.innerHTML = experiencesListString;

    // Education Template

  let academicQualifications = document.getElementsByClassName("ed-field");
  let academicQualificationsString = "";

  for (let qualification of academicQualifications) {
    academicQualificationsString += `<li>${qualification.value}</li>`;
  }
  let edTemplate= document.getElementById("ed-template");
  edTemplate.innerHTML = academicQualificationsString;

  //Profile picture

  let file = document.getElementById("profile-img").files[0];
  if (file === undefined) {
    console.log("filenot selected");
  } else {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      document.getElementById("profile-img-template").src = reader.result;
    };
  }

  //unhidding resume template
  document.getElementById("resume-template").style.display = "block";
  document.getElementById("save-btn").style.display = "block";

  //hiding resume form
  document.getElementById("resume-form").style.display = "none";


  console.log("generateResume() >>");
}

function printResume(templateID){
  console.log("printResume() <<");
  var printContent=document.getElementById(templateID).innerHTML;
  var originalcContent = document.body.innerHTML;
  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML= originalcContent;
  console.log("printResume() >>");

}