import pygame as pg
from settings import *
from player import Player
from enemy import Enemy
from ball import Ball

class Level:
    def __init__(self, surface):
        # level setup
        self.displaySurface = surface
        self.setupLevel() 

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

        # Ball Setup 

    
    def run(self):
        self.player.update()
        self.player.draw(self.displaySurface)

        self.enemy.draw(self.displaySurface)
        
        self.ball.update()
        self.ball.draw(self.displaySurface)