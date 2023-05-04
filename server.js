const express = require('express')
const { connectToDb, getDb } = require('./db')
var cors = require('cors');
const bodyParser = require('body-parser')

const PORT = 3000

const app = express()

app.use(cors({origin: '*', credentials: true, optionsSuccessStatus: 200}));

let db

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.json()

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, (err) => {
      err ? console.log(err) :  console.log(`Listening port ${PORT}`);
    })
    db = getDb()
  } else {
    console.log(`DB connection error: ${err}`)
  }
})

const collection = 'test2'

// Получение данных 
app.get(`/${collection}`, (req, res, next) => {
  const posts = []

  db
    .collection(collection)
    .find() // cursor - hasNext, next, forEach // 101 element max
    // .sort({ title: 1 })
    .forEach((post) => posts.push(post))
    .then(() => {
      res
        .status(200)
        .json(posts)
    })
    .catch((ex) => {
      res
        .status(500)
        .json({ error: "Something goes wrong..." + ex })
    }
)})

//Создание коллекции
app.post('/addCollection', urlencodedParser, (req, res, next) => {
  if (!req.body) return res.sendStatus(400)

  const name = req.body.name

  // Получаем преобразованое имя коллекции, если его нет генерируем уникальное число
  const random = Math.floor(Math.random() * 1000000)
  const timestamp = new Date().getTime()
  const randomID = timestamp + random
  const clientData = req.body

  const codeName = clientData.transliterationName !== '' ? clientData.transliterationName : 'collection' + randomID

  console.log('Добавлена коллекция: ', codeName)
  
  const description = clientData.desc
  const columnsCount = Object.keys(clientData).length - 3
  const columnsNames = []
  const columnsKeys = Object
                          .keys(clientData)
                          .filter(el => el.indexOf('field') !== -1)
                          .forEach(key => columnsNames.push(clientData[key].name))

  const table = {
    tableName: clientData.name,
    codeName,
    description,
    columnsCount,
    columnsNames,
  }

  // Добавляем поля в зависимости от columnsCount
  for (let i = 1; i <= columnsCount; i++) {
    table['field' + i] = 'Тест'
  }

  console.log(table)

  // Создаем новую коллекцию
  db.createCollection(codeName, (err, collection) => {
    if (err) {
      console.error('Ошибка создания коллекции: ', err)
      return
    } 
  })

  db.collection(codeName).insertOne(table, (err, res) => {
    if (err) {
      console.log('Ошибка при добавлении записи в коллекцию: ', err)
    }
  })
})
    


