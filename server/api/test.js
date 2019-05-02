const router = require('express').Router()
const cors = require('cors')

var corsOptions = process.env.isDev ? {
  origin: 'http://localhost:1234',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
} : {}

router.get('/test', cors(corsOptions), async (req, res) => {

  return res.status(200).json({ message: 'api works!' })

	/*try{
		const url = ''
		const Res = await axios.get(url)

	} catch (err) {
		console.error(err)
		return res.status(500).json({ error: err })
	}*/

})

module.exports = router
