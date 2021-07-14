import config from "./config/config";
import connect from "./database";
import app from "./app";

async function main() {
    await connect();
    app.listen(config.PORT, () => {
        console.log("Server on port", config.PORT);
    });
}

main();