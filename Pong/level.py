import pygame as pg
from settings import *
from player import Player
from enemy import Enemy

class Level:
    def __init__(self, surface):
        # level setup
        self.displaySurface = surface
        self.setupLevel() 

    def setupLevel(self):
        self.player = pg.sprite.GroupSingle()
        self.enemy = pg.sprite.Group()

        #Sprites
        playerSprite = Player(height)
        self.player.add(playerSprite)

        enemySprite = Enemy()
        self.enemy.add(enemySprite)

    
    def run(self):
        self.player.update()
        self.player.draw(self.displaySurface)

        self.enemy.draw(self.displaySurface)
        