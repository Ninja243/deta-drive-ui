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
      errorText: null,
      previewFile: null,
      count: 0,
      files: [],
      projectKey: null, // "a0wrh1g2_HdF5xo6FkZjP1CAhGKd5aReAbTno332s",
      driveName: null, //"testDrive",
      uploadModalVisible: false,
      filesToUpload: [],
      fileDropText: "Drop your files here"
    }
  }

  componentDidMount = async () => {
    // TODO check env var
    if (this.state.projectKey !== null && this.state.driveName !== null) {
      this.refreshFiles()
    }
  }

  refreshFiles = async () => {
    var deta = Deta(this.state.projectKey)
    var drive = deta.Drive(this.state.driveName)
    var everything = await drive.list()
    this.setState({ "files": [] })
    everything['names'].forEach(async (element) => {
      let tempObj = {
        key: element,
        // modified: null,
        // size: null
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
        console.log(e)
        this.setState({
          "previewFile": {
            "url": downloadURL,
            "file": e,
            "name": name
          }
        })
      })
    } else {// TODO
      drive.get(prefix + files.key)
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

  uploadStoredFiles = async () => {
    const deta = Deta(this.state.projectKey)
    const drive = deta.Drive(this.state.driveName)
    console.log(this.state.filesToUpload)
    for (const file of this.state.filesToUpload) {
      console.log(file)
      const fr = new FileReader();
      let contentType = "binary/octet-stream"
      const images = ["bmp", "cod", "gif", "ief", "jpe", "jpeg", "jpg", "jfif", "png", "svg"]
      const videos = ["mp4", "webm"]
      const sounds = ["wav", "wave", "ogg", "mp3"]
      if (images.includes(file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1))) {
        contentType = "image/" + file.name.substring(file.name.lastIndexOf('.') + 1);
      }
      if (videos.includes(file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1))) {
        contentType = "video/" + file.name.substring(file.name.lastIndexOf('.') + 1);
      }
      if (sounds.includes(file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1))) {
        contentType = "audio/" + file.name.substring(file.name.lastIndexOf('.') + 1);
      }
      fr.onload = () => {
        const array = new Uint8Array(fr.result);
        const resultPromise = drive.put(file.name, { 'data': array, 'contentType': contentType }).then(() => {
          // Success
          if (resultPromise !== null) {
            this.setState({
              filesToUpload: this.state.filesToUpload.splice(this.state.filesToUpload.indexOf(file), 1),
            })
          } 
        })
      }
      fr.readAsArrayBuffer(file).then(() => {
        if (this.state.filesToUpload.length > 0) {
          console.error("Failed to upload files", this.state.filesToUpload)
        }

        this.setState({
          filesToUpload: [],
          fileDropText: "Drop your files here",
          uploadModalVisible: false
        })
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="w2 pcolor">

          <br />
          <br />

          <nav className="navbar pcolor" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item nav1" href="https://deta.sh">
                <img alt="" src="https://uploads-ssl.webflow.com/5eb96efa78dc680fc15be3be/5ec58c9b49c21c4535eead5a_logo-250.png" className="img1"></img>
              </a>
              <h2 className="navbar-item header1"> Deta Drive Explorer</h2>

            </div>

          </nav>

          {!(this.state.projectKey !== null && this.state.driveName !== null) ?
            <header>
              <h3 className="subtitle is-4">Exploring your Deta Drive is now only a few clicks away! <br /><i>Heavily</i> based on <a href="https://explorer.deta.dev/" target="_blank" rel="noreferrer">Deta Base Explorer</a>. Check out the code for
                  this project at <span><a target="_blank" rel="noreferrer" href="https://github.com/Ninja243/deta-base-explorer">GitHub</a></span>.
                </h3>
            </header>
            :
            <div className="signOut">
              <button onClick={() => { this.setState({ "driveName": null, "projectKey": null }); }}>Sign out</button>
            </div>

          }


          <section >
            {(this.state.projectKey !== null && this.state.driveName !== null) ?

              this.state.previewFile !== null ?

                <div>
                  <h1 className="previewHeader">Preview</h1>
                  {this.state.previewFile.file.type?.startsWith("image") ?
                    <div className="preview"><img alt="A preview of the stored file" src={this.state.previewFile.url}></img></div> :
                    this.state.previewFile.file.type?.startsWith("video") ?
                      <div className="preview"><video src={this.state.previewFile.url}></video></div> :
                      this.state.previewFile.file.type?.startsWith("audio") ?
                        <div className="preview"><audio src={this.state.previewFile.url} controls></audio></div> :
                        this.state.previewFile.file.type?.startsWith("text") ?
                          <div className="preview"><pre>{(new FileReader().onload = (e) => { return e }).readAsText(this.state.previewFile.file)}</pre></div> :
                          <div className="preview"><h3>File can't be previewed</h3></div>
                  }
                  <div className="controls">
                    <button onClick={() => { this.refreshFiles(); this.setState({ "previewFile": null }) }}>&#8249;</button>
                    <button onClick={() => {
                      var deta = Deta(this.state.projectKey)
                      var drive = deta.Drive(this.state.driveName)
                      drive.delete(this.state.previewFile.name)
                      this.state.files.splice(this.state.files.indexOf(this.state.previewFile), 1)
                      this.setState({ "previewFile": null })
                      this.refreshFiles()
                    }}>
                      Delete {this.state.previewFile.name}
                    </button>
                    <button onClick={() => {
                      window.location.href = this.state.previewFile.url
                    }
                    }>Download {this.state.previewFile.name}</button>
                  </div>
                </div>

                :
                <div>
                  {this.state.uploadModalVisible ? <div>
                    <FileDrop onDrop={(files, event) => {
                      this.setState({
                        "filesToUpload": files
                      }, () => {
                        this.setState({
                          "fileDropText": "Uploading ..."
                        }, () => {
                          this.uploadStoredFiles()
                        })
                        

                      })
                    }}>
                      {this.state.fileDropText}
                    </FileDrop>
                    <button onClick={() => {
                      this.setState({
                        "uploadModalVisible": false
                      })
                    }}>&#8249;</button>
                  </div> :
                    <button onClick={() => {
                      this.setState({
                        "uploadModalVisible": true
                      })
                    }}>Upload files</button>}
                  <FileBrowser className="fb"
                    files={this.state.files}
                    onSelect={this.handleSelected}

                  />
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
                  }}>Sign in</button>
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
