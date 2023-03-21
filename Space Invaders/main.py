import pygame, sys
from player import Player
import obstacle


class Game:
    def __init__(self):
        # Player Setup
        playerSprite = Player((screenWidth / 2,screenHeight), screenWidth, 5)
        self.player = pygame.sprite.GroupSingle(playerSprite)


        # Obstacle Setup
        self.shape = obstacle.shape
        self.blockSize = 6

    def run(self):
        self.player.update()
        self.player.sprite.lasers.draw(screen)
        self.player.draw(screen)
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