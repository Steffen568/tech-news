const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// creating path for home root. displays all posts 
router.get('/', (req, res) => {
  // console logs session id
  console.log(req.session)

    Post.findAll({
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
        console.log(dbPostData[0])
        // renders dbPostData and uses get() which sequelizes the sql down to only its properties, then maps the entire array
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // renders the login handlebars html and checks for session, if one exists redirect to homepage
  router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
      res.redirect('/')
      return
    }
    res.render('login')
  })

module.exports = router;