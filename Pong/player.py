import pygame as pg

class Player(pg.sprite.Sprite):
    def __init__(self, constraint): # Initilizer 
        super().__init__()
        self.image = pg.Surface((10, 75))
        self.image.fill((200, 200, 200))
        self.rect = self.image.get_rect(center = (50, 200))

        # Movement
        self.speed = 5 

        self.max_y_constraint = constraint


    def getInput(self):
         keys = pg.key.get_pressed()

         if keys[pg.K_UP]:
             self.rect.y -= 5
         elif keys[pg.K_DOWN]:
             self.rect.y += 5

    def constraint(self):
        if self.rect.top <= 0:
            self.rect.top = 0
        if self.rect.bottom >= self.max_y_constraint:
            self.rect.bottom = self.max_y_constraint

    def update(self):
        self.getInput()
        self.constraint()