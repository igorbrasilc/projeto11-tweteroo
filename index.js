import express from 'express';
import chalk from 'chalk';
import cors from 'cors';

const app = express();

app.use(cors());

const USER = {
	username: 'bobesponja', 
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
};

const tweet = {
	username: "bobesponja",
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub",
};

let USERS = [];

let USER_TWEETS = [];

app.post('/sign-up', (req, res) => {
    USERS = [...USERS, USER]; // talvez resolver problema de postar mesmo usuario mais de uma vez
    res.send('OK');
});

app.post('/tweets', (req, res) => {
    USER_TWEETS = [...USER_TWEETS, tweet];
    res.send('OK');
});

app.get('/tweets', (req, res) => {
    const lastTenTweets = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; (i < USER_TWEETS.length && i < 10); i++) {
        lastTenTweets.push(USER_TWEETS[i]);
    }

    res.send(lastTenTweets);
});

app.listen(5000, () => {
    console.log(chalk.bold.green('Server on at port 5000'));
})