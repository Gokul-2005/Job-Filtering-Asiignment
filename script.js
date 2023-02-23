let JSONdata ;
let skillSortArray = [];
fetch('./data.json')
    .then((response) => response.json())
    .then((json) => { loadData(json)});

function loadData(objArr){
    JSONdata = objArr;
    for (let i = 0; i < JSONdata.length; i++) {
      let tempDiv = document.createElement("div");
      tempDiv.setAttribute("class","info-Div")
      tempDiv.innerHTML =`
      <div class="info-Div1">
          <div class="img-Div">
            <img src="${JSONdata[i].logo}" />
          </div>
          <div class="detail-Div">
            <div class="detail-Div1">${JSONdata[i].company}<div class="new-Div">NEW!</div> <div class="featured-Div">Featured</div> </div>
            <div class="detail-Div2">${JSONdata[i].position}</div>
            <div class="detail-Div3">${JSONdata[i].postedAt} &nbsp; · &nbsp; ${JSONdata[i].contract}  &nbsp;· &nbsp; ${JSONdata[i].location}</div>
          </div>
        </div>
        <div class="info-Div2"></div>
      `;
      let tempArr = [JSONdata[i].role , JSONdata[i].level , ...JSONdata[i].tools , ...JSONdata[i].languages];
      document.getElementById("main-Div2").appendChild(tempDiv);
      for(let j = 0 ; j < tempArr.length ; j++) {
        let tempButton = document.createElement("button");
        tempButton.setAttribute("class","skills");
        tempButton.setAttribute("onclick","sortSkill(this)")
        tempButton.innerText = tempArr[j];
        document.getElementsByClassName("info-Div2")[i].appendChild(tempButton);
      }
      if(!JSONdata[i].new){
        document.getElementsByClassName("new-Div")[i].style.display="none";
      }
      if(!JSONdata[i].featured){
        document.getElementsByClassName("featured-Div")[i].style.display="none";
      }
    }
}

function sortSkill(elem){ 
  document.getElementById("sort-Opt").style.display="flex";
  if(!skillSortArray.includes(elem.innerText)){
    skillSortArray.push(elem.innerText);
    let tempSkill = document.createElement("div");
    tempSkill.setAttribute("class","skillsInsideSkillDiv");
    tempSkill.innerHTML = `
    <div class="skillName-Div">${elem.innerText}</div><button class="close-Div" onclick="removeSkill(this)"><i class="fa-solid fa-xmark"></i></button>`
    document.getElementById("skill-Div").appendChild(tempSkill)
    Sort();
  }
}

function removeSkill(elem){
  let index = skillSortArray.indexOf(elem.previousSibling.innerText);
  skillSortArray.splice(index,1);
  elem.parentNode.remove();
  if(document.getElementById("skill-Div").innerHTML==""){
    document.getElementById("sort-Opt").style.display="none";
  }
  Sort();
}

function clearAllSkills(){
  document.getElementById("skill-Div").innerHTML="";
  document.getElementById("sort-Opt").style.display="none";
  skillSortArray = [];
  Sort();
}

function Sort(){
  let tempArray ;
  for (let i = 0; i < document.getElementsByClassName("info-Div2").length; i++) {
    tempArray = [];
    for (let j = 0; j < document.getElementsByClassName("info-Div2")[i].childElementCount; j++) {
      tempArray.push(document.getElementsByClassName("info-Div2")[i].childNodes[j].innerText);      
    }
   if(skillSortArray.every(v => tempArray.includes(v))){
    document.getElementsByClassName("info-Div")[i].style.display="flex";
   }
   else{
    document.getElementsByClassName("info-Div")[i].style.display="none";
   }
  }
}