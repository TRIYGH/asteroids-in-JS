class Asteroid {
    constructor() {
        this.velocity = Math.floor(Math.random() * 10)

        this.size = Math.floor(Math.random() * 35) + 1

        this.getRandomStartingPos()

        var s = this.getRandomIntInclusive(-20, 21)
        var t = this.getRandomIntInclusive(-20, 21)
        if ( s != 0 && t != 0 ){
        if ( s > t ) {
            var u = s / t
            var v = 1
        } else {
            var v = t / s
            var u = 1
        }}

        this.trajectory = {
            trajX: u, trajY: v
        }
    }

    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomStartingPos() {
        var start = Math.floor(Math.random() * 4)
        if ( start == 0 || start == 2 ) {
            var a = Math.floor(Math.random() * 640)
            if ( start == 0 ) { var b = -10 }
            else var b = 650
        }
        else { var b = Math.floor(Math.random() * 640)
            if ( start == 3 ) { var a = -10 }
            else { var a = 650 }
            }
        this.startingPosition = {
            stPosX: a, stPosY: b
            }
        }
}
