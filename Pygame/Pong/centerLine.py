import pygame as pg
from settings import *

class CenterLine(pg.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.lineColor = (200, 200, 200)
        self.image = pg.Surface((15, height))
        pg.draw.aaline(self.image, self.lineColor, (width / 2, 0), (width / 2, height))
        self.rect = pg.Rect(width / 2, 0, 15, height)
    

    