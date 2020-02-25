import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
const server = 'https://allh8project.japhendywijaya.xyz'

const div = document.createElement('div');
document.body.appendChild(div);
div.setAttribute("id", "Summary");
div.style.setProperty("display", "block", "important");
// document.getElementsByTagName("BODY")[0].style.visibility = "hidden"

// login, register
// show original page
// show all history

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch(message.type) {
    case 'SET_CONTENT':
      injectApp(message.scriptOptions.param);
      break;
  }
});

function injectApp(article) {
  const summaryDiv = document.getElementById('Summary');
  if(!summaryDiv.innerHTML) {
    ReactDOM.render(<Summary article={article} />, summaryDiv);
  }
}

function Summary(props) {
  const [mode, setMode] = useState('o');
  const [loadSum, setLoadSum] = useState(true);
  const loading = [
    'Loading',
    'Summarizing',
    'Reading',
    'Inspecting',
    'Thinking'
  ];
  const [loadingMsg] = useState(loading[Math.floor(Math.random()*loading.length)]);
  const [keypointArr, setKeypointArr] = useState([]);
  const [redactedArr, setRedactedArr] = useState([]);
  const { article } = props;
    
  useEffect(() => {
    if(loadSum) {
      fetch(`${server}/articles/redactedArticle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(article.content.split('. '))
      })
      .then(res => {
        res.text()
      })
      .then((obj) => {
        console.log(obj)
        setKeypointArr(JSON.parse(obj.keyPoint));
        setRedactedArr(JSON.parse(obj.redactedArticle));
        setLoadSum(false);
      })
    }
  }, [loadSum])

  const renderContent = () => {
    switch(mode) {
      case 's':
        if (loadSum) {
          return loadingMsg + '...'
        } else {
          return <ul>{
            keypointArr.map((p) => {
              return <li>{p}</li>;
            })
          }</ul>
        }  
      case 'r':
        if (loadSum) {
          return loadingMsg + '...'
        } else {
          return redactedArr
        }
      default:
        return article.content      
    }
  }

  return (
    <div>
      <select id="select-mode" value={mode} onChange={e=>setMode(e.target.value)}>
        <option value="o">Original</option>
        <option value="s">Summarised</option>
        <option value="r">Redacted</option>
      </select>
      <h1 id="title">{article.title}</h1>
      <h4 id="author">{article.author}</h4>
      <div id="content">{renderContent()}</div>
    </div>
  );
}