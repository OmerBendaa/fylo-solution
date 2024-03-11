
let sizeElement;
let remainingElement;
let gradientElement;
let storedSize
let remainingSize
let storedFiles=[];

document.addEventListener('DOMContentLoaded',()=>{
     sizeElement=document.getElementById('display-size');
     remainingElement=document.getElementById('remaining-size');
     gradientElement=document.querySelector('.gradient-bar');
})

window.onload=()=>{
     storedSize=parseFloat(localStorage.getItem('storedSize'))||0;
     remainingSize=parseFloat(localStorage.getItem('remainingSize'))||150;
     updateUi();
}

async function UploadFiles(){
   const files=await showOpenFilePicker({multiple:true});
   let sizeInMB=0;
   let FormatedFiles=await FormatFiles(files);
   FormatedFiles.forEach(file => {
       sizeInMB+=file.size/1024/1024;});    
   const FileNames=FormatedFiles.map(file=>file.name);
   let error='';
   error=validateFiles(FileNames,sizeInMB);
   if(error!==''){
         alert(error);
         return;
   }
   storedSize+=sizeInMB;
//    for(const file of FormatedFiles){
//        storedFiles.push({name:file.name,size:file.size/1024/1024});
//    }

    updateUi();
    localStorage.setItem('storedSize',storedSize);
    localStorage.setItem('remainingSize',remainingSize-storedSize)
}





function updateUi(){
    sizeElement.innerText=storedSize.toFixed(2);
    remainingElement.innerText=(remainingSize-storedSize).toFixed(2);
    gradientElement.style.width=`${(storedSize/150)*100}%`;
}

async function FormatFiles(files){ // Formating the files to a File object
   let FormatedFiles=[];
   for(const file of files){
        FormatedFiles.push( await file.getFile());
   }
    return FormatedFiles;
}
   

 function validateFiles(fileNames,sizeOfFiles){ // checking if the files are supported and if there is enough space to upload them
    let error='';
    if(sizeOfFiles+storedSize>150){
        error='There is not enough space to upload this files';
        return error;
    }
    for(const name of fileNames){
        if(!(name.toLowerCase().endsWith('.jpg')||name.toLowerCase().endsWith('.jpeg')||name.toLowerCase().endsWith('.png')||name.toLowerCase().endsWith('.gif'))){
            error="one or more of the files isn't supported";
            return error;
        }
    }
    return error;
}
