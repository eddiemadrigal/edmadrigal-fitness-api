const router = require('express').Router();
const Classes = require('./classes-model');


router.get('/', (req, res) => {
  Classes.find()
    .then(classes => {
      res.json(classes)
    })
    .catch(err => res.send(err));
}); 

router.get('/:id', (req, res) => {
  Classes.findById(req.params.id)
    .then(classInfo => {
      res.json(classInfo)
    })
    .catch(err => res.send(err));
})

router.post('/add', (req, res) => {
  Classes.add(req.body)
  .then(() => {
    res.status(201).json({ message: 'class added!'});
  })
  .catch(error => {
    res.status(500).json({ errorMessage: error.message });
  });
});

router.put('/update/:id', async(req, res) => {
  const { id } = req.params;
  const body = req.body;
  Classes.updateClass(body, id)
  .then(() => {
    res.status(200).json({ message: 'class updated!' })
  })
  .catch(error => {
    res.status(500).json({ errorMessage: error.message });
  });

})

router.delete('/remove/:id', (req, res) => {
  const { id } = req.params;
  Classes.deleteclass(id)
    .then(() => {
      res.status(200).json({ message: 'class deleted!' })
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error.message });
    });
})

module.exports = router;