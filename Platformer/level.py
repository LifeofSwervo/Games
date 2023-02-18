import pygame
from tiles import Tile

class Level:
    def __init__(self, levelData, surface):
        self.displaySurface = surface
        self.levelData = levelData