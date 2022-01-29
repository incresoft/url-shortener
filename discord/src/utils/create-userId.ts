import Schema from "#models/user";

const createId = async () => {
    return new Promise(async (resolve, reject) => {
        const data: string[] = [];
        const users = Schema.find({});

        return users.exec((err, x) => {
            x.forEach((u: { _id: string; }) => data.push(u._id));

            if (!data.length) {
                return resolve(10000000);
            } else {
                return resolve(Math.max.apply(null, data) + 1);
            };
        });
    });
};

export default createId;