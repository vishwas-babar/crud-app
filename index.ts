import express from 'express';
import userRouter from "./routes/user.route";
const port = 4545;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
