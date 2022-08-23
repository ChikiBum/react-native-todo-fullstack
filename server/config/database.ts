// import config from "config";
import { ConnectionOptions, connect } from "mongoose";

const connectDB = async () => {
    const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_DB } = process.env;

    try {
        // eslint-disable-next-line max-len
        const mongoURI: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority`;
        const options: ConnectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await connect(mongoURI, options);
        // tslint:disable-next-line:no-console
        console.log("MongoDB Connected...");
    } catch (err: any) {
    // tslint:disable-next-line:no-console
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;
