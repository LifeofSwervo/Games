import pygame as pg
from settings import *
import random

class Ball(pg.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.ballSize = 20
        self.ballColor = (200, 200, 200)
        self.image = pg.Surface((self.ballSize, self.ballSize))
        #self.image.fill('white')
        pg.draw.ellipse(self.image, self.ballColor, [0, 0, self.ballSize, self.ballSize])
        self.rect = pg.Rect(width / 2, height / 2, self.ballSize, self.ballSize)                       

    def update(self):
        #self.ballAnimation()
        pass
    