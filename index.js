require('dotenv').config()

const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	accountSid = process.env.TWILIO_ACCOUNT_SID,
	authToken = process.env.TWILIO_AUTH_TOKEN,
	client = require('twilio')(accountSid, authToken)


app.use(bodyParser({ extended: false }))

app.get('/', (req, res) => {	
	res.send('<h1>Send and review Github PRs via Twilio Fax API</h1>')
})

app.post('/fax', (req, res) => {
	client.fax.faxes.create({
		from: '+61488845130',
		to: '+61488845130',
		mediaUrl: 'https://amyskapers.dev/files/fax.pdf'
	})
	.then(fax => console.log(fax))
})

app.post('/sent', (req, res) => {
	const twiml = `<Response><Receive action="/receive" /></Response>`

	res.type('text/xml')
	res.send(twiml)
})

app.post('/receive', (req, res) => {
	console.log(req.body.MediaUrl)

	res.status(200)
	res.send()
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
})
