const googleTTS = require('google-tts-api');
const languages = require('../../data/languages.json');

class Player {
    constructor(guild) {
        this.guild = guild;
        this.queue = [];
        this.speaking = false;
        this.language = 'en';
        this.slow = false;
    }

    say(phrase) {
        const urls = googleTTS.getAllAudioUrls(phrase, {
            lang: this.language,
            slow: this.slow,
            host: 'https://translate.google.com',
        });

        urls.forEach(({ url, shortText }) => {
            this.queue.push({
                source: url,
                phrase: shortText,
                lang: this.language,
                slow: this.slow,
            });
        });

        if (!this.speaking) {
            this.runTTS();
        }
    }

    runTTS() {
        const [first] = this.queue;

        if (!first) return

        this.Play(first);
    }

    async Play(sentence) {
        const { source, phrase, lang, slow } = sentence;

        this.speaking = true;
        const connection = this.guild.voice.connection;
        const dispatcher = await connection.play(source);

        dispatcher.on('speaking', (speaking) => {
            if (!speaking) {
                this.queue.shift();
                this.speaking = false;
                this.runTTS();
            }
        });

        dispatcher.on('error', (err) => {
            console.log(err);
            this.queue.shift();
            this.speaking = false;

            if (!this.queue) return;
            this.Play();
        });
    }

    stop() {
        return new Promise((resolve, reject) => {
            try {
                this.queue = [];
                this.speaking = false;
                this.guild.voice.channel.leave()
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }

    setSpeed(speed) {
        return new Promise((resolve, reject) => {
            if (!speed === 'normal' && !speed === 'slow')
                reject('invalid speed, it must be either *normal* or *slow*.');

            this.slow = speed === 'slow';
            resolve(speed);
        })
    }

    setLang(lang, prefix) {
        return new Promise((resolve, reject) => {
            if (!languages[lang])
                reject(`invalid language. Type \`${prefix}langs\` for a list of available languages.`);

            if (this.lang === lang)
                reject(`language is already set to **${languages[newLang]}**.`);

            this.lang = lang;
            resolve(lang);
        });
    }
}

module.exports = Player;