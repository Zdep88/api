import errorHandler from "../errorHandler.js"; //TODO

const mathsController = {
    documentation(req, res) {
        res.status(200).sendFile('html/maths.html', { root: 'public' });
    },

    async homothety(req, res) {
        let { pointX, pointY, centerX, centerY, rotate, zoom } = req.body;

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