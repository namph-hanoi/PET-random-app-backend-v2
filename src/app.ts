import express from "express";
import { Container } from "typedi";
import path from "path";
import compression from "compression";
import cookieParser from "cookie-parser";
import {
  useExpressServer,
  getMetadataArgsStorage,
  useContainer,
  Action,
} from "routing-controllers";
import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import config from "config";
import passport from "passport";
import session from "express-session";
import { connectDB } from "@/config/sequelize.connection";
import { appPort } from "@/config/envVar";
import { UserService } from "./components/User/user.service";
export default class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(Controllers: Function[]) {
    this.app = express();
    this.port = appPort || 4000;
    this.env = process.env.NODE_ENV || "development";
    this.connectToDatabase();

    this.initializeMiddlewares();

    this.initializeRoutes(Controllers);
    this.initializePassport();
  }

  private initializeMiddlewares() {
    this.app.use(hpp());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(express.static("public"));
    // Todo: apply corsOptionsDelegate, more info: https://www.npmjs.com/package/cors
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(
      session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );
  }

  private initializePassport() {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }



  private async connectToDatabase() {
    try {
        await connectDB();
        // todo: replace by logging tool
        console.log('💿 Connection has been established successfully.');
      } catch (error) {
        // todo: replace by logging tool
        console.error('💥 Unable to connect to the database:', error);
      }
  }

  private initializeRoutes(controllers: Function[]) {
    useContainer(Container);
    useExpressServer(this.app, {
      cors: {
        // origin: config.get("cors.origin"),
        // credentials: config.get("cors.credentials"),
      },
      routePrefix: "/api/v1",
      middlewares: [path.join(__dirname + "/middlewares/*{.ts,.js}")],
      controllers: [path.join(__dirname + "/components/**/*{controller.ts,controller.js}")],
      interceptors: [path.join(__dirname + "/interceptors/*{.ts,.js}")],
      defaultErrorHandler: false,
      authorizationChecker: async (action: Action, roles: string[]) => {
        const bearer = action.request.headers["authorization"];
        if (bearer) {
          const token = bearer.split(" ")[1];
          // find user
          const userService: UserService = Container.get(UserService);
          const { role } = userService.deriveDataFromToken(token);
          if (roles.includes(role)) {
            return true;
          // logger.info(`email: ${email}`);
          }
        }
        return false;
      },
      currentUserChecker: async (action: Action) => {
        const bearer = action.request.headers["authorization"];
        if (bearer) {
          const token = bearer.split(" ")[1];
          // find user
          const userService: UserService = Container.get(UserService);
          const { email } = userService.deriveDataFromToken(token);
          return await userService.findOne(email);
      }}
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
        console.log('🤟 Listening on port ', this.port)
    });
  }
}
