import pygame
from player import Player
from horse import Horse
from skull import Skull

def displayScore():
    currentTime = int(pygame.time.get_ticks() / 100) - startTime
    scoreSurf = font.render(f'Score: {currentTime}', False, (64, 64, 64))
    scoreRect = scoreSurf.get_rect(center = (400, 50))
    screen.blit(scoreSurf, scoreRect)


# Start screen Player Animations
def playerAnimation():
    global playerStandIndex, playerSurface
    playerStandIndex += 0.2
    if playerStandIndex >= len(playerStand): playerStandIndex = 0
    playerSurface = playerStand[int(playerStandIndex)]

if __name__ == '__main__':
    #Setup
    pygame.init()
    screen = pygame.display.set_mode((800,400))
    pygame.display.set_caption('Ninja Run')
    clock = pygame.time.Clock()
    gameActive = False
    startTime = 0
    font = pygame.font.Font('font\Pixeltype.ttf', 50)

    player = pygame.sprite.GroupSingle()
    player.add(Player())


    #Player Stand
    playerStand0 = pygame.image.load('Assets/Player/Idle/Idle0.png')
    playerStand1 = pygame.image.load('Assets/Player/Idle/Idle1.png')
    playerStand2 = pygame.image.load('Assets/Player/Idle/Idle2.png')
    playerStand3 = pygame.image.load('Assets/Player/Idle/Idle3.png')
    playerStand = [playerStand0, playerStand1, playerStand2, playerStand3]
    playerStandIndex = 0


    playerSurface = playerStand[playerStandIndex]
    playerSurface = pygame.transform.scale2x(playerSurface)
    playerStandRect = playerSurface.get_rect(center = (400, 220))
    

    #Background
    groundSurface = pygame.image.load('Assets/World/StraightLand.png')
    skySurface = pygame.image.load('Assets/World/Sky1.png')

    #Enemies
    horse = pygame.sprite.Group()
    horse.add(Horse())

    skull = pygame.sprite.Group()
    skull.add(Skull())

    #Intro Screen
    gameName = font.render('Ninja Runner', False, (111, 196, 169))
    gameNameRect = gameName.get_rect(center = (400, 130))

    gameStartMsg = font.render('Press Space to Start', False, (111, 196, 169))
    gameStartMsgRect = gameStartMsg.get_rect(center = (400, 280))




    #Game Loop
    while True:
        #Input Handler
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()

         # Update Keys List
        keys = pygame.key.get_pressed()

        playerAnimation()

        if gameActive:
            num = 0
            num += 0
        else:
            if keys[pygame.K_SPACE]:
                gameActive = True
                horse.sprites()[0].rect.x = 800
                startTime = int(pygame.time.get_ticks() / 100)
                        
        # Game Failed (if statement)
        if gameActive:

            

            #Background
            screen.blit(skySurface, (0,0))
            screen.blit(groundSurface, (0,270))
            displayScore()

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
            screen.fill((94, 129, 162))
            screen.blit(playerSurface, playerStandRect)
            screen.blit(gameName, gameNameRect)
            screen.blit(gameStartMsg, gameStartMsgRect)

        #FPS
        pygame.display.update()
        clock.tick(60)