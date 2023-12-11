var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var fs = require('fs');
var cors = require('cors');
app.use(cors());
app.use(express.json());
var multer = require('multer'); // Для обработки загрузки файлов
var path = require('path');
var port = process.env.PORT || 3001;
var bcrypt = require('bcrypt');
var format = require('date-fns/format');
app.use('/files', express.static('src/images'));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/images'); // Путь к папке, где будут сохраняться файлы
    },
    filename: function (req, file, cb) {
        // Генерируйте уникальное имя файла, чтобы избежать перезаписи
        var uniqueFileName = "".concat(file.originalname);
        cb(null, uniqueFileName);
    },
});
var upload = multer({ storage: storage });
app.get('/get', function (req, res) {
    res.send('Server works');
});
app.get('/get_products_w', function (req, res) {
    var searchParams = req.query.params;
    if (!searchParams) {
        res.status(401).json({ message: "" });
    }
    fs.readFile('./src/data/products.json', 'utf8', function (err, data) {
        if (err) {
            console.error('Ошибка чтения JSON-файла:', err);
            return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }
        try {
            // Распарсить JSON-данные
            var jsonData_1 = JSON.parse(data);
            var searchData_1 = [];
            var searchParamsArr = searchParams.split(' ');
            if (searchParams !== '-') {
                searchParamsArr.map(function (e) {
                    jsonData_1.map(function (element) {
                        if (element.searchWords.some(function (word) { return word.toLowerCase() === e.toLowerCase(); })) {
                            searchData_1.push(element);
                        }
                    });
                });
            }
            console.log(searchData_1);
            var uniqueArray_1 = [];
            searchData_1.forEach(function (obj) {
                if (!uniqueArray_1.some(function (item) { return JSON.stringify(item) === JSON.stringify(obj); })) {
                    uniqueArray_1.push(obj);
                }
            });
            // Отправить JSON-данные в ответе
            res.json(uniqueArray_1);
        }
        catch (parseError) {
            console.error('Ошибка при разборе JSON:', parseError);
            res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
    });
});
app.get('/get_products_c', function (req, res) {
    var category = JSON.parse(req.query.category);
    if (!category) {
        res.status(401).json({ message: "категорий нету" });
    }
    fs.readFile('./src/data/products.json', 'utf8', function (err, data) {
        if (err) {
            console.error('Ошибка чтения JSON-файла:', err);
            return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }
        try {
            // Распарсить JSON-данные
            var jsonData_2 = JSON.parse(data);
            var searchData_3 = [];
            if (category !== "-") {
                category.map(function (categoryElement) {
                    jsonData_2.map(function (element) {
                        if (element.category.includes(categoryElement)) {
                            console.log("include");
                            searchData_3.push(element);
                            console.log(searchData_3);
                        }
                    });
                });
            }
            var uniqueArray = [];
            for (var _i = 0, searchData_2 = searchData_3; _i < searchData_2.length; _i++) {
                var item = searchData_2[_i];
                if (uniqueArray.indexOf(item) === -1) {
                    uniqueArray.push(item);
                }
            }
            // Отправить JSON-данные в ответе
            res.json(uniqueArray);
        }
        catch (parseError) {
            console.error('Ошибка при разборе JSON:', parseError);
            res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
    });
});
app.get('/get_products_by_id', function (req, res) {
    var id = req.query.id;
    if (!id) {
        res.status(401).json({ message: "" });
    }
    fs.readFile('./src/data/products.json', 'utf8', function (err, data) {
        if (err) {
            console.error('Ошибка чтения JSON-файла:', err);
            return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }
        try {
            // Распарсить JSON-данные
            var jsonData = JSON.parse(data);
            // let product = []
            jsonData.map(function (element) {
                if (parseInt(element.id) === parseInt(id)) {
                    // product.push(element)
                    res.json(element);
                }
            });
            // Отправить JSON-данные в ответе
        }
        catch (parseError) {
            console.error('Ошибка при разборе JSON:', parseError);
            res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
    });
});
app.get('/get_new_products', function (req, res) {
    fs.readFile('./src/data/products.json', 'utf8', function (err, data) {
        if (err) {
            console.error('Ошибка чтения JSON-файла:', err);
            return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }
        try {
            // Распарсить JSON-данные
            var jsonData = JSON.parse(data);
            var newProducts = jsonData.filter(function (element) { return element.isNew === true; });
            // Отправить JSON-данные в ответе
            res.json(newProducts);
        }
        catch (parseError) {
            console.error('Ошибка при разборе JSON:', parseError);
            res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
    });
});
app.post('/upload', upload.single('file'), function (req, res) {
    console.log("Запрос на фото");
    console.log("\u0424\u043E\u0442\u043E: ".concat(req.file));
    var file = req.file;
    if (!file) {
        return res.status(401).json({ message: 'Файлы отсутствуют' });
    }
    fs.readFile('./src/data/products.json', 'utf8', function (err, data) {
        if (err) {
            console.error('Ошибка чтения JSON-файла:', err);
            return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }
        try {
            // Распарсить JSON-данные
            var jsonData_3 = JSON.parse(data);
            jsonData_3[jsonData_3.length - 1].img = file.originalname;
            var updatedData = JSON.stringify(jsonData_3, null, 2);
            fs.writeFile('./src/data/products.json', updatedData, 'utf8', function (writeErr) {
                if (writeErr) {
                    console.error('Ошибка записи JSON-файла:', writeErr);
                    return res.status(500).json({ error: 'Произошла ошибка при записи JSON-файла' });
                }
                // Отправить JSON-данные в ответе
                res.json(jsonData_3);
            });
        }
        catch (parseError) {
            console.error('Ошибка при разборе JSON:', parseError);
            res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
    });
});
app.post('/upload_data', function (req, res) {
    var cost = req.body.cost;
    var title = req.body.title;
    var categories = req.body.categories;
    var searchWords = req.body.tags;
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
    fs.readFile('./src/data/products.json', 'utf8', function (err, data) {
        if (err) {
            console.error('Ошибка чтения JSON-файла:', err);
            return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }
        try {
            // Распарсить JSON-данные
            var jsonData_4 = JSON.parse(data);
            var currentDate = new Date();
            var newElement = {
                id: currentDate.getTime(),
                img: "-",
                title: title,
                cost: cost,
                searchWords: searchWords,
                category: categories,
                date: format(currentDate, 'dd.MM.yyyy'),
                isNew: true
            };
            jsonData_4.push(newElement);
            var updatedData = JSON.stringify(jsonData_4, null, 2);
            fs.writeFile('./src/data/products.json', updatedData, 'utf8', function (writeErr) {
                if (writeErr) {
                    console.error('Ошибка записи JSON-файла:', writeErr);
                    return res.status(500).json({ error: 'Произошла ошибка при записи JSON-файла' });
                }
                // Отправить JSON-данные в ответе
                res.status(200).json(jsonData_4);
            });
        }
        catch (parseError) {
            console.error('Ошибка при разборе JSON:', parseError);
            res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
    });
});
app.post('/change_data', function (req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var cost = req.body.cost;
    var searchWords = req.body.tags;
    var categories = req.body.categories;
    var date = req.body.date;
    var isNew = req.body.isNew;
    if (!id) {
        return res.status(401).json({ message: 'Файлы отсутствуют' });
    }
    if (!title) {
        return res.status(401).json({ message: 'Файлы отсутствуют' });
    }
    if (!cost) {
        return res.status(401).json({ message: 'Файлы отсутствуют' });
    }
    if (!searchWords) {
        return res.status(401).json({ message: 'Файлы отсутствуют' });
    }
    if (!categories) {
        return res.status(401).json({ message: 'Файлы отсутствуют' });
    }
    if (!date) {
        return res.status(401).json({ message: 'Файлы отсутствуют' });
    }
    if (!isNew) {
        return res.status(401).json({ message: 'Файлы отсутствуют' });
    }
    fs.readFile('./src/data/products.json', 'utf8', function (err, data) {
        if (err) {
            console.error('Ошибка чтения JSON-файла:', err);
            return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }
        try {
            // Распарсить JSON-данные
            var jsonData = JSON.parse(data);
            jsonData.map(function (element) {
                if (element.id === id) {
                    element.title = title;
                    element.cost = cost;
                    element.searchWords = searchWords;
                    element.category = categories;
                    element.date = date;
                    element.isNew = isNew;
                    res.status(200).json(element);
                }
            });
            var updatedData = JSON.stringify(jsonData, null, 2);
            fs.writeFile('./src/data/products.json', updatedData, 'utf8', function (writeErr) {
                if (writeErr) {
                    console.error('Ошибка записи JSON-файла:', writeErr);
                    return res.status(500).json({ error: 'Произошла ошибка при записи JSON-файла' });
                }
                // Отправить JSON-данные в ответе
            });
        }
        catch (parseError) {
            console.error('Ошибка при разборе JSON:', parseError);
            res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
    });
});
app.post('/delete_data', function (req, res) {
    var id = req.body.id;
    if (!id) {
        return res.status(401).json({ message: 'Файлы отсутствуют' });
    }
    fs.readFile('./src/data/products.json', 'utf8', function (err, data) {
        if (err) {
            console.error('Ошибка чтения JSON-файла:', err);
            return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }
        try {
            // Распарсить JSON-данные
            var jsonData_5 = JSON.parse(data);
            var newArray_1 = [];
            jsonData_5.map(function (element) {
                if (element.id !== id) {
                    newArray_1.push(element);
                }
            });
            var updatedData = JSON.stringify(newArray_1, null, 2);
            fs.writeFile('./src/data/products.json', updatedData, 'utf8', function (writeErr) {
                if (writeErr) {
                    console.error('Ошибка записи JSON-файла:', writeErr);
                    return res.status(500).json({ error: 'Произошла ошибка при записи JSON-файла' });
                }
                // Отправить JSON-данные в ответе
                res.status(200).json(jsonData_5);
            });
        }
        catch (parseError) {
            console.error('Ошибка при разборе JSON:', parseError);
            res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
    });
});
app.post('/unset_new', function (req, res) {
    fs.readFile('./src/data/products.json', 'utf8', function (err, data) {
        if (err) {
            console.error('Ошибка чтения JSON-файла:', err);
            return res.status(500).json({ error: 'Произошла ошибка при чтении JSON-файла' });
        }
        try {
            // Распарсить JSON-данные
            var jsonData = JSON.parse(data);
            // Функция для преобразования строки в объект Date
            function parseDate(dateString) {
                var dateParts = dateString.split('.');
                // Месяцы в JavaScript начинаются с 0, поэтому вычитаем 1 из номера месяца
                return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
            }
            // Текущая дата
            var currentDate_1 = new Date();
            jsonData.map(function (element) {
                var elementDate = parseDate(element.date);
                var daysDifference = (currentDate_1 - elementDate) / (1000 * 60 * 60 * 24);
                if (daysDifference > 7) {
                    element.isNew = false;
                }
            });
        }
        catch (parseError) {
            console.error('Ошибка при разборе JSON:', parseError);
            res.status(500).json({ error: 'Произошла ошибка при разборе JSON' });
        }
    });
});
app.listen(port, function () {
    console.log("Server started");
});
