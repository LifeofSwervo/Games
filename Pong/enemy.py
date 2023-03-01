import pygame as pg

class Enemy(pg.sprite.Sprite):
    def __init__(self): # Initilizer 
        super().__init__()
        self.image = pg.Surface((25, 75))
        self.image.fill('red')
        self.rect = self.image.get_rect(center = (750, 200))

        # Movement
        self.speed = 5 
