import express, {json} from 'express';
import chalk from 'chalk';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());

let USER = {
    username: null,
    avatar: null
};

let USERS = [];

const USERS_TWEETS = [];

app.post('/sign-up', (req, res) => {
    const {body} = req;

    if (body.username === '' || body.avatar === '') {
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {
        const newUser = {
            username: body.username,
            avatar: body.avatar
        };
        
        USER = newUser;
    
        USERS = [...USERS, newUser];
    
        res.status(201).send('OK');
    }

});

app.post('/tweets', (req, res) => {

    const {body} = req;

    if (body.tweet === '') {
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {
        const tweet = {
            username: req.header('user'),
            avatar: USER.avatar,
            tweet: body.tweet
        };
    
        USERS_TWEETS.push(tweet);
    
        res.status(201).send('OK');
    }
    
});

app.get('/tweets', (req, res) => {

    const lastTenTweets = [];

    // eslint-disable-next-line no-plusplus
    for (let i = USERS_TWEETS.length - 1; i >= 0; i--) {
        if (lastTenTweets.length === 10) break;
        else lastTenTweets.push(USERS_TWEETS[i]);
    }

    res.send(lastTenTweets);
});

app.get('/tweets/:USERNAME', (req, res) => {
    const user = req.params.USERNAME;

    const userTweets = USERS_TWEETS.filter(userTweet => user === userTweet.username);

    res.send(userTweets);
})

app.listen(5000, () => {
    console.log(chalk.bold.green('Server on at port 5000'));
})