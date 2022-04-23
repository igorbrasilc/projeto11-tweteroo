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

const USER_TWEETS = [];

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
            username: USER.username,
            avatar: USER.avatar,
            tweet: body.tweet
        };
    
        USER_TWEETS.push(tweet);
    
        res.status(201).send('OK');
    }
    
});

app.get('/tweets', (req, res) => {

    const lastTenTweets = [];

    // eslint-disable-next-line no-plusplus
    for (let i = USER_TWEETS.length - 1; i >= 0; i--) {
        if (lastTenTweets.length === 10) break;
        else lastTenTweets.push(USER_TWEETS[i]);
    }

    res.send(lastTenTweets);
});

app.listen(5000, () => {
    console.log(chalk.bold.green('Server on at port 5000'));
})