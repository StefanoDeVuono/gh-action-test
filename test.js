const mongoose = require('mongoose'),
  { to } = require('await-to-js'),
  test = require('ava')

const [DB_ADDR, DB_PORT, REPLICA_NAME] = ['localhost', 27017, 'rsTest']

const mongoUri = `mongodb://${DB_ADDR}:${DB_PORT}/test?replSet=${REPLICA_NAME}`,
  options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // replicaSet: REPLICA_NAME,
  }

test('connect', async t => {
  const [err, _res] = await to(mongoose.connect(mongoUri, options))
  if (err) t.fail(err)
  t.pass('connected')
})

test('model', async t => {
  const Cat = mongoose.model('Cat', { name: String })
  const kitty = new Cat({ name: 'Zildjian' })
  const [err, res] = await to(kitty.save())
  if (err) t.fail(err)
  t.is(res.name, 'Zildjian', 'model saved')
})
