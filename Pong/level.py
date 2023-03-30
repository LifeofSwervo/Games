import pygame as pg
from settings import *
from player import Player
from enemy import Enemy
from ball import Ball
from centerLine import CenterLine
import random

class Level:
    def __init__(self, surface):
        # level setup
        self.displaySurface = surface
        self.setupLevel() 

        # Sprites
        playerSprite = Player(height)
        self.player.add(playerSprite)
        


        enemySprite = Enemy()
        self.enemy.add(enemySprite)

        lineSprite = CenterLine()
        self.line.add(lineSprite)

        #Ball Start
            # Ball Trajectory set to random
        self.ballSpeed_x = 7 * random.choice((1, -1)) 
        self.ballSpeed_y = 7 * random.choice((1, -1))

            # Ball Sprite
        self.ballSprite = Ball()
        self.ball.add(self.ballSprite)

    def ballRestart(self):
        # Ball Restart
        self.ballSprite.rect.center = (width / 2, height / 2)
        self.ballSpeed_x *= random.choice((1, -1))
        self.ballSpeed_y *= random.choice((1, -1))

    def ballMovement(self):
        # Ball Movement
        self.ballSprite.rect.x += self.ballSpeed_x
        self.ballSprite.rect.y += self.ballSpeed_y

        # Screen Constraint
        if self.ballSprite.rect.top <= 0 or self.ballSprite.rect.bottom >= height: # Top of Screen Constraint & Bottom of Screen Constraint
            self.ballSpeed_y *= -1
        if self.ballSprite.rect.left <= 0 or self.ballSprite.rect.right >= width: # Left of Screen Constraint & Right of Screen Constraint
            self.ballRestart()

        # Ball Collisions
            # Player
        if self.ballSprite.rect.colliderect(self.player.sprite.rect):
            self.ballSpeed_x *= -1
        for enemySprites in self.enemy.sprites():
            if self.ballSprite.rect.colliderect(enemySprites.rect):
                self.ballSpeed_x *= -1

        # Ball Restart
        

    def enemyAI(self):
        enemySpeed = 5 # Speed of Enemy 

        for enemySprites in self.enemy.sprites():
            # Setting enemy to follow ball if ball is below enemy.
            if enemySprites.rect.top < self.ballSprite.rect.y:
                enemySprites.rect.top += enemySpeed
            # Setting enemy to follow ball if ball is above enemy.      
            if enemySprites.rect.bottom > self.ballSprite.rect.y:
                enemySprites.rect.bottom -= enemySpeed
            # Stop enemy from passing top of screen border. 
            if enemySprites.rect.top <= 0:
                enemySprites.rect.top = 0
            # Stop enemy from passing bottom of screen border. 
            if enemySprites.rect.bottom >= height:
                enemySprites.rect.bottom = height
            
        
         

    def setupLevel(self):
        self.player = pg.sprite.GroupSingle()
        self.enemy = pg.sprite.Group()
        self.ball = pg.sprite.Group()
        self.line = pg.sprite.Group()

    def run(self):
        self.player.update()
        self.player.draw(self.displaySurface)

        self.enemy.draw(self.displaySurface)
        self.enemyAI()
        
        #self.ball.update()
        self.ball.draw(self.displaySurface)
        self.ballMovement()

        pg.draw.aaline(self.displaySurface, (200, 200, 200), (width / 2, 0), (width / 2, height))
        