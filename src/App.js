import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import formData from './form.json';
import validator from './validator';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isValidated: false,
      showErrorMsg: false
    };
  }

  renderForm() {
    const data = formData;
    return data.map((item, i) => {
      switch (item.inputType) {
        case 'select':
          return <div className="form-group" key={i}>
            <label htmlFor={item.name}
              className="form-label">
              {item.label}
            </label>

            <div className="form-input">
              <select ref={item.name}>
                {item.options.map((e, key) => {
                  return <option key={key} value={e}>{e}</option>;
                })}
              </select>
            </div>
          </div>
        case 'options':
          return <div className="form-group" key={i}>
            <label htmlFor={item.name}
              className="form-label">
              {item.label}
            </label>

            <input type="checkbox" name={item.name} value="item.name" />
          </div>
        default:
          if (item.hasOwnProperty('children')) {
            return <div className="form-group" key={i}>
              <label htmlFor={item.name}
                className="form-label">
                {item.label}
              </label>
              {item.children.map((e, key) => {
                return <div className="form-input" key={key}> 
                  <input type={e.inputType}
                    className="form-control"
                    ref={item.name + '.' + e.name}
                    placeholder={e.name} />
                </div>
              })}
              </div>
          } else {
            return <div className="form-group" key={i}>
              <label htmlFor={item.name}
                className="form-label">
                {item.label}
              </label>
              <div className="form-input">
                <input type={item.inputType}
                  className="form-control"
                  ref={item.name}
                  placeholder="" />
              </div>
            </div>
          }
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const exportData = {};
    console.log('refs:', this.refs);
    if (validator(this.refs, formData)) {
      for (const field in this.refs) {
        exportData[field] = this.refs[field].value;
      }
      console.log('-->', exportData);
      this.exportForm(exportData);
    }
  }

  exportForm(formData) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "data.json");
    dlAnchorElem.click();
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Dynamic React Form</h1>
        </header>
        <div className="container">
          <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
            {this.renderForm()}
            <button className="submit-button" type="submit">Submit</button>
          </form>
        </div>
        <a id="downloadAnchorElem" className="hidden"></a>
      </div>
    );
  }
}

export default App;
