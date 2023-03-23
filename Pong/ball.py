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

        # Ball Movement
        #self.ballSpeed_x = 7 * random.choice((1, -1))
        #self.ballSpeed_y = 7 * random.choice((1, -1))


    #def ballAnimation(self):
        #self.rect.x += self.ballSpeed_x # Connects X of ball and Speed of ball.
        #self.rect.y += self.ballSpeed_y # Connects Y of ball and Speed of ball. 

        # Screen Constraints
        #if self.rect.top <= 0 or self.rect.bottom >= height: # Top of Screen Constraint & Bottom of Screen Constraint
            #self.ballSpeed_y *= -1                           
        #if self.rect.left <= 0 or self.rect.right >= width:  # Left of Screen Constraint & Right of Screen Constraint
            #self.ballSpeed_x *= -1                           


    def update(self):
        #self.ballAnimation()
        pass

