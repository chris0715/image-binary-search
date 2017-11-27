const express = require('express')
const app = express()
const request = require('request')
const config = require('./config')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/imageSearch/:img', (req, res) => {
  const parameter = req.params.img
  const options = {
    method: 'GET',
    qs: { q: parameter },
    uri: 'https://api.cognitive.microsoft.com/bing/v7.0/images/search',
    headers: {
      'Ocp-Apim-Subscription-Key': config.key
    },
    json: true    
  }

  request(options, (err, data) => {
    if (err) {
      return res.send('There was a Problem getting your img')
    }
    const simplifiedData = data.body.value.map(item =>{
      return {
        url: item.contentUrl,
        snippet: item.name,
        context: item.hostPageUrl,
        thumbnail: item.thumbnailUrl
      }
    })
    res.send(simplifiedData)
  })

})

app.listen(config.port, _ => console.log('listening on port', config.port))