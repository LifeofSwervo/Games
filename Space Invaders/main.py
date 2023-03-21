import pygame, sys
from player import Player
import obstacle
from alien import Alien


class Game:
    def __init__(self):
        # Player Setup
        playerSprite = Player((screenWidth / 2,screenHeight), screenWidth, 5)
        self.player = pygame.sprite.GroupSingle(playerSprite)


        # Obstacle Setup
        self.shape = obstacle.shape # Shape is defined as Obstacle Shape
        self.blockSize = 6 # Size of blocks
        self.blocks = pygame.sprite.Group() # Define Blocks as sprite groups.
        self.obstacleAmount = 4
        self.obstacle_x_postitions = [num * (screenWidth / self.obstacleAmount) for num in range(self.obstacleAmount)]
        self.createMultipleObstacles(*self.obstacle_x_postitions, xStart = screenWidth / 15, yStart = 480)

        # Alien Setup
        self.aliens = pygame.sprite.Group()
        self.alienSetup(rows = 6, cols = 8)



    def createObstacle(self, xStart, yStart, offsetX):
        for rowIndex, row in enumerate(self.shape): # Select the rows of shape (Numbered on obstacle.py)
            for colIndex, col in enumerate(row):
                if col == 'x':
                    x = xStart + colIndex * self.blockSize + offsetX
                    y = yStart + rowIndex * self.blockSize 
                    block = obstacle.Block(self.blockSize, (241, 79, 80), x, y)
                    self.blocks.add(block)
    
    def createMultipleObstacles(self, *offset, xStart, yStart):
        for offsetX in offset:
            self.createObstacle(xStart, yStart, offsetX)

    def alienSetup(self, rows, cols):
        for rowIndex, row in enumerate(rows):
            for colIndex, col in enumerate(cols):
                x = colIndex
                y = rowIndex
                alienSprite = Alien('red', x, y)
                self.aliens.add(alienSprite)


    def run(self):
        self.player.update()
        self.player.sprite.lasers.draw(screen)
        self.player.draw(screen)

        self.blocks.draw(screen)
        # Update all spirte
        # Draw all sprite groups

if __name__ == '__main__':
    pygame.init()
    screenWidth = 600
    screenHeight = 600
    screen = pygame.display.set_mode((screenWidth, screenHeight))
    clock = pygame.time.Clock()
    game = Game()
    pygame.display.set_caption('Space Invaders')

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        screen.fill((30,30,30))
        game.run()

        pygame.display.flip()
        clock.tick(60)