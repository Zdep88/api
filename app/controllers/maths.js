import errorHandler from "../errorHandler.js"; //TODO

const mathsController = {
    documentation(req, res) {
        res.status(200).json({
            message: "Maths API Documentation",
            routes: [
                {
                    name: "Homothety",
                    description : "Calculate the homothety of a point with respect to a center and transformation parameters.",
                    method: "GET",
                    url : "https://api.zdep.fr/maths/homothety",
                    inputMethod: "Request Body",
                    parameters: {
                        pointX: "X coordinate of the point to transform (default: 0)",
                        pointY: "Y coordinate of the point to transform (default: 0)",
                        centerX: "X coordinate of the center of homothety (default: 0)",
                        centerY: "Y coordinate of the center of homothety (default: 0)",
                        rotate: "Rotation angle in degrees (default: 0) - Use minus sign for counter-clockwise rotation or if y-axis has positive values downwards",
                        zoom: "Zoom factor (default: 1)"
                    },
                    example: {
                        "pointX": 3,
                        "pointY": 3,
                        "centerX": 2,
                        "centerY": 3,
                        "rotate": -90,
                        "zoom": 2
                    },
                    response: {
                        "pointX": 2,
                        "pointY": 1
                    }
                }
            ]
        });
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