const express = require('express');
const uuid =  require('uuid');
const router = express.Router();
const members = require('../.././Members');

//3. REST API
//3.1 Get all members
router.get('/', (req, res) => res.json(members));

//4 Get single member
router.get('/:id', (req, res) => {
  //4.1 IF
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id))); //parseInt for ===
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
});

//6. Create Member
router.post('/', (req, res) => { //We can use the same routes as long are different HTTP methods
  //8.
  const newMember = {
    id: uuid.v4(), //Method that generate random universal ID
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if ( !newMember.name || !newMember.email ) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  } //if we dont put else, an error should pop up "Headers already been sent", thats why the return 
  members.push(newMember);
  res.json(members); 
  // res.redirect('/'); //for handlebars
}); 

//9. Update member
router.put('/:id', (req, res) => {
  //4.1 IF
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updatedMember = req.body;
    members.forEach(member => { //Check if it matches id for update
      if(member.id === parseInt(req.params.id)) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;

        res.json({ msg: 'Member was updated', member });
      }
    }); 
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
});

//10. Delete member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
});

module.exports = router;