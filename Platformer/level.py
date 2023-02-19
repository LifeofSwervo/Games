import pygame
from tiles import Tile
from settings import tileSize

class Level:
    def __init__(self, levelData, surface):

        # Level Setup
        self.displaySurface = surface
        self.setupLevel(levelData)
        self.worldShift = 0

    def setupLevel(self, layout):
        self.tiles = pygame.sprite.Group()
        for rowIndex, row in enumerate(layout):
            for colIndex, cell in enumerate(row):
                if cell == 'X':
                    x = colIndex * tileSize
                    y = rowIndex * tileSize
                    tile = Tile((x,y), tileSize)
                    self.tiles.add(tile)

    def run(self):
        self.tiles.update(self.worldShift)
        self.tiles.draw(self.displaySurface)
