import pygame
from sys import exit

def displayScore():
    pygame.time.get_ticks()

def playerAnimation():
    global playerSurface, playerIndex

    if playerRect.bottom < 300:
        playerSurface = playerJump
    else:
        playerIndex += 0.1
        if playerIndex >= len(playerWalk):playerIndex = 0
        playerSurface = playerWalk[int(playerIndex)]
    #Player walking animation if the player is on the floor.
    #Display the jump surface when player is not on floor.

pygame.init()
screen = pygame.display.set_mode((800,400))
pygame.display.set_caption('Runner')
clock = pygame.time.Clock()
testFont = pygame.font.Font('Runner/font/Pixeltype.ttf', 50)
gameActive = True

#Background (and text)
skySurface = pygame.image.load('Runner/graphics/Sky.png').convert()
groundSurface = pygame.image.load('Runner/graphics/ground.png').convert()

#Scoreboard
scoreSurface = testFont.render('My Game', False, (64,64,64))
scoreRect = scoreSurface.get_rect(center = (400,50))

#Player
playerWalk1 = pygame.image.load('Runner/graphics/Player/player_walk_1.png').convert_alpha()
playerWalk2 = pygame.image.load('Runner/graphics/Player/player_walk_2.png').convert_alpha()
playerWalk = [playerWalk1,playerWalk2]
playerIndex = 0
playerJump = pygame.image.load('Runner/graphics/Player/jump.png')

playerSurface = playerWalk[playerIndex]
playerRect = playerSurface.get_rect(midbottom =(80,300))
playerGravity = 0

#Enemies

    #Snail
snailSurface = pygame.image.load('Runner/graphics/snail/snail1.png').convert_alpha()
snailRect = snailSurface.get_rect(bottomright = (600,300))
snailXPos = 600

#Game Loop
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            exit()

        
        if gameActive:   
        #Mouse    
            if event.type == pygame.MOUSEBUTTONDOWN:
                print("Down")
            #KeyDown
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and playerRect.bottom >= 300: 
                    playerGravity = -20    
        else:#If game is failed
            if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
                gameActive = True 
                snailRect.left = 800
                


    if gameActive:
        #Background
        screen.blit(skySurface,(0,0))
        screen.blit(groundSurface,(0,300))
        pygame.draw.rect(screen,'#c0e8ec',scoreRect,)
        pygame.draw.rect(screen, '#c0e8ec', scoreRect, 10)
        screen.blit(scoreSurface,scoreRect)

        #Enemies
            #Snail
        snailRect.right  -= 5
        if snailRect.left < -50: snailRect.left = 850
        screen.blit(snailSurface,snailRect)

        #Player
        playerGravity += 1
        playerRect.y += playerGravity
        if playerRect.bottom >= 300: playerRect.bottom = 300 #Floor
        playerAnimation()
        screen.blit(playerSurface,playerRect)
        
        #Collision
        if snailRect.colliderect(playerRect):
            gameActive = False  
    else:
        screen.fill('Purple')


    #Fps
    pygame.display.update()
    clock.tick(60)