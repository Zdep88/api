import errorHandler from "../errorHandler.js";

const alphabet = {
    a: '4',
    b: '8',
    c: '(',
    d: '|)',
    e: '3',
    f: '|=',
    g: '9',
    h: '#',
    i: '1',
    j: ',_|',
    k: '>|',
    l: '1',
    m: '/\\/\\',
    n: '^/',
    o: '0',
    p: '|*',
    q: '(_,)',
    r: '2',
    s: '5',
    t: '7',
    u: '(_)',
    v: '\\/',
    w: '\\/\\/',
    x: '><',
    y: '`/',
    z: '2'
};

const leetSpeakController = {
    async index(req, res) {
        const input = req.query.input;
        if (!input || typeof input !== 'string') {
            errorHandler.throwError(400, "Invalid input");
        }
        const leetSpeak = input.toLowerCase().split('').map(char => {
            return alphabet[char] || char;
        }).join('');
        res.status(200).json({ output: leetSpeak });
    }
};

export default leetSpeakController;