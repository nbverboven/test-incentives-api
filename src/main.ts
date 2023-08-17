import {createApp} from "./app";

const port = 3000;

createApp()
    .then(app => app.listen(port, () => {
        console.log(`Starting app listening on port ${port}`);
    }));
