import pygame as pg

class Player(pg.sprite.Sprite):
    def __init__(self): # Initilizer 
        super().__init__()
        self.image = pg.Surface((25, 75))
        self.image.fill('blue')
        self.rect = self.image.get_rect(center = (50, 200))

        # Movement
        self.speed = 5 


    def getInput(self):
         keys = pg.key.get_pressed()

         if keys[pg.K_UP]:
             self.rect.y -= 5
         elif keys[pg.K_DOWN]:
             self.rect.y += 5


    def update(self):
        self.getInput()