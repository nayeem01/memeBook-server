import mongoos from "mongoose";
import endpoint from "./endpoints.config";
// declare var process: {
//     env: {
//         NODE_ENV: string;
//     };"mongodb+srv://admin:admin@cluster0.co4qm.mongodb.net/test"
// };
const connectDB = async () => {
    const conn = await mongoos.connect(endpoint.URL, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`MongoDB connected : ${conn.connection.host}`);
};

export default connectDB;
