const { json } = require('express')
const express = require('express')
const cors = require('cors')
const { BlogPosts } = require('./BlogModel')
const app = express()



app.use(cors())
app.use(json())

app.get('/api/posts', (req, res) => {
	res.status(200).send(BlogPosts)
})

app.get("/api/posts/:slug", (req, res) => {
	const { slug } = req.params
	res.status(200).send(BlogPosts.filter(article => article.slug === slug)[0])
})

app.post("/api/posts", (req, res) => {
	const { slug, title, description } = req.body

	BlogPosts.push({ slug, title, description })

	res.status(200).send("ok");
})

app.get("/api/posts/stats/count", (req, res) => {
	res.status(200).send(BlogPosts.length)
})


app.post("/api/auth/login", (req, res) => {
	const { username, password } = req.body
	console.log("body: ", { username, password })
	if (username == 'admin' && password == 'admin') {
		console.log("sysy")
		res.status(200).send("login success")
	} else {
		res.status(401).send("Unauthorized")
	}
})

app.get("/api/search/posts", (req, res) => {
	const { keyword } = req.query
	const posts = [];

	for (let article of BlogPosts) {
		if (article.title.toLowerCase().includes(keyword.toLocaleLowerCase())) {
			posts.push(article)
		}
	}

	res.status(200).send(posts)

})
app.listen(8080, () => {
	console.log("server is running")
})