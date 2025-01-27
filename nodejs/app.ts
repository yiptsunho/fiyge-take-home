import express from 'express';
import dotenv from "dotenv"
import requestInterceptor from "./src/middlewares/RequestInterceptor";
import errorHandler from "./src/middlewares/ErrorHandler";
import FormRoute from "./src/routes/FormRoute";
import HealthCheckRoute from "./src/routes/HealthCheckRoute";
import swaggerSpec from "./swagger";
import swaggerUI from "swagger-ui-express"
import cookieParser from "cookie-parser";
import requireAuthentication from "./src/middlewares/RequireAuthentication";
import AuthRoute from "./src/routes/AuthRoute";
import UserRoute from "./src/routes/UserRoute";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cookieParser())
app.use(requestInterceptor)
app.use("/api/doc", swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use("/api/health-check", HealthCheckRoute)
app.use("/api/login", AuthRoute);
app.use("/api/forms", FormRoute);
app.use("/api/user", UserRoute);
app.use(errorHandler)

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

export default app;
