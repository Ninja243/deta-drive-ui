import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Deta } from "deta/dist/index";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const projectKey = document.getElementById('projectKey')
const driveName = document.getElementById('driveName')
const entryKey = document.getElementById('entryKey')

const getAll = document.getElementById('getAll')
const get = document.getElementById('get')
const deleteButton = document.getElementById('delete')
const put = document.getElementById('put')
const inputArea = document.getElementById('inputArea')
const inputText = document.getElementById('inputText')
const putConfirm = document.getElementById('putConfirm')

const result = document.getElementById('resultText')
const tableDiv = document.getElementById('tableDiv')
const table = document.getElementById('dataTable')

var inputAreaVisibility = false;

put.addEventListener('click', () => {
  tableDiv.style.display = 'none'
  if (inputAreaVisibility === false) {
    inputArea.style.display = 'block'
    put.innerText = 'Hide Input Area'
    inputAreaVisibility = true
    const div = document.createElement('div')
    div.style = 'display:flex; text-align:center; width:100%'

    const labelInput = document.createElement('input')
    labelInput.className = "input"
    labelInput.placeholder = "Enter Label"
    labelInput.style = "float:left; margin-right:5px; margin-bottom:5px; margin-left:auto;"

    const valueInput = document.createElement('input')
    valueInput.className = "input"
    valueInput.placeholder = "Enter Value"
    valueInput.style = "float:right; margin-left:5px; margin-bottom:5px; margin-right:auto;"

    const uploadForm = document.createElement("form")
    uploadForm.enctype = "multipart/form-data";
    uploadForm.method = "post";

    const uploadFormFile = document.createElement("input")
    uploadFormFile.type = "file"
    uploadFormFile.name = "file"
    uploadFormFile.id = "toUpload"
    uploadFormFile.multiple = false

    uploadForm.appendChild(uploadFormFile)

    div.appendChild(uploadForm)
    inputText.appendChild(div)

  } else if (inputAreaVisibility) {
    inputArea.style.display = 'none'
    put.innerText = 'Put Data (with Key)'
    inputAreaVisibility = false
    inputText.innerHTML = ''
    result.innerText = ''
  }
})

async function writeFunction(projectKey, driveName, inputText) {
  console.log(projectKey.value)
  console.log(driveName.value)
  tableDiv.style.display = 'none'
  if (projectKey.value === '' || driveName.value === '') {
    result.innerText = 'Enter valid Project Key and Drive Name'

  } else if (document.getElementById("toUpload").files.item(0) === null) {
    result.innerText = 'Select a file to upload'
  } else {
    result.innerText = 'Writing ...'
    inputArea.style.display = 'none'
    inputAreaVisibility = false
    put.innerText = 'Put Data (with Key)'

    const deta = Deta(projectKey.value)
    const drive = deta.Drive(driveName.value)
    const fr = new FileReader();
    let contentType = "binary/octet-stream"
    const images = ["bmp", "cod", "gif", "ief", "jpe", "jpeg", "jpg", "jfif", "png", "svg"]
    const videos = ["mp4", "webm"]
    const sounds = ["wav", "wave", "ogg", "mp3"]
    if (images.includes(document.getElementById("toUpload").files.item(0).name.slice((Math.max(0, document.getElementById("toUpload").files.item(0).name.lastIndexOf(".")) || Infinity) + 1))) {
      contentType = "image/" + document.getElementById("toUpload").files.item(0).name.substring(document.getElementById("toUpload").files.item(0).name.lastIndexOf('.') + 1);
    }
    if (videos.includes(document.getElementById("toUpload").files.item(0).name.slice((Math.max(0, document.getElementById("toUpload").files.item(0).name.lastIndexOf(".")) || Infinity) + 1))) {
      contentType = "video/" + document.getElementById("toUpload").files.item(0).name.substring(document.getElementById("toUpload").files.item(0).name.lastIndexOf('.') + 1);
    }
    if (sounds.includes(document.getElementById("toUpload").files.item(0).name.slice((Math.max(0, document.getElementById("toUpload").files.item(0).name.lastIndexOf(".")) || Infinity) + 1))) {
      contentType = "audio/" + document.getElementById("toUpload").files.item(0).name.substring(document.getElementById("toUpload").files.item(0).name.lastIndexOf('.') + 1);
    }
    fr.onload = () => {
      const array = new Uint8Array(fr.result);
      const resultPromise = drive.put(document.getElementById("toUpload").files.item(0).name, { 'data': array, 'contentType': contentType }).then(() => {
        if (resultPromise != null) {
          result.innerText = 'Succesfully Wrote!'
        }
        inputText.innerHTML = ''
      })
    }
    fr.readAsArrayBuffer(document.getElementById("toUpload").files.item(0))


  }



}

async function getAllFunction(projectKey, driveName) {
  tableDiv.style.display = 'none'
  if (projectKey.value === '' || driveName.value === '') {
    result.innerText = 'Enter valid Project Key and Drive Name'
    tableDiv.style.display = 'none'
  } else {

    result.innerText = 'Collecting results from Drive...'
    const deta = Deta(projectKey.value)
    const drive = deta.Drive(driveName.value)

    const everything = await drive.list()
    console.log(everything)
    console.log('going to print everything')
    console.log(JSON.stringify(everything['names'][0]))
    if (everything === null) {
      result.innerText = 'There are no entries in this Base!'
    } else {
      result.innerText = ''
      tableDiv.style.display = 'block'

      console.log('loopil keran ponu')
      var i = 1
      for (var x = table.rows.length - 1; x > 0; x--) {
        table.deleteRow(x);
      }
      everything['names'].forEach(element => {
        console.log(element)

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var indexCell = row.insertCell(0)
        indexCell.innerText = i

        var dataCell = row.insertCell(1)
        dataCell.innerText = JSON.stringify(element, undefined, 4)

        i += 1
      });
    }
  }
}

async function getFunction(projectKey, driveName, entryKey) {
  tableDiv.style.display = 'none'
  if ((projectKey.value === '' || driveName.value === '') && entryKey.value === '') {
    result.innerText = 'Enter valid Project Key and Base Name'
    tableDiv.style.display = 'none'
  }
  else if ((projectKey.value === '' || driveName.value === '') && entryKey.value !== '') {
    result.innerText = 'Enter Project Key and Base Name'
    tableDiv.style.display = 'none'
  }
  else if (entryKey.value === '') {
    result.innerText = 'Invalid Key, Try Again!'
    tableDiv.style.display = 'none'
  } else {
    result.innerText = 'Collecting Entry...'
    const deta = Deta(projectKey.value)
    const drive = deta.Drive(driveName.value)
    const entry = await drive.get(entryKey.value)
    if (entry === null) {
      result.innerText = 'Sorry, there is no record with this key!'
    } else {
      tableDiv.style.display = 'block'
      result.innerText = ''
      for (var x = table.rows.length - 1; x > 0; x--) {
        table.deleteRow(x);
      }
      var rowCount = table.rows.length;
      var row = table.insertRow(rowCount);

      var indexCell = row.insertCell(0)
      indexCell.innerText = 1

      var dataCell = row.insertCell(1)
      var urlCreator = window.URL || window.webkitURL;
      console.log(entry)
      if (entry.type === "binary/octet-stream") {
        dataCell.innerText = "Binary"
      } else if (entry.type.includes("image/")) {
        const img = document.createElement("img")
        var imageUrl = urlCreator.createObjectURL(entry);
        img.src = imageUrl
        img.height = 55
        img.width = 55
        dataCell.appendChild(img)
      } else if (entry.type.includes("video/")) {
        const vid = document.createElement("video")
        var videoUrl = urlCreator.createObjectURL(entry);
        vid.src = videoUrl;
        vid.controls = true;
        vid.innerHTML = 'Your browser doesn\'t support embedded videos. Download it <a target="_blank" href="' + videoUrl + '">here</a>.'
        dataCell.appendChild(vid)
      } else if (entry.type.includes("audio/")) {
        const aud = document.createElement("audio")
        var audioUrl = urlCreator.createObjectURL(entry);
        aud.src = audioUrl;
        aud.controls = true;
        aud.innerHTML = 'Your browser doesn\'t support embedded audio. Download it <a target="_blank" href="' + audioUrl + '">here</a>.'
        dataCell.appendChild(aud)
      } else {
        var blobUrl = urlCreator.createObjectURL(entry);
        dataCell.innerText = "No idea. Download it <a src='" + blobUrl + "' target='_blank'>here</a>."
      }
    }
  }
}

async function deleteFunction(projectKey, driveName, entryKey) {

  tableDiv.style.display = 'none'

  if (projectKey.value === '' && driveName.value === '' && entryKey.value === '') {
    result.innerText = 'Enter valid Project Key and Base Name'
  }
  else if ((projectKey.value === '' || driveName.value === '') && entryKey.value === '') {
    result.innerText = 'Enter valid Project Key and Base Name'
    tableDiv.style.display = 'none'
  }
  else if ((projectKey.value === '' || driveName.value === '') && entryKey.value !== '') {
    result.innerText = 'Enter Project Key and Base Name'
    tableDiv.style.display = 'none'
  }
  else if (entryKey.value === '') {
    result.innerText = 'Invalid Key, Try Again!'
    tableDiv.style.display = 'none'
  }
  else {
    result.innerText = 'Deleting Entry...'
    const deta = Deta(projectKey.value)
    const drive = deta.Drive(driveName.value)
    const deleted = await drive.delete(entryKey.value)
    console.log(deleted)
    result.innerText = 'The entry was deleted!'
  }
}

get.addEventListener('click', async () => {

  getFunction(projectKey, driveName, entryKey)
})

deleteButton.addEventListener('click', () => {
  console.log(`Project Key is ${projectKey.value}`)
  console.log(`Base Name is ${driveName.value}`)
  console.log(`Entry Key is ${entryKey.value}`)

  deleteFunction(projectKey, driveName, entryKey)
})

getAll.addEventListener('click', () => {
  console.log(`Project Key is ${projectKey.value}`)
  console.log(`Base Name is ${driveName.value}`)
  console.log(`Entry Key is ${entryKey.value}`)

  getAllFunction(projectKey, driveName)
})

putConfirm.addEventListener('click', () => {
  writeFunction(projectKey, driveName, inputText)
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
