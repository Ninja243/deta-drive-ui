//import logo from './logo.svg';
import './App.css';

import { Component } from 'react';


import FileBrowser from 'react-keyed-file-browser'

import { Deta } from "deta/dist/index";

import { FileDrop } from 'react-file-drop';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _projectKeyInputText: "",
      _driveNameInputText: "",
      announcementText: null,
      errorText: null,
      previewFile: null,
      count: 0,
      files: [],
      projectKey: null,
      driveName: null,
      uploadModalVisible: false,
      filesToUpload: [],
      fileDropText: "Drop your files here",
      images: ["bmp", "cod", "gif", "ief", "jpe", "jpeg", "jpg", "jfif", "png", "svg"],
      videos: ["mp4", "webm"],
      sounds: ["wav", "wave", "ogg", "mp3"],
      texts: ["txt", "asm", "sh", "js", "css", "cmd", "bat", "ps", "ps1"],
    }
  }

  componentDidMount = async () => {
    if (this.state.projectKey !== null && this.state.driveName !== null) {
      this.refreshFiles()
    }
  }

  refreshFiles = async () => {
    var deta = Deta(this.state.projectKey)
    var drive = deta.Drive(this.state.driveName)
    var everything = await drive.list()
    this.setState({ "files": [], "filesToUpload": [], })
    everything['names'].forEach(async (element) => {
      let tempObj = {
        key: element,
      }
      this.state.files.push(tempObj)
    })
    this.setState({})
  }

  handleSelected = (files, prefix) => {
    var deta = Deta(this.state.projectKey)
    var drive = deta.Drive(this.state.driveName)
    let name = files.key
    if (typeof prefix === "undefined") {
      drive.get(name).then(e => {
        var urlCreator = window.URL || window.webkitURL;
        let downloadURL = urlCreator.createObjectURL(e);
        this.setState({
          "previewFile": {
            "url": downloadURL,
            "file": e,
            "name": name
          }
        })
      })
    } else {
      drive.get(prefix + files.key).then(e => {
        var urlCreator = window.URL || window.webkitURL;
        let downloadURL = urlCreator.createObjectURL(e);
        this.setState({
          "previewFile": {
            "url": downloadURL,
            "file": e,
            "name": name
          }
        })
      })
    }

  }

  updateProjectKeyInputTextValue = (evt) => {
    this.setState({
      "_projectKeyInputText": evt.target.value
    })
  }

  updateDriveNameTextValue = (evt) => {
    this.setState({
      "_driveNameInputText": evt.target.value
    })
  }

  downloadPreviewFile = () => {
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(this.state.previewFile.file, this.state.previewFile.name);
      return;
    }
    const blobURL = this.state.previewFile.url
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', this.state.previewFile.name);
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
      window.URL.revokeObjectURL(blobURL);
    }, 100);
  }

  uploadStoredFiles = async () => {
    return new Promise(async (resolve, reject) => {
      const deta = Deta(this.state.projectKey)
      const drive = deta.Drive(this.state.driveName)
      console.log(this.state.filesToUpload)
      let j = 0
      for (const file of this.state.filesToUpload) {
        const fr = new FileReader();
        let contentType = "binary/octet-stream"

        if (this.state.images.includes(file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1))) {
          contentType = "image/" + file.name.substring(file.name.lastIndexOf('.') + 1);
        }
        if (this.state.videos.includes(file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1))) {
          contentType = "video/" + file.name.substring(file.name.lastIndexOf('.') + 1);
        }
        if (this.state.sounds.includes(file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1))) {
          contentType = "audio/" + file.name.substring(file.name.lastIndexOf('.') + 1);
        }
        fr.onload = () => {
          const array = new Uint8Array(fr.result);
          const resultPromise = drive.put(file.name, { 'data': array, 'contentType': contentType }).then(() => {
            if (resultPromise !== null) {
              let y = 1
              let t = []
              while (y < this.state.filesToUpload.length) {
                t.push(this.state.filesToUpload[y])
                y = y + 1
              }
              var urlCreator = window.URL || window.webkitURL;
              let downloadURL = urlCreator.createObjectURL(file);
              this.setState({
                filesToUpload: t,
                previewFile: {
                  "url": downloadURL,
                  "file": file,
                  "name": file.name
                },
                announcementText: null
              })
            }
          })
        }
        fr.readAsArrayBuffer(file)
        j = j + 1;

      }
      resolve()
    })



  }

  render() {
    return (
      <div className="App">
        <div className="w2 pcolor">

          <br />
          <br />

          <nav className="navbar pcolor" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <span className="navbar-item nav1">
                <img alt="" src="https://uploads-ssl.webflow.com/5eb96efa78dc680fc15be3be/5ec58c9b49c21c4535eead5a_logo-250.png" className="img1"></img>
              </span >
              <h2 className="navbar-item header1"> Deta Drive Explorer</h2>

            </div>

          </nav>

          {!(this.state.projectKey !== null && this.state.driveName !== null) ?
            <header>
              <h3 className="subtitle is-4">Exploring your Deta Drive is now only a few clicks away! <br /><i>Heavily</i> based on <a href="https://explorer.deta.dev/" target="_blank" rel="noreferrer">Deta Base Explorer</a>. Check out the code for
                  this project at <span><a target="_blank" rel="noreferrer" href="https://github.com/Ninja243/deta-drive-ui">GitHub</a></span>.
                </h3>
            </header>
            :
            <div className="signOut">
              <button onClick={() => { this.setState({ "driveName": null, "projectKey": null }); }}>Close Drive</button>
            </div>

          }


          <section >
            {(this.state.projectKey !== null && this.state.driveName !== null) ?

              this.state.previewFile !== null ?

                <div>
                  <h1 className="previewHeader">Preview</h1>
                  <button onClick={() => { this.refreshFiles(); this.setState({ "previewFile": null }) }}>&#8249; Back</button>
                  {(this.state.previewFile.file.type?.startsWith("image") || this.state.images.includes(this.state.previewFile.name.slice((Math.max(0, this.state.previewFile.name.lastIndexOf(".")) || Infinity) + 1))) ?
                    <div className="preview"><img alt="A preview of the stored file" src={this.state.previewFile.url}></img></div> :
                    (this.state.previewFile.file.type?.startsWith("video") || this.state.videos.includes(this.state.previewFile.name.slice((Math.max(0, this.state.previewFile.name.lastIndexOf(".")) || Infinity) + 1))) ?
                      <div className="preview"><video src={this.state.previewFile.url}></video></div> :
                      (this.state.previewFile.file.type?.startsWith("audio") || this.state.sounds.includes(this.state.previewFile.name.slice((Math.max(0, this.state.previewFile.name.lastIndexOf(".")) || Infinity) + 1))) ?
                        <div className="preview"><audio src={this.state.previewFile.url} controls></audio></div> :
                        <div className="preview"><h3>File can't be previewed</h3></div>
                  }
                  <div className="controls">

                    <button onClick={() => {
                      var deta = Deta(this.state.projectKey)
                      var drive = deta.Drive(this.state.driveName)
                      drive.delete(this.state.previewFile.name)
                      this.state.files.splice(this.state.files.indexOf(this.state.previewFile), 1)
                      this.setState({ "announcementText": "Deleted!", "previewFile": null, "uploadModalVisible": true })
                      this.refreshFiles()
                    }}>
                      Delete {this.state.previewFile.name}
                    </button>
                    <button onClick={() => {
                      this.downloadPreviewFile()
                    }
                    }>Download {this.state.previewFile.name}</button>
                  </div>
                </div>

                :

                <div>
                  {this.state.uploadModalVisible ?
                    this.state.announcementText !== null ?
                      <div>
                        <button onClick={() => {
                          this.setState({
                            "announcementText": null,
                            "uploadModalVisible": false
                          })
                          this.refreshFiles()
                        }}>&#8249; Back</button>
                        <h1 className="headingText">{this.state.announcementText}</h1>
                      </div>
                      :
                      <div >
                        <button onClick={() => {
                          this.setState({
                            "uploadModalVisible": false
                          })
                        }}>&#8249; Back</button>
                        <FileDrop className="uploadBox" onDrop={(files, event) => {
                          event.preventDefault()
                          this.setState({
                            "filesToUpload": files
                          }, () => {
                            this.setState({
                              "fileDropText": "Uploading ..."
                            }, () => {
                              this.uploadStoredFiles().then(() => {
                                this.setState({
                                  fileDropText: "Drop your files here",
                                  announcementText: "Uploading..."
                                }, () => {
                                  this.refreshFiles()
                                })
                              })
                            })


                          })
                        }}>
                          {this.state.fileDropText}
                        </FileDrop>

                      </div> :
                    <div>
                      <button onClick={() => {
                        this.setState({
                          "uploadModalVisible": true
                        })
                      }}>Upload files</button>
                      <button className="refreshButton" onClick={() => {
                        this.refreshFiles()
                      }}>Refresh</button>
                      <FileBrowser className="fb"
                        files={this.state.files}
                        onSelect={this.handleSelected}
                        detailRenderer={() => { return null}}
                      />
                    </div>
                  }

                </div>

              :
              <div>
                <h1>Enter your drive info</h1>
                <div className="signInForm">
                  <input value={this.state._projectKeyInputText} onChange={evt => this.updateProjectKeyInputTextValue(evt)} placeholder="Project key"></input>
                  <br></br>
                  <input value={this.state._driveNameInputText} onChange={evt => this.updateDriveNameTextValue(evt)} placeholder="Drive Name"></input>
                  <br></br>
                  <button onClick={() => {
                    try {
                      const deta = Deta(this.state._projectKeyInputText)
                      const drive = deta.Drive(this.state._driveNameInputText)
                      drive.list()


                      this.setState({ ...this.setState, projectKey: this.state._projectKeyInputText, driveName: this.state._driveNameInputText }, () => {
                        console.log(this.state.projectKey)
                        console.log(this.state.driveName)
                        this.refreshFiles()
                      })
                    } catch {
                      this.setState({
                        "errorText": "Something's not right with your credentials. Please check them and try again."
                      })
                    }
                  }}>Open Drive</button>
                </div>
                <br></br>
                {this.state.errorText === null ? <span></span> : <p className="signInError">{this.state.errorText}</p>}

              </div>
            }
          </section>
        </div>
      </div>
    );
  }
}

export default App;
