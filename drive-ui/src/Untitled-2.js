
        <section>
          <form className="f1">
            <label className="l1">Project Key  </label>
            <br></br>
            <input id="projectKey" className="input i1" type="text" placeholder="Enter Project Key"></input>
            <br></br>
            <label className="l1">Drive Name  </label>
            <br></br>
            <input id="driveName" className="input i1" type="text" placeholder="Enter Drive" ></input>
            <br></br>
            <label className="l1">Key </label>
            <br></br>
            <input id="entryKey" className="input i1" type="text" placeholder="Optional Key Input"></input>
            <br></br>
          </form>
          <br /><br />

          <div className="d1">
            <button id="getAll" className="button b3">
              List Files
            </button>

            <button id="get" className="button b3">
              Get (with Key)
              </button>

            <button id="delete" className="button b3">
              Delete (with Key)
              </button>
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
              <button id="putConfirm" className="button b3" >
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
        <div className='browser-mount'></div>