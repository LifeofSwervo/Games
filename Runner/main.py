import pygame
from sys import exit

pygame.init()
screen = pygame.display.set_mode((800,400))
pygame.display.set_caption('Runner')
clock = pygame.time.Clock()
testFont = pygame.font.Font('Runner/font/Pixeltype.ttf', 50)

#Background (and text)
skySurface = pygame.image.load('Runner/graphics/Sky.png').convert()
groundSurface = pygame.image.load('Runner/graphics/ground.png').convert()
textSurface = testFont.render('My Game', False, 'Green').convert()

#Player
playerSurface = pygame.image.load('Runner/graphics/Player/player_walk_1.png').convert_alpha()
playerRect = playerSurface.get_rect(midbottom =(80,300))

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

    #Background
    screen.blit(skySurface,(0,0))
    screen.blit(groundSurface,(0,300))
    screen.blit(textSurface,(300,50))
    #Enemies

        #Snail
    snailRect.right  -= 5
    if snailRect.left < -50: snailRect.left = 850
    screen.blit(snailSurface,snailRect)

    #Player
    screen.blit(playerSurface,playerRect)

    pygame.display.update()
    clock.tick(60)