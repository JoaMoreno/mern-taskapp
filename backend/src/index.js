require("dotenv").config();

const app = require("./app");

// Start server
async function init(){
    await app.listen(app.get("port"));
    console.log(" * Server on http://localhost:" + app.get("port")+"/")
}
init();