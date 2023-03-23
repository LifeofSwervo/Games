import pygame as pg
from settings import *
from player import Player
from enemy import Enemy
from ball import Ball
import random

class Level:
    def __init__(self, surface):
        # level setup
        self.displaySurface = surface
        self.setupLevel() 

        #Ball Start
            # Ball Trajectory set to random
        self.ballSpeed_x = 7 * random.choice((1, -1)) 
        self.ballSpeed_y = 7 * random.choice((1, -1))

            # Ball Sprite
        self.ballSprite = Ball()
        self.ball.add(self.ballSprite)

    def ballMovement(self):
        # Ball Movement
        self.ballSprite.rect.x += self.ballSpeed_x
        self.ballSprite.rect.y += self.ballSpeed_y

        # Screen Constraint
        if self.ballSprite.rect.top <= 0 or self.ballSprite.rect.bottom >= height: # Top of Screen Constraint & Bottom of Screen Constraint
            self.ballSpeed_y *= -1
        if self.ballSprite.rect.left <= 0 or self.ballSprite.rect.right >= width: # Left of Screen Constraint & Right of Screen Constraint
            self.ballSpeed_x *= -1



    def setupLevel(self):
        self.player = pg.sprite.GroupSingle()
        self.enemy = pg.sprite.Group()
        self.ball = pg.sprite.Group()

        #Sprites
        playerSprite = Player(height)
        self.player.add(playerSprite)

        enemySprite = Enemy()
        self.enemy.add(enemySprite)

        ballSprite = Ball()
        self.ball.add(ballSprite)
     

    def run(self):
        self.player.update()
        self.player.draw(self.displaySurface)

        self.enemy.draw(self.displaySurface)
        
        #self.ball.update()
        self.ball.draw(self.displaySurface)
        self.ballMovement()
        