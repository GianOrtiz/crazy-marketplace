import Server from "./application/server";

const main = async () => {
    const server = new Server();
    await server.start();
};

main();
