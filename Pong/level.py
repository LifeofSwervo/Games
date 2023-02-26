import pygame as pg
from player import Player

class Level:
    def __init__(self, surface):
        # level setup
        self.displaySurface = surface
        self.setupLevel() 

    def setupLevel(self):
        self.player = pg.sprite.GroupSingle()

        #Sprites

        playerSprite = Player()
        self.player.add(playerSprite)
    
    def run(self):
        self.player.update()
        self.player.draw(self.displaySurface)
        