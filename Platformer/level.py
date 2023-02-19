import pygame
from tiles import Tile
from player import Player
from settings import tileSize, screenWidth, screenHeight




class Level:
    def __init__(self, levelData, surface):

        # Level Setup
        self.displaySurface = surface
        self.setupLevel(levelData)
        self.worldShift = 0

    def setupLevel(self, layout):
        self.tiles = pygame.sprite.Group()
        self.player = pygame.sprite.GroupSingle()

        for rowIndex, row in enumerate(layout):
            for colIndex, cell in enumerate(row):
                x = colIndex * tileSize
                y = rowIndex * tileSize

                if cell == 'X':
                    x = colIndex * tileSize
                    y = rowIndex * tileSize
                    tile = Tile((x,y), tileSize)
                    self.tiles.add(tile)
                if cell == 'P':
                    x = colIndex * tileSize
                    y = rowIndex * tileSize
                    playerSprite = Player((x, y))
                    self.player.add(playerSprite)

    def scrollX(self):
        player = self.player.sprite
        playerX = player.rect.centerx
        directionX = player.direction.x

        # ScreenBounds
        screenBoundLeft = screenWidth / 6
        screenBoundRight = screenWidth - (screenWidth / 4)
        
        # Scroll
        if playerX < screenBoundLeft and directionX < 0:
            self.worldShift = 8
            player.speed = 0
        elif playerX > screenBoundRight and directionX > 0:
            self.worldShift = -8
            player.speed = 0
        else:
            self.worldShift = 0
            player.speed = 8

    def run(self):
        #Tiles
        self.tiles.update(self.worldShift)
        self.tiles.draw(self.displaySurface)

        #Player
        self.player.update()
        self.player.draw(self.displaySurface)
        self.scrollX()
