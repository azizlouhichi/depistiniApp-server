# Server core

## Requirement

| package | min version |
| ------- | ----------- |
| nodejs  | `>=16.17.1` |
| yarn    | `>=1.22.19` |

## Create .env file

```bash

```

```bash
# copy the .env example by
cp .env.example .ev
# OR
# required
MONGO_URI=<YOUR_URL>
#  not required
PORT=<SERVER_PORT>
```

## project structure

```bash
#
---/config
-----------/database.ts
-----------/env.ts
#
---/errors
#
---/i18n
# Any third libraries
---/middlewares
-----------/firebase
-----------/aws
-----------/emails
-----------/bycrypt
-----------/socket
-----------/redis
-----------/validators
# Database schema
---/models
-----------/user.model.ts
# API Routes
---/routes
-----------/user.route.ts
#
---/controllers
-----------/user.controller.ts
#
---/services
-----------/user.service.ts
#
---/types
-----------/user
----------------/model.ts
----------------/response.ts
---/helpers

```

## Mongoose v6 migration

Full Guide : https://mongoosejs.com/docs/migrating_to_6.html#version-requirements

1- `connect` method

```typescript
// No longer necessary: default to true
const options: ConnectOptions = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
};
await mongoose.connect(uri, options);
```

2- Removed `omitUndefined`: Mongoose now removes `undefined` keys in updates instead of setting them to `null`

```javascript
let res = await Test.findOneAndUpdate({}, { $set: { name: undefined } }, { new: true });

res.name; // `null` in Mongoose 5.x

// Equivalent to `findOneAndUpdate({}, {}, { new: true })` because `omitUndefined` will
// remove `name: undefined`
res = await Test.findOneAndUpdate({}, { $set: { name: undefined } }, { new: true, omitUndefined: true });
// In Mongoose 6, equivalent to `findOneAndUpdate({}, {}, { new: true })` because Mongoose will
// remove `name: undefined`
const res = await Test.findOneAndUpdate({}, { $set: { name: undefined } }, { new: true });
```

3- You no longer need to `markModified()` after setting an array index directly.

```javascript
const post = await BlogPost.findOne();

post.tags[0] = 'javascript';
await post.save(); // Works, no need for `markModified()`!
```

4- `autoCreate` Defaults to true

5- Removed `execPopulate()`
