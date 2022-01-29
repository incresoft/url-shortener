import SchemaURL from "#models/url";
import createCode from "#utils/create-code";

class Database {
  constructor() {}

  public async getURL(code: string) {
    return new Promise(async (resolve, reject) => {
      const url = await SchemaURL.findOne({ _id: String(code) });

      if (!url) {
        return resolve(null);
      } else {
        return resolve(url);
      }
    });
  }

  public async createURL(Redirect: string) {
    return new Promise(async (resolve, reject) => {
      const Code = createCode();

      const url = new SchemaURL({ Redirect, Code });
      await url.save();

      return resolve(Code);
    });
  };

  public async editURL(code: string, data: editURLData): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const body = {} as { code: string; redirect: string };

      if (code) {
        body["code"] = code;
      }

      if (data.redirect) {
        body["redirect"] = data.redirect;
      }

      const url = await SchemaURL.findOne({ _id: String(code) });

      if (!url) {
        return resolve(false);
      } else {
        if (body["code"]) url["_id"] = body["code"];
        if (body["redirect"]) url["Redirect"] = body["redirect"];

        url.save();
        return resolve(true);
      };
    });
  };
};

export interface editURLData {
  code?: string;
  redirect: string;
};

export default new Database();
