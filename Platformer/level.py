import pygame
from tiles import Tile

class Level:
    def __init__(self, levelData, surface):
        self.displaySurface = surface
        self.setupLevel(levelData)

    def setupLevel(self, layout):
        self.tiles = pygame.sprite.Group()

    def run(self):
        pass