"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (r, db) => {
  r.post("/user/findOrCreate", async (req, res) => {
    let user = await db.users.findOne({
      uid: req.body.uid
    });

    if (!user) {
      user = await db.users.insert(req.body);
    }

    res.json(user);
  });
};
//# sourceMappingURL=users.js.map