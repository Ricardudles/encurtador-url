import { NextFunction, Request, response, Response } from "express";
import shortId from "shortid";
import { config } from "../config/Constants";
import { URLModel } from "../model/URL.model";

export class URLController {
  public async shorten(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { originURL } = req.body;

    const url = await URLModel.findOne({ originURL });

    if (url) {
      response.json(url);
      return;
    }

    const hash = shortId.generate();

    const shortURL = `${config.API_URL}/${hash}`;

    const newUrl = URLModel.create({ hash, shortURL, originURL });

    res.json(newUrl);
  }

  public async redirect(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { hash } = req.params;

    const url = await URLModel.findOne({ hash });

    if (url) {
      res.redirect(url);
      return;
    }

    res.status(400).json({ error: "URL not found" });
  }
}
