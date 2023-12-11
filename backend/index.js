const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
app.use(cors());
app.use(express.json())
const multer = require('multer'); // Для обработки загрузки файлов
const path = require('path');
const port = process.env.PORT || 3001
const bcrypt = require('bcrypt');
const format = require('date-fns/format');


const hashedPassword = '$2a$12$pwpMaHikNeucenr1njwgDuar65C.l15oMJVyZwgRmk2hI3n/aaS2K'

app.use('/files', express.static('src/images'));

// Генерация JWT токена
function generateToken(user) {
  return jwt.sign(user, '2', { expiresIn: '3h' });
}

function authenticateUser(password, callback) {
  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) {
      console.error('Ошибка при сравнении паролей:', err);
      callback(null); // Вызываем callback с null в случае ошибки
    } else if (result) {
      console.log('Пароль верный');
      callback({ role: 'admin' }); // Вызываем callback с объектом пользователя
    } else {
      console.log('Пароль неверный');
      callback(null); // Вызываем callback с null, если пароль неверный
    }
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/images'); // Путь к папке, где будут сохраняться файлы
  },
  filename: (req, file, cb) => {
    // Генерируйте уникальное имя файла, чтобы избежать перезаписи
    const uniqueFileName = `${file.originalname}`;
    cb(null, uniqueFileName);
  },
});
const upload = multer({ storage });


app.post('/login', (req, res) => {
  const password = req.body.password;

  authenticateUser(password, (user) => {
    if (!user) {
      return res.status(401).json({ message: 'Аутентификация не удалась' });
    }

    const token = generateToken(user);
    res.json(token);
  });
});

app.get('/get', (req, res) => {
  res.send('Server works')
})

app.get('/get_products_w', (req, res) => {

  const searchParams = req.query.params

  if (!searchParams) {
    res.status(401).json({ message: "" })
  }

  fs.readFile('./src/data/products.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения JSON-файла:', err);
      return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
    }

    try {
      // Распарсить JSON-данные
      const jsonData = JSON.parse(data);

      let searchData = [];
      let searchParamsArr = searchParams.split(' ');

      if (searchParams !== '-') {
        searchParamsArr.map((e) => {
          jsonData.map((element) => {
            if (element.searchWords.some(word => word.toLowerCase() === e.toLowerCase())) {
              searchData.push(element);
            }
          });
        });
      }

      let uniqueArray = []

      searchData.forEach((obj) => {
        if (!uniqueArray.some((item) => JSON.stringify(item) === JSON.stringify(obj))) {
          uniqueArray.push(obj);
        }
      });
      // Отправить JSON-данные в ответе
      res.json(uniqueArray);
    } catch (parseError) {
      console.error('Ошибка при разборе JSON:', parseError);
      res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
    }
  });
})

app.get('/get_products_c', (req, res) => {

  const category = JSON.parse(req.query.category);

  if (!category) {
    res.status(401).json({ message: "категорий нету" })
  }

  fs.readFile('./src/data/products.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения JSON-файла:', err);
      return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
    }

    try {
      // Распарсить JSON-данные
      const jsonData = JSON.parse(data);

      let searchData = []
      if (category !== "-") {
        category.map((categoryElement) => {
          jsonData.map((element) => {
            if (element.category.includes(categoryElement)) {
              console.log("include")
              searchData.push(element)
              console.log(searchData)
            }
          })
        })
      }

      const uniqueArray = [];
      for (let item of searchData) {
        if (uniqueArray.indexOf(item) === -1) {
          uniqueArray.push(item);
        }
      }

      // Отправить JSON-данные в ответе
      res.json(uniqueArray);
    } catch (parseError) {
      console.error('Ошибка при разборе JSON:', parseError);
      res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
    }
  });
})

app.get('/get_products_by_id', (req, res) => {
  const id = req.query.id
  if (!id) {
    res.status(401).json({ message: "" })
  }

  fs.readFile('./src/data/products.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения JSON-файла:', err);
      return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
    }

    try {
      // Распарсить JSON-данные
      const jsonData = JSON.parse(data);
      // let product = []
      jsonData.map((element) => {
        if (parseInt(element.id) === parseInt(id)) {
          // product.push(element)
          res.json(element);
        }
      });
      // Отправить JSON-данные в ответе

    } catch (parseError) {
      console.error('Ошибка при разборе JSON:', parseError);
      res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
    }
  });
})

app.get('/get_new_products', (req, res) => {
  fs.readFile('./src/data/products.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения JSON-файла:', err);
      return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
    }

    try {
      // Распарсить JSON-данные
      const jsonData = JSON.parse(data);

      const newProducts = jsonData.filter((element) => element.isNew === true);
      // Отправить JSON-данные в ответе
      res.json(newProducts);
    } catch (parseError) {
      console.error('Ошибка при разборе JSON:', parseError);
      res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
    }
  });
})

app.post('/upload', upload.single('file'), (req, res) => {
  console.log("Запрос на фото")
  console.log(`Фото: ${req.file}`)
  const file = req.file;
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }
  if (!file) {
    return res.status(401).json({ message: 'Файлы отсутствуют' });
  }

  jwt.verify(token, '2', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Недействительный токен' });
    }

    // Проверка роли пользователя
    if (decodedToken.role === 'admin') {
      console.log('Роль "admin" подтверждена');

      fs.readFile('./src/data/products.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Ошибка чтения JSON-файла:', err);
          return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }

        try {
          // Распарсить JSON-данные
          const jsonData = JSON.parse(data);

          jsonData[jsonData.length - 1].img = file.originalname

          const updatedData = JSON.stringify(jsonData, null, 2);
          fs.writeFile('./src/data/products.json', updatedData, 'utf8', (writeErr) => {
            if (writeErr) {
              console.error('Ошибка записи JSON-файла:', writeErr);
              return res.status(500).json({ error: 'Произошла ошибка при записи JSON-файла' });
            }

            // Отправить JSON-данные в ответе
            res.json(jsonData);
          });

        } catch (parseError) {
          console.error('Ошибка при разборе JSON:', parseError);
          res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
      });

    } else {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }
  });
})

app.post('/upload_data', (req, res) => {

  const cost = req.body.cost
  const title = req.body.title
  const categories = req.body.categories
  const searchWords = req.body.tags
  const descriptionState = req.body.descriptionState
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }
  if (!cost) {
    return res.status(401).json({ message: 'Файлы отсутствуют' });
  }
  if (!title) {
    return res.status(401).json({ message: 'Файлы отсутствуют' });
  }
  if (!categories) {
    return res.status(401).json({ message: 'Файлы отсутствуют' });
  }
  if (!searchWords) {
    return res.status(401).json({ message: 'Файлы отсутствуют' });
  }
  if (!descriptionState) {
    return res.status(401).json({ message: 'Файлы отсутствуют' });
  }



  jwt.verify(token, '2', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Недействительный токен' });
    }

    // Проверка роли пользователя
    if (decodedToken.role === 'admin') {
      console.log('Роль "admin" подтверждена');

      fs.readFile('./src/data/products.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Ошибка чтения JSON-файла:', err);
          return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }

        try {
          // Распарсить JSON-данные
          const jsonData = JSON.parse(data);
          const currentDate = new Date();
          const newElement = {
            id: currentDate.getTime(),
            img: "-",
            title: title,
            cost: cost,
            searchWords: searchWords,
            category: categories,
            date: format(currentDate, 'dd.MM.yyyy'),
            description: descriptionState,
            isNew: true
          }
          jsonData.push(newElement)

          const updatedData = JSON.stringify(jsonData, null, 2);
          fs.writeFile('./src/data/products.json', updatedData, 'utf8', (writeErr) => {
            if (writeErr) {
              console.error('Ошибка записи JSON-файла:', writeErr);
              return res.status(500).json({ error: 'Произошла ошибка при записи JSON-файла' });
            }

            // Отправить JSON-данные в ответе
            res.status(200).json(jsonData);
          });

        } catch (parseError) {
          console.error('Ошибка при разборе JSON:', parseError);
          res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
      });

    } else {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }
  });
})

app.post('/change_data', (req, res) => {

  const id = req.body.id
  const title = req.body.title
  const cost = req.body.cost
  const searchWords = req.body.tags
  const categories = req.body.categories
  const date = req.body.date
  const descriptionState = req.body.descriptionState
  const isNew = req.body.isNew
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }
  if (!id) {
    return res.status(401).json({ message: 'Файлы1 отсутствуют' });
  }
  if (!title) {
    return res.status(401).json({ message: 'Файлы2 отсутствуют' });
  }
  if (!cost) {
    return res.status(401).json({ message: 'Файлы3 отсутствуют' });
  }
  if (!searchWords) {
    return res.status(401).json({ message: 'Файлы4 отсутствуют' });
  }
  if (!categories) {
    return res.status(401).json({ message: 'Файлы5 отсутствуют' });
  }
  if (!date) {
    return res.status(401).json({ message: 'Файлы6 отсутствуют' });
  }
  if (!descriptionState) {
    return res.status(401).json({ message: 'Файлы6 отсутствуют' });
  }
  if (isNew === undefined || isNew === null) {
    return res.status(401).json({ message: 'Файлы7 отсутствуют' });
  }

  jwt.verify(token, '2', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Недействительный токен' });
    }

    if (decodedToken.role === 'admin') {
      console.log('Роль "admin" подтверждена');

      fs.readFile('./src/data/products.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Ошибка чтения JSON-файла:', err);
          return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }

        try {
          // Распарсить JSON-данные
          const jsonData = JSON.parse(data);
          jsonData.map((element) => {
            if (element.id === id) {
              element.title = title
              element.cost = cost
              element.searchWords = searchWords
              element.category = categories
              element.date = date
              element.description = descriptionState
              element.isNew = isNew

              res.status(200).json(element)
            }
          })

          const updatedData = JSON.stringify(jsonData, null, 2);
          fs.writeFile('./src/data/products.json', updatedData, 'utf8', (writeErr) => {
            if (writeErr) {
              console.error('Ошибка записи JSON-файла:', writeErr);
              return res.status(500).json({ error: 'Произошла ошибка при записи JSON-файла' });
            }

            // Отправить JSON-данные в ответе
          });

        } catch (parseError) {
          console.error('Ошибка при разборе JSON:', parseError);
          res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
      });

    } else {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }
  });
})

app.post('/delete_data', (req, res) => {

  const id = req.body.id
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }
  if (!id) {
    return res.status(401).json({ message: 'Файлы отсутствуют' });
  }



  jwt.verify(token, '2', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Недействительный токен' });
    }

    if (decodedToken.role === 'admin') {
      console.log('Роль "admin" подтверждена');

      fs.readFile('./src/data/products.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Ошибка чтения JSON-файла:', err);
          return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }

        try {
          // Распарсить JSON-данные
          const jsonData = JSON.parse(data);
          let newArray = []
          jsonData.map((element) => {
            if (element.id !== id) {
              newArray.push(element)
            }
          })

          const updatedData = JSON.stringify(newArray, null, 2);
          fs.writeFile('./src/data/products.json', updatedData, 'utf8', (writeErr) => {
            if (writeErr) {
              console.error('Ошибка записи JSON-файла:', writeErr);
              return res.status(500).json({ error: 'Произошла ошибка при записи JSON-файла' });
            }

            // Отправить JSON-данные в ответе
            res.status(200).json(jsonData);
          });

        } catch (parseError) {
          console.error('Ошибка при разборе JSON:', parseError);
          res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
      });

    } else {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }
  });
})

app.post('/unset_new', (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }

  jwt.verify(token, '2', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Недействительный токен' });
    }

    if (decodedToken.role === 'admin') {
      console.log('Роль "admin" подтверждена');

      fs.readFile('./src/data/products.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Ошибка чтения JSON-файла:', err);
          return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }

        try {
          // Распарсить JSON-данные
          const jsonData = JSON.parse(data);

          // Функция для преобразования строки в объект Date
          function parseDate(dateString) {
            const dateParts = dateString.split('.');
            // Месяцы в JavaScript начинаются с 0, поэтому вычитаем 1 из номера месяца
            return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
          }

          // Текущая дата
          const currentDate = new Date();

          jsonData.map(element => {
            const elementDate = parseDate(element.date);
            const daysDifference = (currentDate - elementDate) / (1000 * 60 * 60 * 24);

            if (daysDifference > 7) {
              element.isNew = false;
            }
          });

          const updatedData = JSON.stringify(jsonData, null, 2);
          fs.writeFile('./src/data/products.json', updatedData, 'utf8', (writeErr) => {
            if (writeErr) {
              console.error('Ошибка записи JSON-файла:', writeErr);
              return res.status(500).json({ error: 'Произошла ошибка при записи JSON-файла' });
            }

            // Отправить JSON-данные в ответе
            // res.status(200).json(jsonData);
          })

        } catch (parseError) {
          console.error('Ошибка при разборе JSON:', parseError);
          res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
      });

    } else {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }
  });
})


app.listen(port, () => {
  console.log("Server started")
})