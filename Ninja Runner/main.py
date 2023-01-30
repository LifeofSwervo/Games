import pygame
from player import Player
from horse import Horse
from skull import Skull
    

if __name__ == '__main__':
    #Setup
    pygame.init()
    screen = pygame.display.set_mode((800,400))
    pygame.display.set_caption('Ninja Run')
    clock = pygame.time.Clock()
    gameActive = True

    player = pygame.sprite.GroupSingle()
    player.add(Player())

    #Background
    groundSurface = pygame.image.load('Assets/World/StraightLand.png')
    skySurface = pygame.image.load('Assets/World/Sky1.png')

    #Enemies
    horse = pygame.sprite.Group()
    horse.add(Horse())

    skull = pygame.sprite.Group()
    skull.add(Skull())


    #Game Loop
    while True:
        #Input Handler
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()

         # Update Keys List
        keys = pygame.key.get_pressed()

        if gameActive:
            num = 0
            num += 0
        else:
            if keys[pygame.K_SPACE]:
                gameActive = True
                horse.sprites()[0].rect.x = 800
                        
        # Game Failed (if statement)
        if gameActive:

            #Background
            screen.blit(skySurface, (0,0))
            screen.blit(groundSurface, (0,270))

            #Player
            player.draw(screen)
            player.update()
            
            horse.draw(screen)
            horse.update()

            skull.draw(screen)
            skull.update()

            # Collisions
            if horse.sprites()[0].rect.colliderect(player.sprite.rect):
                gameActive = False
        else:
            screen.fill('Purple')

        #FPS
        pygame.display.update()
        clock.tick(60)