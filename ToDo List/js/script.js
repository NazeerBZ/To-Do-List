
function addItems(){
    
    var task_input = document.getElementById("EnterTask").value;
    
    if(task_input == ""){
        
       document.getElementById("redAlert").innerHTML = "*nothing to list"; 
    }    
    
    if(task_input != ""){
        
    document.getElementById("redAlert").innerHTML = "";  
    
   var unorderList = document.getElementById("listOfTask");
    
   var listItem = document.createElement("li");
     
   var inputElement = document.createElement("input");
   inputElement.setAttribute("type", "checkbox");
   inputElement.setAttribute("class", "cBox");
   inputElement.setAttribute("onclick", "strikeWord(this)");
 
    var para = document.createElement("p");
    para.appendChild(document.createTextNode(task_input));
    para.setAttribute("class", "taskPara");
    para.setAttribute("onclick", "editMode(this)");
    
    var cross = document.createElement("input");
    cross.setAttribute("type", "image");
    cross.setAttribute("src", "images/close.png");
    cross.setAttribute("class", "del");
    cross.setAttribute("onclick", "delTask(this)");
 
    listItem.appendChild(inputElement);
    listItem.appendChild(para);
    listItem.appendChild(cross);
    
    unorderList.appendChild(listItem);
    
    document.getElementById("EnterTask").value = "";
    }
}


function clearItems(){
    
    document.location.assign("file:///C:/Users/NazeerBZ/Desktop/ToDo%20List/index.html");
    
}

function strikeWord(elmnt){

if(elmnt.checked == true){
  elmnt.nextElementSibling.setAttribute("class", "makeLine");
  }
  
if(elmnt.checked == false){
  elmnt.nextElementSibling.setAttribute("class", "rmLine");
  }
   
}


function editMode(paraElmnt){
    
 var text = paraElmnt.innerHTML;
 var parentTag = paraElmnt.parentNode;
//  paraElmnt.remove();
paraElmnt.parentNode.removeChild(paraElmnt);
 
 var editText = document.createElement("input");
 editText.setAttribute("onfocusout", "closeEditMode(this)");
 editText.value = text;
 
 var Lchild = parentTag.lastChild;
 parentTag.insertBefore(editText, Lchild);
  
}

function closeEditMode(inputControl){
    
   var text = inputControl.value;
   var parentTag = inputControl.parentNode;
   
   if(text == ""){
       
     parentTag.parentNode.removeChild(parentTag);       
   }
   
   if(text != ""){
    parentTag.removeChild(inputControl);   
    var para = document.createElement("p");
    para.appendChild(document.createTextNode(text));
    para.setAttribute("class", "taskPara");
    para.setAttribute("onclick", "editMode(this)");
    
    var Lchild = parentTag.lastChild;
    
    parentTag.insertBefore(para, Lchild);
    
    }
}


function delTask(delElmnt){
    
    var list_itemTag = delElmnt.parentNode;
    list_itemTag.parentNode.removeChild(list_itemTag);
}

var usersList = [];

function SaveUser(){
     
  var ary = []; 
  var counter = 0;  
  var name = document.getElementById('saveName').value;
  var uList = document.getElementById('listOfTask');
  
  for(var j=0; j<uList.childNodes.length; j++){
     	
    	   if(uList.childNodes[j].nodeName == '#text'){
           	continue;
           }
           
           if(uList.childNodes[j].nodeName == 'LI'){
       ary[counter] = uList.getElementsByTagName('p')[counter].firstChild.nodeValue;
           counter++;
           }
       } 
  
  var register = {
      
      userName : name,
      userTask : ary
  }
  
    usersList.push(register);
    localStorage.setItem('UserRegister', JSON.stringify(usersList));
    alert('Successfully Saved!!');   
}

function getMyList(){
    
  var rmUL = document.getElementById('listOfTask');
  
    if(rmUL){
        while(rmUL.firstChild){
            rmUL.removeChild(rmUL.firstChild);
        }        
    }
  
  var name = document.getElementById('registered').value;
  var StoredUser = JSON.parse(localStorage.getItem('UserRegister'));
  
  for(var i=0; i<StoredUser.length; i++){
      
      var obj = StoredUser[i];
      var user = obj.userName;
      
      if(user == name){
          
         var ary = obj.userTask;
         
         for(var j=0; j<ary.length; j++){
    
    var liItem = document.createElement('li');
        
   var inputElement = document.createElement("input");
   inputElement.setAttribute("type", "checkbox");
   inputElement.setAttribute("class", "cBox");
   inputElement.setAttribute("onclick", "strikeWord(this)");
 
    var para = document.createElement("p");
    para.appendChild(document.createTextNode(ary[j]));
    para.setAttribute("class", "taskPara");
    para.setAttribute("onclick", "editMode(this)");
    
    var cross = document.createElement("input");
    cross.setAttribute("type", "image");
    cross.setAttribute("src", "images/close.png");
    cross.setAttribute("class", "del");
    cross.setAttribute("onclick", "delTask(this)"); 
    
    liItem.appendChild(inputElement);
    liItem.appendChild(para);
    liItem.appendChild(cross);
    
        var userUl =  document.getElementById('listOfTask');
             userUl.appendChild(liItem);         
         }
         
      }
  } 
}






























