from settings import *
import math
from tetromino import Tetromino

class Tetris:
    def __init__(self, app):
        self.app = app
        self.spriteGroup = pg.sprite.Group()
        self.tetroimino = Tetromino(self)
    

    # Grid
    def drawGrid(self):
        for x in range(FIELD_W):
            for y in range(FIELD_H):
                pg.draw.rect(self.app.screen, 'black',
                             (x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE), 1)

    def update(self):
        self.tetroimino.update()
        self.spriteGroup.update()

    def draw(self):
        self.drawGrid()
        self.spriteGroup.draw(self.app.screen)