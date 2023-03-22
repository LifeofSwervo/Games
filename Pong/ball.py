import pygame as pg
from settings import *

class Ball(pg.sprite.Sprite):
    def __init__(self):
        super().__init__()
        #self.image = pg.Surface((15, 10))
        #self.image.fill('white')
        self.rect = pg.rect(width / 2, height / 2, 20, 10)
        