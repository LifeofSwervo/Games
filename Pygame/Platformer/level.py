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

    def horizontalMovementCollision(self):
        player = self.player.sprite
        player.rect.x += player.direction.x * player.speed

        for sprite in self.tiles.sprites():
            if sprite.rect.colliderect(player.rect):
                if player.direction.x < 0:
                    player.rect.left = sprite.rect.right
                elif player.direction.x > 0:
                    player.rect.right = player.rect.left
    
    def verticalMovementCollision(self):
        player = self.player.sprite
        player.applyGravity()


        for sprite in self.tiles.sprites():
            if sprite.rect.colliderect(player.rect):
                if player.direction.y > 0:
                    player.rect.bottom = sprite.rect.top
                elif player.direction.y < 0:
                    player.rect.top = sprite.rect.bottom

    def run(self):
        #Tiles
        self.tiles.update(self.worldShift)
        self.tiles.draw(self.displaySurface)
        self.scrollX()

        #Player
        self.player.update()
        self.horizontalMovementCollision()
        self.verticalMovementCollision()
        self.player.draw(self.displaySurface)
        
