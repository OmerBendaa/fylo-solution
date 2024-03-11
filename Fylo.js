let storedSize=0;
let storedFiles=[];

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
   for(const file of FormatedFiles){
       storedFiles.push({name:file.name,size:file.size/1024/1024});
   }
   console.log(storedFiles);

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