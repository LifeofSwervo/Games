import pygame
from sys import exit

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
playerSurface = pygame.image.load('Runner/graphics/Player/player_walk_1.png').convert_alpha()
playerRect = playerSurface.get_rect(midbottom =(80,300))
playerGravity = 0

#Enemies

    #Snail
snailSurface = pygame.image.load('Runner/graphics/snail/snail1.png').convert_alpha()
snailRect = snailSurface.get_rect(midbottom = (600,300))
snailXPos = 600

#Game Loop
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            exit()
        #Mouse    
        if event.type == pygame.MOUSEBUTTONDOWN:
                print("Down")
        #KeyDown
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and playerRect.bottom >= 300: 
                playerGravity = -20    
    
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
        screen.blit(playerSurface,playerRect)
        
        #Collision
        if snailRect.colliderect(playerRect):
            gameActive = False  

    else:
        screen.fill()
    #if playerRect.colliderect(snailRect):
    #    print('collision')



    #Fps
    pygame.display.update()
    clock.tick(60)