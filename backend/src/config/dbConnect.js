import { connect } from 'mongoose';

const dbConnect = async () => {
    try {
        const mongoDbConnection = await connect(process.env.MONGO_URL);
        console.log(`Database connected: ${mongoDbConnection.connection.host}`);
    } catch (err) {
        console.log(`Database connection failed ${err}`)
        process.exit(1);
    }
}

export default dbConnect;