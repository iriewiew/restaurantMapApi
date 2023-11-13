const express = require('express')
const app = express()
const port = 9000
const cors = require('cors');

const maps = require('./router/maps')

app.use(cors({ origin: '*' }));
app.use('/maps', maps)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})