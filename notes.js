// Deployment of Express Server on Heroku requires... 
PORT = process.env.PORT || 3000

//then your app can listen on PORT:
app.listen(PORT, ()=>{
  console.log(`Server now listening on ${PORT}`)
})


// note that Heroku only deploys code that's pushed to Master or Main branch
// pushing code to another branch of the Heroku remote has no effect.

// get around this by deploying a non-main branch (testbranch) to Heroku...
// git push heroku testbranch:main     (MAIN instead of MASTER, as of Oct 1st 2020)


// Development ENV: where we code new features, fix bugs, make code updates. Usually on local machine; won't affect production environment. Should have separate Keys and Config files.
// Testing ENV
//(project release)
// Staging ENV
// Production ENV: where live application lives (github pages, heroku, aws...). Hosts updated and tested version of code, accessible to users. Has its own dedicated database: not connected to or affected by development ENV's (local) database. Production DB hosted on the cloud: MongoDB Atlas for mongo db, jawsDB for MySQL db.