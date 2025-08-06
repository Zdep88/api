import errorHandler from "../errorHandler.js"; //TODO

const mathsController = {
    documentation(req, res) {
        res.status(200).sendFile('html/maths.html', { root: 'public' });
    },

    roman(req, res) {
        let input = req.query.number;

        const units = [
            { value: 1, symbol: 'I' },
            { value: 5, symbol: 'V' },
            { value: 10, symbol: 'X' },
            { value: 50, symbol: 'L' },
            { value: 100, symbol: 'C' },
            { value: 500, symbol: 'D' },
            { value: 1000, symbol: 'M' },
        ];

        if (isNaN(input) || input < 1 || input > 3999) {
            if (!input.split('').every(char => ['I', 'V', 'X', 'L', 'C', 'D', 'M'].includes(char))) {
                res.status(400).json({ error: 'Invalid Roman numeral' });
            }
            let letters = input.split('');
            let previousLetter = letters[0];
            let count = 0;
            let result = 0;
            for (let index = 0; index < letters.length; index++) {
                if (previousLetter === letters[index]) {
                    count++;
                } else {
                    if (units.find(unit => unit.symbol === previousLetter).value > units.find(unit => unit.symbol === letters[index]).value) {
                        result += units.find(unit => unit.symbol === previousLetter).value * count;
                    } else {
                        result -= units.find(unit => unit.symbol === previousLetter).value * count;
                    }
                    count = 1;
                    previousLetter = letters[index];
                }
            }
            result += units.find(unit => unit.symbol === previousLetter).value * count;
            res.status(200).json({ roman: input, number: result });
        } else {
            let sortedUnits = units.sort((a, b) => b.value - a.value);
            let count = parseInt(input);
            let result = '';
            for (let unit of sortedUnits) {
                while (count >= unit.value) {
                    result += unit.symbol;
                    count -= unit.value;
                }
            }
            res.status(200).json({ number: input, roman: result });
        }
    },

    async homothety(req, res) {
        let { pointX, pointY, centerX, centerY, rotate, zoom } = req.query;

        [pointX, pointY, centerX, centerY, rotate] = [pointX, pointY, centerX, centerY, rotate].map(v => (isNaN(v) ? 0 : v));

        if (isNaN(zoom)) {
            zoom = 1;
        }

        const point = new Point(pointX, pointY);
        const center = new Point(centerX, centerY);

        const origin = new Point();
        const result = new Point(point.x, point.y);
        const transform = new Point(
            Math.cos(rotate * Math.PI / 180) * zoom,
            Math.sin(rotate * Math.PI / 180) * zoom
        );

        origin.useCoordinatesFrom(center);
        result.useCoordinatesFrom(center);
        result.multiplyByComplex(transform);
        result.useCoordinatesFrom(origin);
        result.round();

        res.status(200).json({
            pointX: result.x,
            pointY: result.y
        });
    }
};

class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    useCoordinatesFrom(point) {
        this.x -= point.x;
        this.y -= point.y;
    }

    multiplyByComplex(complex) {
        const realPart = this.x * complex.x - this.y * complex.y;
        const imaginaryPart = this.x * complex.y + this.y * complex.x;
        this.x = realPart;
        this.y = imaginaryPart;
    }

    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    }
}

export default mathsController;