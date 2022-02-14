const {Router} = require('express');
const router = Router();
const uniqid = require('uniqid')

router.post('/create', (req, res) => {
    const notes = req.cookies.notes;
    if (!notes) {
        res.cookie('notes', [{id: uniqid(), ...req.body}]);
    } else {
        notes.push({id: uniqid(), ...req.body});
        res.cookie('notes', notes);
    }

    res.json({'message': 'Note succesufully created!', 'error' : false});
});

router.get('/list',(req, res) => {
    res.json({'content': req.cookies.notes || [] });
});

router.post('/delete', (req, res) => {
    const {id} = req.body;
    if (!id) {
        res.json({'message': 'Invalid request!', error: true});
        return;
    }

    let notes = req.cookies.notes;
    if(notes.filter(note => note.id === id).length === 0) {
        res.json({'message': 'Note was not found!', error: true});
        return;
    }

    notes = notes.filter(note => note.id !== id);
    res.cookie('notes', notes);
    res.json({'message': 'Note deleted!', error: false});
});

module.exports = router;