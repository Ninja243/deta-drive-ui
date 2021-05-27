//import logo from './logo.svg';
import './App.css';

function App() {
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

        <header>
          <h1 className="subtitle is-4">Exploring your Deta Drive is now only a few clicks away! <br /><strong>Heavily</strong> based on <a href="https://explorer.deta.dev/" target="_blank" rel="noreferrer">Deta Base Explorer</a>. Check out the code for
      this project at <span><a target="_blank" rel="noreferrer" href="https://github.com/Ninja243/deta-base-explorer">GitHub</a></span>.
    </h1>
        </header>
        <section>
          <form className="f1">
            <label className="l1">Project Key  </label>
            <input id="projectKey" className="input l2" type="text" placeholder="Enter Project Key"></input>

            <label className="l3">Drive Name  </label>
            <input id="driveName" className="input i1" type="text" placeholder="Enter Drive" ></input>

            <label className="l4">Key </label>
            <input id="entryKey" className="input i2" type="text" placeholder="Optional Key Input"></input>
          </form>
          <br /><br />

          <div className="d1">
            <button id="getAll" className="button b1">
              List Files
            </button>

            <button id="get" className="button b2">
              Get (with Key)
              </button>

            <button id="delete" className="button b3">
              Delete (with Key)
              </button>
          </div>
          <br />
          <div className="d1">
            <button id="put" className="button b3">
              Put Data (with Key)
          </button>
          </div>

          <br />

          <div className="d3">
            <h4 className="subtitle is-3" id="resultText">
            </h4>
          </div>

          <br />

          <div id="inputArea" className="d4" >
            <p className="subtitle is-4 App">Add your labels and values in the respective input fields<br />
          If you do not provide a key, a random key will be added to the entry</p>
            <div id="inputText" className="d1">

            </div>
            <br />
            <div className="d1">
              <button id="putConfirm" className="button b1" >
                Write into your Drive!
            </button>
            </div>
          </div>




          <br />
          <div id="tableDiv" className="table-container tc">
            <table id="dataTable" className="table w1">
              <thead>
                <tr>
                  <th className="w3">Index</th>
                  <th className="w1">Data</th>
                </tr>
              </thead>
              <tbody id="tableBody">

              </tbody>
            </table>
          </div>

          <br />
          <br />

        </section>
      </div>
    </div>
  );
}

export default App;
