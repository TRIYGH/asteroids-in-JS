This is a super simple quick attempt to reproduce the classic Asteroids game.

I utitilized Canvas in Javascript which made for nice and easy display of grahics - including the rotation of the board...
but that ultimately failed because the asteroids would rotate WITH the board.  A painful work around would have been to pixelize the asteroids ( circles ) and thus they would not rotate, but that would be somewhat painful.  The bullet ( projectile ) on the otherhand WAS done this way bc it was small.  and it worked nicely.

probably a better way to rotate JUST the ship / gun......   maybe calc the rotate on the ship and render...or even pixelize
