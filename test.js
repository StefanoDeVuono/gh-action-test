const mongoose = require('mongoose'),
  test = require('ava')

const [DB_ADDR, DB_PORT, REPLICA_NAME] = ['localhost', 27017, 'rsTest']

const mongoUri = `mongodb://${DB_ADDR}:${DB_PORT}/test`,
  options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }

test('connect', async t => {
  const res = await mongoose.connect(mongoUri, options)
  t.pass()
})

test('model', async t => {
  const Cat = mongoose.model('Cat', { name: String })
  const kitty = new Cat({ name: 'Zildjian' })
  const res = await kitty.save()
  t.is(res.name, 'Zildjian')
})
