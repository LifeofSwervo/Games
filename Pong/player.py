import pygame as pg

class Player(pg.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pg.Surface((25, 75))
        self.image.fill('blue')
        self.rect = self.image.get_rect(center = (100, 200))