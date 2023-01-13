import pygame

#Setup
pygame.init()
width = 800
height = 400
screen = pygame.display.set_mode((width,height))
pygame.display.set_caption('Runner')
clock = pygame.time.Clock()


#Divider
midSurface = pygame.Surface((12,700))
midSurface.fill('white')



#Game Loop
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            exit()
    
    #Divider        
    screen.blit(midSurface,(400,200))
     
    #Frame Rate       
    pygame.display.update()
    clock.tick(60)